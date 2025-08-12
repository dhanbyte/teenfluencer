"use client";
import Link from "next/link";

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function PublicNavbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-blue-600 text-white sticky top-0 z-50 shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold">MyApp</Link>
                    
                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6">
                        <Link href="/about" className="hover:underline py-2 px-3 rounded hover:bg-blue-700 transition">About</Link>
                        <Link href="/services" className="hover:underline py-2 px-3 rounded hover:bg-blue-700 transition">Services</Link>
                        <Link href="/blog" className="hover:underline py-2 px-3 rounded hover:bg-blue-700 transition">Blog</Link>
                        <Link href="/help" className="hover:underline py-2 px-3 rounded hover:bg-blue-700 transition">Help</Link>
                        <Link href="/contact" className="hover:underline py-2 px-3 rounded hover:bg-blue-700 transition">Contact</Link>
                    </div>
                    
                    {/* Mobile Menu Button */}
                    <button 
                        className="md:hidden focus:outline-none" 
                        onClick={() => setIsOpen(!isOpen)} 
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
                
                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden pb-4">
                        <div className="flex flex-col space-y-2 mt-2">
                            <Link 
                                href="/about" 
                                className="hover:underline py-2 px-3 rounded hover:bg-blue-700 transition" 
                                onClick={() => setIsOpen(false)}
                            >
                                About
                            </Link>
                            <Link 
                                href="/services" 
                                className="hover:underline py-2 px-3 rounded hover:bg-blue-700 transition" 
                                onClick={() => setIsOpen(false)}
                            >
                                Services
                            </Link>
                            <Link 
                                href="/blog" 
                                className="hover:underline py-2 px-3 rounded hover:bg-blue-700 transition" 
                                onClick={() => setIsOpen(false)}
                            >
                                Blog
                            </Link>
                            <Link 
                                href="/help" 
                                className="hover:underline py-2 px-3 rounded hover:bg-blue-700 transition" 
                                onClick={() => setIsOpen(false)}
                            >
                                Help
                            </Link>
                            <Link 
                                href="/contact" 
                                className="hover:underline py-2 px-3 rounded hover:bg-blue-700 transition" 
                                onClick={() => setIsOpen(false)}
                            >
                                Contact
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}