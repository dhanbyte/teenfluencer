import React from 'react';

const InfluencerHub = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Navigation */}
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

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Connect <span className="text-purple-600">Influencers</span> & <span className="text-blue-600">Brands</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
            The ultimate platform to bridge the gap between talented influencers and innovative brands. Create meaningful partnerships that drive results.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10">
              I'm an Influencer
            </button>
            <button className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 md:py-4 md:text-lg md:px-10">
              I'm a Brand
            </button>
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
              We provide the best tools to connect and grow your influencer marketing campaigns.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature Card 1 */}
            <div className="pt-6">
              <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full">
                <div className="-mt-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white mx-auto">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 text-center">Smart Matching</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Our AI-powered algorithm matches influencers with brands based on audience, niche, and engagement rates for perfect partnerships.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div className="pt-6">
              <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full">
                <div className="-mt-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white mx-auto">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 text-center">Secure Payments</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Protected payment system ensures both parties get paid fairly and on time for successful collaborations with escrow protection.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Card 3 */}
            <div className="pt-6">
              <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full">
                <div className="-mt-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white mx-auto">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 text-center">Analytics Dashboard</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Track campaign performance with detailed analytics and insights to optimize future collaborations and measure ROI effectively.
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
                <img className="w-12 h-12 rounded-full mr-4" src="https://randomuser.me/api/portraits/women/32.jpg" alt="Testimonial" />
                <div>
                  <h4 className="text-lg font-semibold">Sarah Johnson</h4>
                  <p className="text-purple-600">Fashion Influencer</p>
                </div>
              </div>
              <p className="text-gray-600">
                "InfluencerHub helped me connect with amazing brands that align with my audience. The platform is so easy to use and the payment system is reliable."
              </p>
            </div>

            {/* Testimonial Card 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img className="w-12 h-12 rounded-full mr-4" src="https://randomuser.me/api/portraits/men/45.jpg" alt="Testimonial" />
                <div>
                  <h4 className="text-lg font-semibold">Michael Chen</h4>
                  <p className="text-purple-600">Marketing Director</p>
                </div>
              </div>
              <p className="text-gray-600">
                "We've found incredible influencers through InfluencerHub. The analytics dashboard gives us clear insights into campaign performance."
              </p>
            </div>

            {/* Testimonial Card 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img className="w-12 h-12 rounded-full mr-4" src="https://randomuser.me/api/portraits/women/68.jpg" alt="Testimonial" />
                <div>
                  <h4 className="text-lg font-semibold">Emma Rodriguez</h4>
                  <p className="text-purple-600">Beauty Influencer</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The smart matching system connected me with brands I wouldn't have found otherwise. My collaborations have doubled since joining!"
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
            Join thousands of influencers and brands already growing their businesses with InfluencerHub.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10">
              Contact Us
            </button>
            <button className="px-8 py-3 border border-purple-600 text-base font-medium rounded-md text-purple-700 hover:bg-purple-50 md:py-4 md:text-lg md:px-10">
              Get Help
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Platform</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Features</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-base text-gray-300 hover:text-white">About</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Privacy</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Terms</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Connect</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Twitter</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Instagram</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-base text-gray-400">© 2023 InfluencerHub. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InfluencerHub;