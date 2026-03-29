'use client'

import { useState, useRef, useEffect } from 'react'

// 消息类型
type Message = {
  id: string
  role: 'user' | 'xiaoyu'
  content: string
  timestamp: Date
}

// 小雨的开场白
const OPENING_MESSAGE = "有时候我们以为自己在找答案，其实是在遇见一个'愿意停下来聆听自己的时刻'。"

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isVoiceMode, setIsVoiceMode] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)

  // 滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // 初始化语音识别
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = 'zh-CN'

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join('')
        
        setInput(transcript)
      }

      recognitionRef.current.onend = () => {
        setIsRecording(false)
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error('语音识别错误:', event.error)
        setIsRecording(false)
      }
    }
  }, [])

  // 发送消息
  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // 调用 API 获取小雨的回复
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          conversationHistory: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      const data = await response.json()

      const xiaoyuMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'xiaoyu',
        content: data.reply,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, xiaoyuMessage])

      // 如果是语音模式，朗读回复
      if (isVoiceMode && data.reply) {
        speak(data.reply)
      }
    } catch (error) {
      console.error('发送消息失败:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'xiaoyu',
        content: '抱歉，我遇到了一点问题。请稍后再试，我会一直在这里陪着你。',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // 语音合成（TTS）
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'zh-CN'
      utterance.rate = 0.9 // 稍慢一点，更温柔
      utterance.pitch = 1.0
      
      // 尝试选择女声
      const voices = speechSynthesis.getVoices()
      const femaleVoice = voices.find(
        (voice) => voice.lang.includes('zh') && (voice.name.includes('Female') || voice.name.includes('女'))
      )
      if (femaleVoice) {
        utterance.voice = femaleVoice
      }

      speechSynthesis.speak(utterance)
    }
  }

  // 开始/停止录音
  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop()
      setIsRecording(false)
    } else {
      recognitionRef.current?.start()
      setIsRecording(true)
      setInput('') // 清空输入框
    }
  }

  // 处理回车发送
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-background to-white">
      {/* 头部 */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-white text-lg">🌧</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-800">LifeCompass</h1>
              <p className="text-xs text-gray-500">小雨 · 你的人生教练</p>
            </div>
          </div>
          
          {/* 语音/文字切换 */}
          <button
            onClick={() => setIsVoiceMode(!isVoiceMode)}
            className={`px-3 py-1.5 rounded-full text-sm transition-all ${
              isVoiceMode
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {isVoiceMode ? '🎤 语音' : '⌨️ 文字'}
          </button>
        </div>
      </header>

      {/* 对话区域 */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
          {/* 开场白 */}
          {messages.length === 0 && (
            <div className="message-xiaoyu voice-wave">
              <p className="text-gray-800">{OPENING_MESSAGE}</p>
            </div>
          )}

          {/* 消息列表 */}
          {messages.map((message) => (
            <div
              key={message.id}
              className={message.role === 'user' ? 'message-user' : 'message-xiaoyu'}
            >
              <p className={message.role === 'user' ? 'text-white' : 'text-gray-800'}>
                {message.content}
              </p>
            </div>
          ))}

          {/* 加载中 */}
          {isLoading && (
            <div className="message-xiaoyu">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 输入区域 */}
      <div className="sticky bottom-0 bg-white/80 backdrop-blur-md border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-end space-x-3">
            {/* 语音按钮 */}
            {isVoiceMode && (
              <button
                onClick={toggleRecording}
                className={`p-3 rounded-full transition-all ${
                  isRecording
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {isRecording ? '🔴' : '🎤'}
              </button>
            )}

            {/* 输入框 */}
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isVoiceMode ? "按住说话，或直接输入..." : "输入你想说的..."}
              className="flex-1 resize-none rounded-2xl border border-gray-200 px-4 py-3 input-focus"
              rows={1}
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />

            {/* 发送按钮 */}
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className={`p-3 rounded-full transition-all ${
                input.trim() && !isLoading
                  ? 'bg-primary text-white hover:bg-primary/80'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>

          {/* 提示信息 */}
          <p className="text-xs text-gray-400 text-center mt-2">
            小雨在这里陪着你，想说什么都可以 🌧
          </p>
        </div>
      </div>
    </main>
  )
}
