import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

const ASR_NOT_CONFIGURED_MESSAGE = '当前环境还没有可用的语音识别服务配置，请先补齐 ASR key 或接入可用转写服务。'
const DEFAULT_TRANSCRIPTION_MODEL = 'whisper-1'

async function transcribeWithOpenAI(file: File) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return null

  const formData = new FormData()
  formData.append('file', file, file.name || 'recording.webm')
  formData.append('model', process.env.OPENAI_TRANSCRIBE_MODEL || DEFAULT_TRANSCRIPTION_MODEL)
  formData.append('language', 'zh')

  const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    body: formData,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const message = data?.error?.message || data?.detail || 'OpenAI transcription failed'
    return NextResponse.json(
      { error: 'asr_upstream_failed', detail: message },
      { status: response.status },
    )
  }

  const transcript = String(data?.text || '').trim()
  if (!transcript) {
    return NextResponse.json(
      { error: 'empty_transcript', detail: '没有识别到语音内容，请靠近麦克风再试一次。' },
      { status: 422 },
    )
  }

  return NextResponse.json({ transcript })
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || ''
    if (!contentType.includes('multipart/form-data') && !contentType.includes('application/x-www-form-urlencoded')) {
      return NextResponse.json({ error: 'missing audio file' }, { status: 400 })
    }

    const formData = await request.formData()
    const file = formData.get('file')

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'missing audio file' }, { status: 400 })
    }

    const openAIResult = await transcribeWithOpenAI(file)
    if (openAIResult) return openAIResult

    return NextResponse.json(
      {
        error: 'asr_not_configured',
        detail: ASR_NOT_CONFIGURED_MESSAGE,
      },
      { status: 503 },
    )
  } catch (error: any) {
    return NextResponse.json(
      { error: 'speech to text failed', detail: error?.message || 'unknown error' },
      { status: 500 },
    )
  }
}
