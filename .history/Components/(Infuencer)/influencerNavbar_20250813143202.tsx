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
  FiBell
} from "react-icons/fi";

export default function InfluencerNavbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 p-3 flex justify-between items-center">
        {/* Left side - Menu button and logo */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={toggleSidebar}
            className="lg:hidden text-gray-700 focus:outline-none"
          >
            {isSidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
          <Link href="/" className="text-lg font-bold text-pink-600">
            TeenFluencer
          </Link>
        </div>

        {/* Right side - Icons */}
        <div className="flex items-center space-x-4">
          <button className="relative">
            <FiBell size={18} className="text-gray-700" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="hidden lg:block">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-40 transition-all duration-300 ease-in-out 
          ${isMobileView ? (isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full") : "translate-x-0 w-64"}
          lg:translate-x-0 lg:w-64`}
      >
        <div className="h-full pt-16 pb-4 overflow-y-auto">
          {/* User Info (desktop only) */}
          <div className="hidden lg:flex flex-col items-center p-4 border-b">
            <UserButton afterSignOutUrl="/" />
            <p className="font-medium mt-2">{user?.fullName || "User"}</p>
            <p className="text-xs text-gray-500">Influencer</p>
          </div>

          {/* Navigation Links */}
          <nav className="mt-4">
            <NavItem href="/" icon={<FiHome size={18} />} text="Home" />
            <NavItem href="/campaigns" icon={<FiBriefcase size={18} />} text="Campaigns" />
            <NavItem href="/apply" icon={<FiPlusCircle size={18} />} text="Apply" />
            <NavItem href="/earnings" icon={<FiDollarSign size={18} />} text="Earnings" />
            <NavItem href="/profile" icon={<FiUser size={18} />} text="Profile" />
            <NavItem href="/messages" icon={<FiMessageSquare size={18} />} text="Messages" />
            <NavItem href="/settings" icon={<FiSettings size={18} />} text="Settings" />
            
            {/* Logout Button (mobile only) */}
            <div className="lg:hidden px-6 py-3">
              <SignOutButton>
                <button className="flex items-center w-full text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors">
                  <FiLogOut size={18} className="mr-3" />
                  <span className="text-sm">Logout</span>
                </button>
              </SignOutButton>
            </div>
          </nav>
        </div>
      </div>

      {/* Bottom Navigation (mobile only) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 lg:hidden border-t">
        <div className="grid grid-cols-5">
          <MobileNavItem href="/" icon={<FiHome size={18} />} text="Home" />
          <MobileNavItem href="/campaigns" icon={<FiBriefcase size={18} />} text="Campaigns" />
          <MobileNavItem 
            href="/apply" 
            icon={<FiPlusCircle size={20} />} 
            text="Apply"
            isHighlighted 
          />
          <MobileNavItem href="/earnings" icon={<FiDollarSign size={18} />} text="Earnings" />
          <MobileNavItem href="/profile" icon={<FiUser size={18} />} text="Profile" />
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {isMobileView && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
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
      <div className={`p-1 ${isHighlighted ? 'bg-pink-100 rounded-full' : ''}`}>
        {icon}
      </div>
      <span>{text}</span>
    </Link>
  );
}