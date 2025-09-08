"use client";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo/Title - Shows icon on small screens */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl mr-1">👋</span>
              <span className="hidden sm:inline text-xl font-bold text-purple-600">
                InfluencerHub
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - hidden on mobile */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              href="#"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600"
            >
              Home
            </Link>
            <Link
              href="#"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600"
            >
              Features
            </Link>
            <Link
              href="#"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600"
            >
              About
            </Link>
          </div>

          {/* Auth Buttons - changes size based on screen */}
          <div className="hidden md:flex items-center space-x-2">
            <button className="px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700">
              Login
            </button>
            <button className="px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md text-purple-600 border border-purple-600 hover:bg-purple-50">
              Sign Up
            </button>
          </div>

          {/* Mobile menu button - shows only on mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-purple-600 focus:outline-none"
            >
              {isOpen ? (
                <FaTimes className="h-5 w-5" />
              ) : (
                <FaBars className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - shows when hamburger is clicked */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"} bg-white pb-3`}>
        <div className="px-2 pt-2 space-y-1">
          <Link
            href="home"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50"
          >
            Home
          </Link>
          <Link
            href="services"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50"
          >
            Features
          </Link>
          <Link
            href="about"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50"
          >
            About
          </Link>
        </div>
        <div className="px-2 pt-2 space-y-1">
          <button className="w-full px-3 py-2 rounded-md text-base font-medium text-white bg-purple-600 hover:bg-purple-700">
            Login
          </button>
          <button className="w-full px-3 py-2 rounded-md text-base font-medium text-purple-600 border border-purple-600 hover:bg-purple-50">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}