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
  FiSearch,
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
        {/* Left - Logo & Brand Name */}
        <div className="flex items-center space-x-2">
          {/* Logo */}
          <img
            src="/logo.png" // change to your logo file
            alt="Logo"
            className="w-8 h-8 rounded-full object-cover"
          />
          {/* Brand Name */}
          <Link href="/" className="text-lg md:text-xl font-bold text-pink-600">
            TeenFluencer
          </Link>
        </div>

        {/* Right - Buttons */}
        <div className="flex items-center space-x-3 md:space-x-4">
          {/* Search Icon */}
          <button className="p-1 md:p-2">
            <FiSearch size={20} className="text-gray-700" />
          </button>

          {/* Notification Icon */}
          <button className="relative p-1 md:p-2">
            <FiBell size={20} className="text-gray-700" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile / Clerk UserButton */}
          {isMobile ? (
            <Link href="/profile">
              <FiUser size={22} className="text-gray-700" />
            </Link>
          ) : (
            <UserButton afterSignOutUrl="/" />
          )}
        </div>
      </nav>

      {/* Bottom Navigation (Mobile only) */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 border-t">
          <div className="grid grid-cols-5">
            <MobileNavItem href="/" icon={<FiHome size={20} />} text="Home" />
            <MobileNavItem
              href="/campaigns"
              icon={<FiBriefcase size={20} />}
              text="Campaigns"
            />
            <MobileNavItem
              href="/apply"
              icon={<FiPlusCircle size={24} />}
              text="Apply"
              isHighlighted
            />
            <MobileNavItem
              href="/earnings"
              icon={<FiDollarSign size={20} />}
              text="Earnings"
            />
            <MobileNavItem
              href="/profile"
              icon={<FiUser size={20} />}
              text="Profile"
            />
          </div>
        </div>
      )}
    </>
  );
}

function MobileNavItem({
  href,
  icon,
  text,
  isHighlighted = false,
}: {
  href: string;
  icon: React.ReactNode;
  text: string;
  isHighlighted?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center py-2 text-xs ${
        isHighlighted ? "text-pink-600" : "text-gray-600"
      }`}
    >
      <div className={`p-2 ${isHighlighted ? "bg-pink-100 rounded-full" : ""}`}>
        {icon}
      </div>
      <span>{text}</span>
    </Link>
  );
}
