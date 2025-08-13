// File: components/InfluencerLayout.jsx

"use client";

import { UserButton, useUser, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  FiMenu, FiX, FiHome, FiUser, FiSettings, FiDollarSign, 
  FiMessageSquare, FiLogOut, FiBriefcase, FiPlusCircle, FiBell, FiSearch
} from "react-icons/fi";
import { usePathname } from 'next/navigation';

// --- Navigation Links Data ---
// Define links here for easy management.
// The paths MUST match your folder structure inside the `app` directory.
const navItems = [
  { href: "/influencer", icon: <FiHome size={22} />, text: "Home" },
  { href: "/influencer/campaigns", icon: <FiBriefcase size={22} />, text: "Campaigns" },
  { href: "/influencer/apply", icon: <FiPlusCircle size={22} />, text: "Apply", isMobileHighlighted: true },
  { href: "/influencer/earnings", icon: <FiDollarSign size={22} />, text: "Earnings" },
  { href: "/influencer/profile", icon: <FiUser size={22} />, text: "Profile" },
];

const secondaryNavItems = [
    { href: "/influencer/messages", icon: <FiMessageSquare size={22} />, text: "Messages" },
    { href: "/influencer/settings", icon: <FiSettings size={22} />, text: "Settings" },
];

// --- Main Layout Component ---
export default function InfluencerLayout({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Effect to detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  // Dynamic classes for the main content area to prevent overlap with navbars
  const mainContentClasses = `
    transition-all duration-300 ease-in-out
    pt-20  
    ${isMobile ? 'pb-24' : ''} 
    ${!isMobile && (isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64')}
  `;

  return (
    <div className="min-h-screen">
      <TopNavbar 
        isMobile={isMobile}
        onToggleSidebar={toggleSidebar}
        isSidebarCollapsed={isSidebarCollapsed}
      />
      
      {!isMobile && <DesktopSidebar isCollapsed={isSidebarCollapsed} />}
      {isMobile && <BottomNavbar />}

      <main className={mainContentClasses}>
        <div className="p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

// --- Top Navbar Component ---
function TopNavbar({ isMobile, onToggleSidebar, isSidebarCollapsed }) {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 p-3 md:p-4 flex justify-between items-center">
      <div className="flex items-center space-x-3 md:space-x-4">
        {!isMobile && (
          <button onClick={onToggleSidebar} className="text-gray-700 p-2 rounded-full hover:bg-gray-100 focus:outline-none">
            {isSidebarCollapsed ? <FiMenu size={24} /> : <FiX size={24} />}
          </button>
        )}
        <Link href="/influencer" className="text-lg md:text-xl font-bold text-pink-600">
          TeenFluencer
        </Link>
      </div>

      <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-1/3 max-w-sm">
        <FiSearch className="text-gray-500 mr-2" />
        <input type="text" placeholder="Search..." className="bg-transparent outline-none w-full text-sm" />
      </div>

      <div className="flex items-center space-x-3 md:space-x-4">
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <FiBell size={20} className="text-gray-700" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
}

// --- Desktop Sidebar Component ---
function DesktopSidebar({ isCollapsed }) {
  const { user } = useUser();
  return (
    <aside className={`fixed top-0 left-0 h-full bg-white shadow-lg z-40 transition-all duration-300 ease-in-out pt-20 hidden md:flex md:flex-col justify-between ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div>
        <div className={`p-4 border-b ${isCollapsed ? 'mx-auto' : ''}`}>
          <div className={`flex items-center space-x-3 ${isCollapsed ? 'justify-center' : ''}`}>
            <UserButton afterSignOutUrl="/" />
            {!isCollapsed && (
              <div>
                <p className="font-medium whitespace-nowrap">{user?.fullName || "User"}</p>
                <p className="text-xs text-gray-500">Influencer</p>
              </div>
            )}
          </div>
        </div>
        <nav className="mt-4 space-y-2">
          {navItems.map(item => <SidebarNavItem key={item.href} {...item} isCollapsed={isCollapsed} />)}
          <div className="px-4 py-2"><hr/></div>
          {secondaryNavItems.map(item => <SidebarNavItem key={item.href} {...item} isCollapsed={isCollapsed} />)}
        </nav>
      </div>
      <div className="p-4 border-t">
        <SignOutButton>
          <button className={`flex items-center w-full text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md p-3 transition-colors ${isCollapsed ? 'justify-center' : ''}`}>
            <FiLogOut size={22} />
            {!isCollapsed && <span className="text-sm ml-4 font-medium">Logout</span>}
          </button>
        </SignOutButton>
      </div>
    </aside>
  );
}

function SidebarNavItem({ href, icon, text, isCollapsed }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link href={href} className={`flex items-center mx-4 py-3 px-3 rounded-lg transition-colors group relative ${isActive ? 'bg-pink-100 text-pink-600' : 'text-gray-700 hover:bg-pink-50 hover:text-pink-600'}`}>
      {icon}
      {!isCollapsed && <span className="ml-4 text-sm font-medium">{text}</span>}
      {isCollapsed && (
        <span className="absolute left-full ml-4 w-auto p-2 min-w-max rounded-md shadow-md bg-gray-800 text-white text-xs font-bold transition-all duration-100 scale-0 origin-left group-hover:scale-100 z-50">
          {text}
        </span>
      )}
    </Link>
  );
}

// --- Mobile Bottom Navbar Component ---
function BottomNavbar() {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-top z-50 md:hidden border-t">
      <div className="grid grid-cols-5">
        {navItems.map(item => {
           const isActive = pathname === item.href;
           return (
             <Link key={item.href} href={item.href} className={`flex flex-col items-center justify-center pt-2 pb-1 text-xs ${isActive ? 'text-pink-600' : 'text-gray-600'}`}>
                <div className={`p-2 rounded-full mb-1 transition-colors ${item.isMobileHighlighted && !isActive ? 'bg-pink-100 text-pink-600' : ''} ${isActive ? 'bg-pink-100' : ''}`}>
                  {React.cloneElement(item.icon, { size: item.isMobileHighlighted ? 24 : 20 })}
                </div>
                <span className="font-medium">{item.text}</span>
            </Link>
           )
        })}
      </div>
    </div>
  );
}