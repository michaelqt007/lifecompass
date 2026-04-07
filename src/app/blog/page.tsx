import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog - LifeCompass',
  description: 'Thoughts on life, growth, and choices. Explore your inner answers with Xiaoyu.',
}

const posts = [
  {
    slug: 'what-is-life-compass',
    title: 'What is LifeCompass?',
    excerpt: 'An AI-powered life operating system, starting for personal use, evolving publicly, attracting like-minded people to build together.',
    date: '2026-04-03',
    category: 'Product',
  },
  {
    slug: 'who-is-xiaoyu',
    title: 'Who is Xiaoyu?',
    excerpt: 'Xiaoyu is a gentle life coach AI, like a caring friend, accompanying you to explore life\'s direction.',
    date: '2026-04-03',
    category: 'Product',
  },
  {
    slug: 'how-to-find-direction',
    title: 'What to Do When You Feel Lost',
    excerpt: 'When you don\'t know what you want, Xiaoyu helps you clarify your thoughts through questions, not by giving direct answers.',
    date: '2026-04-03',
    category: 'Growth',
  },
  {
    slug: 'art-of-listening',
    title: 'The Power of Listening',
    excerpt: 'Sometimes we don\'t need answers. We just need someone to truly listen. Xiaoyu is that listener.',
    date: '2026-04-02',
    category: 'Thoughts',
  },
  {
    slug: 'small-steps',
    title: 'Small Steps Forward: How to Take the First Step',
    excerpt: 'Change doesn\'t have to happen all at once. Just taking one small step means you\'re already on the way.',
    date: '2026-04-01',
    category: 'Growth',
  },
]

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Blog</h1>
        <p className="text-gray-500 mb-8">Thoughts on life, growth, and choices</p>

        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                <span>{post.date}</span>
                <span>·</span>
                <span className="text-purple-600">{post.category}</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
              <p className="text-gray-600">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}