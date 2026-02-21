"use client";
import React, { useState,useEffect } from 'react';
import { 
  Wifi, Zap, Wind, Coffee, ArrowRight,
  ShieldCheck
} from 'lucide-react';
import Navbar from "../../../components/Navbar";
import {BusSeat} from "./components/BusSeat";
import {useRouter} from "next/navigation";

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
export default function SeatSelect() {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [temporary,setTemporary] = useState<propFetch>();
  const [passengerCount, setPassengerCount] = useState<number>(0);
  const router = useRouter();


  const rows = ["1", "2", "3", "4", "5"];

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const res = await fetch('/api/PullTemporary');
        if (!res.ok) throw new Error('Failed to fetch temporary data');
        const response = await res.json();
        console.log('Fetched data:', response);
        // Extract the first record from the records array
        if (response.records && response.records.length > 0) {
          const record = response.records[0];
          setTemporary(record);
          
          // Parse passenger count from Passanger field (e.g., "2 Passenger" -> 2)
          const passengerMatch = record.Passanger.match(/(\d+)/);
          if (passengerMatch) {
            setPassengerCount(parseInt(passengerMatch[1]));
          }
        }
      } catch (error) {
        console.error('Error fetching temporary:', error);
      }
    };
    fetchData();
  },[])

  // Handle seat selection
  const handleSeatClick = (seatId: string) => {
    setSelectedSeats(prev => {
      if (prev.includes(seatId)) {
        // Remove seat if already selected
        return prev.filter(seat => seat !== seatId);
      } else {
        // Add seat if not reaching passenger count limit
        if (prev.length < passengerCount) {
          return [...prev, seatId];
        }
        return prev;
      }
    });
  };

  // Handle clear all seats 
  const handleClearSeats = () => {
    setSelectedSeats([]);
  };

  // Calculate total price
  const totalPrice = selectedSeats.length > 0 ? (temporary?.Price || 0) * selectedSeats.length : 0;

  async function handleConfirmPay(){
    // Validate that we have selected the correct number of seats
    if (selectedSeats.length !== passengerCount) {
      alert(`Please select ${passengerCount} seat${passengerCount !== 1 ? 's' : ''}`);
      return;
    }

    try {
      const res = await fetch('/api/PushTemporary',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id:temporary?.id,
  To:temporary?.To,
  From:temporary?.From,
  Seat:selectedSeats.join(','),
  Time:temporary?.Time,
  Status:temporary?.Status,
  Date:temporary?.Date,
  TimeStart:temporary?.TimeStart,
  TimeLong:temporary?.TimeLong,
  ExpressLine:temporary?.ExpressLine,
  BusID:temporary?.BusID,
  Gate:temporary?.Gate,
  Class:temporary?.Class,
  Price:totalPrice,
  IsConfirm:false,
  Passanger:temporary?.Passanger,
        })
      });
      if (!res.ok) throw new Error('Failed to save seat selection');
      router.push('/Payment');
    } catch (error) {
      console.error('Error confirming payment:', error);
    }
  }
  return (
    <div className="bg-[#f6f6f8] dark:bg-[#101322] min-h-screen font-sans text-slate-900 dark:text-slate-100">
      {/* Header */}
      <Navbar />
      

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-8 grid grid-cols-12 gap-4 md:gap-8">
        {/* Left: Map */}
        <div className="col-span-12 lg:col-span-8 space-y-4 md:space-y-6">
          <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-xl border border-primary/10 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base md:text-lg font-bold">Select Your Seat</h2>
              <p className="text-slate-500 text-xs md:text-sm">
                {passengerCount > 0 
                  ? `Select ${passengerCount} seat${passengerCount !== 1 ? 's' : ''} for ${passengerCount} passenger${passengerCount !== 1 ? 's' : ''}`
                  : 'AI-powered seating for maximum comfort'
                }
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 text-[8px] md:text-[10px] font-bold uppercase text-slate-400">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-white border border-slate-300"/> Available</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-primary"/> Selected</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-yellow-400"/> AI Choice</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 md:p-12 rounded-xl border border-primary/10 relative">
             {/* Bus Front Section */}
             <div className="absolute top-0 left-0 w-full h-10 md:h-12 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 flex items-center justify-center">
                <span className="text-[8px] md:text-[10px] font-bold tracking-[0.15em] md:tracking-[0.2em] text-slate-400">FRONT OF VEHICLE</span>
             </div>

             <div className="mt-6 md:mt-8 max-w-sm mx-auto grid grid-cols-5 gap-2 md:gap-4">
                {/* Column Labels */}
                {['A', 'B', '', 'C', 'D'].map((label, i) => (
                  <div key={i} className="text-center text-[8px] md:text-[10px] font-bold text-slate-400 mb-1 md:mb-2">{label}</div>
                ))}

                {/* Simulated Grid Generation */}
                {rows.map(row => (
                  <React.Fragment key={row}>
                    <BusSeat 
                        id={`${row}A`} 
                        status={selectedSeats.includes(`${row}A`) ? 'selected' : (row === '3' ? 'ai-choice' : 'available')} 
                        onClick={() => handleSeatClick(`${row}A`)} 
                    />
                    <BusSeat 
                        id={`${row}B`} 
                        status={selectedSeats.includes(`${row}B`) ? 'selected' : 'available'} 
                        onClick={() => handleSeatClick(`${row}B`)} 
                    />
                    <div className="flex items-center justify-center text-[6px] md:text-[8px] font-bold text-slate-300 rotate-90">AISLE</div>
                    <BusSeat id={`${row}C`} status="occupied" />
                    <BusSeat 
                        id={`${row}D`} 
                        status={selectedSeats.includes(`${row}D`) ? 'selected' : 'available'} 
                        onClick={() => handleSeatClick(`${row}D`)} 
                    />
                  </React.Fragment>
                ))}
             </div>
          </div>
        </div>

        {/* Right: Sidebar */}
        <aside className="col-span-12 lg:col-span-4 space-y-4 md:space-y-6">
          <div className="bg-primary/5 border border-primary/20 p-3 md:p-4 rounded-xl flex gap-2 md:gap-3">
             <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
               <ShieldCheck className="text-white" size={16} />
             </div>
             <div>
               <h3 className="text-xs md:text-sm font-bold text-primary">Booking AI Insight</h3>
               <p className="text-xs text-slate-600 mt-1">
                 {selectedSeats.length > 0 
                   ? `${selectedSeats.length} of ${passengerCount} seat${passengerCount !== 1 ? 's' : ''} selected`
                   : 'Select your preferred seats for maximum comfort'
                 }
               </p>
             </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-primary/10 overflow-hidden shadow-sm">
            <div className="p-4 md:p-6 border-b border-slate-50 dark:border-slate-800">
              <h2 className="font-bold text-sm md:text-base">Booking Summary</h2>
              {selectedSeats.length > 0 && (
                <div className="mt-4 space-y-2 md:space-y-3">
                  {selectedSeats.map((seat) => (
                    <div key={seat} className="flex items-center justify-between p-2 md:p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="w-8 md:w-10 h-8 md:h-10 bg-primary text-white rounded flex items-center justify-center font-bold text-xs md:text-sm">{seat}</div>
                        <div className="text-xs md:text-sm font-semibold">Premium Seat</div>
                      </div>
                      <span className="text-primary font-bold text-sm md:text-base">${temporary?.Price}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between p-2 md:p-3 bg-primary/10 dark:bg-primary/20 rounded-lg mt-3 md:mt-4 border border-primary/30">
                    <div className="text-xs md:text-sm font-semibold text-primary">Total Price</div>
                    <span className="text-primary font-bold text-sm md:text-base">${totalPrice}</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4 md:p-6 space-y-3 md:space-y-4">
              <button type="button" onClick={handleClearSeats} className="w-full bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 font-bold py-3 md:py-4 rounded-xl hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors text-sm md:text-base">
                Clear Seats
              </button>
              <button type="button" onClick={()=>handleConfirmPay()} className="w-full bg-[#1132d4] text-white font-bold py-3 md:py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors text-sm md:text-base">
                Confirm & Pay <ArrowRight size={18}/>
              </button>
            </div>
          </div>
        </aside>
      </main>

      {/* Footer Stats */}
      <footer className="max-w-7xl mx-auto px-4 md:px-6 pb-8 md:pb-12 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {[
          { icon: Wifi, label: 'Starlink Wi-Fi', color: 'bg-green-100 text-green-600' },
          { icon: Zap, label: 'USB-C Power', color: 'bg-blue-100 text-blue-600' },
          { icon: Wind, label: 'AI Climate Control', color: 'bg-purple-100 text-purple-600' },
          { icon: Coffee, label: 'Snack Kit', color: 'bg-orange-100 text-orange-600' },
        ].map((item, i) => (
          <div key={i} className="p-2 md:p-4 bg-white dark:bg-slate-900 rounded-lg flex flex-col sm:flex-row items-center sm:items-start gap-2 md:gap-4 border border-primary/5">
            <div className={`w-8 md:w-10 h-8 md:h-10 rounded-full flex items-center justify-center shrink-0 ${item.color}`}>
              <item.icon size={16} className="md:w-5 md:h-5" />
            </div>
            <span className="text-[10px] md:text-xs font-semibold text-center sm:text-left">{item.label}</span>
          </div>
        ))}
      </footer>
    </div>
  );
}