/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";

type Blog = {
  id: number;
  title: string;
  author: string;
  date: string;
  image: string;
  content: string;
};

const blogData: Blog[] = [
  {
    id: 1,
    title: "डिजिटल मार्केटिंग – बिजनेस ग्रोथ का सबसे तेज़ तरीका",
    author: "Rahul Sharma",
    date: "12 Aug 2025",
    image: "https://source.unsplash.com/1200x600/?marketing,business",
    content: `
      डिजिटल मार्केटिंग आज के समय में सबसे शक्तिशाली टूल है...
    `,
  },
  {
    id: 2,
    title: "Web Development का Future – AI और Web3 की दुनिया",
    author: "Priya Singh",
    date: "10 Aug 2025",
    image: "https://source.unsplash.com/1200x600/?web,technology",
    content: `
      Web development अब सिर्फ HTML और CSS तक सीमित नहीं है...
    `,
  },
  {
    id: 3,
    title: "Startup Branding – आपकी पहचान का असली हथियार",
    author: "Amit Verma",
    date: "8 Aug 2025",
    image: "https://source.unsplash.com/1200x600/?startup,branding",
    content: `
      Branding सिर्फ एक लोगो या नाम नहीं होता...
    `,
  },
];

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<Blog | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-10">📚 ब्लॉग आर्टिकल्स</h1>

      {!selectedPost ? (
        <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {blogData.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 text-sm mb-3">
                  {post.author} • {post.date}
                </p>
                <p className="text-gray-700">
                  {post.content.substring(0, 100)}...
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <button
            onClick={() => setSelectedPost(null)}
            className="mb-6 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            ⬅ वापस जाएं
          </button>
          <img
            src={selectedPost.image}
            alt={selectedPost.title}
            className="w-full h-72 object-cover rounded-xl mb-6"
          />
          <h2 className="text-3xl font-bold mb-2">{selectedPost.title}</h2>
          <p className="text-gray-500 mb-4">
            {selectedPost.author} • {selectedPost.date}
          </p>
          <pre className="text-gray-700 whitespace-pre-wrap leading-relaxed">
            {selectedPost.content}
          </pre>
        </div>
      )}
    </div>
  );
}
