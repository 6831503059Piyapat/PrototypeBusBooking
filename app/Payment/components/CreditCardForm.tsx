import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard } from "lucide-react"

export default function CreditCardForm(){
    return(
        <>
        <Card className="border-none shadow-sm">
            <CardContent className="p-4 sm:p-8 space-y-4 sm:space-y-6">
              <div className="flex justify-between items-start sm:items-center gap-3 flex-wrap">
                <h2 className="text-base sm:text-lg font-semibold">Card Details</h2>
                <div className="flex gap-2">
                  <div className="w-7 h-4 sm:w-8 sm:h-5 bg-blue-800 rounded-sm" /> {/* Visa Mockup */}
                  <div className="w-7 h-4 sm:w-8 sm:h-5 bg-orange-400 rounded-sm" /> {/* MC Mockup */}
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-600">Cardholder Name</label>
                  <Input placeholder="Johnathan Doe" className="bg-gray-50 border-gray-200 h-10 sm:h-12 text-sm" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-600">Card Number</label>
                  <div className="relative">
                    <Input placeholder="0000 0000 0000 0000" className="bg-gray-50 border-gray-200 h-10 sm:h-12 pl-10 sm:pl-12 text-sm" />
                    <CreditCard className="absolute left-3 sm:left-4 top-2.5 sm:top-3.5 text-gray-400 w-4 sm:w-5 h-4 sm:h-5" size={18} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-600">Expiry Date</label>
                    <Input placeholder="MM / YY" className="bg-gray-50 border-gray-200 h-10 sm:h-12 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-600">CVV / CVC</label>
                    <Input placeholder="***" className="bg-gray-50 border-gray-200 h-10 sm:h-12 text-sm" />
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox id="save-card" />
                  <label htmlFor="save-card" className="text-xs sm:text-sm font-medium text-gray-600">
                    Save this card for future bookings
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
    );
}