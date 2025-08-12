"use client";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useUser, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn } = useUser();
  const router = useRouter();

  const handleAuthClick = (userType: 'influencer' | 'client') => {
    if (isSignedIn) {
      router.push(`/${userType}/dashboard`);
    } else {
      router.push(`/sign-in?redirect_url=/${userType}/dashboard`);
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl mr-1">👋</span>
              <span className="hidden sm:inline text-xl font-bold text-purple-600">
                InfluencerHub
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600">
              Home
            </Link>
            <Link href="/services" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600">
              Features
            </Link>
            <Link href="/about" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600">
              About
            </Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            {isSignedIn ? (
              <div className="flex items-center space-x-4">
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <>
                <button
                  onClick={() => handleAuthClick('influencer')}
                  className="px-3 py-1.5 text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                >
                  Im an Influencer
                </button>
                <button
                  onClick={() => handleAuthClick('client')}
                  className="px-3 py-1.5 text-sm font-medium rounded-md text-purple-600 border border-purple-600 hover:bg-purple-50"
                >
                  Im a Client
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-purple-600 focus:outline-none"
            >
              {isOpen ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"} bg-white pb-3`}>
        <div className="px-2 pt-2 space-y-1">
          <Link href="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50">
            Home
          </Link>
          <Link href="/services" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50">
            Features
          </Link>
          <Link href="/about" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50">
            About
          </Link>
        </div>
        <div className="px-2 pt-2 space-y-1">
          {isSignedIn ? (
            <div className="flex justify-center">
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <>
              <button
                onClick={() => handleAuthClick('influencer')}
                className="w-full px-3 py-2 rounded-md text-base font-medium text-white bg-purple-600 hover:bg-purple-700"
              >
                Im an Influencer
              </button>
              <button
                onClick={() => handleAuthClick('client')}
                className="w-full px-3 py-2 rounded-md text-base font-medium text-purple-600 border border-purple-600 hover:bg-purple-50"
              >
                Im a Client
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}