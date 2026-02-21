'use client'
import React from 'react';
import Image from 'next/image';
import { pillow } from '@lucide/lab'
import {useRouter} from 'next/navigation';
import { Wifi, BatteryCharging, Wind,Icon, Armchair, ChevronRight, CheckCircle2,Hamburger,Luggage,RockingChair } from 'lucide-react';
type dataProp={
     id: string;
      from: string;
      to: string;
      departureTime: string;
      arrivalTime: string;
      TimeSpend:string;
      price: number;
      originalPrice: number;
      busType: string;
      isBestChoice: boolean;
      features: Array<string>;
      dateInput:string;
      passenger:string;
}

const BusTicketCard = ({id,from,to,departureTime,arrivalTime,price,originalPrice,busType,isBestChoice,features,TimeSpend,dateInput,passenger}:dataProp) => {
  const router = useRouter();
  async function handleSelect(){
    try{
    const res = await fetch('/api/PushTemporary',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id:id,
        From:from,
        To:to,
        TimeStart:departureTime,
        TimeLong:TimeSpend,
        Time:arrivalTime,
        Class:busType,
        Price:price,
        Date:dateInput,
        Passanger:passenger,
      })
    })
      if(res.ok){
        router.push('/TravelSelect/BusSelect/SeatSelect');
      }
    }catch(error){
      console.error('Error pushing temporary data:', error);
    }
  }
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row overflow-hidden font-sans">
      
      {/* Left Section: Image & Badge */}
      <div className="w-full md:w-1/4 p-3 md:p-4 relative">
        <div className="relative h-32 md:h-32 w-full rounded-lg overflow-hidden">
          <Image
            src="/BusBookingBus.jpeg"
            alt="BlueLine Express"
            fill
            className="object-cover"
          />
          
        </div>
        <div className="mt-3">
          <h3 className="text-blue-600 font-bold text-sm md:text-lg">{id}</h3>
          <div className="flex items-center gap-1 mt-1">
            <CheckCircle2 className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Middle Section: Route & Amenities */}
      <div className="w-full md:w-2/4 p-4 md:p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-gray-50">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-start gap-4 md:gap-0">
          {/* Departure */}
          <div className="text-left min-w-fit">
            <span className="block text-lg md:text-2xl font-bold text-gray-900">{departureTime}</span>
            
            <span className="block text-gray-600 font-medium mt-1 text-sm md:text-base">{from}</span>
            <span className="text-[10px] text-gray-400 uppercase font-bold">Transport Center</span>
          </div>

          {/* Timeline Visual */}
          <div className="hidden md:flex flex-1 px-4 md:px-8 pt-4">
            <div className="relative flex items-center justify-center w-full">
              <div className="w-full h-[2px] bg-gray-200"></div>
              <div className="absolute flex items-center justify-between w-full">
                <div className="w-2 h-2 rounded-full border-2 border-blue-500 bg-white"></div>
                <div className="bg-blue-50 text-blue-600 text-[10px] font-bold px-3 py-1 rounded-full border border-blue-100 flex items-center gap-1">
                  {TimeSpend}
                </div>
                <div className="w-2 h-2 rounded-full border-2 border-blue-500 bg-white"></div>
              </div>
            </div>
          </div>

          {/* Mobile Duration */}
          <div className="md:hidden bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded-full border border-blue-100 flex items-center gap-1">
            {TimeSpend}
          </div>

          {/* Arrival */}
          <div className="text-right md:text-right min-w-fit">
            <span className="block text-lg md:text-2xl font-bold text-gray-900">{arrivalTime}</span>
            <span className="block text-gray-600 font-medium mt-1 text-sm md:text-base">{to}</span>
            <span className="text-[10px] text-gray-400 uppercase font-bold">Transport Center</span>
          </div>
        </div>

        {/* Amenities Row */}
        <div className="flex flex-wrap items-center gap-2 md:gap-4 text-gray-400 mt-4 md:mt-6">
            {features.slice(0, 4).map((feature) => (
              <div key={feature} className="flex items-center gap-1 md:gap-1.5 text-xs md:text-sm">
                {feature === "wifi" && <Wifi size={14} className="md:w-4 md:h-4" />}
                {feature === "power" && <BatteryCharging size={14} className="md:w-4 md:h-4" />}
                {feature === "air-con" && <Wind size={14} className="md:w-4 md:h-4" />}
                {feature === "meal" && <Hamburger size={14} className="md:w-4 md:h-4" />}
                {feature === "luggage" && <Luggage size={14} className="md:w-4 md:h-4" />}
                {feature === "pillow" && <Icon iconNode={pillow} size={14} className="md:w-4 md:h-4" />}
                {feature === "massage-chair" && <RockingChair size={14} className="md:w-4 md:h-4" />}
                <span className="text-xs font-medium hidden md:block">{feature}</span>
              </div>
            ))}
        </div>
      </div>

      {/* Right Section: Pricing & CTA */}
      <div className="w-full md:w-1/4 bg-gray-50/50 p-4 md:p-6 flex flex-row md:flex-col items-center md:items-center justify-between md:justify-center text-center gap-4 md:gap-0">
        <div className="flex flex-col items-start md:items-center">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1 md:mb-1">Per Seat</span>
          <div className="flex items-start text-gray-900 mb-2 md:mb-6">
            <span className="text-base md:text-2xl font-bold mt-0.5 md:mt-1">$</span>
            <span className="text-2xl md:text-5xl font-extrabold">{price}</span>
            <span className="text-sm md:text-xl font-bold mt-1 md:mt-4">.00</span>
          </div>
        </div>

        <button onClick={()=>handleSelect()} className="w-auto md:w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 md:py-4 px-4 md:px-4 rounded-lg md:rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-200 text-sm md:text-base">
          Select Seat <ChevronRight size={16} className="md:w-5 md:h-5" />
        </button>
        
      
      </div>
    </div>
  );
};

export default BusTicketCard;