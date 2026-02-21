import React, { useState } from 'react';
import { Search, Landmark } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const banks = [
  { id: 1, name: 'KT' },
  { id: 2, name: 'Krungsri' },
  { id: 3, name: 'Bank of America' },
  { id: 4, name: 'Bangkok Bank' },
  { id: 5, name: 'Kasikorn' },
  { id: 6, name: 'Capital One' },
  { id: 7, name: 'PNC' },
  { id: 8, name: 'Goldman Sachs' },
];
type Props={
  setIsSelectBank: (value: boolean) => void;
  isSelectBank: boolean;
}
const MobileBankingForm = ({setIsSelectBank,isSelectBank}:Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBankId, setSelectedBankId] = useState<number | null>(null);
 if(selectedBankId !== null){
    setIsSelectBank(true);
  }
  const filteredBanks = banks.filter(bank =>
    bank.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="border-none shadow-sm">
      <CardContent className="p-4 sm:p-8 space-y-4 sm:space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <h2 className="text-base sm:text-lg font-semibold">Select Your Bank</h2>
          
          {/* Search Input */}
          <div className="relative w-full sm:w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 sm:w-5 h-4 sm:h-5" />
            <Input
              type="text"
              placeholder="Search bank"
              className="w-full pl-10 pr-4 bg-gray-50 border-gray-200 h-10 sm:h-12 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Bank Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          {filteredBanks.map((bank) => (
            <button
              key={bank.id}
              
              onClick={() => setSelectedBankId(bank.id)}
              className={`flex flex-col items-center justify-center p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl border transition-all group ${
                selectedBankId === bank.id
                  ? 'border-blue-500 bg-blue-50 shadow-md shadow-blue-500/10'
                  : 'border-gray-200 bg-white hover:border-blue-500 hover:shadow-md hover:shadow-blue-500/10'
              }`}
            >
              <div className="mb-2 sm:mb-3 p-2 sm:p-3 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                <Landmark className="text-gray-400 group-hover:text-blue-600 w-5 sm:w-6 h-5 sm:h-6" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-gray-700 text-center leading-tight line-clamp-2">
                {bank.name}
              </span>
            </button>
          ))}
        </div>

        {/* Empty State */}
        {filteredBanks.length === 0 && (
          <div className="text-center py-6 sm:py-8 text-gray-500 text-xs sm:text-sm">
            No banks found matching "{searchTerm}"
          </div>
        )}

        {/* Footer Text */}
        <p className="text-center text-gray-400 text-xs sm:text-sm">
          Can't find your bank? Try searching or contact support.
        </p>
      </CardContent>
    </Card>
  );
};

export default MobileBankingForm;