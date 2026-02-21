import { Search, MapPin, Bus, Clock, Info, Share2, Plus, RefreshCw, XCircle } from 'lucide-react';
import Decision from "./Decision";
import Detail from "./Detail"
type data ={
            id:string;
            To:string;
            From:string;
            Seat:string;
            Time:string;
            Status:string;
            Date:string;
            TimeStart:string;
            TimeLong:string;
            ExpressLine:string;
            BusID:string;
            Gate:string;
            Class:string;
            IsConfirm:boolean;
}
interface dataProps{
  booking:data;
}
export default function CardTrip({booking}:dataProps){
    return(
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className={` ${!booking.IsConfirm ? "text-emerald-600" : "text-blue-600"} ${!booking.IsConfirm ? "bg-emerald-100" : "bg-blue-100"} text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1`}>
                    <span className={`w-1.5 h-1.5 ${!booking.IsConfirm ? "bg-emerald-500" : "bg-blue-500"} rounded-full animate-pulse`}></span> {booking.IsConfirm === true ? "CONFIRMED" : "BOARDING SOON"}
                  </span>
                  <span className="text-[10px] md:text-xs text-slate-400">Booking ID: <span className="text-slate-900 font-medium">{booking.id}</span></span>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Departure Date</p>
                  <p className="text-sm md:text-base font-bold">{booking.Date}</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold">{booking.TimeStart}</h2>
                  <p className="text-blue-600 font-bold text-sm">{booking.From}</p>
                  <p className="text-xs text-slate-400">Bus Station</p>
                </div>
                
                <div className="flex-1 px-4 md:px-10 relative">
                  <div className="border-t-2 border-dashed border-slate-200 w-full absolute top-1/2 left-0 -z-0"></div>
                  <div className="relative z-10 bg-white px-4 flex flex-col items-center mx-auto w-fit">
                    <Bus className="w-4 md:w-5 h-4 md:h-5 text-slate-300 mb-1" />
                    <p className="text-[10px] text-slate-400">{booking.TimeLong}</p>
                    <p className="text-[10px] italic font-medium text-slate-500">Express Line {booking.ExpressLine}</p>
                  </div>
                </div>

                <div className="text-left md:text-right">
                  <h2 className="text-xl md:text-2xl font-bold">{booking.Time}</h2>
                  <p className="text-blue-600 font-bold text-sm">{booking.To}</p>
                  <p className="text-xs text-slate-400">Bus Station</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between pt-6 border-t border-slate-50 gap-4">
                <div className="flex gap-4 flex-col md:flex-row">
                  <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center border border-orange-200">
                    <div className="w-8 h-10 bg-white rounded border border-slate-200 flex flex-col items-center justify-center p-1">
                      <div className="w-full h-1 bg-slate-800 mb-1"></div>
                      <div className="grid grid-cols-2 gap-0.5">
                        {[...Array(6)].map((_, i) => <div key={i} className="w-1 h-1 bg-slate-800"></div>)}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 md:gap-x-8 gap-y-1">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Seat</p>
                      <p className="text-sm font-bold">{booking.Seat}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Gate</p>
                      <p className="text-sm font-bold">{booking.Gate}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Class</p>
                      <p className="text-sm font-bold text-blue-600">{booking.Class}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Bus ID</p>
                      <p className="text-sm font-bold">{booking.BusID}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                    {booking.IsConfirm === false &&(
                            <Decision date={booking.Date} id={booking.id}/>
                    )}
                    {booking.IsConfirm == true &&(
                        <Detail/>
                    )}
                 
                </div>
              </div>
            </div>
          </div>
    );
}