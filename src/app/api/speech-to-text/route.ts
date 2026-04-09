import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'missing audio file' }, { status: 400 })
    }

    const apiKey = process.env.DASHSCOPE_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'missing DASHSCOPE_API_KEY' }, { status: 500 })
    }

    const upstreamForm = new FormData()
    upstreamForm.append('file', file, file.name || 'recording.webm')
    upstreamForm.append('model', 'paraformer-realtime-v2')

    const response = await fetch('https://dashscope.aliyuncs.com/api/v1/services/audio/asr/transcription', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: upstreamForm,
    })

    const text = await response.text()

    if (!response.ok) {
      return NextResponse.json(
        { error: 'asr upstream failed', detail: text },
        { status: response.status },
      )
    }

    let transcript = ''
    try {
      const data = JSON.parse(text)
      transcript =
        data?.output?.text ||
        data?.data?.result ||
        data?.result?.text ||
        data?.text ||
        ''
    } catch {
      transcript = text
    }

    return NextResponse.json({ transcript: String(transcript || '').trim() })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'speech to text failed', detail: error?.message || 'unknown error' },
      { status: 500 },
    )
  }
}
