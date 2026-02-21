'use client'
import Navbar from "./components/Navbar";
import BookingCard from "./components/Bookingcard";
import {Spinner} from "@/components/ui/spinner";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

type BookingItem = {
  id: string;
  To: string;
  From: string;
  Seat: string;
  Time: string;
  Status: string;
  Date: string;
};

type Message = {
  id: string;
  type: 'user' | 'ai';
  content: string;
};

export default function Home() {
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
const [searchbar,setSearchbar] = useState("");
const [searchError, setSearchError] = useState(false);
const [errorMessage, setErrorMessage] = useState("");
const [recentData,setRecentData] = useState<BookingItem[]>([]);
const [isLoading,setIsLoading] = useState(false);
const [messages, setMessages] = useState<Message[]>([]);
const [isFetch,setIsFetch] = useState(false);
useEffect(()=>{
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/data');
      const data = await response.json();
      setIsLoading(false);
      // Handle both array and single object responses
      setRecentData(Array.isArray(data) ? data : data.Booking ? data.Booking : [data]);
      
    } catch (err) {
      console.error("Error fetching booking data:", err);
      setIsLoading(false);
      setRecentData([]);
    }
  };
  fetchData();
}, []);

// Auto-scroll to bottom when new messages arrive
useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [messages]);

const handleSearch = useCallback(async () => {
  setSearchError(false);
  setErrorMessage("");
  setIsFetch(true);
  
  // Add user message to the chat
  const userMessageId = Date.now().toString();
  setMessages((prev) => [...prev, { id: userMessageId, type: 'user', content: searchbar }]);
  
  // Check if API key exists
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  if (!apiKey || apiKey === "NO_API_KEY") {
    setSearchError(true);
    setErrorMessage("API KEY NOT FOUND");
    setIsFetch(false);
    return;
  }

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: searchbar }),
    });
    
    if (!res.ok) throw new Error('API request failed');
    
    const data = await res.json();
    setMessages((prev) => [...prev, { id: Date.now().toString(), type: 'ai', content: data.text }]);
    setSearchbar("");
    setIsFetch(false);
  } catch (error) {
    console.error('Error:', error);
    setMessages((prev) => [...prev, { id: Date.now().toString(), type: 'ai', content: 'เกิดข้อผิดพลาดในการเรียกข้อมูล' }]);
    setSearchError(true);
    setIsFetch(false);
    setErrorMessage("Failed to fetch search results");
  }
}, [searchbar]);

return (
    <div>
      <Navbar />
    <section className="flex flex-col items-center justify-center px-3 sm:px-4 md:px-6 py-8 sm:py-12 md:py-20 bg-gray-300/10 min-h-screen">
      {/* Heading Group */}
      <div className="text-center mb-6 sm:mb-8 md:mb-10 w-full">
        {messages.length > 0 ? (
          <div className="w-full max-w-4xl mx-auto bg-white rounded-lg sm:rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] h-64 sm:h-80 md:h-96 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs sm:max-w-md md:max-w-xl px-4 py-3 rounded-lg sm:rounded-xl ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-900 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>
                </div>
              </div>
            ))}
            {isFetch && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-lg sm:rounded-xl rounded-bl-none">
                  <Spinner className="size-5" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
          Where to next?
        </h1>
        <p className="text-gray-500 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-3 sm:px-4">
          Plan your entire journey using natural language. Our AI finds the best routes,<br className="hidden md:block" /> 
          times, and prices for you.
        </p>
        </>
        )}
       
      </div>

      {/* AI Search Bar Container */}
      <div className="w-full max-w-4xl px-3 sm:px-0">
        
        <div className={`relative flex flex-col sm:flex-row items-stretch sm:items-center bg-white border rounded-lg sm:rounded-2xl p-2 sm:p-2 shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all focus-within:shadow-lg gap-2 sm:gap-0 ${
          searchError ? 'border-red-500 focus-within:shadow-red-500/20' : 'border-gray-100'
        }`}>
          {/* Sparkle Icon */}
          <div className={`pl-3 sm:pl-4 pr-2 sm:pr-3 flex-shrink-0 ${searchError ? 'text-red-500' : 'text-blue-500'}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
          </div>

          {/* Input Field */}
          <input 
            type="text"
            value={searchbar}
            onChange={(e) => {
              setSearchbar(e.target.value);
              setSearchError(false);
              setErrorMessage("");
            }}
            
            placeholder="Find me a bus to Boston..."
            className="flex-grow py-3 sm:py-4 bg-transparent border-none outline-none text-sm sm:text-base md:text-lg text-gray-600 placeholder-gray-300 px-2 sm:px-0"
          />

          {/* Search Button */}
          <button 
            onClick={handleSearch}
            disabled={isFetch}
            className={` ${isFetch ? "bg-gray-400" : "bg-blue-600"} text-center text-white px-4 sm:px-8 py-2.5 sm:py-3 rounded-md font-bold hover:bg-blue-700 transition-all active:scale-95 flex-shrink-0 text-sm sm:text-base`}>
            {!isFetch ? "Search" : "Searching..."}
          </button>
        </div>

        {/* Error Message */}
        {searchError && (
          <div className="mt-2 px-3 sm:px-0">
            <p className="text-red-500 text-sm font-semibold">{errorMessage}</p>
          </div>
        )}

        {/* Suggestion Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-4 sm:mt-6 mb-4 sm:mb-6 px-2">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Try:</span>
          {["Cheapest way to ChiangMai tonight","Direct bus to Bangkok on Friday"].map((item) => (
            <button key={item} onClick={() => setSearchbar(item)} className="bg-blue-50 text-blue-600 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium hover:bg-blue-100 transition-colors border border-blue-100 whitespace-nowrap">
              {item}
            </button>
          ))}
         
        </div>
      </div>
      <div className="max-w-6xl mx-auto p-3 sm:p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full">
      
      {/* --- Left Column: Recent Bookings (Take 2/3 of space) --- */}
      <div className="lg:col-span-2">
        <div className="flex justify-between items-center mb-4 sm:mb-6 gap-2">
          <div className="flex items-center gap-2">
            <span className="text-blue-700 flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 18h16v-2H4v2zm0-5h16v-2H4v2zm0-7v2h16V6H4z" />
              </svg>
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">Recent Bookings</h2>
          </div>
          <button className="text-blue-600 font-semibold text-xs sm:text-sm hover:underline whitespace-nowrap">View All</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {isLoading && (
            <div className="col-span-2 flex justify-center">
              <Spinner className="size-8"/>
            </div>
          )}
          {!isLoading && recentData.length === 0 && (
            <div className="col-span-2 text-center py-8">
              <p className="text-gray-500 text-sm">No bookings found</p>
            </div>
          )}
          {recentData.map((item) => (
            item.Status !== "CONFIRMED" && (
              <div key={item.id} onClick={()=>router.push(`/MyBooking`)}>
              <BookingCard 
                
                status={item.Status} 
                route={`${item.From} → ${item.To}`} 
                details={`Express Line • Seat ${item.Seat}`} 
                date={item.Date} 
                time={item.Time}
              />
            </div>
            )
          ))}
        </div>
      </div>

      {/* --- Right Column: Promotions (Take 1/3 of space) --- */}
      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <span className="text-blue-700 rotate-45 flex-shrink-0">
            <svg width="18" height="18"  viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
            </svg>
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">Promotions</h2>
        </div>

        {/* Promo Image Card */}
        <div className="relative overflow-hidden rounded-lg sm:rounded-2xl aspect-[4/3] group">
          <img 
            src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800" 
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            alt="Bus Promotion"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 sm:p-6 flex flex-col justify-end">
            <span className="bg-yellow-400 text-black text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded w-fit mb-2 sm:mb-3">FLASH SALE</span>
            <h3 className="text-white text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 line-clamp-2">Weekend Gateway: 30% Off</h3>
            <p className="text-gray-200 text-xs mb-3 sm:mb-4 line-clamp-2">Book by Friday to unlock special AI-curated travel discounts.</p>
            <button className="bg-white text-blue-700 w-full py-2 sm:py-2.5 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors">
              Claim Offer
            </button>
          </div>
        </div>

        {/* Loyalty Points Card */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg sm:rounded-2xl p-3 sm:p-5 flex gap-3 sm:gap-4">
          <div className="bg-blue-200 p-2 rounded-lg sm:rounded-xl h-fit flex-shrink-0">
            <svg width="20" height="20"   viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-blue-700" strokeWidth="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            </svg>
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-gray-900 text-sm sm:text-base">Loyalty Points</h4>
            <p className="text-gray-500 text-xs mt-1 leading-relaxed">
              You have 1,250 points. That&apos;s enough for a free city upgrade!
            </p>
            <button className="text-blue-600 text-xs font-bold mt-2 hover:underline">Redeem Now</button>
          </div>
        </div>
      </div>
    </div>
   
    </section>
    {/* Policy below */}
    <div className="justify-between flex flex-col sm:flex-row border-t border-gray-100 py-4 sm:py-6 gap-4 sm:gap-0 text-xs sm:text-sm">
      <div className="justify-center sm:justify-start flex text-gray-500 gap-3 sm:gap-5 px-3 sm:px-5">
        <p>2025 Ai Bus</p>
        <p>Privacy Policy</p>
        <p className="hidden sm:block">Terms of Service</p>
      </div>
      <div className="justify-center sm:justify-end flex text-gray-500 gap-3 sm:gap-5 px-3 sm:px-5">
        <p>Twitter</p>
        <p>Instagram</p>
      </div>
    </div>
    </div>
  );
}
