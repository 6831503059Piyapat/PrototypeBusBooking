'use client'
import { Wifi, Zap, Briefcase, Moon } from 'lucide-react';
import {useRouter} from "next/navigation";
interface BusCardProps {
  departure: string;
  arrival: string;
  TimeSpend:string; 
  id:string;
  price: number;
  originalPrice?: number;
  type: string;
  from:string;
  to:string;
  isSmartest?: boolean;
  Date?: string;
  passanger?: number;
  onSelectClick?: () => void;
}

export default function BusCard({ id,TimeSpend, departure, arrival, price, originalPrice, type, isSmartest,from,to, Date, passanger, onSelectClick }: BusCardProps) {
const router = useRouter();
async function handleSelect(){
  // Validate date before proceeding
  if (!Date) {
    onSelectClick?.();
    return;
  }
  
  const res = await fetch('/api/PushTemporary',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id:id,
        From:from,
        To:to,
        TimeStart:departure,
        TimeLong:TimeSpend,
        Time:arrival,
        Class:type,
        Price:price,
        Date:Date,
        Passanger:`${passanger} Passenger`,
      })
    })
    if(res.ok){
      router.push('/TravelSelect/BusSelect/SeatSelect');
    }

    }

  return (
    <div className={`relative p-6 bg-white rounded-xl border-2 transition-all ${isSmartest ? 'border-blue-600 shadow-md' : 'border-gray-100'}`}>
      {isSmartest && (
        <div className="absolute -top-3 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg flex items-center gap-1">
          ✨ BEST CHOICE
        </div>
      )}
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Route Info */}
        <div className="flex items-center gap-8 flex-1">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-800">{departure}</h3>
            <p className="text-sm text-gray-500">{from}</p>
          </div>
          
          <div className="flex-1 flex items-center gap-2">
            <div className="h-[2px] flex-1 bg-gray-200 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-1 border border-gray-200 rounded-full">
                <span className="text-[10px] font-bold">🚌</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-800">{arrival}</h3>
            <p className="text-sm text-gray-500">{to}</p>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-col items-center gap-1 min-w-[120px]">
          <div className="flex gap-2 text-gray-400">
            <Wifi size={16} />
            <Zap size={16} />
            <Briefcase size={16} />
          </div>
          <span className="text-xs text-gray-400 font-medium">{type}</span>
        </div>

        {/* Price & Action */}
        <div className="flex items-center gap-6">
          <div className="text-right">
            {originalPrice && <p className="text-sm text-gray-400 line-through">${originalPrice}</p>}
            <p className="text-3xl font-bold text-blue-600">${price}</p>
          </div>
          <button onClick = {()=>handleSelect()} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
            Select
          </button>
        </div>
      </div>
    </div>
  );
}