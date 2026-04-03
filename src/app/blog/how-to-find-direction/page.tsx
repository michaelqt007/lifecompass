import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '迷茫的时候怎么办？ - LifeCompass 博客',
  description: '当你不知道自己想要什么时，小雨会通过提问帮你理清思绪，而不是直接给答案。',
}

export default function BlogPost() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4">
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <p className="text-sm text-gray-400 mb-2">2026年4月3日 · 成长</p>
          <h1 className="text-3xl font-bold text-gray-800">迷茫的时候怎么办？</h1>
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 leading-relaxed">
            迷茫是正常的。每个人都会经历这样的时刻——不知道自己想要什么，不知道未来该往哪走。
          </p>

          <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">为什么我们会迷茫？</h2>
          <p className="text-gray-600 leading-relaxed">
            通常有几个原因：
          </p>
          <ul className="text-gray-600 space-y-2">
            <li>• 选择太多，不知道选哪个</li>
            <li>• 外界期望和内心想法冲突</li>
            <li>• 经历了变化，旧的参考系失效</li>
            <li>• 太久没有问过自己想要什么</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">不要急着找答案</h2>
          <p className="text-gray-600 leading-relaxed">
            迷茫时最想做的事就是快速找到答案。但往往越急越乱。
          </p>
          <p className="text-gray-600 leading-relaxed">
            试着先放慢一点。承认自己现在不知道，这本身就是一个开始。
          </p>

          <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">可以做的事</h2>
          <ul className="text-gray-600 space-y-2">
            <li>• 写下现在脑子里想的事，不用整理</li>
            <li>• 问自己：如果什么都不用考虑，我会想做什么？</li>
            <li>• 找一个可以倾诉的人，不一定要给建议</li>
            <li>• 允许自己试错，而不是一次性做对</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">小雨怎么帮你</h2>
          <p className="text-gray-600 leading-relaxed">
            小雨不会告诉你应该怎么做。她会问一些问题，帮你听见自己内心的声音。
          </p>
          <p className="text-gray-600 leading-relaxed">
            比如：
          </p>
          <ul className="text-gray-600 space-y-2">
            <li>• "这个想法在你心里放了多久了？"</li>
            <li>• "如果抛开恐惧，你会怎么选？"</li>
            <li>• "你觉得最理想的画面是什么样的？"</li>
          </ul>

          <p className="text-gray-600 leading-relaxed mt-8">
            迷茫不可怕。可怕的是假装不迷茫，错过了真正认识自己的机会。
          </p>
        </div>
      </article>
    </main>
  )
}