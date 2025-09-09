"use client";

import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    // Simulate API call
    setTimeout(() => {
      setStatus("Message sent successfully ✅");
      setForm({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">Contact Us</h1>
      <p className="text-center text-gray-500 mb-12">
        Have questions or ideas? We’d love to hear from you.
      </p>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <FaPhoneAlt className="text-xl text-black" />
            <span className="text-gray-700">+1 (234) 567-890</span>
          </div>
          <div className="flex items-center gap-4">
            <FaEnvelope className="text-xl text-black" />
            <span className="text-gray-700">support@influencerhub.com</span>
          </div>
          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-xl text-black" />
            <span className="text-gray-700">123 Brand Street, NY, USA</span>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-6 space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors w-full"
          >
            Send Message
          </button>
          {status && <p className="text-center text-green-600 mt-2">{status}</p>}
        </form>
      </div>
    </main>
  );
}
