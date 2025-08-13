/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  
  FiHome, 
  FiUser, 

  FiDollarSign, 
  
  
  FiBriefcase,
  FiPlusCircle,
  FiBell,
  FiSearch
} from "react-icons/fi";

export default function InfluencerNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Check initial size
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 p-3 md:p-4 flex justify-between items-center">
        {/* Left side - Menu button and logo */}
        <div className="flex items-center space-x-3 md:space-x-4">
          
          <Link href="/" className="text-lg md:text-xl font-bold text-pink-600">
            TeenFluencer
          </Link>
        </div>

        {/* Center - Search (desktop only) */}
       

        {/* Right side - Icons and User button */}
        <div className="flex items-center space-x-3 md:space-x-4">
          <button className="relative p-1 md:p-2">
            <FiBell size={20} className="text-gray-700" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="hidden md:block">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </nav>

   

      {/* Bottom Navigation (Mobile only) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 md:hidden border-t">
        <div className="grid grid-cols-5">
          <MobileNavItem href="/" icon={<FiHome size={20} />} text="Home" />
          <MobileNavItem href="/campaigns" icon={<FiBriefcase size={20} />} text="Campaigns" />
          <MobileNavItem 
            href="/apply" 
            icon={<FiPlusCircle size={24} />} 
            text="Apply"
            isHighlighted 
          />
          <MobileNavItem href="/earnings" icon={<FiDollarSign size={20} />} text="Earnings" />
          <MobileNavItem href="/profile" icon={<FiUser size={20} />} text="Profile" />
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}

function NavItem({ href, icon, text }: { href: string; icon: React.ReactNode; text: string }) {
  return (
    <Link
      href={href}
      className="flex items-center px-6 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
    >
      <span className="mr-3">{icon}</span>
      <span className="text-sm">{text}</span>
    </Link>
  );
}

function MobileNavItem({ 
  href, 
  icon, 
  text, 
  isHighlighted = false 
}: { 
  href: string; 
  icon: React.ReactNode; 
  text: string;
  isHighlighted?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center py-2 text-xs ${isHighlighted ? 'text-pink-600' : 'text-gray-600'}`}
    >
      <div className={`p-2 ${isHighlighted ? 'bg-pink-100 rounded-full' : ''}`}>
        {icon}
      </div>
      <span>{text}</span>
    </Link>
  );
}