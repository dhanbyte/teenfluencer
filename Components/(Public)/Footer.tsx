/* eslint-disable @next/next/no-html-link-for-pages */
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-800 via-purple-800 to-indigo-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Teenfluensers</h2>
            <p className="text-sm text-gray-300">
              Inspiring the next generation with creativity, passion, and innovation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/about" className="hover:text-white transition">About</a></li>
              <li><a href="/services" className="hover:text-white transition">Services</a></li>
              <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-300">Email: support@teenfluensers.com</p>
            <p className="text-gray-300">Phone: +91 98765 43210</p>
            <p className="text-gray-300">Location: Mumbai, India</p>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition">
                <FaFacebookF />
              </a>
              <a href="#" className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition">
                <FaTwitter />
              </a>
              <a href="#" className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition">
                <FaInstagram />
              </a>
              <a href="#" className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition">
                <FaLinkedinIn />
              </a>
              <a href="#" className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition">
                <FaYoutube />
              </a>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/20 my-6"></div>

        {/* Bottom Section */}
        <div className="text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Teenfluensers. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
