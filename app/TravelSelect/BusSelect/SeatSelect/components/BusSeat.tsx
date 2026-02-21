import { LucideIcon, Sparkles, Ban } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SeatProps {
  id: string;
  status: 'available' | 'occupied' | 'selected' | 'ai-choice';
  onClick?: () => void;
}

export const BusSeat = ({ id, status, onClick }: SeatProps) => {
  const baseStyles = "relative w-full aspect-square rounded-lg border-2 transition-all flex flex-col items-center justify-center font-semibold text-xs";
  
  const statusStyles = {
    available: "border-slate-200 dark:border-slate-700 hover:border-primary text-slate-400 hover:text-primary",
    occupied: "bg-slate-100 dark:bg-slate-800 border-transparent cursor-not-allowed text-slate-300",
    selected: "bg-primary border-primary text-white ring-4 ring-primary/20",
    'ai-choice': "border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 hover:ring-4 ring-yellow-400/20"
  };

  if (status === 'occupied') {
    return (
      <div className={cn(baseStyles, statusStyles.occupied)}>
        <Ban size={16} />
      </div>
    );
  }

  return (
    <button onClick={onClick} className={cn(baseStyles, statusStyles[status])}>
      {id}
      {status === 'ai-choice' && (
        <span className="absolute -top-2 -right-2 bg-yellow-400 text-white rounded-full p-0.5 shadow-sm">
          <Sparkles size={10} />
        </span>
      )}
    </button>
  );
};