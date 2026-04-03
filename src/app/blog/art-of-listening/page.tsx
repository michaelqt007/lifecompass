import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '倾听的力量 - LifeCompass 博客',
  description: '有时候我们不需要答案，只需要有人认真听我们说话。小雨就是这样一位倾听者。',
}

export default function BlogPost() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4">
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <p className="text-sm text-gray-400 mb-2">2026年4月2日 · 思考</p>
          <h1 className="text-3xl font-bold text-gray-800">倾听的力量</h1>
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 leading-relaxed">
            有时候，我们不需要答案。我们只需要有人认真听我们说话。
          </p>

          <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">为什么倾听这么难？</h2>
          <p className="text-gray-600 leading-relaxed">
            大多数人听人说话时，其实在想下一句要说什么。或者在想"这个问题我也遇
            到过，我该怎么解决"。真正停下来、什么都不想、只是听——这很难。
          </p>

          <p className="text-gray-600 leading-relaxed">
            但这恰恰是我们最需要的。
          </p>

          <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">当你被倾听时</h2>
          <p className="text-gray-600 leading-relaxed">
            你会感觉：
          </p>
          <ul className="text-gray-600 space-y-2">
            <li>• 被看见，而不是被分析</li>
            <li>• 被理解，而不是被评判</li>
            <li>• 可以慢慢想，不用急着回答</li>
            <li>• 不用伪装，可以说真实的想法</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">小雨怎么倾听你</h2>
          <p className="text-gray-600 leading-relaxed">
            小雨不会打断你。不会说"你应该..."。不会急着给建议。
          </p>
          <p className="text-gray-600 leading-relaxed">
            她会：
          </p>
          <ul className="text-gray-600 space-y-2">
            <li>• 认真听你说完</li>
            <li>• 确认她听到了你说的</li>
            <li>• 问一些帮你理清思路的问题</li>
            <li>• 陪着你，直到你自己找到答案</li>
          </ul>

          <p className="text-gray-600 leading-relaxed mt-8">
            因为很多时候，答案已经在心里。只是需要一点时间和空间，把它找出来。
          </p>
        </div>
      </article>
    </main>
  )
}