"use client";
import { useUser, UserButton, useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from "next/link";

function InfluencerPage() {
  const { isSignedIn, user } = useUser();
  const { openSignUp } = useClerk();
  const router = useRouter();

  const handleSignUpClick = () => {
    if (isSignedIn) {
      router.push('/influencer');
    } else {
      openSignUp({
        afterSignUpUrl: '/influencer',
        afterSignInUrl: '/influencer'
      });
    }
  };

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
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
              <button
                onClick={handleSignUpClick}
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10"
              >
                {isSignedIn ? 'Go to Dashboard' : 'Sign Up as Influencer'}
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
      </div>
    );
  }

  // For signed-in users
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-end">
          <UserButton afterSignOutUrl="influencer" />
        </div>
        
        <div className="text-center mt-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Welcome, <span className="text-purple-600">{user?.firstName || 'Influencer'}</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
            Ready to find your next brand partnership?
          </p>
          
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {/* Dashboard Cards */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3">Your Profile</h3>
              <p className="text-gray-600 mb-4">
                Complete your profile to get more brand deals
              </p>
              <Link 
                href="/influencer/profile"
                className="text-purple-600 hover:text-purple-800 font-medium"
              >
                Edit Profile →
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3">Available Campaigns</h3>
              <p className="text-gray-600 mb-4">
                Browse brand campaigns looking for influencers
              </p>
              <Link 
                href="/influencer/campaigns"
                className="text-purple-600 hover:text-purple-800 font-medium"
              >
                View Campaigns →
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3">Your Analytics</h3>
              <p className="text-gray-600 mb-4">
                Track your performance and earnings
              </p>
              <Link 
                href="/influencer/analytics"
                className="text-purple-600 hover:text-purple-800 font-medium"
              >
                View Analytics →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfluencerPage;