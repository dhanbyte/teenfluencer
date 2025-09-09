// app/blog/page.tsx
import Link from 'next/link';
import { allPosts } from 'contentlayer/generated';
import { formatDate } from '@/lib/utils';

export default function BlogPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero Header */}
      <header className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Teenfluencers Blog</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Insights, tips and stories for young content creators
        </p>
      </header>

      {/* Featured Post */}
      <section className="mb-20">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 h-80 md:h-auto">
              <img
                src={allPosts[0].image}
                alt={allPosts[0].title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 md:w-1/2">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
                Featured
              </span>
              <h2 className="text-3xl font-bold mb-4">
                <Link href={`/blog/${allPosts[0].slug}`} className="hover:text-blue-600 transition">
                  {allPosts[0].title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-6 text-lg">{allPosts[0].summary}</p>
              <div className="flex items-center">
                <span className="text-gray-500 text-sm">
                  {formatDate(allPosts[0].publishedAt)}
                </span>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-blue-600 text-sm font-medium">
                  {allPosts[0].category}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Posts Grid */}
      <section>
        <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPosts.slice(1).map((post) => (
            <article key={post.slug} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>{formatDate(post.publishedAt)}</span>
                  <span className="mx-2">•</span>
                  <span className="text-blue-600 font-medium">{post.category}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">
                  <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{post.summary}</p>
                <Link 
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition"
                >
                  Read more
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="mt-20 bg-blue-50 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Subscribe to get the latest content creation tips and platform updates
        </p>
        <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
}