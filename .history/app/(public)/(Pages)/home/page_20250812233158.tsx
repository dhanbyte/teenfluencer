/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function PublicHomePage() {
      const { isSignedIn } = useUser();
  const router = useRouter();
  const clerk = useClerk();


   const handleInfluencerClick = () => {
    if (isSignedIn) {
      router.push("/influencer");
    } else {
      // Clerk ke hosted sign-in modal open karo
      clerk.openSignIn();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Navigation */}

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Connect <span className="text-purple-600">Influencers</span> &{" "}
            <span className="text-blue-600">Brands</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
            The ultimate platform to bridge the gap between talented influencers
            and innovative brands. Create meaningful partnerships that drive
            results.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
           <Link href="/influencer">
        <button 
                      onClick={handleInfluencerClick}

        className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10">
          I&apos;m an Influencer
        </button>
      </Link>

      <Link href="/brand">
        <button className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 md:py-4 md:text-lg md:px-10">
          I&apos;m a Brand
        </button>
      </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Choose <span className="text-purple-600">InfluencerHub</span>?
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              We provide the best tools to connect and grow your influencer
              marketing campaigns.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature Card 1 */}
            <div className="pt-6">
              <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full">
                <div className="-mt-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white mx-auto">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 text-center">
                    Smart Matching
                  </h3>
                  <p className="mt-5 text-base text-gray-500">
                    Our AI-powered algorithm matches influencers with brands
                    based on audience, niche, and engagement rates for perfect
                    partnerships.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div className="pt-6">
              <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full">
                <div className="-mt-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white mx-auto">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 text-center">
                    Secure Payments
                  </h3>
                  <p className="mt-5 text-base text-gray-500">
                    Protected payment system ensures both parties get paid
                    fairly and on time for successful collaborations with escrow
                    protection.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Card 3 */}
            <div className="pt-6">
              <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full">
                <div className="-mt-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white mx-auto">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 text-center">
                    Analytics Dashboard
                  </h3>
                  <p className="mt-5 text-base text-gray-500">
                    Track campaign performance with detailed analytics and
                    insights to optimize future collaborations and measure ROI
                    effectively.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
            Success <span className="text-purple-600">Stories</span>
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Testimonial Card 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img
                  className="w-12 h-12 rounded-full mr-4"
                  src="https://randomuser.me/api/portraits/women/32.jpg"
                  alt="Testimonial"
                />
                <div>
                  <h4 className="text-lg font-semibold">Sarah Johnson</h4>
                  <p className="text-purple-600">Fashion Influencer</p>
                </div>
              </div>
              <p className="text-gray-600">
                &#34;InfluencerHub helped me connect with amazing brands that
                align with my audience. The platform is so easy to use and the
                payment system is reliable.&#34;
              </p>
            </div>

            {/* Testimonial Card 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img
                  className="w-12 h-12 rounded-full mr-4"
                  src="https://randomuser.me/api/portraits/men/45.jpg"
                  alt="Testimonial"
                />
                <div>
                  <h4 className="text-lg font-semibold">Michael Chen</h4>
                  <p className="text-purple-600">Marketing Director</p>
                </div>
              </div>
              <p className="text-gray-600">
                We have found incredible influencers through InfluencerHub. The
                analytics dashboard gives us clear insights into campaign
                performance.
              </p>
            </div>

            {/* Testimonial Card 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img
                  className="w-12 h-12 rounded-full mr-4"
                  src="https://randomuser.me/api/portraits/women/68.jpg"
                  alt="Testimonial"
                />
                <div>
                  <h4 className="text-lg font-semibold">Emma Rodriguez</h4>
                  <p className="text-purple-600">Beauty Influencer</p>
                </div>
              </div>
              <p className="text-gray-600">
                The smart matching system connected me with brands I
                wouldn&lsquo;t have found otherwise. My collaborations have
                doubled since joining!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Ready to <span className="text-purple-600">Get Started</span>?
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Join thousands of influencers and brands already growing their
            businesses with InfluencerHub.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="contact"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10"
            >
              Contact Us
            </Link>

            <Link
              href="help"
              className="px-8 py-3 border border-purple-600 text-base font-medium rounded-md text-purple-700 hover:bg-purple-50 md:py-4 md:text-lg md:px-10"
            >
              Get Help
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicHomePage;
