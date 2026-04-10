import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

const ASR_NOT_CONFIGURED_MESSAGE = '当前环境还没有可用的语音识别服务配置，请先补齐 ASR key 或接入可用转写服务。'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'missing audio file' }, { status: 400 })
    }

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
