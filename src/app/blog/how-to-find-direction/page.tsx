import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What to Do When You Feel Lost - LifeCompass Blog',
  description: 'When you don\'t know what you want, Xiaoyu helps you clarify your thoughts through questions, not by giving direct answers.',
}

export default function BlogPost() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4">
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <p className="text-sm text-gray-400 mb-2">April 3, 2026 · Growth</p>
          <h1 className="text-3xl font-bold text-gray-800">What to Do When You Feel Lost</h1>
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 leading-relaxed">
            Feeling lost is normal. Everyone goes through moments when they don't know what 
            they want or where to go next.
          </p>

          <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">Why do we feel lost?</h2>
          <p className="text-gray-600 leading-relaxed">
            Usually for several reasons:
          </p>
          <ul className="text-gray-600 space-y-2">
            <li>• Too many choices, don't know which to pick</li>
            <li>• External expectations conflict with inner desires</li>
            <li>• Experienced change, old reference points no longer work</li>
            <li>• Haven't asked ourselves what we want for too long</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">Don't rush to find answers</h2>
          <p className="text-gray-600 leading-relaxed">
            When lost, the thing we most want to do is quickly find an answer. But often the 
            more we rush, the more confused we get.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Try slowing down first. Admitting you don't know right now is itself a beginning.
          </p>

          <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">Things you can do</h2>
          <ul className="text-gray-600 space-y-2">
            <li>• Write down what's in your mind, no need to organize</li>
            <li>• Ask yourself: If nothing else mattered, what would I want to do?</li>
            <li>• Find someone to talk to who doesn't need to give advice</li>
            <li>• Allow yourself to try and fail, instead of getting it right in one go</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">How Xiaoyu can help</h2>
          <p className="text-gray-600 leading-relaxed">
            Xiaoyu won't tell you what to do. She'll ask questions to help you hear your 
            own inner voice.
          </p>
          <p className="text-gray-600 leading-relaxed">
            For example:
          </p>
          <ul className="text-gray-600 space-y-2">
            <li>• "How long has this thought been in your heart?"</li>
            <li>• "If you set aside fear, how would you choose?"</li>
            <li>• "What does the ideal picture look like to you?"</li>
          </ul>

          <p className="text-gray-600 leading-relaxed mt-8">
            Being lost isn't scary. What's scary is pretending not to be lost, and missing 
            the opportunity to truly know yourself.
          </p>
        </div>
      </article>
    </main>
  )
}