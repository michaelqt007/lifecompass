import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Small Steps Forward: How to Take the First Step - LifeCompass Blog',
  description: 'Change doesn\'t have to happen all at once. Just taking one small step means you\'re already on the way.',
}

export default function BlogPost() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4">
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <p className="text-sm text-gray-400 mb-2">April 1, 2026 · Growth</p>
          <h1 className="text-3xl font-bold text-gray-800">Small Steps Forward: How to Take the First Step</h1>
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 leading-relaxed">
            Many people get stuck not because they don't want to change, but because they 
            think they need to "get it right in one go."
          </p>

          <p className="text-gray-600 leading-relaxed">
            Actually, you don't.
          </p>

          <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">Why do we get stuck?</h2>
          <ul className="text-gray-600 space-y-2">
            <li>• Overthinking, considering all possibilities</li>
            <li>• Fear of choosing wrong, thinking there's only one chance</li>
            <li>• Waiting for a "ready" moment</li>
            <li>• Wanting to be perfect the first time</li>
          </ul>

          <p className="text-gray-600 leading-relaxed mt-4">
            But these are all illusions.
          </p>

          <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">What does small steps mean?</h2>
          <p className="text-gray-600 leading-relaxed">
            It doesn't mean lowering your standards. It means breaking "change" into many 
            small steps, taking only one at a time.
          </p>

          <p className="text-gray-600 leading-relaxed">
            For example:
          </p>
          <ul className="text-gray-600 space-y-2">
            <li>• Not "I want to change jobs," but "This week I'll update my resume"</li>
            <li>• Not "I want to start exercising," but "Today I'll walk for 10 minutes"</li>
            <li>• Not "I want to figure out life," but "Write down what's on my mind right now"</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">Why are small steps more effective?</h2>
          <ul className="text-gray-600 space-y-2">
            <li>• Low barrier, won't keep procrastinating</li>
            <li>• Get feedback, know if direction is right</li>
            <li>• Can adjust, change direction if wrong</li>
            <li>• Sense of achievement, want to keep going</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">How can Xiaoyu help?</h2>
          <p className="text-gray-600 leading-relaxed">
            She won't say "you should do this." She'll ask:
          </p>
          <ul className="text-gray-600 space-y-2">
            <li>• "What do you want to change?"</li>
            <li>• "What's the smallest step?"</li>
            <li>• "Can you do this this week?"</li>
            <li>• "If you get stuck, what then?"</li>
          </ul>

          <p className="text-gray-600 leading-relaxed mt-8">
            Change doesn't have to happen all at once. Just taking one small step means 
            you're already on the way.
          </p>
        </div>
      </article>
    </main>
  )
}