"use client"
import React from 'react'
import { CreditCard, QrCode, Landmark, ShieldCheck, Bus } from "lucide-react"
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { Card, CardContent } from "@/components/ui/card";
import CreditCardComponent from "./components/CreditCardForm";
import Navbar from "../components/Navbar";
import QrCodeForm from "./components/QrCodeForm";
import MobileBankingForm from "./components/MobileBankingForm";
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
export default function Payment() {
const [paymentMethod, setPaymentMethod] = useState("creditCard");
const [temporary,setTemporary]=useState<propFetch>();
const router = useRouter();
const [isSelectBank,setIsSelectBank]=useState(false);
useEffect(()=>{
  const fetchData = async () => {
    try {
      const res = await fetch('/api/PullTemporary');
      if (!res.ok) throw new Error('Failed to fetch temporary data');
      const response = await res.json();
      console.log('Fetched data:', response);
      // Extract the first record from the records array
      if (response.records && response.records.length > 0) {
        setTemporary(response.records[0]);
      }
    } catch (error) {
      console.error('Error fetching temporary:', error);
    }
  };
  fetchData();
},[])

function generateRandomId(prefix: string): string {
  const randomNum = Math.floor(Math.random() * 10000000);
  return `${prefix}-${randomNum}`;
}
async function addTemporary(){
  const res = await fetch('/api/PushTemporary',{
    method:"POST",
    headers:{"Content-Type": "application/json"},
    body: JSON.stringify({
       id: generateRandomId("ST"),
       To:temporary?.To,
       From:temporary?.From,
       Seat:temporary?.Seat,
       Time:temporary?.Time,
       Status:"On Time",
       Date:temporary?.Date,
       TimeStart:temporary?.TimeStart,
       TimeLong:temporary?.TimeLong,
       ExpressLine: generateRandomId("EL"),
       BusID: generateRandomId("B"),
       Gate: generateRandomId("G"),
       Class:temporary?.Class,
       Price:(temporary?.Price ?? 0) + 5.75,
       IsConfirm:temporary?.IsConfirm,
       Passanger:temporary?.Passanger
    })
   });
   if(res.ok){
router.push('/SuccessPayment');
   }
}

async function HandlePayCredit(){
   const res = await fetch('/api/data',{
    method:"POST",
    headers:{"Content-Type": "application/json"},
    body: JSON.stringify({
       id: generateRandomId("ST"),
       To:temporary?.To,
       From:temporary?.From,
       Seat:temporary?.Seat,
       Time:temporary?.Time,
       Status:"On Time",
       Date:temporary?.Date,
       TimeStart:temporary?.TimeStart,
       TimeLong:temporary?.TimeLong,
       ExpressLine: generateRandomId("EL"),
       BusID: generateRandomId("B"),
       Gate: generateRandomId("G"),
       Class:temporary?.Class,
       Price:(temporary?.Price ?? 0) + 5.75,
       IsConfirm:temporary?.IsConfirm,
       Passanger:temporary?.Passanger
    })
   });
   if(res.ok){
router.push('/SuccessPayment');
   }
   addTemporary()
   
}

async function HandlePayMobileBank(){
   const res = await fetch( '/api/data',{
    method:"POST",
    headers:{"Content-Type": "application/json"},
    body: JSON.stringify({
      id: generateRandomId("ST"),
       To:temporary?.To,
       From:temporary?.From,
       Seat:temporary?.Seat,
       Time:temporary?.Time,
       Status:"On Time",
       Date:temporary?.Date,
       TimeStart:temporary?.TimeStart,
       TimeLong:temporary?.TimeLong,
       ExpressLine: generateRandomId("EL"),
       BusID: generateRandomId("B"),
       Gate: generateRandomId("G"),
       Class:temporary?.Class,
       Price:(temporary?.Price ?? 0) + 5.75,
       IsConfirm:temporary?.IsConfirm,
       Passanger:temporary?.Passanger
    })
   });
      if(res.ok){
router.push('/SuccessPayment');
   }
   addTemporary();
}
return (
    <>
      <Navbar />
    
    <div className="max-w-6xl mx-auto p-3 sm:p-6 bg-gray-50 min-h-screen">
     
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
        
        {/* Left Column: Payment Section */}
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Select Payment Method</h1>
            <div className="flex items-center gap-2 mt-2 text-emerald-500 font-medium text-xs sm:text-sm">
              <ShieldCheck size={14} className="sm:w-4 sm:h-4" />
              <span className="line-clamp-2">SECURE 256-BIT SSL ENCRYPTED PAYMENT</span>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <div onClick={()=>setPaymentMethod("qrCode") }>
                          <PaymentOption icon={<QrCode size={20} />} title="QR Code      Payment" sub="Scan with any app" active={paymentMethod === "qrCode"} />
              </div>  
            <div onClick={()=>{setPaymentMethod("mobileBanking"); setIsSelectBank(false);}}>
                          <PaymentOption icon={<Landmark size={20} />} title="Mobile Banking" sub="Instant bank transfer" active={paymentMethod === "mobileBanking"} />
            </div>
            <div onClick={()=>setPaymentMethod("creditCard")}>
            <PaymentOption icon={<CreditCard size={20} />} title="Credit/Debit Card" sub="Visa & Mastercard" active={paymentMethod === "creditCard"} />
            </div>
          
          </div>

          {/* Card Details Form */}
          {paymentMethod === "qrCode" && <QrCodeForm />}
          {paymentMethod === "mobileBanking" && <MobileBankingForm setIsSelectBank={setIsSelectBank} isSelectBank={isSelectBank}/>}
          {paymentMethod === "creditCard" && <CreditCardComponent />}

        </div>

        {/* Right Column: Booking Summary */}
        <div className="lg:col-span-1">
          <Card className="border-none shadow-lg overflow-hidden sticky top-4">
            <div className="bg-blue-600 p-4 sm:p-6 text-white">
              <div className="flex justify-between items-start sm:items-center gap-2 mb-3 sm:mb-4 flex-wrap">
                <h2 className="text-lg sm:text-xl font-semibold">Booking Summary</h2>
                <span className="text-[8px] sm:text-[10px] bg-blue-400/30 px-2 py-1 rounded-full uppercase tracking-wider">Confirmed</span>
              </div>
              <div className="flex gap-3 sm:gap-4 items-center">
                <div className="bg-white/20 p-2 sm:p-3 rounded-lg flex-shrink-0">
                  <Bus size={20} className="sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs opacity-80 uppercase">Route</p>
                  <p className="font-medium text-xs sm:text-sm truncate">{temporary?.From} → {temporary?.To}</p>
                </div>
              </div>
            </div>

            <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
                <SummaryRow label="Departure" value={`${temporary?.Date}`} />
                <SummaryRow label="Seat Number" value={`${temporary?.Seat}`} />
                <SummaryRow label="Passenger" value={`${temporary?.Passanger}`} />
              </div>

              <hr className="border-gray-100" />

              <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <PriceRow label="Ticket Price" value={`$${temporary?.Price.toFixed(2)}`} />
                <PriceRow label="Service Fee" value="$2.50" />
                <PriceRow label="Taxes & VAT" value="$3.25" />
                <div className="flex justify-between pt-2">
                  <span className="text-base sm:text-lg font-bold">Grand Total</span>
                  <span className="text-base sm:text-lg font-bold text-blue-600">${((temporary?.Price ?? 0) + 5.75).toFixed(2)}</span>
                </div>
              </div>
{/* Button Pay */}

              {paymentMethod === "creditCard" && (
                <Button onClick={()=>HandlePayCredit()} className="w-full h-12 sm:h-14 bg-blue-600 hover:bg-blue-700 text-sm sm:text-lg font-semibold rounded-xl">
                  <ShieldCheck className="mr-2 w-4 sm:w-5 h-4 sm:h-5" size={18} /> Pay Now
                </Button>
              )}
              {paymentMethod === "mobileBanking" && (
                <Button disabled={!isSelectBank} onClick={()=>HandlePayMobileBank()} className={`w-full h-12 sm:h-14  ${isSelectBank?"bg-blue-600 hover:bg-blue-700":"bg-gray-400 hover:bg-gray-400 cursor-default"}  text-sm sm:text-lg font-semibold rounded-xl`}>
                  <ShieldCheck className="mr-2 w-4 sm:w-5 h-4 sm:h-5" size={18} /> Proceed to Bank Login
                </Button>
              )}
              {paymentMethod === "qrCode" && (
                 <h1 className = "font-bold text-center text-black">Waiting for Payment...</h1>
              )}
              <div className="text-center space-y-3 sm:space-y-4">
                <div className="flex items-center justify-center gap-2 text-blue-600 font-bold text-[10px] sm:text-xs uppercase tracking-tighter">
                   <ShieldCheck size={16} className="sm:w-4.5 sm:h-4.5" /> AI BUS BOOKING VERIFIED
                </div>
                <p className="text-[9px] sm:text-[10px] text-gray-400 leading-relaxed px-2 sm:px-4">
                  By clicking &apos;Pay Now&apos;, you agree to AI Bus Booking Terms of Service and Privacy Policy.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </>
  )
}

// Helper Components
function PaymentOption({ icon, title, sub, active = false }: { icon: React.ReactNode, title: string, sub: string, active?: boolean }) {
  return (
    <div className={`cursor-pointer p-3 sm:p-6 rounded-xl sm:rounded-2xl border-2 transition-all flex flex-col items-center text-center gap-2 sm:gap-3 ${active ? 'border-blue-600 bg-white shadow-md relative' : 'border-transparent bg-white shadow-sm'}`}>
      {active && <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-blue-600 text-white rounded-full p-0.5 sm:p-1"><ShieldCheck size={12} className="sm:w-3.5 sm:h-3.5" /></div>}
      <div className={`p-2 sm:p-3 rounded-full ${active ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
        {icon}
      </div>
      <div>
        <p className="font-bold text-xs sm:text-sm text-slate-800 line-clamp-2">{title}</p>
        <p className="text-[8px] sm:text-[10px] text-gray-500 line-clamp-2">{sub}</p>
      </div>
    </div>
  )
}

function SummaryRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-start">
      <span className="text-gray-500 font-medium">{label}</span>
      <span className="font-semibold text-right max-w-[150px]">{value}</span>
    </div>
  )
}

function PriceRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-800">{value}</span>
    </div>
  )
}