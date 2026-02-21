'use client'
import Navbar from '../components/Navbar';
import React from 'react';
import { Search, MapPin, Bus, Clock, Info, Share2, Plus, RefreshCw, XCircle } from 'lucide-react';
import CardTrip from "./components/CardTrip";
import {Spinner} from "@/components/ui/spinner";
import { useState,useEffect } from "react";
interface Booking{
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
const MyBooking = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [IsLoading,setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data');
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        setBookings(data || []);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setBookings([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      {/* Header */}
      
      <header className="flex flex-col md:flex-row md:justify-between md:items-start mb-8 gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900">Trip Management</h1>
          <p className="text-slate-500 text-xs md:text-sm">Manage your upcoming journeys and view travel history powered by AI optimization.</p>
        </div>
        
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Sidebar */}
        <aside className="col-span-1 md:col-span-3 space-y-6">
          <div className="bg-white p-4 md:p-5 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold mb-4 text-xs md:text-sm">Quick Search</h3>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Booking ID or City" 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <h3 className="font-bold mt-8 mb-4 text-xs uppercase tracking-wider text-slate-400">AI Travel Assistant</h3>
            <div className="bg-blue-50 border border-blue-100 p-3 md:p-4 rounded-xl">
              <div className="flex gap-2 items-start mb-2">
                <div className="p-1 bg-blue-600 rounded-md">
                  <Info className="w-3 h-3 text-white" />
                </div>
                <span className="text-blue-800 font-bold text-[10px] md:text-xs">SMART TIP</span>
              </div>
              <p className="text-[10px] md:text-xs text-blue-700 leading-relaxed">
                Heavy traffic detected near KaoSai Terminal. We suggest arriving 25 mins earlier for your 4:00 PM trip.
              </p>
            </div>
          </div>

          {/* Promo Card */}
          <div className="bg-[#0f172a] text-white p-4 md:p-6 rounded-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-base md:text-lg font-bold mb-2">Upgrade to VIP+</h3>
              <p className="text-[10px] md:text-xs text-slate-400 mb-6">Get free seat upgrades and unlimited trip changes for just $9.99/mo.</p>
              <button className="w-full py-2.5 bg-white text-slate-900 font-bold rounded-lg text-xs md:text-sm hover:bg-slate-100 transition-colors">
                Learn More
              </button>
            </div>
            <div className="absolute -bottom-4 -right-4 opacity-20">
               <div className="w-24 h-24 border-8 border-white rounded-full"></div>
            </div>
          </div>
        </aside>

        {/* Main Content - Trip Cards */}
        <main className="col-span-1 md:col-span-9 space-y-6">
          {/* Card 1: Active Trip */}
          {IsLoading && (
            <div className="flex justify-center">
              <Spinner className="size-8" />
            </div>
          )}
          {!IsLoading && bookings && bookings.length > 0 ? (
            bookings.map((booking) => (
              <CardTrip key={booking.id} booking={booking} />
            ))
          ) : (
            !IsLoading && (
              <div className="text-center py-8">
                <p className="text-slate-500">No bookings found</p>
              </div>
            )
          )}

          {/* Card 2: Upcoming Trip */}
          
        </main>
      </div>
    </div>
    </>
  );
};

export default MyBooking;