import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '功能介绍 - LifeCompass',
  description: 'LifeCompass 提供温柔的人生教练对话、语音交流、情绪陪伴等功能，帮助你探索人生方向。',
}

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">功能介绍</h1>
        
        <section className="mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl">
                💬
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">温柔对话</h3>
                <p className="text-gray-600">
                  小雨像一个知心朋友，认真听你说，不评判、不说教。一次只说 1-2 句，给你思考和回应的空间。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl">
                🎤
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">语音交流</h3>
                <p className="text-gray-600">
                  支持语音输入，你可以像打电话一样和小雨聊天。小雨会用温柔的声音回复你，让对话更自然。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl">
                🌧
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">情绪陪伴</h3>
                <p className="text-gray-600">
                  不管你是迷茫、焦虑、还是只是想找人聊聊，小雨都在这里陪着你。像一个不会离开的朋友。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl">
                🎯
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">方向探索</h3>
                <p className="text-gray-600">
                  当你不知道自己想要什么时，小雨会通过提问帮你理清思绪，而不是直接给答案。答案在你心里，小雨帮你找到它。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl">
                🔒
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">隐私保护</h3>
                <p className="text-gray-600">
                  你的对话内容不会被存储或分享。你的故事只属于你。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="text-center mt-12">
          <a 
            href="/" 
            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-full font-medium hover:bg-purple-700 transition-colors"
          >
            开始和小雨聊天
          </a>
        </section>
      </div>
    </main>
  )
}