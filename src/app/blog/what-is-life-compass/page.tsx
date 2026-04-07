import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What is LifeCompass? - LifeCompass Blog',
  description: 'An AI-powered life operating system, starting for personal use, evolving publicly, attracting like-minded people to build together.',
}

export default function BlogPost() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4">
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <p className="text-sm text-gray-400 mb-2">April 3, 2026 · Product</p>
          <h1 className="text-3xl font-bold text-gray-800">What is LifeCompass?</h1>
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 leading-relaxed">
            LifeCompass is an AI-powered life operating system.
          </p>

          <p className="text-gray-600 leading-relaxed">
            It started with a simple question: What if AI could be a friend who truly understands you?
          </p>

          <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">Why did we build this?</h2>
          <p className="text-gray-600 leading-relaxed">
            We noticed that people often don't need answers—they need a space to talk and think. 
            Traditional therapy has high barriers and costs. Friends might not understand. 
            AI can be a listener who's always there, without judgment.
          </p>

          <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">How is it different from other AI?</h2>
          <ul className="text-gray-600 space-y-2">
            <li>• No preaching: Xiaoyu won't tell you what to do</li>
            <li>• No judgment: Everything you say is accepted</li>
            <li>• Warm tone: Conversations feel like talking to a friend, not a machine</li>
            <li>• Listen more, speak less: Only 1-2 sentences at a time, giving you space to think</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">Who is it for?</h2>
          <p className="text-gray-600 leading-relaxed">
            Anyone who wants to explore their inner self and clarify their thoughts. 
            Whether you're lost, anxious, or just want someone to talk to, Xiaoyu is here.
          </p>

          <p className="text-gray-600 leading-relaxed mt-8">
            LifeCompass is still in its early stages and will continue to evolve. You're welcome to join us.
          </p>
        </div>
      </article>
    </main>
  )
}