"use client";

import BusCard from './components/BusCard';
import { ChevronDown } from 'lucide-react';
import Navbar from "../../components/Navbar";
import { useState,useEffect } from 'react';
type propFetch={
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
  Price:number;
  IsConfirm:boolean;
  Passanger:string;
}
type busProps={
  id: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  TimeSpend: string;
  price: number;
  originalPrice: number;
  busType: string;
  isBestChoice: boolean;
  features: Array<string>;
}
     
export default function BusSelect() {
  const [Temporary, setTemporary] = useState("");
  const [dbFetch,setDBFetch]=useState<busProps[]>([]);
  const [price,setPrice] = useState(42);
  const [selectedDate, setSelectedDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [dateError, setDateError] = useState(false);
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await fetch('/api/PullTemporary');
        const json = await response.json();
        // Handle empty records - set default or extract correct field
        setTemporary(json.records?.[0]?.To || 'Bangkok');
        const res = await fetch('/api/dataBus');
        const dbJson = await res.json();
        setDBFetch(dbJson.busSchedules || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Navbar />
    
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-12 font-sans">
  
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 bg-white p-6 rounded-2xl shadow-sm h-fit">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-bold text-xl">Date Choose</h2>
              <button className="text-blue-600 text-sm font-semibold">Reset All</button>
            </div>

            <div className="space-y-8">
              {/* Travel Date */}
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Travel Date</p>
                <input 
                 required
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    setDateError(false);
                  }}
                  className={`w-full px-3 py-2 border rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors ${dateError ? 'border-red-500 border-2' : 'border-gray-300'}`}
                />
              </div>

              {/* Number of Passengers */}
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Passengers</p>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setPassengers(Math.max(1, passengers - 1))}
                    className="w-10 h-10 border border-gray-300 rounded-lg font-bold text-lg text-slate-600 hover:bg-gray-100 transition-colors"
                  >
                    −
                  </button>
                  <div className="flex-1 text-center">
                    <p className="text-2xl font-bold text-slate-800">{passengers}</p>
                    <p className="text-xs text-gray-400">passenger{passengers > 1 ? 's' : ''}</p>
                  </div>
                  <button 
                    onClick={() => setPassengers(passengers + 1)}
                    className="w-10 h-10 border border-gray-300 rounded-lg font-bold text-lg text-slate-600 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

             

              {/* Amenities */}
             
            </div>
          </aside>

          {/* Main Results */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-lg font-semibold text-slate-600">All Buses To {Temporary}</h1>

             
            </div>

            <div className="space-y-4">
              {dbFetch.filter((bus) => Temporary === bus.to).length > 0 ? (
                dbFetch.filter((bus) => Temporary === bus.to).map((bus) => (
                  <BusCard key={bus.id} Date={selectedDate} passanger={passengers} TimeSpend={bus?.TimeSpend} id={bus?.id} from={bus?.from} to={bus?.to} departure={bus?.departureTime} arrival={bus?.arrivalTime} price={bus?.price} originalPrice={bus?.originalPrice} type={bus?.busType} isSmartest={bus?.isBestChoice} selectedDate={selectedDate} passengers={passengers} onSelectClick={() => {
                    if (!selectedDate) {
                      setDateError(true);
                    }
                  }} />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg font-semibold text-slate-600">No buses found</p>
                  <p className="text-sm text-gray-400 mt-2">Try adjusting your search criteria</p>
                </div>
              )}
            </div>

            
          </main>
        </div>

        {/* Footer Placeholder */}
        <footer className="mt-20 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
           <div className="flex items-center gap-2">
             <div className="w-6 h-6 bg-gray-400 rounded flex items-center justify-center text-white text-[10px]">AB</div>
             <span className="font-bold">AI Bus Booking</span>
           </div>
           <div className="flex gap-6">
             <a href="#">About Us</a>
             <a href="#">Help Center</a>
             <a href="#">Privacy Policy</a>
             <a href="#">Terms of Service</a>
           </div>
           <p>© 2026 AI Bus Booking Inc. Built for speed.</p>
        </footer>
      </div>
    </div>
    </>
  );
}