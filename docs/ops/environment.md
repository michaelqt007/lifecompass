# LifeCompass 环境配置说明

## 1. 目的

这份文档用于统一说明 LifeCompass 当前版本所依赖的环境变量、配置位置、更新顺序，以及当前已知配置 blocker。

---

## 2. 当前核心结论

截至 2026-04-11，LifeCompass 的文本对话链路依赖：

- 环境变量：`DASHSCOPE_API_KEY`
- 上游接口：`https://coding.dashscope.aliyuncs.com/v1/chat/completions`
- 模型：`glm-5`

当前已确认的 blocker：
- 本地 `.env.local` 中存在 `DASHSCOPE_API_KEY`
- 但直接请求 DashScope 上游返回 `401 invalid_api_key`
- 因此当前文本对话失败的首要原因不是前端页面，而是 key 已失效、过期或不可用

---

## 3. 配置位置

### 3.1 本地开发

本地环境变量文件：
- `.env.local`

至少需要：

```bash
DASHSCOPE_API_KEY=你的真实 Key
```

可选：

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000/api/chat
```

### 3.2 线上部署

如果使用 Vercel：
- Project Settings
- Environment Variables

至少需要配置：
- `DASHSCOPE_API_KEY`

---

## 4. 当前变量说明

### `DASHSCOPE_API_KEY`

用途：
- 供 `src/app/api/chat/route.ts` 调用 DashScope Coding API

是否必填：
- 是

缺失或失效时的表现：
- `/api/chat` 返回兜底文案：`抱歉，我刚才走神了...`
- 上游可能返回：`401 invalid_api_key`

### `NEXT_PUBLIC_API_URL`

用途：
- 前端指定聊天 API 地址

是否必填：
- 否

未配置时：
- 默认走本地相对路径

---

## 5. 当前未启用的服务端能力

### ASR / 语音转写

当前服务端 `/api/speech-to-text` 仍未接入真实 ASR 服务。

当前预期行为：
- 上传文件后返回：
  - `error: "asr_not_configured"`

这不是当前最高优先级 blocker。
当前最高优先级 blocker 是文本对话所依赖的 `DASHSCOPE_API_KEY` 已失效。

---

## 6. 更新环境变量的正确顺序

当需要修复当前聊天链路时，建议按这个顺序操作：

1. 获取新的 DashScope API Key
2. 更新本地 `.env.local`
3. 本地重启开发服务器
4. 本地重新测试 `/api/chat`
5. 再更新 Vercel 中的 `DASHSCOPE_API_KEY`
6. 重新部署或等待平台重新生效
7. 对公开站点再次执行冒烟测试

---

## 7. 本地验证命令

更新本地 key 后，可执行：

```bash
npm run dev
```

然后测试：

```bash
curl -s http://127.0.0.1:3000/api/chat \
  -H 'Content-Type: application/json' \
  -d '{"message":"你好，小雨","conversationHistory":[]}'
```

通过标准：
- 返回 JSON
- 含 `reply`
- `reply` 不再是 `抱歉，我刚才走神了...`

---

## 8. 线上验证命令

更新线上 key 后，可测试：

```bash
curl -s https://lifecompass-phi.vercel.app/api/chat \
  -H 'Content-Type: application/json' \
  -d '{"message":"你好，小雨","conversationHistory":[]}'
```

通过标准：
- 返回 JSON
- 含 `reply`
- `reply` 不再是兜底文案

---

## 9. 当前建议

当前不建议继续优先排查前端页面逻辑。

当前最有效的下一步是：
- 立刻更换新的 `DASHSCOPE_API_KEY`
- 本地验证通过后再同步到 Vercel

---

最后更新日期：2026-04-11
