/* eslint-disable @next/next/no-img-element */
// app/about/page.tsx
import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Teenfluencers',
  description: 'Learn more about our platform and mission',
};

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <section className="mb-16">
        <h1 className="text-4xl font-bold text-center mb-8">About Teenfluencers</h1>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-lg mb-6">
              Founded in 2023, Teenfluencers was created to empower young content creators by providing 
              them with the tools, resources, and community they need to thrive in the digital space.
            </p>
            <p className="text-lg">
              We believe every teenager with creativity and passion deserves a platform to showcase 
              their talents and connect with like-minded individuals.
            </p>
          </div>
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src="/about-team.jpg" 
              alt="Our team working together"
              className="w-full h-auto object-cover"
              width={600}
              height={400}
            />
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Empowerment",
              description: "We equip teens with skills and confidence to express themselves",
              icon: "💪"
            },
            {
              title: "Community",
              description: "Building supportive networks for young creators",
              icon: "👥"
            },
            {
              title: "Innovation",
              description: "Constantly evolving with digital trends and technologies",
              icon: "💡"
            }
          ].map((value, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-blue-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6">Join Our Community</h2>
        <p className="text-lg mb-6">
          Ready to start your journey as a teen content creator? Wed love to have you!
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          Sign Up Now
        </button>
      </section>
    </div>
  );
}