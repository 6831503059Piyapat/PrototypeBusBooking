'use client'
import { Search, MapPin, Bus, Clock, Info, Share2, Plus, RefreshCw, XCircle } from 'lucide-react';
import {useState,useEffect} from "react";
import { toast } from 'sonner';

type Props={
  date:string;
  id?: string;
}

export default function Decision({date, id}:Props){
      const [timeLeft, setTimeLeft] = useState(0);
      const [isLoading, setIsLoading] = useState(false);
     
            // Calculate countdown based on future date minus current time

      const handleConfirmDecision = async (isConfirm: boolean) => {
        if (!id) {
          toast.error('Booking ID not found');
          return;
        }

        setIsLoading(true);
        try {
          const response = await fetch('/api/editdb', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: id,
              IsConfirm: isConfirm
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            toast.error(data.error || 'Failed to update booking');
            return;
          }

         
        
        } catch (error) {
          console.error('Error:', error);
          toast.error('Something went wrong');
        } finally {
          setIsLoading(false);
        }
      };
    
      useEffect(() => {
        const calculateTimeLeft = () => {
          const futureDate = new Date(date);
          futureDate.setHours(0, 0, 0, 0); // Set to start of the day
          const now = new Date();
          now.setHours(0, 0, 0, 0); // Set current date to start of the day
          
          const diffMs = futureDate.getTime() - now.getTime();
          const diffSeconds = Math.floor(diffMs / 1000);
          
          setTimeLeft(diffSeconds > 0 ? diffSeconds : 0);
        };
        
        calculateTimeLeft();
        
        // Update every second
        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
      }, [date]);

      // Auto-confirm when time runs out
      useEffect(() => {
        if (timeLeft === 0 ) {
          handleConfirmDecision(true);
        }
      }, [timeLeft]);
      
      const formatTime = (seconds: number) => {
          const days = Math.floor(seconds / 86400);
          const hours = Math.floor((seconds % 86400) / 3600);
          const mins = Math.floor((seconds % 3600) / 60);
          const secs = seconds % 60;
          
          if (days > 0) {
            return `${days}d ${hours}h ${mins}m`;
          }
          return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        };

    return(
        <>
         <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <button 
                className="flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-blue-600 text-white text-xs md:text-sm font-bold rounded-lg shadow-md shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed">
                        <RefreshCw className="w-4 h-4" /> Change Trip
                      </button>
                      <button 
              
                       
                        className="flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-blue-50 text-blue-700 text-xs md:text-sm font-bold rounded-lg hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed">
                        <Plus className="w-4 h-4" /> Add Seats
                      </button>
            </div>
            <p className="text-[10px] text-orange-600 font-bold px-3 py-1 bg-orange-50 rounded-lg border border-orange-200">
              ⏱️ Time remaining to change/add seats: <span className="text-orange-700">{formatTime(timeLeft)}</span>
            </p>
         </div>
        </>
    );
}