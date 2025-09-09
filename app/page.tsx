"use client";
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { DollarSign, Users, TrendingUp, ArrowRight, Star, Target, Sparkles, Shield, Zap, Gift } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const { user, isSignedIn } = useUser();
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    setTimeout(() => setIsVisible(true), 100);
  }, []);
  
  if (!mounted) return null;

  const handleStartEarning = () => {
    if (isSignedIn) {
      window.location.href = '/influencer';
    } else {
      window.location.href = '/sign-up';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Hero Section */}
        <div className={`text-center mb-20 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-8 animate-bounce shadow-2xl">
              <Sparkles className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              TeenFluencer
            </h1>
            <div className="h-2 w-40 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mb-8"></div>
          </div>
          <p className="text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Transform your social media into a 
            <span className="font-bold text-purple-400"> money-making machine</span>. 
            Promote premium products and earn 
            <span className="font-black text-green-400"> 8% commission</span> instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={handleStartEarning}
              className="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/50"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></span>
              <span className="relative flex items-center gap-3">
                {isSignedIn ? `Welcome back, ${user?.firstName}!` : 'Start Earning Now'}
                <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            {!isSignedIn && (
              <Link href="/sign-in" className="px-10 py-5 text-xl font-semibold text-gray-300 border-2 border-gray-600 rounded-full hover:border-purple-500 hover:text-white hover:bg-purple-500/10 transition-all duration-300">
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Features Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          {[
            {
              icon: DollarSign,
              title: "Earn 8% Commission",
              desc: "Get paid instantly for every sale you generate through your unique referral links",
              gradient: "from-green-400 to-green-600"
            },
            {
              icon: Target,
              title: "Real-time Analytics",
              desc: "Monitor your clicks, conversions, and earnings with detailed analytics dashboard",
              gradient: "from-blue-400 to-blue-600"
            },
            {
              icon: Star,
              title: "Premium Products",
              desc: "Promote high-quality products from trusted brands with excellent conversion rates",
              gradient: "from-purple-400 to-purple-600"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 text-center group hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-xl">
              <div className={`p-4 bg-gradient-to-br ${feature.gradient} rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl`}>
                <feature.icon className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className={`text-center mb-20 ${isVisible ? 'animate-fade-in-delay' : 'opacity-0'}`}>
          <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-gray-300 mb-16 max-w-3xl mx-auto">
            Start earning in just 4 simple steps
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Sign Up Free', desc: 'Create your influencer account in seconds', icon: Users },
              { step: '2', title: 'Browse Products', desc: 'Choose from premium products to promote', icon: Gift },
              { step: '3', title: 'Share & Promote', desc: 'Share your unique links on social media', icon: Zap },
              { step: '4', title: 'Earn Commission', desc: 'Get 8% commission on every successful sale', icon: DollarSign }
            ].map((item, index) => (
              <div key={index} className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/15 hover:scale-105 transition-all duration-300 group">
                <div className="relative mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl group-hover:shadow-purple-500/50 transform group-hover:scale-110 transition-all duration-300">
                    <span className="text-white font-black text-3xl">{item.step}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-pink-400 to-red-400 rounded-full flex items-center justify-center">
                    <item.icon className="h-4 w-4 text-white" />
                  </div>
                </div>
                <h4 className="font-bold mb-4 text-white text-xl">{item.title}</h4>
                <p className="text-gray-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className={`bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-12 mb-20 text-center ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <h3 className="text-3xl font-bold text-white mb-8">Join Thousands of Successful Influencers</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group">
              <div className="text-4xl font-black text-green-400 mb-2 group-hover:scale-110 transition-transform duration-300">₹2,50,000+</div>
              <div className="text-gray-300">Total Earnings Paid</div>
            </div>
            <div className="group">
              <div className="text-4xl font-black text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-300">1,250+</div>
              <div className="text-gray-300">Active Influencers</div>
            </div>
            <div className="group">
              <div className="text-4xl font-black text-purple-400 mb-2 group-hover:scale-110 transition-transform duration-300">85%</div>
              <div className="text-gray-300">Success Rate</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={`text-center ${isVisible ? 'animate-fade-in-delay' : 'opacity-0'}`}>
          <h3 className="text-4xl font-bold text-white mb-6">Ready to Start Your Journey?</h3>
          <p className="text-xl text-gray-300 mb-8">Join TeenFluencer today and turn your influence into income</p>
          <Link href="/sign-up" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-6 rounded-full font-bold text-xl hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/50 inline-flex items-center gap-3">
            Get Started Free
            <ArrowRight className="h-6 w-6" />
          </Link>
        </div>
        

      </div>
    </div>
  );
}