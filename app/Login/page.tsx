'use client'
import React from 'react';
import { Mail, Lock, Bus, Chrome, Apple, ArrowRight } from 'lucide-react';
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { toast } from "sonner";
export default function Login() {
    const router = useRouter();

    function handleLogin() {
       
    router.push('/');
    }
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans">
      {/* Background Decorative Rings (Optional) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-slate-200 rounded-full opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-slate-200 rounded-full opacity-50" />
      </div>

      <div className="z-10 w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl mb-4 shadow-lg shadow-blue-200">
            <Bus className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-1">AI Bus Booking</h1>
          
        </div>

        {/* Form Card */}
        <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100">
          <form className="space-y-5" >
            
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <button type="button" className="text-sm font-semibold text-blue-600 hover:text-blue-700">Forgot Password?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Keep me signed in */}
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500" />
              <label htmlFor="remember" className="ml-2 text-sm font-medium text-slate-500">Keep me signed in</label>
            </div>

            {/* Submit Button */}
            <button onClick={()=> handleLogin()} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-blue-200 transition-all active:scale-[0.98]">
              Log In <ArrowRight className="w-4 h-4" />
            </button>

            {/* Divider */}
            <div className="relative flex items-center ">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Or continue with</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-4">
              <button type="button" className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-lg font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                <Chrome className="w-5 h-5" /> Google
              </button>
              <button type="button" className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-lg font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                <Apple className="w-5 h-5 fill-current" /> Apple
              </button>
            </div>
          </form>
        </div>

        {/* Footer Link */}
        <p className="mt-3 text-center text-slate-500 text-sm font-medium">
          Don't have an account? <button type="button" className="text-blue-600 font-bold hover:underline">Sign Up for free</button>
        </p>

    
      </div>
    </div>
  );
}