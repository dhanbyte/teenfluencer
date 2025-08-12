   "use client";
   import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FiMenu, FiX, FiHome, FiUser, FiSettings, FiDollarSign, FiMessageSquare } from "react-icons/fi";

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
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 p-4 flex justify-between items-center">
        {/* Left side - Menu button and logo */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleSidebar}
            className="md:hidden text-gray-700 focus:outline-none"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <Link href="/" className="text-xl font-bold text-pink-600">
            TeenFluencer
          </Link>
        </div>

        {/* Right side - User button */}
        <div className="flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </nav>

      {/* Slide-out Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-40 transition-all duration-300 ease-in-out 
          ${isOpen ? "translate-x-0 w-64" : "-translate-x-full w-0"} 
          md:translate-x-0 md:w-64`}
      >
        <div className="h-full pt-16 pb-4 overflow-y-auto">
          {/* Clerk User Button in Sidebar (hidden on desktop) */}
          <div className="md:hidden p-4 flex justify-center">
            <UserButton afterSignOutUrl="/" />
          </div>

          {/* Navigation Links */}
          <nav className="mt-6">
            <NavItem href="/" icon={<FiHome size={isMobile ? 20 : 24} />} text="Home" />
            <NavItem href="/profile" icon={<FiUser size={isMobile ? 20 : 24} />} text="Profile" />
            <NavItem href="/earnings" icon={<FiDollarSign size={isMobile ? 20 : 24} />} text="Earnings" />
            <NavItem href="/messages" icon={<FiMessageSquare size={isMobile ? 20 : 24} />} text="Messages" />
            <NavItem href="/settings" icon={<FiSettings size={isMobile ? 20 : 24} />} text="Settings" />
          </nav>
        </div>
      </div>

      {/* Overlay for mobile */}
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
      <span className="text-sm md:text-base">{text}</span>
    </Link>
  );
}