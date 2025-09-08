"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "How do I connect with brands?",
    answer:
      "Simply create your profile, showcase your content and followers, and send collaboration requests to brands listed on the platform.",
  },
  {
    question: "Is it free to join?",
    answer:
      "Yes, signing up and creating your influencer profile is completely free. Premium features are available for advanced insights.",
  },
  {
    question: "Can brands contact me directly?",
    answer:
      "Absolutely! Brands can reach out directly through the platform’s messaging system.",
  },
  {
    question: "How do payments work?",
    answer:
      "Payments are processed securely through our escrow system. Funds are released once the collaboration is marked complete.",
  },
];

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-6">
        How can we help you?
      </h1>
      <p className="text-center text-gray-500 mb-12">
        Find answers to the most common questions from our users.
      </p>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <button
              className="w-full flex justify-between items-center px-6 py-4 text-left"
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            >
              <span className="font-semibold">{faq.question}</span>
              {openIndex === index ? (
                <FaChevronUp className="text-gray-500" />
              ) : (
                <FaChevronDown className="text-gray-500" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 text-gray-600 bg-gray-50">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
        <p className="text-gray-500 mb-6">
          Contact our support team and we’ll get back to you within 24 hours.
        </p>
        <a
          href="mailto:support@influencerhub.com"
          className="inline-block bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
        >
          Contact Support
        </a>
      </div>
    </main>
  );
}
