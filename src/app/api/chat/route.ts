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
  const requestId = Date.now().toString()
  
  try {
    console.log(`[💬 Chat API] === 请求开始 ID: ${requestId} ===`)
    
    const body = await request.json()
    const { message, conversationHistory = [] } = body
    
    console.log(`[💬 Chat API] 用户消息：${message?.substring(0, 50)}...`)
    console.log(`[💬 Chat API] API Key 是否存在：${!!process.env.DASHSCOPE_API_KEY}`)
    console.log(`[💬 Chat API] API Key 前缀：${process.env.DASHSCOPE_API_KEY?.substring(0, 10)}...`)

    // 构建完整的对话历史
    const messages = [
      { role: 'system', content: XIAOYU_SYSTEM_PROMPT },
      ...conversationHistory.slice(-10),
      { role: 'user', content: message },
    ]
    
    console.log(`[💬 Chat API] 消息数量：${messages.length}`)

    // 调用阿里云百炼 API（Coding Plan 专属地址）
    const apiUrl = 'https://coding.dashscope.aliyuncs.com/v1/chat/completions'
    console.log(`[💬 Chat API] 请求 URL: ${apiUrl}`)
    
    // 使用 qwen3.5-plus 模型（Coding Plan 支持，最强能力）
    const requestBody = {
      model: 'qwen3.5-plus',
      messages: messages,
      max_tokens: 500,
      temperature: 0.7,
    }
    
    console.log(`[💬 Chat API] 请求体：${JSON.stringify(requestBody).substring(0, 200)}...`)

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DASHSCOPE_API_KEY}`,
      },
      body: JSON.stringify(requestBody),
    })

    console.log(`[💬 Chat API] 响应状态码：${response.status} ${response.statusText}`)
    
    const responseText = await response.text()
    console.log(`[💬 Chat API] 响应内容：${responseText.substring(0, 500)}...`)

    if (!response.ok) {
      console.error(`[💬 Chat API] ❌ API 请求失败：${response.status}`)
      console.error(`[💬 Chat API] 错误详情：${responseText}`)
      throw new Error(`API 请求失败：${response.status} - ${responseText}`)
    }

    const data = JSON.parse(responseText)
    
    // DashScope 兼容模式返回结构（OpenAI 兼容格式）
    const reply = data.choices?.[0]?.message?.content || data.output?.text
    
    if (!reply) {
      console.warn(`[💬 Chat API] ⚠️ 返回数据中没有找到回复内容`)
      console.log(`[💬 Chat API] 完整返回：${JSON.stringify(data)}`)
    }
    
    console.log(`[💬 Chat API] ✅ 回复内容：${reply?.substring(0, 50)}...`)

    return NextResponse.json({ reply: reply || '抱歉，我刚才走神了...你能再说一遍吗？' })
    
  } catch (error: any) {
    console.error(`[💬 Chat API] ❌ 异常：${error.message}`)
    console.error(`[💬 Chat API] 错误堆栈：${error.stack}`)
    
    // 降级回复（当 API 不可用时）
    return NextResponse.json({
      reply: `抱歉，遇到了一点问题：${error.message}. 小雨在这里陪着你，可以再说多一点吗？`
    })
  }
}
