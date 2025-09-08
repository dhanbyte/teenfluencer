"use client";
import Link from "next/link";

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function PublicNavbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-blue-600 text-white sticky top-0 z-50 shadow-md">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex-shrink-0 flex items-center">
                            <h1 className="text-xl font-bold text-purple-600">InfluencerHub</h1>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-center space-x-4">
                                <a href="#" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600">Home</a>
                                <a href="#" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600">Features</a>
                                <a href="#" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600">About</a>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700">
                                Login
                            </button>
                            <button className="px-4 py-2 border border-purple-600 text-sm font-medium rounded-md text-purple-600 hover:bg-purple-50">
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </nav>
    );
}