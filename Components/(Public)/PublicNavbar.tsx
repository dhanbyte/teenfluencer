"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function PublicNavbar() {
  const [isLaptop, setIsLaptop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLaptop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 px-4 py-3 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold text-gray-900">
        TeenFluencer
      </Link>

      {isLaptop && (
        <div className="flex items-center gap-6">
          <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-600">About</Link>
          <Link href="/apply" className="btn-primary">Apply Now</Link>
        </div>
      )}

      <div className="flex items-center gap-3">
        <Link href="/sign-in" className="btn-secondary">Sign In</Link>
        <Link href="/sign-up" className="btn-primary">Sign Up</Link>
      </div>
    </nav>
  );
}