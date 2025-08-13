"use client";

import { UserButton, useUser, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  FiMenu, 
  FiX, 
  FiHome, 
  FiUser, 
  FiSettings, 
  FiDollarSign, 
  FiMessageSquare,
  FiLogOut,
  FiBriefcase,
  FiPlusCircle,
  FiBell,
  FiSearch
} from "react-icons/fi";

export default function InfluencerNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useUser();

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
          <button 
            onClick={toggleSidebar}
            className="md:hidden text-gray-700 focus:outline-none"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <Link href="/" className="text-lg md:text-xl font-bold text-pink-600">
            TeenFluencer
          </Link>
        </div>

        {/* Center - Search (desktop only) */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-1/3">
          <FiSearch className="text-gray-500 mr-2" />
          <input 
            type="text" 
            placeholder="Search campaigns..." 
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>

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

      {/* Slide-out Sidebar (Mobile) */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-40 transition-all duration-300 ease-in-out 
          ${isOpen ? "translate-x-0 w-64" : "-translate-x-full w-0"} 
          md:hidden`}
      >
        <div className="h-full pt-16 pb-4 overflow-y-auto">
          {/* User Info */}
          <div className="p-4 border-b">
            <div className="flex items-center space-x-3">
              <UserButton afterSignOutUrl="/" />
              <div>
                <p className="font-medium">{user?.fullName || "User"}</p>
                <p className="text-xs text-gray-500">Influencer</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-4">
            <NavItem href="/" icon={<FiHome size={20} />} text="Home" />
            <NavItem href="/campaigns" icon={<FiBriefcase size={20} />} text="Campaigns" />
            <NavItem href="/apply" icon={<FiPlusCircle size={20} />} text="Apply" />
            <NavItem href="/earnings" icon={<FiDollarSign size={20} />} text="Earnings" />
            <NavItem href="/profile" icon={<FiUser size={20} />} text="Profile" />
            <NavItem href="/messages" icon={<FiMessageSquare size={20} />} text="Messages" />
            <NavItem href="/settings" icon={<FiSettings size={20} />} text="Settings" />
            
            {/* Logout Button */}
            <div className="px-6 py-3">
              <SignOutButton>
                <button className="flex items-center w-full text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors">
                  <FiLogOut size={20} className="mr-3" />
                  <span className="text-sm">Logout</span>
                </button>
              </SignOutButton>
            </div>
          </nav>
        </div>
      </div>

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