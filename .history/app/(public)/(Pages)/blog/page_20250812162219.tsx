// app/blog/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { allPosts } from 'contentlayer/generated';

export const metadata: Metadata = {
  title: 'Blog | Teenfluencers',
  description: 'Learn tips, tricks, and strategies for growing as a teen content creator',
};

export default function BlogPage() {
  const featuredPost = allPosts[0];
  const popularPosts = allPosts.slice(1, 4);
  const recentPosts = allPosts.slice(4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Teenfluencers Blog</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Expert advice, success stories, and the latest trends for young creators
        </p>
      </section>

      {/* Featured Post */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-8 border-b pb-2">Featured Post</h2>
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0 md:w-1/3">
              <img 
                className="h-full w-full object-cover" 
                src={featuredPost.image} 
                alt={featuredPost.title}
                width={400}
                height={300}
              />
            </div>
            <div className="p-8 md:w-2/3">
              <div className="flex items-center mb-2">
                <span className="text-sm text-gray-500">
                  {formatDate(featuredPost.publishedAt)}
                </span>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-sm font-medium text-blue-600">
                  {featuredPost.category}
                </span>
              </div>
              <Link 
                href={`/blog/${featuredPost.slug}`}
                className="block text-2xl font-bold text-gray-900 hover:text-blue-600 transition mb-3"
              >
                {featuredPost.title}
              </Link>
              <p className="text-gray-600 mb-4">{featuredPost.summary}</p>
              <div className="flex items-center">
                <img 
                  className="h-10 w-10 rounded-full" 
                  src={featuredPost.author.image} 
                  alt={featuredPost.author.name}
                  width={40}
                  height={40}
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {featuredPost.author.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {featuredPost.author.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Posts */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-8 border-b pb-2">Popular Posts</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {popularPosts.map((post) => (
            <article key={post.slug} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <img 
                className="w-full h-48 object-cover" 
                src={post.image} 
                alt={post.title}
                width={400}
                height={200}
              />
              <div className="p-6">
                <div className="flex items-center text-sm mb-2">
                  <span className="text-gray-500">
                    {formatDate(post.publishedAt)}
                  </span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="font-medium text-blue-600">
                    {post.category}
                  </span>
                </div>
                <Link 
                  href={`/blog/${post.slug}`}
                  className="block text-xl font-bold text-gray-900 hover:text-blue-600 transition mb-3"
                >
                  {post.title}
                </Link>
                <p className="text-gray-600 mb-4 line-clamp-2">{post.summary}</p>
                <div className="flex items-center">
                  <img 
                    className="h-8 w-8 rounded-full" 
                    src={post.author.image} 
                    alt={post.author.name}
                    width={32}
                    height={32}
                  />
                  <span className="ml-2 text-sm font-medium text-gray-900">
                    {post.author.name}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Recent Posts */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 border-b pb-2">Recent Posts</h2>
        <div className="space-y-8">
          {recentPosts.map((post) => (
            <article key={post.slug} className="pb-8 border-b border-gray-100 last:border-0">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4">
                  <img 
                    className="rounded-lg w-full h-40 object-cover" 
                    src={post.image} 
                    alt={post.title}
                    width={300}
                    height={160}
                  />
                </div>
                <div className="md:w-3/4">
                  <div className="flex items-center text-sm mb-2">
                    <span className="text-gray-500">
                      {formatDate(post.publishedAt)}
                    </span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="font-medium text-blue-600">
                      {post.category}
                    </span>
                  </div>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="block text-xl font-bold text-gray-900 hover:text-blue-600 transition mb-3"
                  >
                    {post.title}
                  </Link>
                  <p className="text-gray-600 mb-4">{post.summary}</p>
                  <div className="flex items-center">
                    <img 
                      className="h-8 w-8 rounded-full" 
                      src={post.author.image} 
                      alt={post.author.name}
                      width={32}
                      height={32}
                    />
                    <span className="ml-2 text-sm font-medium text-gray-900">
                      {post.author.name}
                    </span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-sm text-gray-500">
                      {post.readingTime} min read
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-blue-50 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Get Creator Tips Direct to Your Inbox</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Join our weekly newsletter for the latest content strategies and platform updates
        </p>
        <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
}