import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LifeCompass 是什么？ - LifeCompass 博客',
  description: 'LifeCompass 是一个用 AI 共创的人生操作系统，从自用开始，公开进化，吸引同频者共建。',
}

export default function BlogPost() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4">
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <p className="text-sm text-gray-400 mb-2">2026年4月3日 · 产品</p>
          <h1 className="text-3xl font-bold text-gray-800">LifeCompass 是什么？</h1>
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 leading-relaxed">
            LifeCompass 是一个用 AI 共创的人生操作系统。
          </p>

          <p className="text-gray-600 leading-relaxed">
            它的起点很简单：如果 AI 能成为一个真正懂你的朋友，会发生什么？
          </p>

          <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">为什么做这个？</h2>
          <p className="text-gray-600 leading-relaxed">
            我们发现，很多时候人们需要的不是答案，而是一个可以倾诉、可以思考的空间。传统的心
            理咨询门槛高、费用贵，朋友不一定能理解你。AI 可以做一个随时在线、不带评判的倾听
            者。
          </p>

          <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">它和其他 AI 有什么不一样？</h2>
          <ul className="text-gray-600 space-y-2">
            <li>• 不说教：小雨不会告诉你应该怎么做</li>
            <li>• 不评判：你说的都会被接纳</li>
            <li>• 有温度：对话风格像朋友，不像机器人</li>
            <li>• 少说多听：一次只说 1-2 句，给你思考空间</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">它适合谁？</h2>
          <p className="text-gray-600 leading-relaxed">
            适合所有想要探索内心、理清思绪的人。不管你是迷茫、焦虑，还是只是想找人聊聊，
            小雨都在这里。
          </p>

          <p className="text-gray-600 leading-relaxed mt-8">
            LifeCompass 还在早期，会持续进化。欢迎你一起参与。
          </p>
        </div>
      </article>
    </main>
  )
}