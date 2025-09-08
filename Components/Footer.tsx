"use client";
import { Sparkles, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                TeenFluencer
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Transform your social media into earnings with premium product promotions. Join thousands of successful influencers today.
            </p>
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold text-green-400">₹2,50,000+</div>
              <div className="text-gray-400 text-sm">Paid to influencers</div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg">Quick Links</h4>
            <div className="space-y-3">
              <Link href="/" className="block text-gray-400 hover:text-purple-400 transition-colors duration-200 text-sm">
                Home
              </Link>
              <Link href="/about" className="block text-gray-400 hover:text-purple-400 transition-colors duration-200 text-sm">
                About Us
              </Link>
              <Link href="/sign-up" className="block text-gray-400 hover:text-purple-400 transition-colors duration-200 text-sm">
                Join Now
              </Link>
              <Link href="/sign-in" className="block text-gray-400 hover:text-purple-400 transition-colors duration-200 text-sm">
                Sign In
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg">Support</h4>
            <div className="space-y-3">
              <Link href="/help" className="block text-gray-400 hover:text-purple-400 transition-colors duration-200 text-sm">
                Help Center
              </Link>
              <Link href="/contact" className="block text-gray-400 hover:text-purple-400 transition-colors duration-200 text-sm">
                Contact Us
              </Link>
              <Link href="/privacy" className="block text-gray-400 hover:text-purple-400 transition-colors duration-200 text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-gray-400 hover:text-purple-400 transition-colors duration-200 text-sm">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg">Get in Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="h-4 w-4 text-purple-400" />
                support@teenfluencer.com
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="h-4 w-4 text-purple-400" />
                +91 98765 43210
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <MapPin className="h-4 w-4 text-purple-400" />
                Mumbai, India
              </div>
            </div>
            <div className="pt-4">
              <Link href="/admin/login" className="text-xs text-gray-500 hover:text-purple-400 transition-colors duration-200">
                Admin Access
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 TeenFluencer. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-gray-400 hover:text-purple-400 transition-colors duration-200 text-sm">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-purple-400 transition-colors duration-200 text-sm">
                Terms
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-gray-400 text-sm">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}