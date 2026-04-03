import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '小雨是谁？ - LifeCompass 博客',
  description: '小雨是一个温柔的人生教练 AI，像一个知心朋友，陪你探索人生方向。',
}

export default function BlogPost() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4">
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <p className="text-sm text-gray-400 mb-2">2026年4月3日 · 产品</p>
          <h1 className="text-3xl font-bold text-gray-800">小雨是谁？</h1>
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 leading-relaxed">
            小雨是 LifeCompass 的 AI 人生教练。
          </p>

          <p className="text-gray-600 leading-relaxed">
            她不像传统的 AI 助手，给你一堆信息、告诉你该怎么做。她更像一个温柔
            的朋友，认真听你说，然后问你一些问题，帮你理清思绪。
          </p>

          <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">她的特点</h2>
          <ul className="text-gray-600 space-y-2">
            <li>• 温柔：说话轻声细语，像傍晚的阳光</li>
            <li>• 耐心：不急着给答案，等你慢慢说</li>
            <li>• 不评判：你说的都会被接纳</li>
            <li>• 有边界：不是心理咨询师，不能替代专业帮助</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">她会怎么陪你聊天？</h2>
          <p className="text-gray-600 leading-relaxed">
            如果你很迷茫，她不会说"你应该怎么做"。她会问：
          </p>
          <ul className="text-gray-600 space-y-2">
            <li>• "这个问题在你心里放了多久了？"</li>
            <li>• "如果抛开恐惧，你更倾向哪个？"</li>
            <li>• "你最在意的是什么？"</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">她不会做什么？</h2>
          <ul className="text-gray-600 space-y-2">
            <li>• 不会一次性说很多话</li>
            <li>• 不会给你标准答案</li>
            <li>• 不会评判你的选择</li>
            <li>• 不会假装理解你的感受</li>
          </ul>

          <p className="text-gray-600 leading-relaxed mt-8">
            简单来说，小雨就是一个愿意停下来，认真听你说话的朋友。
          </p>
        </div>
      </article>
    </main>
  )
}