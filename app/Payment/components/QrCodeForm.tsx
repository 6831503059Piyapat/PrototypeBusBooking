import React, { useState, useEffect } from 'react';
import { Timer, Smartphone, CreditCard } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const ScanToPay = () => {
  const [timeLeft, setTimeLeft] = useState(599); // 09:59 in seconds
  
  // Simple countdown logic
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 p-4 sm:p-6 md:p-8">
      {/* Header */}
      <h2 className="text-lg sm:text-2xl font-bold text-slate-900 mb-1 sm:mb-2 text-center">Scan to Pay</h2>
      <p className="text-gray-500 text-xs sm:text-sm mb-6 sm:mb-8 md:mb-10 text-center px-2 sm:px-4">
        Scan this QR code with your banking or payment app to complete the booking.
      </p>

      {/* QR Code Container */}
      <div className="flex justify-center mb-6 sm:mb-8 md:mb-10">
        <div className="relative inline-block">
          {/* Outer Blue Focus Corners */}
          <div className="absolute -inset-2 sm:-inset-3 md:-inset-4 border-2 border-blue-600 rounded-xl sm:rounded-2xl pointer-events-none">
            {/* Masking the sides to create "corners" effect */}
            <div className="absolute inset-0 bg-white -m-1 h-[calc(100%+8px)] w-2/3 left-1/2 -translate-x-1/2" />
            <div className="absolute inset-0 bg-white -m-1 w-[calc(100%+8px)] h-2/3 top-1/2 -translate-y-1/2" />
          </div>

          {/* QR Inner Box */}
          <div className="relative bg-teal-700 p-6 sm:p-8 md:p-12 rounded-lg sm:rounded-xl shadow-inner">
            <div className="bg-white p-2 sm:p-3 md:p-4 rounded-lg shadow-xl flex flex-col items-center">
              <span className="text-[8px] sm:text-[9px] md:text-[10px] font-bold text-gray-400 mb-1 sm:mb-2 tracking-widest uppercase">Payment</span>
              <QRCodeSVG value="https://yourpaymentlink.com" size={Math.min(window.innerWidth / 3, 120)} />
              <span className="text-[7px] sm:text-[8px] md:text-[8px] font-medium text-gray-400 mt-1 sm:mt-2 uppercase">Safe & Secure</span>
            </div>
          </div>
        </div>
      </div>

      {/* Timer Badge */}
      <div className="flex justify-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-blue-50 text-blue-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold text-xs sm:text-sm">
          <Timer size={14} className="sm:w-4 sm:h-4" />
          <span>QR expires in <span className="text-blue-800 font-bold">{formatTime(timeLeft)}</span></span>
        </div>
      </div>

      {/* Footer Icons */}
     
    </div>
  );
};

export default ScanToPay;