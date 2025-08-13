"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Home, Phone, HelpCircle, Menu, LogOut, User } from "lucide-react";
import { UserButton, useUser, SignOutButton } from "@clerk/nextjs";

export default function ResponsiveNavbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const { user } = useUser();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/contact", label: "Contact", icon: Phone },
    { href: "/help", label: "Help", icon: HelpCircle },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col justify-between bg-white shadow-lg w-20 fixed left-0 top-0 bottom-0 border-r">
        <div className="flex flex-col items-center mt-6 space-y-6">
          {/* Logo */}
          <div className="w-10 h-10 bg-black rounded-full"></div>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <item.icon
                size={24}
                className="text-gray-500 hover:text-black transition-colors"
              />
            </Link>
          ))}
        </div>
        <div className="flex flex-col items-center mb-6 space-y-6">
          <Bell
            size={24}
            className="text-gray-500 hover:text-black transition-colors cursor-pointer"
          />
          <UserButton afterSignOutUrl="/" />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-20">
        {/* Top Navbar */}
        <header className="flex items-center justify-between px-4 py-3 bg-white border-b shadow-sm sticky top-0 z-50">
          {/* Mobile: Logo */}
          <div className="lg:hidden w-10 h-10 bg-black rounded-full"></div>

          {/* Desktop: Title */}
          <div className="hidden lg:block font-semibold text-lg">Brand Name</div>

          <div className="flex items-center space-x-4">
            <button className="hidden lg:block px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
              Manage
            </button>
            <Bell
              size={24}
              className="text-gray-500 hover:text-black transition-colors cursor-pointer"
            />
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>

        {/* Main Page Content Placeholder */}
        <main className="flex-1 p-6 bg-gray-50">
          <h1 className="text-2xl font-bold">Main Content Area</h1>
          <p className="text-gray-600">Your influencer page content will be here...</p>
        </main>
      </div>

      {/* Mobile Bottom Navbar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-inner lg:hidden flex justify-around py-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <div className="flex flex-col items-center text-gray-500 hover:text-black transition">
              <item.icon size={22} />
              <span className="text-xs">{item.label}</span>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
}
