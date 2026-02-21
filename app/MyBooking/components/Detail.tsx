import {Share2} from "lucide-react"
export default function Detail(){
    return(
        <>
        <button className="px-4 md:px-6 py-2 bg-white border border-slate-200 text-slate-900 text-xs md:text-sm font-bold rounded-lg shadow-sm">
                    Manage Details
                  </button>
                  <button className="p-2 bg-whit border border-slate-200 text-slate-400 rounded-lg hover:text-slate-600 flex items-center justify-center">
                    <Share2 className="w-5 h-5" />
                  </button>
        </>
    );
}