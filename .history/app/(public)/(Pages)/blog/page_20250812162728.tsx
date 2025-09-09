/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

const blogData = [
  {
    id: 1,
    title: "पहला ब्लॉग – डिजिटल मार्केटिंग का जादू",
    author: "Rahul Sharma",
    date: "12 Aug 2025",
    image: "https://source.unsplash.com/800x400/?marketing,office",
    content:
      "डिजिटल मार्केटिंग आज के समय में किसी भी बिज़नेस को बढ़ाने का सबसे तेज़ तरीका है। इसमें SEO, Social Media, Email Campaigns जैसी strategies शामिल होती हैं।",
  },
  {
    id: 2,
    title: "Web Development का Future",
    author: "Priya Singh",
    date: "10 Aug 2025",
    image: "https://source.unsplash.com/800x400/?web,technology",
    content:
      "Web development का future बेहद bright है, खासकर AI और Web3 technology आने के बाद। Responsive और fast websites अब ज़रूरी हो गई हैं।",
  },
  {
    id: 3,
    title: "Startups के लिए Branding Tips",
    author: "Amit Verma",
    date: "8 Aug 2025",
    image: "https://source.unsplash.com/800x400/?branding,startup",
    content:
      "एक successful startup के लिए branding सबसे important है। Logo, Website, Social Media presence और tone of voice आपके business को define करते हैं।",
  },
];

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-10">📚 हमारा ब्लॉग</h1>

      {!selectedPost ? (
        <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {blogData.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 text-sm mb-3">
                  {post.author} • {post.date}
                </p>
                <p className="text-gray-700">
                  {post.content.substring(0, 80)}...
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
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
          <p className="text-gray-700 leading-relaxed">{selectedPost.content}</p>
        </div>
      )}
    </div>
  );
}
