"use client";
import { ArrowRight } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import {Spinner} from "@/components/ui/spinner";
import BusTicketCard from "./BusTicketCard";
type Destination = {
  id: string;
  name: string;
  startingPrice: number;
  tip: string;
  tag: string;
  image: string;
};
type Bus_Route={
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
interface SearchBarProps {
  destinations?: Destination[];
  busroute?: Bus_Route[];
}


export default  function SearchBar({ destinations = [], busroute = [] }: SearchBarProps) {
  const [fromInput, setFromInput] = useState('');
  const [toInput, setToInput] = useState('');
  const [dateInput,setDateInput]=useState('')
  const [passenger,setPassenger]=useState('1 Passenger');
  const [customPassengers, setCustomPassengers] = useState('');
  const [showFromHints, setShowFromHints] = useState(false);
  const [showToHints, setShowToHints] = useState(false);
  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);
  const [loadingfind, setLoading] = useState(false);
  
  const [aiAfterFind, setAiAfterFind] = useState<Bus_Route[]>([]);
  const promptAi = ` You are a helpful assistant that only responds in JSON format. Do not include any conversational text or markdown code blocks like json.
   This is structure you need to send to me { 
      id: string,
      from: string,
      to: string,
      departureTime: string,
      arrivalTime: string,
      TimeSpend: string,
      price: number,
      originalPrice: number,
      busType: string,
      isBestChoice: boolean,
      features: Array<string>,
   } You need to find all matching that departs from ${fromInput} and arrives at ${toInput} do not make some space.. Just send me the best route that you can find with the structure above.when you return json to me do not add anything that not real if the data not match anything return id is "Not Found" `;


  const filteredDestinations = (input: string) => {
    return destinations.filter((dest) =>
      dest.name.toLowerCase().includes(input.toLowerCase())
    );
  };

  const handleFromSelect = (name: string) => {
    setFromInput(name);
    setShowFromHints(false);
  };

  const handleToSelect = (name: string) => {
    setToInput(name);
    setShowToHints(false);
  };

async function handleFindRoute(){
  setLoading(true);
  console.log(busroute);
  try {
    const res = await fetch('/api/chatAnalyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        prompt: promptAi,
        busData: busroute 
      }),
    });
    
    if (!res.ok) throw new Error('API request failed');
    
    const data = await res.json();
    console.log('AI Response:', data);
    
    // Ensure data is an array
    if (Array.isArray(data)) {
      setAiAfterFind(data);
    } else if (data && typeof data === 'object') {
      setAiAfterFind([data]);
    } else {
      console.error('Invalid response format:', data);
      setAiAfterFind([]);
    }
  } catch (error) {
    console.error('Error:', error);
    setAiAfterFind([]);
  } finally {
    setLoading(false);
  }
}
  // Check if all required fields are filled
  const isFormValid = () => {
    if (!fromInput || !toInput || !dateInput) return false;
    if (passenger === '3 or More' && !customPassengers) return false;
    return true;
  };

  // Close hints when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fromRef.current && !fromRef.current.contains(event.target as Node)) {
        setShowFromHints(false);
      }
      if (toRef.current && !toRef.current.contains(event.target as Node)) {
        setShowToHints(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-xl shadow-xl shadow-blue-500/5 border border-slate-200 dark:border-slate-800 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        {/* From Field */}
        <div ref={fromRef} className="space-y-1 sm:space-y-2 relative">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <span className="material-symbols-outlined text-sm hidden sm:inline">location_on</span> 
            <span className="sm:hidden">From</span>
            <span className="hidden sm:inline">From</span>
          </label>
          <input 
            type="text"
            value={fromInput}
            onChange={(e) => {
              setFromInput(e.target.value);
              setShowFromHints(e.target.value.length > 0);
            }}
            onFocus={() => setShowFromHints(fromInput.length > 0)}
            className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg h-10 sm:h-12 px-3 sm:px-4 text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
            placeholder="Where are you starting?"
          />
          {showFromHints && filteredDestinations(fromInput).length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg mt-1 z-10 shadow-lg">
              {filteredDestinations(fromInput).slice(0, 5).map((dest) => (
                <button
                  key={dest.id}
                  onClick={() => handleFromSelect(dest.name)}
                  className="w-full text-left px-3 sm:px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 text-sm text-slate-700 dark:text-slate-300 transition-colors border-b border-slate-100 dark:border-slate-700 last:border-b-0"
                >
                  {dest.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* To Field */}
        <div ref={toRef} className="space-y-1 sm:space-y-2 relative">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <span className="material-symbols-outlined text-sm hidden sm:inline">near_me</span> 
            <span className="sm:hidden">To</span>
            <span className="hidden sm:inline">To</span>
          </label>
          <input 
            type="text"
            value={toInput}
            onChange={(e) => {
              setToInput(e.target.value);
              setShowToHints(e.target.value.length > 0);
            }}
            onFocus={() => setShowToHints(toInput.length > 0)}
            className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg h-10 sm:h-12 px-3 sm:px-4 text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
            placeholder="Where to?"
          />
          {showToHints && filteredDestinations(toInput).length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg mt-1 z-10 shadow-lg">
              {filteredDestinations(toInput).slice(0, 5).map((dest) => (
                <button
                  key={dest.id}
                  onClick={() => handleToSelect(dest.name)}
                  className="w-full text-left px-3 sm:px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 text-sm text-slate-700 dark:text-slate-300 transition-colors border-b border-slate-100 dark:border-slate-700 last:border-b-0"
                >
                  {dest.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Date Field */}
        <div className="space-y-1 sm:space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <span className="material-symbols-outlined text-sm hidden sm:inline">calendar_month</span> 
            <span>Date</span>
          </label>
          <input 
            type="date"
            onChange={(e)=>setDateInput(e.target.value)}
            className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg h-10 sm:h-12 px-3 sm:px-4 text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
          />
        </div>
        <div className="space-y-1 sm:space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <span className="material-symbols-outlined text-sm hidden sm:inline">group</span> 
            <span className="sm:hidden">Passengers</span>
            <span className="hidden sm:inline">Passengers</span>
          </label>
          <select onChange={(e)=>{
            setPassenger(e.target.value);
            if(e.target.value !== '3 or More') {
              setCustomPassengers('');
            }
          }}  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg h-10 sm:h-12 px-3 sm:px-4 text-sm focus:ring-2 focus:ring-primary outline-none">
            <option>1 Passenger</option>
            <option>2 Passengers</option>
            <option>3 or More</option>
          </select>
          {passenger === '3 or More' && (
            <input 
              type="number"
              min="3"
              placeholder="Enter number of passengers"
              value={customPassengers}
              onChange={(e) => setCustomPassengers(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg h-10 sm:h-12 px-3 sm:px-4 text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
            />
          )}
        </div>
      </div>
      
      <div className="flex flex-col gap-3 sm:gap-6 pt-4 sm:pt-6 border-t border-slate-100 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 bg-primary/5 dark:bg-primary/10 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-primary/10">
          <div className="flex-1">
            <p className="text-xs sm:text-sm font-bold">AI Route Optimizer</p>
            <p className="text-xs text-slate-500 hidden sm:block">Smart routing for cost-effective trips</p>
          </div>
          <input type="checkbox" defaultChecked className="w-11 h-6 bg-slate-200 rounded-full appearance-none checked:bg-primary relative transition-colors cursor-pointer before:content-[''] before:absolute before:size-5 before:bg-white before:rounded-full before:top-[2px] before:left-[2px] checked:before:translate-x-5 before:transition-transform flex-shrink-0" />
        </div>
        <button type="button" disabled={loadingfind || !isFormValid()}  onClick={()=>handleFindRoute()} className={`w-full px-6 sm:px-12 py-3 sm:py-4 bg-[#3f68e4]  ${(loadingfind || !isFormValid())?"text-gray-600 bg-gray-400":"text-white"} rounded-lg font-bold text-base sm:text-lg hover:shadow-lg ${(loadingfind || !isFormValid())?"":"hover:shadow-blue-500/30"} active:scale-95 transition-all flex items-center justify-center gap-2 group`}>
          {loadingfind?"Finding...":"Find Best Routes"}
          {!loadingfind &&(
            
          <span className="material-symbols-outlined transition-transform group-hover:translate-x-1"><ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" /></span>

          )}
        </button>
        {aiAfterFind.length > 0 && aiAfterFind[0].id === "Not Found" ? (
          <div className="text-center py-8">
            <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">No routes found</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Please try different search criteria</p>
          </div>
        ) : (
          aiAfterFind.map((item)=>(
            <div key={item.id}>
             <BusTicketCard {...item} dateInput={dateInput} passenger={passenger}/>
            </div>
          ))
        )}
        <div>
          
        </div>
      </div>
    </div>
  );
}