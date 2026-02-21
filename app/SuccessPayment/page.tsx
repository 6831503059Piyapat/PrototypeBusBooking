'use client'
import React from 'react';
import { 
  CheckCircle2, Receipt, Ticket, LayoutDashboard, 
  CloudSun, ShieldCheck, Headphones, Bus 
} from 'lucide-react';
import {useRouter} from "next/navigation";
import Navbar from "../components/Navbar"
import {useState,useEffect} from "react";
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
const SuccessPayment = () => {
  const router = useRouter();
  const [temporary,setTemporary] = useState<propFetch>();
  useEffect(() => {
    // Fetch transaction details from API or state management
    const fetchTransactionDetails = async () => {
      const response = await fetch("/api/PullTemporary");
      const data = await response.json();

      setTemporary(data.records[0]);
    };
    fetchTransactionDetails();
  }, []);
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-900">
      {/* Navigation */}
        <Navbar />

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-2xl w-full space-y-6 sm:space-y-8">
          
          {/* Success Card */}
          <div className="bg-white rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-10 shadow-lg sm:shadow-2xl shadow-slate-200/60 border border-slate-50 text-center relative overflow-hidden">
            {/* Success Icon */}
            <div className="inline-flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 bg-emerald-50 rounded-full mb-4 sm:mb-6">
              <CheckCircle2 className="text-emerald-500" size={32} strokeWidth={2.5} />
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-2 sm:mb-3">Payment Successful!</h1>
            <p className="text-slate-500 text-base sm:text-lg mb-6 sm:mb-10">
              Your booking for <span className="font-bold text-slate-900">{temporary?.From} to {temporary?.To}</span> is booked.
            </p>

            {/* Transaction Details */}
            <div className="space-y-3 sm:space-y-5 border-y border-slate-100 py-6 sm:py-8 mb-6 sm:mb-8">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 font-medium text-xs sm:text-sm">Transaction {temporary?.ExpressLine}</span>
                <span className="font-mono font-semibold text-slate-600 tracking-tighter text-xs sm:text-sm">#{temporary?.id}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
                <span className="text-slate-400 font-medium text-xs sm:text-sm">Amount Paid</span>
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-xl sm:text-2xl font-black">${temporary?.Price}</span>
                  <button className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 border border-slate-200 rounded-lg text-blue-600 font-bold text-xs hover:bg-blue-50 transition-colors whitespace-nowrap">
                    <Receipt size={14} /> Receipt
                  </button>
                </div>
              </div>
            </div>

            {/* AI Assistant Section */}
            <div className="text-left">
              <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] sm:text-[11px] tracking-widest uppercase mb-4">
                <div className="w-5 h-5 bg-blue-600 text-white flex items-center justify-center rounded-md text-[10px]">✦</div>
                Booking Bus AI Trip 
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="p-4 sm:p-5 bg-[#F8FAFF] rounded-2xl border border-blue-50">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Departure Countdown</span>
                  <div className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                    {temporary?.TimeLong} <span className="text-[10px] sm:text-[11px] font-bold text-blue-500 ml-1">On Time</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5">{temporary?.Gate}, Transport Station</p>
                </div>
                
               
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <button type ="button" onClick={()=>router.push('/MyBooking')} className="flex items-center justify-center gap-2 sm:gap-3 bg-blue-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-2xl font-bold text-sm sm:text-base hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all transform active:scale-[0.98]">
              <Ticket size={18} strokeWidth={2.5} /> View My Ticket
            </button>
            <button type = "button" onClick={()=>router.push('/')} className="flex items-center justify-center gap-2 sm:gap-3 bg-white text-slate-700 py-3 sm:py-4 px-4 sm:px-6 rounded-2xl font-bold text-sm sm:text-base border border-slate-200 hover:bg-slate-50 transition-all transform active:scale-[0.98]">
              <LayoutDashboard size={18} /> Go to Dashboard
            </button>
          </div>

          {/* Support Link */}
          <p className="text-center text-xs sm:text-sm text-slate-500 font-medium">
            Need help with your booking? <a href="#" className="text-blue-600 font-bold hover:underline underline-offset-4">Visit Support Center</a>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 bg-slate-50/50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col gap-4 sm:gap-6 text-center sm:text-left">
          <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-6 text-[10px] sm:text-xs font-medium text-slate-400">
            <span>© 2026  AI Bus Booking. All rights reserved.</span>
            <a href="#" className="hover:text-slate-600">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600">Terms of Service</a>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 sm:gap-6 text-[10px] sm:text-xs font-bold text-slate-400">
            <div className="flex items-center gap-1 sm:gap-2 uppercase tracking-tighter">
              <ShieldCheck size={12} /> Secure Payment
            </div>
            <div className="flex items-center gap-1 sm:gap-2 uppercase tracking-tighter">
              <Headphones size={12} /> 24/7 AI Support
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SuccessPayment;