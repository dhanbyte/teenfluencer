"use client";
import { useUser, useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { WelcomeSection } from "@/components/dashboard/welcome-section"
import { ProfileCompletion } from "@/components/dashboard/profile-completion"
import { QuickStats } from "@/components/dashboard/quick-stats"
import { RecommendedCampaigns } from "@/components/dashboard/recommended-campaigns"
import { SocialPerformance } from "@/components/dashboard/social-performance"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { EarningsOverview } from "@/components/dashboard/earnings-overview"
import { FirstTimeUserTutorial } from "@/components/dashboard/first-time-tutorial"

function InfluencerHomePage() {
  const { isSignedIn } = useUser();
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      {/* First Time User Tutorial Popup */}
      <FirstTimeUserTutorial />

      {/* Main Dashboard Content */}
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Welcome Section with Animation */}
        <WelcomeSection />

        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            <ProfileCompletion />
            <EarningsOverview />
          </div>

          {/* Middle Column */}
          <div className="lg:col-span-1 space-y-6">
            <QuickStats />
            <RecentActivity />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1 space-y-6">
            <RecommendedCampaigns />
            <SocialPerformance />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfluencerHomePage;