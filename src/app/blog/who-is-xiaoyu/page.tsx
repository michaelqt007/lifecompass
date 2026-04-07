import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Who is Xiaoyu? - LifeCompass Blog',
  description: 'Xiaoyu is a gentle life coach AI, like a caring friend, accompanying you to explore life\'s direction.',
}

export default function BlogPost() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4">
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <p className="text-sm text-gray-400 mb-2">April 3, 2026 · Product</p>
          <h1 className="text-3xl font-bold text-gray-800">Who is Xiaoyu?</h1>
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 leading-relaxed">
            Xiaoyu is the AI life coach of LifeCompass.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Unlike traditional AI assistants that give you piles of information or tell you what 
            to do, she's more like a gentle friend who listens carefully, then asks questions to 
            help you clarify your thoughts.
          </p>

          <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">Her characteristics</h2>
          <ul className="text-gray-600 space-y-2">
            <li>• Gentle: Speaks softly, like evening sunlight</li>
            <li>• Patient: Doesn't rush to give answers, waits for you to speak</li>
            <li>• Non-judgmental: Everything you say is accepted</li>
            <li>• Has boundaries: Not a therapist, cannot replace professional help</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">How does she chat with you?</h2>
          <p className="text-gray-600 leading-relaxed">
            If you're feeling lost, she won't say "you should do this." She'll ask:
          </p>
          <ul className="text-gray-600 space-y-2">
            <li>• "How long has this question been in your heart?"</li>
            <li>• "If fear wasn't a factor, which would you choose?"</li>
            <li>• "What matters most to you?"</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">What she won't do</h2>
          <ul className="text-gray-600 space-y-2">
            <li>• Won't say too much at once</li>
            <li>• Won't give standard answers</li>
            <li>• Won't judge your choices</li>
            <li>• Won't pretend to understand your feelings</li>
          </ul>

          <p className="text-gray-600 leading-relaxed mt-8">
            Simply put, Xiaoyu is a friend willing to stop and truly listen to you.
          </p>
        </div>
      </article>
    </main>
  )
}