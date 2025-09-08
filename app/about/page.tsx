"use client";
import { useState, useEffect } from 'react';
import { Sparkles, Target, Users, Shield, Heart, Zap } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <Sparkles className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            About TeenFluencer
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Empowering the next generation of digital entrepreneurs to monetize their social influence
          </p>
        </div>

        {/* Mission Section */}
        <div className={`bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-12 mb-16 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              We believe every teenager with social media influence deserves the opportunity to earn money doing what they love. 
              TeenFluencer bridges the gap between young creators and premium brands, creating a win-win ecosystem for everyone.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 ${isVisible ? 'animate-fade-in-delay' : 'opacity-0'}`}>
          {[
            {
              icon: Target,
              title: "Transparency",
              desc: "Real-time analytics and clear commission structures. No hidden fees, no surprises.",
              gradient: "from-blue-400 to-blue-600"
            },
            {
              icon: Shield,
              title: "Trust & Safety",
              desc: "Secure payments, verified products, and protected user data. Your safety is our priority.",
              gradient: "from-green-400 to-green-600"
            },
            {
              icon: Heart,
              title: "Community First",
              desc: "Building a supportive community where young influencers can learn, grow, and succeed together.",
              gradient: "from-purple-400 to-purple-600"
            }
          ].map((value, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/15 hover:scale-105 transition-all duration-300 group">
              <div className={`p-4 bg-gradient-to-br ${value.gradient} rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl`}>
                <value.icon className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">{value.title}</h3>
              <p className="text-gray-300 leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className={`bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-12 mb-16 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Our Story</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Founded in 2024, TeenFluencer was born from a simple observation: teenagers are the most authentic and 
                influential voices on social media, yet they often struggle to monetize their reach effectively.
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                We created a platform that connects young influencers with premium brands, offering fair compensation 
                and transparent analytics. Our goal is to democratize influencer marketing and give every teenager 
                the tools they need to build a sustainable income from their social media presence.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">₹2,50,000+</div>
                  <div className="text-gray-400 text-sm">Paid to influencers</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center border border-white/10">
                <div className="text-center">
                  <Users className="h-24 w-24 text-white/50 mx-auto mb-4" />
                  <p className="text-white/70 text-lg">Empowering Young Creators</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-delay' : 'opacity-0'}`}>
          <h2 className="text-4xl font-bold text-white mb-6">Why Choose TeenFluencer?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              "✨ Instant 8% commission on all sales",
              "📊 Real-time analytics and tracking",
              "🛡️ Secure and reliable payments",
              "🎯 Premium product selection",
              "📱 Mobile-friendly dashboard",
              "🤝 Dedicated support team"
            ].map((feature, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                <p className="text-white text-lg">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={`text-center ${isVisible ? 'animate-fade-in-delay' : 'opacity-0'}`}>
          <h3 className="text-3xl font-bold text-white mb-6">Ready to Join Our Community?</h3>
          <p className="text-xl text-gray-300 mb-8">Start your influencer journey today and turn your social media into income</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200">
              Get Started Free
            </Link>
            <Link href="/" className="border-2 border-gray-600 text-gray-300 px-8 py-4 rounded-xl font-semibold text-lg hover:border-purple-500 hover:text-white transition-all duration-200">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}