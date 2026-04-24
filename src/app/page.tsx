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
  const [showCompatWarning, setShowCompatWarning] = useState(false)
  const [voiceError, setVoiceError] = useState('')

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const recordedChunksRef = useRef<Blob[]>([])
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const autoResizeTextarea = () => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`
  }

  const resetTextarea = () => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = '48px'
    el.scrollTop = 0
  }

  const bindRecognitionEvents = (recognition: any) => {
    let resultTimeout: any = null

    const clearTimeouts = () => {
      if (resultTimeout) {
        clearTimeout(resultTimeout)
        resultTimeout = null
      }
    }

    recognition.onstart = () => {
      setIsRecording(true)
      setVoiceError('')

      resultTimeout = setTimeout(() => {
        setShowCompatWarning(true)
      }, 5000)
    }

    recognition.onresult = (event: any) => {
      clearTimeouts()
      setShowCompatWarning(false)

      let text = ''

      for (let i = event.resultIndex || 0; i < event.results.length; i++) {
        const result = event.results[i]
        if (!result || !result[0]) continue
        text += result[0].transcript || ''
      }

      const transcript = text.trim()
      if (!transcript) return

      setInput(transcript)

      requestAnimationFrame(() => {
        const el = textareaRef.current
        if (!el) return
        el.value = transcript
        autoResizeTextarea()
        el.focus()
      })
    }

    recognition.onend = () => {
      clearTimeouts()
      setIsRecording(false)
      if ((recognition as any)._audioStream) {
        ;(recognition as any)._audioStream.getTracks().forEach((track: any) => track.stop())
      }
    }

    recognition.onerror = (event: any) => {
      clearTimeouts()
      setIsRecording(false)

      if (event?.error === 'aborted') return

      if (event?.error === 'not-allowed') {
        setVoiceError('需要麦克风权限，请在浏览器设置中允许')
      } else if (event?.error === 'audio-capture') {
        setVoiceError('无法访问麦克风，请检查设备权限')
      }
    }
  }

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

    if (!SpeechRecognition) return

    try {
      const recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = true
      recognition.lang = 'zh-CN'
      bindRecognitionEvents(recognition)
      recognitionRef.current = recognition
    } catch {
      // ignore
    }
  }, [])

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
    requestAnimationFrame(() => resetTextarea())
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          conversationHistory: messages.slice(-10).map((m) => ({
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
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'xiaoyu',
        content: '抱歉，我遇到了一点问题。请稍后再试，我会一直在这里陪着你。',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      requestAnimationFrame(() => resetTextarea())
    }
  }

  const uploadRecordedAudio = async (audioBlob: Blob) => {
    const formData = new FormData()
    formData.append('file', audioBlob, 'recording.webm')

    const response = await fetch('/api/speech-to-text', {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()
    if (!response.ok) {
      throw new Error(data?.detail || data?.error || '语音识别失败')
    }

    const transcript = String(data?.transcript || '').trim()
    if (!transcript) {
      throw new Error('没有识别到语音内容')
    }

    setInput(transcript)
    requestAnimationFrame(() => {
      const el = textareaRef.current
      if (!el) return
      el.value = transcript
      autoResizeTextarea()
      el.focus()
    })
  }

  const startMediaRecorderFallback = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
      ? 'audio/webm;codecs=opus'
      : 'audio/webm'

    recordedChunksRef.current = []
    const mediaRecorder = new MediaRecorder(stream, { mimeType })
    mediaRecorderRef.current = mediaRecorder

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) recordedChunksRef.current.push(event.data)
    }

    mediaRecorder.onstop = async () => {
      setIsRecording(false)
      stream.getTracks().forEach((track) => track.stop())

      const audioBlob = new Blob(recordedChunksRef.current, { type: mimeType })
      recordedChunksRef.current = []

      if (!audioBlob.size) {
        setVoiceError('没有录到有效音频，请重试')
        return
      }

      try {
        await uploadRecordedAudio(audioBlob)
        setVoiceError('')
      } catch (error: any) {
        const message = error?.message || '当前环境还没有可用的语音识别服务配置'
        setVoiceError(message)
        if (message.includes('语音识别服务配置') || message.includes('asr_not_configured')) {
          setIsVoiceMode(false)
          requestAnimationFrame(() => textareaRef.current?.focus())
        }
      }
    }

    mediaRecorder.start()
    setIsRecording(true)
    setVoiceError('')
  }

  const toggleRecording = async () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

    if (isRecording) {
      setShowCompatWarning(false)

      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop()
      } else {
        recognitionRef.current?.stop()
        setIsRecording(false)
      }
      return
    }

    try {
      if (navigator.permissions) {
        const permissionStatus = await navigator.permissions.query({
          name: 'microphone' as PermissionName,
        })
        if (permissionStatus.state === 'denied') {
          setVoiceError('麦克风权限被拒绝，请在浏览器设置中允许麦克风访问')
          return
        }
      }
    } catch {
      // ignore
    }

    const ua = navigator.userAgent
    const isKnownBadSpeechBrowser =
      ua.includes('MiuiBrowser') || ua.includes('XiaoMi') || ua.includes('baiduboxapp') || ua.includes('Baidu')

    if (!SpeechRecognition || isKnownBadSpeechBrowser) {
      try {
        await startMediaRecorderFallback()
      } catch {
        setVoiceError('无法访问麦克风，请检查设备权限')
        setIsVoiceMode(false)
      }
      return
    }

    let audioStream: MediaStream | null = null
    try {
      audioStream = await navigator.mediaDevices.getUserMedia({ audio: true })
    } catch {
      setVoiceError('无法访问麦克风，请检查设备权限')
      return
    }

    try {
      recognitionRef.current?.stop()
    } catch {
      // ignore
    }

    try {
      const recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = true
      recognition.lang = 'zh-CN'
      ;(recognition as any)._audioStream = audioStream
      bindRecognitionEvents(recognition)
      recognitionRef.current = recognition
    } catch {
      if (audioStream) {
        audioStream.getTracks().forEach((track) => track.stop())
      }
      try {
        await startMediaRecorderFallback()
      } catch {
        setVoiceError('语音识别初始化失败，且录音模式启动失败')
      }
      return
    }

    setInput('')
    requestAnimationFrame(() => resetTextarea())

    setTimeout(() => {
      try {
        recognitionRef.current?.start()
      } catch {
        setIsRecording(false)
        setVoiceError('语音识别启动失败，建议改用录音上传识别')
      }
    }, 300)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-background to-white">
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

          <button
            onClick={() => setIsVoiceMode(!isVoiceMode)}
            className={`px-3 py-1.5 rounded-full text-sm transition-all ${
              isVoiceMode ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            🎤 语音
          </button>

          <a
            href="/blog"
            className="px-3 py-1.5 rounded-full text-sm bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
          >
            📖 博客
          </a>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
          {messages.length === 0 && (
            <div className="message-xiaoyu voice-wave">
              <p className="text-gray-800">{OPENING_MESSAGE}</p>
            </div>
          )}

          {messages.map((message) => (
            <div key={message.id} className={message.role === 'user' ? 'message-user' : 'message-xiaoyu'}>
              <p className={message.role === 'user' ? 'text-white' : 'text-gray-800'}>
                {message.content}
              </p>
            </div>
          ))}

          {isLoading && (
            <div className="message-xiaoyu">
              <p className="text-gray-500">小雨正在思考...</p>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="sticky bottom-0 bg-white/80 backdrop-blur-md border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-4">
          {isVoiceMode && (
            <div className="mb-2 text-center">
              <p className={`text-sm ${isRecording ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
                {isRecording ? '🔴 正在录音... 说完松开' : '点击按钮开始说话'}
              </p>
              {showCompatWarning && (
                <p className="text-xs text-red-500 mt-2 font-medium">
                  ⚠️ 当前浏览器语音识别兼容性较差，但服务器端 ASR 还未配置完成，暂时请先使用文字输入
                </p>
              )}
              {voiceError && (
                <p className="text-xs text-red-500 mt-2 font-medium">{voiceError}</p>
              )}
            </div>
          )}

          <div className="flex items-end space-x-3 w-full">
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

            <div className="flex-1 min-w-0 relative">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value)
                  requestAnimationFrame(() => autoResizeTextarea())
                }}
                onKeyPress={handleKeyPress}
                placeholder={isVoiceMode ? '说完松开按钮...' : '输入你想说的...'}
                className="w-full resize-none rounded-2xl border border-gray-200 px-4 py-3 input-focus bg-white/50 backdrop-blur-sm transition-all text-left leading-6"
                rows={1}
                style={{
                  minHeight: '48px',
                  maxHeight: '160px',
                  overflowY: 'auto',
                  boxSizing: 'border-box',
                  whiteSpace: 'pre-wrap',
                  overflowWrap: 'anywhere',
                  wordBreak: 'break-word',
                }}
              />
            </div>

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

          <p className="text-xs text-gray-400 text-center mt-3">
            小雨在这里陪着你，想说什么都可以 🌧
          </p>

          <footer className="mt-8 pt-4 border-t border-gray-100 text-center">
            <nav className="flex justify-center space-x-4 text-xs text-gray-400">
              <a href="/about" className="hover:text-purple-600">关于我们</a>
              <span>·</span>
              <a href="/features" className="hover:text-purple-600">功能介绍</a>
              <span>·</span>
              <a href="/privacy" className="hover:text-purple-600">隐私政策</a>
            </nav>
            <p className="text-xs text-gray-300 mt-2">
              © 2026 LifeCompass. All rights reserved.
            </p>
          </footer>
        </div>
      </div>
    </main>
  )
}
