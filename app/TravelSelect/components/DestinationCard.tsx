interface DestProps {
  name: string;
  startingPrice: number;
  tip: string;
  tag: string;
  image: string;
}
import { Lightbulb } from "lucide-react";
export default function DestinationCard({ name, startingPrice, tip, tag, image }: DestProps) {
  return (
    <div >
      <div className="h-48 overflow-hidden relative">
        <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={image} alt={name} />
        <div className="absolute top-3 left-3">
          <span className="bg-[#3f68e4] text-white text-[10px] font-bold uppercase px-2 py-1 rounded shadow-lg">{tag}</span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-xl font-bold">{name}</h4>
          <p className="text-[#3f68e4] font-bold">To ${startingPrice}</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
          <span className="material-symbols-outlined text-[#3f68e4] text-sm"><Lightbulb/></span>
          <p className="text-xs text-slate-600 dark:text-slate-400">AI Tip: {tip}</p>
        </div>
      </div>
    </div>
  );
}