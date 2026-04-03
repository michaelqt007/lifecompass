import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '小步前进：如何迈出第一步 - LifeCompass 博客',
  description: '改变不需要一次完成。只要迈出一小步，就已经在路上了。',
}

export default function BlogPost() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4">
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <p className="text-sm text-gray-400 mb-2">2026年4月1日 · 成长</p>
          <h1 className="text-3xl font-bold text-gray-800">小步前进：如何迈出第一步</h1>
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 leading-relaxed">
            很多人卡住，不是因为不想改变，而是因为觉得要"一次做对"。
          </p>

          <p className="text-gray-600 leading-relaxed">
            其实不需要。
          </p>

          <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">为什么我们会卡住？</h2>
          <ul className="text-gray-600 space-y-2">
            <li>• 想太多，把所有可能都想过一遍</li>
            <li>• 怕选错，觉得只有一次机会</li>
            <li>• 等一个"准备好"的时刻</li>
            <li>• 想一次做完美</li>
          </ul>

          <p className="text-gray-600 leading-relaxed mt-4">
            但这些都是错觉。
          </p>

          <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">小步前进是什么意思？</h2>
          <p className="text-gray-600 leading-relaxed">
            不是让你降低标准。而是让你把"改变"拆成很多小步，一次只迈一步。
          </p>

          <p className="text-gray-600 leading-relaxed">
            比如：
          </p>
          <ul className="text-gray-600 space-y-2">
            <li>• 不是"我要换工作"，而是"这周我更新一下简历"</li>
            <li>• 不是"我要开始运动"，而是"今天走 10 分钟"</li>
            <li>• 不是"我要想清楚人生"，而是"写下现在脑子里想的事"</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">为什么小步更有效？</h2>
          <ul className="text-gray-600 space-y-2">
            <li>• 门槛低，不会拖着不动</li>
            <li>• 有反馈，知道方向对不对</li>
            <li>• 能调整，错了就换个方向</li>
            <li>• 有成就感，会想继续走</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">小雨怎么帮你？</h2>
          <p className="text-gray-600 leading-relaxed">
            她不会说"你应该做这个"。她会问：
          </p>
          <ul className="text-gray-600 space-y-2">
            <li>• "你想改变的是什么？"</li>
            <li>• "最小的一步是什么？"</li>
            <li>• "这周你能做到吗？"</li>
            <li>• "如果卡住了，怎么办？"</li>
          </ul>

          <p className="text-gray-600 leading-relaxed mt-8">
            改变不需要一次完成。只要迈出一小步，就已经在路上了。
          </p>
        </div>
      </article>
    </main>
  )
}