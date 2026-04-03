import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LifeCompass - 你的人生教练',
  description: '小雨是一个温柔的人生教练 AI，陪你探索人生方向，理清思绪，找到内心的答案。',
  keywords: ['人生教练', 'AI教练', '人生规划', '心理咨询', '成长陪伴', 'LifeCompass', '小雨'],
  authors: [{ name: 'LifeCompass Team' }],
  creator: 'LifeCompass',
  publisher: 'LifeCompass',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://lifecompass-phi.vercel.app',
    siteName: 'LifeCompass',
    title: 'LifeCompass - 你的人生教练',
    description: '小雨是一个温柔的人生教练 AI，陪你探索人生方向，理清思绪，找到内心的答案。',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LifeCompass - 你的人生教练',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LifeCompass - 你的人生教练',
    description: '小雨是一个温柔的人生教练 AI，陪你探索人生方向，理清思绪，找到内心的答案。',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
