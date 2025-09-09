"use client";
import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Sparkles, Menu, X, User, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const { user, isSignedIn } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-lg border-b border-white/10 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              TeenFluencer
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-200">
              Home
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors duration-200">
              About
            </Link>
            <Link href="/help" className="text-gray-300 hover:text-white transition-colors duration-200">
              Help
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200">
              Contact
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isSignedIn ? (
              <div className="flex items-center gap-4">
                <Link href="/influencer" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200">
                  <User className="h-4 w-4" />
                  {user?.firstName}
                </Link>
                <Link href="/influencer" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200">
                  Dashboard
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/sign-in" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Sign In
                </Link>
                <Link href="/sign-up" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-white transition-colors duration-200"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-slate-800/95 backdrop-blur-lg border-t border-white/10 py-4">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-200 px-4">
                Home
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors duration-200 px-4">
                About
              </Link>
              <Link href="/help" className="text-gray-300 hover:text-white transition-colors duration-200 px-4">
                Help
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200 px-4">
                Contact
              </Link>
              <div className="border-t border-white/10 pt-4 px-4">
                {isSignedIn ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-300">
                      <User className="h-4 w-4" />
                      {user?.firstName}
                    </div>
                    <Link href="/influencer" className="block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-semibold text-center">
                      Dashboard
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link href="/sign-in" className="block text-gray-300 hover:text-white transition-colors duration-200">
                      Sign In
                    </Link>
                    <Link href="/sign-up" className="block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-semibold text-center">
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}