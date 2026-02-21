type data={
  status: string;
  route: string;
  details: string;
  date: string;
  time: string;
}
const BookingCard = ({ status, route, details, date, time }: data) => (
  <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div>
        <span className={`${status === "On Time"?"text-blue-500 bg-blue-50":"text-gray-500 bg-gray-100"} text-[10px] font-bold px-2 py-1 rounded-md`}>
          {status}
        </span>
        <h3 className="text-lg font-bold text-gray-900 mt-2">{route}</h3>
        <p className="text-gray-400 text-xs">{details}</p>
      </div>
      <div className="bg-gray-50 p-2 rounded-lg border border-gray-100">
        <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" /> {/* Placeholder for QR */}
      </div>
    </div>
    <div className="flex justify-between text-gray-500 text-[11px] font-medium pt-4 border-t border-gray-50">
      <div className="flex items-center gap-1">
        <span>📅</span> {date}
      </div>
      <div className="flex items-center gap-1">
        <span>🕒</span> {time}
      </div>
    </div>
  </div>
);

export default BookingCard;