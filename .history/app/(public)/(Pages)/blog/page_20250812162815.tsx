/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

const blogData = [
  {
    id: 1,
    title: "डिजिटल मार्केटिंग – बिजनेस ग्रोथ का सबसे तेज़ तरीका",
    author: "Rahul Sharma",
    date: "12 Aug 2025",
    image: "https://source.unsplash.com/1200x600/?marketing,business",
    content: `
      डिजिटल मार्केटिंग आज के समय में सबसे शक्तिशाली टूल है जो छोटे से छोटे
      बिजनेस को भी दुनिया के कोने-कोने तक पहुंचा सकता है। इसमें SEO, Social
      Media, Email Marketing, Paid Ads और Content Marketing जैसी कई strategies
      शामिल हैं। 
      
      1. SEO के जरिए आप गूगल सर्च रिजल्ट में अपनी वेबसाइट को ऊपर ला सकते हैं।
      2. सोशल मीडिया के जरिए आप सीधे अपने ग्राहकों से जुड़ सकते हैं।
      3. Email campaigns long-term engagement के लिए बहुत कारगर होती हैं।
      
      आने वाले समय में AI tools के साथ digital marketing और भी स्मार्ट हो जाएगी।
    `,
  },
  {
    id: 2,
    title: "Web Development का Future – AI और Web3 की दुनिया",
    author: "Priya Singh",
    date: "10 Aug 2025",
    image: "https://source.unsplash.com/1200x600/?web,technology",
    content: `
      Web development अब सिर्फ HTML और CSS तक सीमित नहीं है। आज का दौर React,
      Next.js, TailwindCSS, और AI integrated websites का है। 
      
      आने वाले 5 सालों में Web3, Blockchain, और AI-based personal assistants हमारी
      websites को इतना smart बना देंगे कि वो खुद user के हिसाब से content और
      design बदल देंगी।
      
      Responsive design और fast performance अब basic requirement बन गए हैं।
    `,
  },
  {
    id: 3,
    title: "Startup Branding – आपकी पहचान का असली हथियार",
    author: "Amit Verma",
    date: "8 Aug 2025",
    image: "https://source.unsplash.com/1200x600/?startup,branding",
    content: `
      Branding सिर्फ एक लोगो या नाम नहीं होता, बल्कि ये आपके बिजनेस की personality
      होती है। 
      
      ✔ Logo और Colors: आपके business का पहला impression तय करते हैं।
      ✔ Website: आपके customers को professional look देती है।
      ✔ Social Media: आपकी reach और engagement बढ़ाती है।
      
      एक strong brand बनाने के लिए consistency, creativity और customer trust सबसे
      ज़रूरी है।
    `,
  },
];

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState(null);

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
