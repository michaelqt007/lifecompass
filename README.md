# LifeCompass Web - 你的人生教练

一个用 AI 共创的人生操作系统，从自用开始，公开进化，吸引同频者共建。

## 🌧 关于小雨

小雨是一个温柔知性的人生教练，像朋友一样陪伴用户探索人生方向。

**核心原则：**
- 用户永远是主体
- 共情优先于分析
- 小步引导而非宏大规划

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env.local`：

```bash
cp .env.example .env.local
```

编辑 `.env.local`，填入你的大模型 API Key：

```
OPENAI_API_KEY=your_api_key_here
```

### 3. 启动开发服务器

```bash
npm run dev
```

打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 📦 部署

### Vercel 一键部署

1. 安装 Vercel CLI：
```bash
npm i -g vercel
```

2. 部署：
```bash
vercel
```

3. 在 Vercel 控制台配置环境变量 `OPENAI_API_KEY`

## 🎤 功能特性

- **语音对话**：支持语音输入和输出（Web Speech API）
- **文字输入**：可随时切换文字模式
- **温柔陪伴**：小雨的语气温柔、知性、有共情力
- **行动引导**：每轮对话引导用户做一个小行动
- **对话记录**：自动保存对话历史

## 🛠 技术栈

- **前端**：Next.js 14 + React 18
- **样式**：Tailwind CSS
- **语音**：Web Speech API（浏览器原生）
- **AI**：OpenAI GPT-4（可替换）
- **部署**：Vercel

## 📝 开发说明

### 修改小雨人设

编辑 `src/app/api/chat/route.ts` 中的 `XIAOYU_SYSTEM_PROMPT`

### 更换大模型服务

在 `src/app/api/chat/route.ts` 中修改 API 调用逻辑

### 自定义 UI

编辑 `src/app/page.tsx` 和 `src/app/globals.css`

## 📄 License

MIT

---

**LifeCompass** - 陪你慢慢变清晰，并推动你行动的人生教练 🌧
