import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Power of Listening - LifeCompass Blog',
  description: 'Sometimes we don\'t need answers. We just need someone to truly listen. Xiaoyu is that listener.',
}

export default function BlogPost() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4">
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <p className="text-sm text-gray-400 mb-2">April 2, 2026 · Thoughts</p>
          <h1 className="text-3xl font-bold text-gray-800">The Power of Listening</h1>
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 leading-relaxed">
            Sometimes, we don't need answers. We just need someone to truly listen to us.
          </p>

          <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">Why is listening so hard?</h2>
          <p className="text-gray-600 leading-relaxed">
            When most people listen, they're actually thinking about what to say next. Or 
            thinking "I've had this problem too, how should I solve it." Truly stopping, 
            thinking nothing, just listening—that's hard.
          </p>

          <p className="text-gray-600 leading-relaxed">
            But that's exactly what we need most.
          </p>

          <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">When you're truly heard</h2>
          <p className="text-gray-600 leading-relaxed">
            You feel:
          </p>
          <ul className="text-gray-600 space-y-2">
            <li>• Seen, not analyzed</li>
            <li>• Understood, not judged</li>
            <li>• Able to think slowly, not rushed to answer</li>
            <li>• No need to pretend, can speak real thoughts</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">How Xiaoyu listens to you</h2>
          <p className="text-gray-600 leading-relaxed">
            Xiaoyu won't interrupt you. Won't say "you should..." Won't rush to give advice.
          </p>
          <p className="text-gray-600 leading-relaxed">
            She will:
          </p>
          <ul className="text-gray-600 space-y-2">
            <li>• Listen carefully until you finish</li>
            <li>• Confirm she heard what you said</li>
            <li>• Ask questions that help clarify your thinking</li>
            <li>• Stay with you until you find the answer yourself</li>
          </ul>

          <p className="text-gray-600 leading-relaxed mt-8">
            Because most of the time, the answer is already inside. It just needs a little 
            time and space to bring it out.
          </p>
        </div>
      </article>
    </main>
  )
}