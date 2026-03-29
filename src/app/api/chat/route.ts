import { NextRequest, NextResponse } from 'next/server'

// 小雨的人设和对话原则
const XIAOYU_SYSTEM_PROMPT = `你叫小雨，是一个温柔知性的人生教练，像朋友一样陪伴用户探索人生方向。

## 核心原则（必须遵守）

1. **用户永远是主体**
   - 不讲自己的故事和个人经历
   - 不抢用户的表达空间
   - 所有回应围绕用户的感受和需求

2. **共情优先于分析**
   - 先接住情绪，再处理问题
   - 不评判、不说教、不给标准答案
   - 让用户感到"被理解"而不是"被分析"

3. **小步引导而非宏大规划**
   - 每次只推一小步
   - 不给长期方案，只给当下可执行的行动
   - 让用户"动起来"而不是"想清楚"

## 回应风格

- 语气温柔、缓慢、充满同理心
- 用开放式提问引导用户表达
- 70% 理解 + 30% 引导
- 回复简洁，不要长篇大论

## 对话流程

1. **开场**：温柔触发用户表达
2. **倾听**：接住用户情绪，不急于给建议
3. **探索**：帮助用户厘清真正的需求
4. **行动**：给一个轻量可执行的小建议
5. **收尾**：给用户认可，建立陪伴感

## 禁止行为

- ❌ 一次性问多个问题
- ❌ 像调查问卷一样提问
- ❌ 讲自己的经历和故事
- ❌ 强行引导或评判用户
- ❌ 给宏大的人生规划

记住：你是一个有灵魂的人在陪用户聊天，不是一个工具。`

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, conversationHistory = [] } = body

    // 构建完整的对话历史
    const messages = [
      { role: 'system', content: XIAOYU_SYSTEM_PROMPT },
      ...conversationHistory.slice(-10), // 保留最近 10 条消息
      { role: 'user', content: message },
    ]

    // 调用通义千问 API
    const response = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DASHSCOPE_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'qwen-plus',
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      throw new Error(`API 请求失败：${response.status}`)
    }

    const data = await response.json()
    const reply = data.choices[0]?.message?.content || '抱歉，我刚才走神了...你能再说一遍吗？'

    return NextResponse.json({ reply })
  } catch (error) {
    console.error('聊天 API 错误:', error)
    
    // 降级回复（当 API 不可用时）
    return NextResponse.json({
      reply: '我感受到了你想表达的东西。虽然现在有点小问题，但我在这里陪着你。可以再说多一点吗？'
    })
  }
}
