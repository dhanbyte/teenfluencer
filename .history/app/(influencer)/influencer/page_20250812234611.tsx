"use client";
import { useUser, UserButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import React from "react";

function InfluencerPage() {
    const { isSignedIn, user } = useUser();
  const router = useRouter();

  if (!isSignedIn) {
    // Optional: Show loading state or redirect
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Grow Your Career as an <span className="text-purple-600">Influencer</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
            Join a network of top brands looking for talented voices like yours.
            Build partnerships, increase your reach, and monetize your audience.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10">
              Sign Up as Influencer
            </button>
            <Link
              href="/"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 md:py-4 md:text-lg md:px-10"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* You can paste the same Features, Testimonials, CTA sections here
          or customize text to focus on influencer benefits */}
    </div>
  );
}

export default InfluencerPage;
