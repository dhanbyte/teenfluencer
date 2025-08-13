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
  FiBell
} from "react-icons/fi";

export default function InfluencerNavbar() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 p-3 md:p-4 flex justify-between items-center">
        {isMobile ? (
          <>
            {/* Left - Home */}
            <Link href="/" className="flex items-center space-x-1 text-gray-700 hover:text-pink-600">
              <FiHome size={20} />
              <span className="text-sm font-medium">Home</span>
            </Link>

            {/* Center - Logo */}
            <Link href="/" className="text-lg font-bold text-black">
              TeenFluencer
            </Link>

            {/* Right - Notification + Profile */}
            <div className="flex items-center space-x-3">
              <button className="relative p-1">
                <FiBell size={20} className="text-gray-700" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <UserButton afterSignOutUrl="/" />
            </div>
          </>
        ) : (
          // Desktop navbar
          <>
            {/* Left side - Logo */}
            <Link href="/" className="text-xl font-bold text-black">
              TeenFluencer
            </Link>

            {/* Right side - Notification + Profile */}
            <div className="flex items-center space-x-3">
              <button className="relative p-1 md:p-2">
                <FiBell size={20} className="text-gray-700" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <UserButton afterSignOutUrl="/" />
            </div>
          </>
        )}
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
    </>
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
      className={`flex flex-col items-center py-2 text-xs ${isHighlighted ? "text-pink-600" : "text-gray-600"}`}
    >
      <div className={`p-2 ${isHighlighted ? "bg-pink-100 rounded-full" : ""}`}>
        {icon}
      </div>
      <span>{text}</span>
    </Link>
  );
}
