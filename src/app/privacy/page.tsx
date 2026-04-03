import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '隐私政策 - LifeCompass',
  description: 'LifeCompass 隐私政策，我们如何收集、使用和保护你的信息。',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">隐私政策</h1>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">我们收集什么信息</h2>
          <p className="text-gray-600 leading-relaxed">
            当你使用 LifeCompass 时，我们会收集：
          </p>
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
            <li>你与小雨的对话内容</li>
            <li>使用时间、频率等使用数据</li>
            <li>设备信息（浏览器类型、操作系统）</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">我们如何使用你的信息</h2>
          <p className="text-gray-600 leading-relaxed">
            你的信息用于：
          </p>
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
            <li>提供和改进服务</li>
            <li>分析使用情况，优化用户体验</li>
            <li>保障服务安全</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">我们不会做什么</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>不会出售你的个人信息</li>
            <li>不会与第三方分享你的对话内容</li>
            <li>不会用于广告推送</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">数据安全</h2>
          <p className="text-gray-600 leading-relaxed">
            我们采取合理的技术和组织措施保护你的信息，包括加密传输、访问控制等。但没有任何互联网传输或存储是 100% 安全的，请理解这一点。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">你的权利</h2>
          <p className="text-gray-600 leading-relaxed">
            你有权：
          </p>
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
            <li>访问我们持有的关于你的信息</li>
            <li>要求更正或删除你的信息</li>
            <li>停止使用我们的服务</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">联系我们</h2>
          <p className="text-gray-600">
            如果你对隐私政策有任何疑问，请联系：<br />
            <a href="mailto:hello@lifecompass.ai" className="text-purple-600 hover:underline">
              hello@lifecompass.ai
            </a>
          </p>
        </section>

        <section className="text-sm text-gray-500 mt-12">
          <p>最后更新：2026年4月3日</p>
        </section>
      </div>
    </main>
  )
}