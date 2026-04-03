import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '博客 - LifeCompass',
  description: '关于人生、成长、选择的思考，和小雨一起探索内心的答案。',
}

const posts = [
  {
    slug: 'what-is-life-compass',
    title: 'LifeCompass 是什么？',
    excerpt: '一个用 AI 共创的人生操作系统，从自用开始，公开进化，吸引同频者共建。',
    date: '2026-04-03',
    category: '产品',
  },
  {
    slug: 'who-is-xiaoyu',
    title: '小雨是谁？',
    excerpt: '小雨是一个温柔的人生教练 AI，像一个知心朋友，陪你探索人生方向。',
    date: '2026-04-03',
    category: '产品',
  },
  {
    slug: 'how-to-find-direction',
    title: '迷茫的时候怎么办？',
    excerpt: '当你不知道自己想要什么时，小雨会通过提问帮你理清思绪，而不是直接给答案。',
    date: '2026-04-03',
    category: '成长',
  },
  {
    slug: 'art-of-listening',
    title: '倾听的力量',
    excerpt: '有时候我们不需要答案，只需要有人认真听我们说话。小雨就是这样一位倾听者。',
    date: '2026-04-02',
    category: '思考',
  },
  {
    slug: 'small-steps',
    title: '小步前进：如何迈出第一步',
    excerpt: '改变不需要一次完成。只要迈出一小步，就已经在路上了。',
    date: '2026-04-01',
    category: '成长',
  },
]

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">博客</h1>
        <p className="text-gray-500 mb-8">关于人生、成长、选择的思考</p>

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