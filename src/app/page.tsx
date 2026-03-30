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
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    console.log('浏览器是否支持语音识别:', !!SpeechRecognition)
    console.log('window 对象:', window)
    
    if (SpeechRecognition) {
      try {
        recognitionRef.current = new SpeechRecognition()
        console.log('语音识别实例创建成功:', recognitionRef.current)
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = 'zh-CN'

        recognitionRef.current.onstart = () => {
          console.log('语音识别开始')
          setIsRecording(true)
        }

        recognitionRef.current.onresult = (event: any) => {
          console.log('语音识别事件:', event)
          console.log('event.results:', event.results)
          const transcript = Array.from(event.results)
            .map((result: any) => {
              console.log('result:', result)
              return result[0]
            })
            .map((result: any) => {
              console.log('transcript part:', result?.transcript)
              return result?.transcript
            })
            .filter(Boolean)
            .join('')
          
          console.log('最终识别结果:', transcript)
          if (transcript) {
            setInput(transcript)
          }
        }

        recognitionRef.current.onend = () => {
          console.log('语音识别结束')
          setIsRecording(false)
        }

        recognitionRef.current.onerror = (event: any) => {
          console.error('语音识别错误详情:', {
            error: event.error,
            message: event.message,
          })
          setIsRecording(false)
          // Android 常见错误处理
          if (event.error === 'not-allowed') {
            alert('需要麦克风权限才能语音输入，请在浏览器设置中允许麦克风访问')
          } else if (event.error === 'no-speech') {
            alert('没有检测到语音，请对着麦克风说话重试')
          } else if (event.error === 'audio-capture') {
            alert('无法访问麦克风，请检查设备权限')
          } else {
            alert(`语音识别错误：${event.error}`)
          }
        }
      } catch (err) {
        console.error('初始化语音识别失败:', err)
        alert('初始化语音识别失败，请刷新页面重试')
      }
    } else {
      console.error('浏览器不支持语音识别')
      alert('您的浏览器不支持语音输入，请使用 Chrome 浏览器')
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
            role: m.role === 'xiaoyu' ? 'assistant' : m.role,
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
  const toggleRecording = async () => {
    if (isRecording) {
      recognitionRef.current?.stop()
      setIsRecording(false)
    } else {
      // 先检查麦克风权限
      try {
        if (navigator.permissions) {
          const permissionStatus = await navigator.permissions.query({ name: 'microphone' as PermissionName })
          console.log('麦克风权限状态:', permissionStatus.state)
          if (permissionStatus.state === 'denied') {
            alert('麦克风权限被拒绝，请在浏览器设置中允许麦克风访问')
            return
          }
        }
      } catch (err) {
        console.log('无法检查麦克风权限，继续尝试')
      }

      // Android 上需要先 stop 再 start，重置状态
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop()
        } catch (err) {
          // 忽略错误
        }
        
        // 重置实例
        try {
          const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
          recognitionRef.current = new SpeechRecognition()
          recognitionRef.current.continuous = false
          recognitionRef.current.interimResults = true
          recognitionRef.current.lang = 'zh-CN'
          
          // 重新绑定事件
          recognitionRef.current.onstart = () => {
            console.log('语音识别开始')
            setIsRecording(true)
          }
          recognitionRef.current.onresult = (event: any) => {
            const transcript = Array.from(event.results)
              .map((result: any) => result[0])
              .map((result) => result.transcript)
              .filter(Boolean)
              .join('')
            if (transcript) {
              setInput(transcript)
            }
          }
          recognitionRef.current.onend = () => {
            setIsRecording(false)
          }
          recognitionRef.current.onerror = (event: any) => {
            console.error('语音识别错误:', event.error)
            setIsRecording(false)
          }
        } catch (err) {
          console.error('重置语音识别失败:', err)
        }
        
        setTimeout(() => {
          try {
            recognitionRef.current?.start()
            setIsRecording(true)
            setInput('') // 清空输入框
            console.log('语音识别启动成功')
          } catch (err: any) {
            console.error('启动语音识别失败:', err)
            let msg = '语音识别启动失败'
            if (err.name === 'NotAllowedError') {
              msg = '需要麦克风权限，请在浏览器设置中允许'
            } else if (err.name === 'InvalidStateError') {
              msg = '语音识别状态异常，请刷新页面重试'
            }
            alert(msg)
          }
        }, 200)
      } else {
        alert('您的浏览器不支持语音输入，请使用文字输入')
      }
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
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-sm text-gray-500">小雨正在思考...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 输入区域 */}
      <div className="sticky bottom-0 bg-white/80 backdrop-blur-md border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-4">
          {/* 语音模式提示 */}
          {isVoiceMode && (
            <div className="mb-2 text-center h-5">
              <p className={`text-sm ${isRecording ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
                {isRecording ? '🔴 正在录音... 说完松开' : '点击按钮开始说话'}
              </p>
            </div>
          )}

          <div className="flex items-end space-x-3">
            {/* 语音按钮 */}
            {isVoiceMode && (
              <button
                onClick={toggleRecording}
                className={`flex-shrink-0 w-12 h-12 rounded-full transition-all flex items-center justify-center text-xl ${
                  isRecording
                    ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-300'
                    : 'bg-gradient-to-br from-primary to-secondary text-white shadow-md hover:shadow-lg'
                }`}
                title={isRecording ? '停止录音' : '开始录音'}
              >
                {isRecording ? '⏹' : '🎤'}
              </button>
            )}

            {/* 输入框 */}
            <div className="flex-1 min-w-0 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isVoiceMode ? "说完松开按钮..." : "输入你想说的..."}
                className="w-full resize-none rounded-2xl border border-gray-200 px-4 py-3 input-focus bg-white/50 backdrop-blur-sm transition-all"
                rows={1}
                style={{ 
                  minHeight: '48px', 
                  maxHeight: '160px',
                }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement
                  target.style.height = 'auto'
                  target.style.height = Math.min(target.scrollHeight, 160) + 'px'
                }}
              />
            </div>

            {/* 发送按钮 */}
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className={`flex-shrink-0 w-12 h-12 rounded-full transition-all flex items-center justify-center ${
                input.trim() && !isLoading
                  ? 'bg-gradient-to-br from-primary to-secondary text-white shadow-md hover:shadow-lg'
                  : 'bg-gray-100 text-gray-300 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </div>

          {/* 提示信息 */}
          <p className="text-xs text-gray-400 text-center mt-3">
            小雨在这里陪着你，想说什么都可以 🌧
          </p>
        </div>
      </div>
    </main>
  )
}
