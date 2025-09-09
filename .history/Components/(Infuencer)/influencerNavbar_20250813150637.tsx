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
  const [isLaptop, setIsLaptop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLaptop(window.innerWidth >= 1024); // lg breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 px-4 py-3 flex items-center justify-between transition-all duration-300">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold text-black hover:text-pink-600 transition-colors duration-200"
        >
          TeenFluencer
        </Link>

        {isLaptop ? (
          <>
            {/* Center nav links (Laptop/Desktop) */}
            <div className="flex items-center space-x-6">
              <NavItem href="/" icon={<FiHome size={18} />} text="Home" />
              <NavItem href="/help" text="Help" />
              <NavItem href="/explore" text="Explore" />
              <NavItem
                href="/campaigns"
                icon={<FiBriefcase size={18} />}
                text="Campaigns"
              />
              <NavItem
                href="/apply"
                icon={<FiPlusCircle size={20} />}
                text="Apply"
                highlight
              />
              <NavItem
                href="/earnings"
                icon={<FiDollarSign size={18} />}
                text="Earnings"
              />
              <NavItem
                href="/profile"
                icon={<FiUser size={18} />}
                text="Profile"
              />
            </div>

            {/* Right - Notifications + Profile */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-full transition">
                <FiBell size={20} className="text-gray-700" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <UserButton afterSignOutUrl="/" />
            </div>
          </>
        ) : (
          <>
            {/* Right side (Mobile/Tablet) */}
            <div className="flex items-center space-x-3">
              <button className="relative p-2 hover:bg-gray-100 rounded-full transition">
                <FiBell size={20} className="text-gray-700" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <UserButton afterSignOutUrl="/" />
            </div>
          </>
        )}
      </nav>

      {/* Bottom Navigation (Mobile/Tablet only) */}
      {!isLaptop && (
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

/* Reusable Nav Item (Top Navbar) */
function NavItem({
  href,
  icon,
  text,
  highlight = false
}: {
  href: string;
  icon?: React.ReactNode;
  text: string;
  highlight?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-all duration-200 ${
        highlight
          ? "bg-pink-100 text-pink-600 hover:bg-pink-200"
          : "text-gray-700 hover:text-pink-600 hover:bg-gray-100"
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{text}</span>
    </Link>
  );
}

/* Mobile Bottom Nav Item */
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
      className={`flex flex-col items-center py-2 text-xs transition-colors duration-200 ${
        isHighlighted ? "text-pink-600" : "text-gray-600 hover:text-pink-600"
      }`}
    >
      <div
        className={`p-2 transition-all duration-200 ${
          isHighlighted ? "bg-pink-100 rounded-full" : ""
        }`}
      >
        {icon}
      </div>
      <span>{text}</span>
    </Link>
  );
}
