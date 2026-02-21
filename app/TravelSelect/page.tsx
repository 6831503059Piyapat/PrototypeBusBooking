'use client'
import Header from '../components/Navbar';
import SearchBar from './components/SearchBar';
import DestinationCard from './components/DestinationCard';
import { useRouter } from 'next/navigation';
import {useEffect,useState} from 'react'
import {Spinner} from "@/components/ui/spinner";
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
      TimeSpend:string;
      price: number;
      originalPrice: number;
      busType: string;
      isBestChoice: boolean;
      features: Array<string>;
}
export default function TravelSelect() {
const router = useRouter();
const [busRoutes, setBusRoutes] = useState<Bus_Route[]>([]);
const [data, setData] = useState<Destination[]>([]);
const [loading,setLoading] = useState(true);
useEffect(() => {
  
  const fetchData = async () => {
    const response = await fetch('/api/dataBus');
    const json = await response.json();
    setBusRoutes(json.busSchedules);
    setLoading(false);
    setData(json.destinations);
  };
  fetchData();
}, []);

async function handleCard(name:string){
   const res = await fetch('/api/PushTemporary', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       To:name,
       name: name,
     }),

   });
    if(res.ok){
router.push('/TravelSelect/BusSelect');
    }   
   
}
  return (
    <div className="bg-[#f6f6f8] dark:bg-[#111521] text-slate-900 dark:text-slate-100 min-h-screen font-sans">
      <Header />
      
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <section className="mb-8 sm:mb-12">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-2">Effortless Travel through Intelligence</h2>
            <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg">AI-powered bus booking for your next journey.</p>
          </div>
          <SearchBar destinations={data} busroute={busRoutes} />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 ">
          <div className="lg:col-span-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3 sm:gap-0">
              <h3 className="text-xl sm:text-2xl font-bold">Popular Destinations</h3>
              <button className="text-[#3f68e4] font-semibold flex items-center gap-1 hover:underline text-sm w-fit">
                View all 
              </button>
            </div>
             {loading &&(
              <div className="items-center justify-center flex">
             <Spinner className="size-8"/>
             </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
           
              {data.map((dest) => (
                <div key={dest.id} onClick={() => handleCard(dest.name)}  className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all cursor-pointer active:scale-95 sm:active:scale-100">
                  <DestinationCard {...dest} />
                </div>
              ))}
            </div>
          </div>

          {/* <aside className="lg:col-span-4 space-y-6">
            <RecentSearches />
            <RewardsWidget />
          </aside> */}
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
}