# 配置 LifeCompass API Key 教程

## 当前结论

LifeCompass 当前文本对话主链路优先使用 DeepSeek。

请优先配置：

```bash
DEEPSEEK_API_KEY=你的 DeepSeek API Key
```

`DASHSCOPE_API_KEY` 只是备用兼容变量。不要把 DeepSeek key 填到 `DASHSCOPE_API_KEY`。

---

## 步骤 1：创建 DeepSeek API Key

1. 打开：https://platform.deepseek.com/api_keys
2. 登录 DeepSeek 开放平台账号
3. 创建新的 API Key
4. 复制保存。Key 只展示一次，请不要发到公开仓库

---

## 步骤 2：填入本地项目

在项目根目录创建或编辑 `.env.local`：

```bash
DEEPSEEK_API_KEY=你的 DeepSeek API Key
```

可选：如果要指定模型，可增加：

```bash
DEEPSEEK_MODEL=deepseek-chat
```

命令行写入示例：

```bash
cd /root/.openclaw.pre-migration/workspace/lifecompass/web
printf 'DEEPSEEK_API_KEY=你的 DeepSeek API Key\n' > .env.local
```

---

## 步骤 3：重启开发服务器

```bash
npm run dev
```

如果开发服务器已经在运行，先停止后重启，确保新的环境变量生效。

---

## 步骤 4：本地验证

```bash
curl -s http://127.0.0.1:3000/api/chat \
  -H 'Content-Type: application/json' \
  -d '{"message":"你好，小雨","conversationHistory":[]}'
```

通过标准：返回 JSON，包含 `reply`，且不再是兜底文案。

---

## 步骤 5：Vercel 配置

在 Vercel 项目中进入：

Settings → Environment Variables

添加：

```bash
DEEPSEEK_API_KEY=你的 DeepSeek API Key
```

保存后重新部署 Production。

---

## DashScope 备用链路

只有在你明确要使用阿里云 DashScope/Coding API 时，才配置：

```bash
DASHSCOPE_API_KEY=你的 DashScope API Key
```

DashScope key 获取地址：
https://dashscope.console.aliyun.com/apiKey

注意：DeepSeek key 和 DashScope key 不能混用。

---

## 常见问题

### Q: API Key 泄露了怎么办？

A: 立刻在对应平台删除这个 Key，重新创建一个。

### Q: `.env.local` 要上传到 Git 吗？

A: 不要。`.env.local` 应该保留在本地或部署平台环境变量里。

### Q: 手机端语音输入还是不工作，是 API Key 问题吗？

A: 不一定。文本对话用 `DEEPSEEK_API_KEY`，语音转文字接口 `/api/speech-to-text` 目前还没有接入真实 ASR 服务。