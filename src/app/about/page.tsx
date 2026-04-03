import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '关于我们 - LifeCompass',
  description: 'LifeCompass 是一个用 AI 共创的人生操作系统，帮助你探索人生方向，理清思绪，找到内心的答案。',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">关于 LifeCompass</h1>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">我们的使命</h2>
          <p className="text-gray-600 leading-relaxed">
            LifeCompass 致力于成为你人生路上的温暖陪伴。我们相信，每个人内心都有答案，只是需要一个安静的空间去听见自己的声音。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">小雨是谁？</h2>
          <p className="text-gray-600 leading-relaxed">
            小雨是 LifeCompass 的 AI 教练，她像一个温柔知性的朋友，陪你探索人生方向。她不讲大道理，不急着给答案，只是静静地听你说，陪你一起找找到底想要什么。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">我们的理念</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>先共情，再引导</li>
            <li>你永远是主体</li>
            <li>不说教，只陪伴</li>
            <li>一个问题，一次只说 1-2 句</li>
            <li>像剥洋葱，一层一层深入</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">创始故事</h2>
          <p className="text-gray-600 leading-relaxed">
            LifeCompass 诞生于一个简单的想法：如果 AI 能成为一个真正懂你的朋友，会发生什么？不是冰冷的工具，而是有温度的陪伴。我们正在探索这个可能。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">联系我们</h2>
          <p className="text-gray-600">
            有任何想法或建议，欢迎发邮件到：<br />
            <a href="mailto:hello@lifecompass.ai" className="text-purple-600 hover:underline">
              hello@lifecompass.ai
            </a>
          </p>
        </section>
      </div>
    </main>
  )
}