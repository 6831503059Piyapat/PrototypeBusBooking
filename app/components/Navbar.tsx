'use client'
import React from 'react';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { useState } from "react";
import Profile from "../components/Profile";
export default function Navbar(){
    const pathname = usePathname();
    const [currentPath, setCurrentPath] = useState(pathname);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
      setIsSidebarOpen(false);
    };

  return (
    <>
      <nav className="flex items-center justify-between px-6 py-2 bg-white border-b border-gray-100 shadow-sm">
        {/* Left Side: Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            {/* Mock Logo Icon */}
            <svg 
              width="15" height="15" viewBox="0 0 24 24" fill="none" 
              stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M7 17L7 7M17 17L17 7M7 12L17 12" />
            </svg>
          </div>
          <span className="text-md font-bold text-blue-700 tracking-tight">
           AI Bus Booking
          </span>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center justify-between gap-8">
          <Link href="/"  className={`text-md hover:text-blue-600  font-medium ${pathname == "/"?"text-blue-600 font-semibold":"text-gray-500"}  `}>
            Dashboard
          </Link>
          <Link href="/MyBooking"  className={`text-md hover:text-blue-600  font-medium ${pathname == "/MyBooking"?"text-blue-600 font-semibold":"text-gray-500"}  `}>
            My Bookings
          </Link>
          <Link href="/TravelSelect"  className={`text-md hover:text-blue-600  font-medium ${pathname == "/TravelSelect"?"text-blue-600 font-semibold":"text-gray-500"}  `}>
            Booking
          </Link>
          
         
        </div>

        {/* Right Side: Auth Buttons */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <Profile/>
          <button 
            onClick={toggleSidebar}
            className="md:hidden flex flex-col justify-center items-center gap-1 p-2"
          >
            <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${isSidebarOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${isSidebarOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${isSidebarOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
          
          
        </div>
      </nav>

      {/* Overlay - Click to close (light blur effect) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 md:hidden backdrop-blur-sm"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-screen w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button 
            onClick={closeSidebar}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex flex-col gap-6 px-6 py-4">
          <Link 
            href="/" 
            onClick={closeSidebar}
            className={`text-lg font-medium transition-colors ${pathname === "/" ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"}`}
          >
            Dashboard
          </Link>
          <Link 
            href="/MyBooking" 
            onClick={closeSidebar}
            className={`text-lg font-medium transition-colors ${pathname === "/MyBooking" ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"}`}
          >
            My Bookings
          </Link>
          <Link 
            href="/TravelSelect" 
            onClick={closeSidebar}
            className={`text-lg font-medium transition-colors ${pathname === "/TravelSelect" ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"}`}
          >
            Booking
          </Link>
        </div>
      </div>
    </>
  );
};

