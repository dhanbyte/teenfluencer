// app/services/page.tsx
import React from 'react';
import type { Metadata } from 'next';
import { FaStar, FaUsers, FaChartLine, FaTools, FaHandshake } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Our Services | Teenfluencers',
  description: 'Discover how we help young creators grow their online presence',
};

export default function ServicesPage() {
  const services = [
    {
      icon: <FaStar className="text-yellow-400 text-3xl" />,
      title: "Influencer Training",
      description: "Comprehensive courses on content creation, branding, and audience growth",
      features: [
        "Video production masterclasses",
        "Social media strategy",
        "Personal branding workshops"
      ]
    },
    {
      icon: <FaUsers className="text-blue-500 text-3xl" />,
      title: "Community Building",
      description: "Connect with other teen creators in our exclusive network",
      features: [
        "Private Discord server",
        "Monthly networking events",
        "Collaboration opportunities"
      ]
    },
    {
      icon: <FaChartLine className="text-green-500 text-3xl" />,
      title: "Growth Analytics",
      description: "Data-driven insights to optimize your content performance",
      features: [
        "Audience demographics",
        "Engagement metrics",
        "Content performance reports"
      ]
    },
    {
      icon: <FaTools className="text-purple-500 text-3xl" />,
      title: "Content Tools",
      description: "Access to premium tools for content creation",
      features: [
        "Video editing software",
        "Graphic design templates",
        "Music library access"
      ]
    },
    {
      icon: <FaHandshake className="text-red-500 text-3xl" />,
      title: "Brand Partnerships",
      description: "Get connected with brands looking to work with teen creators",
      features: [
        "Sponsored content opportunities",
        "Affiliate programs",
        "Product collaborations"
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">Our Services for Teen Creators</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We provide everything you need to build and grow your online presence as a young content creator
        </p>
      </section>

      {/* Services Grid */}
      <section className="mb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="p-6">
                <div className="mb-4">
                  {service.icon}
                </div>
                <h2 className="text-2xl font-bold mb-3">{service.title}</h2>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="mb-20 bg-blue-50 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Simple, Transparent Pricing</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              name: "Starter",
              price: "Free",
              description: "Perfect for beginners",
              features: ["Basic training", "Community access", "Limited tools"],
              cta: "Get Started"
            },
            {
              name: "Pro",
              price: "$9.99",
              description: "For serious creators",
              features: ["All training", "Advanced analytics", "Full tool access"],
              cta: "Go Pro",
              popular: true
            },
            {
              name: "Elite",
              price: "$24.99",
              description: "For future stars",
              features: ["1-on-1 coaching", "Brand matching", "Early feature access"],
              cta: "Become Elite"
            }
          ].map((tier, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-xl shadow-md overflow-hidden ${tier.popular ? 'ring-2 ring-blue-500 transform md:-translate-y-2' : ''}`}
            >
              {tier.popular && (
                <div className="bg-blue-500 text-white text-center py-1 text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <p className="text-gray-600 mb-4">{tier.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  {tier.price !== "Free" && <span className="text-gray-500">/month</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  className={`w-full py-3 px-4 rounded-lg font-medium transition ${tier.popular ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
                >
                  {tier.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Members Say</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              quote: "Teenfluencers helped me grow from 500 to 50k followers in just 6 months!",
              name: "Priya K., 17",
              handle: "@priya_creates"
            },
            {
              quote: "The community support is amazing. I've made real friends and collaborators here.",
              name: "Rahul M., 16",
              handle: "@rahul_edits"
            }
          ].map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-gray-500">{testimonial.handle}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-12 text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Boost Your Creator Journey?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of teen creators who are building their futures today
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold transition">
            Sign Up Free
          </button>
          <button className="bg-transparent border-2 border-white hover:bg-white hover:bg-opacity-10 px-8 py-3 rounded-lg font-bold transition">
            Learn More
          </button>
        </div>
      </section>
    </div>
  );
}