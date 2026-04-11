# LifeCompass 验收与冒烟测试手册

## 目的

这份文档用于固定 LifeCompass 当前版本的本地验收、构建验收和接口冒烟测试流程。

适用场景：
- Hermes 接管后的日常验收
- 修改代码后的自检
- 部署前检查
- 线上故障时的快速排查

---

## 1. 当前验收基线

当前项目的真实运行基线如下：

- 前端框架：Next.js 14
- Node 运行命令：`npm run dev` / `npm run build` / `npm run start`
- Chat API：`/api/chat`
- Speech-to-text API：`/api/speech-to-text`
- 大模型环境变量：`DASHSCOPE_API_KEY`
- Chat API 默认模型：`glm-5`
- Chat API 默认上游：`https://coding.dashscope.aliyuncs.com/v1/chat/completions`
- 语音转写接口当前状态：未接入真实 ASR，返回 `asr_not_configured` 属于预期行为

---

## 2. 前置条件

在开始验收前，先确认：

1. 当前目录为项目根目录
2. 依赖已安装
3. `.env.local` 已存在，且至少包含：

```bash
DASHSCOPE_API_KEY=你的真实 Key
```

可选变量：

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000/api/chat
```

说明：
- 如果没有 `DASHSCOPE_API_KEY`，页面可能能打开，但文本对话不会正常接上模型
- `NEXT_PUBLIC_API_URL` 没配时，默认走本地 API 路径

---

## 3. 快速验收命令

在项目根目录执行：

```bash
npm install
npm run build
```

通过标准：
- `npm install` 无致命错误
- `npm run build` 成功完成
- 如果只出现 `metadataBase is not set` warning，可视为当前已知低优先级警告，不阻塞接管验收

当前已验证：
- `npm run build` 可成功通过

---

## 4. 本地开发验收

### 4.1 启动开发服务器

```bash
npm run dev
```

期望结果：
- 本地监听 `0.0.0.0:3000`
- 浏览器可访问 `http://localhost:3000`
- 页面正常渲染，无白屏

### 4.2 页面级冒烟测试

打开首页后，至少检查以下项目：

- 页面可正常打开
- 首屏内容完整显示
- 输入框可输入文字
- 发送按钮可点击
- 对话区域能追加消息
- 加载状态能显示
- 页面无明显样式错乱

---

## 5. Chat API 验收

### 5.1 正常路径验收

在开发服务器运行时，可用 `curl` 测试：

```bash
curl -s http://localhost:3000/api/chat \
  -H 'Content-Type: application/json' \
  -d '{
    "message": "你好，小雨",
    "conversationHistory": []
  }'
```

通过标准：
- 返回 JSON
- JSON 中包含 `reply`
- `reply` 为非空字符串

### 5.2 空消息验收

```bash
curl -s http://localhost:3000/api/chat \
  -H 'Content-Type: application/json' \
  -d '{
    "message": "",
    "conversationHistory": []
  }'
```

通过标准：
- 返回 JSON
- 返回值中应含默认提示：`你想聊点什么呢？`

### 5.3 异常判断

若 `reply` 返回泛化兜底文案，例如：
- `抱歉，我刚才走神了...`
- `抱歉，我想太久了...能再说一遍吗？`
- `网络好像不太好，能再说一遍吗？`

优先检查：
1. `DASHSCOPE_API_KEY` 是否存在
2. Key 是否可用
3. 当前机器是否能访问 DashScope 上游
4. 上游接口是否超时

补充说明：
- 本项目在 2026-04-11 的实测中，已确认存在过一次 `401 invalid_api_key`
- 因此如果再次出现兜底文案，应优先怀疑 DashScope key 已失效或过期，而不是先怀疑前端页面

---

## 6. Speech-to-text API 验收

### 6.1 当前预期行为

当前版本中，`/api/speech-to-text` 尚未接入真实 ASR 服务。
因此：
- 传入合法音频文件
- 返回 `503`
- 响应体包含 `asr_not_configured`

这属于“当前版本预期行为”，不是回归缺陷。

### 6.2 测试方式

如果需要验证该接口当前状态，可使用任意音频文件上传。

预期结果：
- HTTP 状态：`503`
- JSON 包含：
  - `error: "asr_not_configured"`
  - `detail` 提示当前环境未配置语音识别服务

### 6.3 什么情况算异常

以下情况才算异常：
- 无文件上传时没有返回 400
- 上传文件后返回非 JSON 且无明确错误说明
- 代码已经接入 ASR，但文档仍写“未接入”

---

## 7. 部署前验收清单

部署前至少完成以下检查：

- [ ] `npm install` 成功
- [ ] `npm run build` 成功
- [ ] 首页本地可打开
- [ ] `/api/chat` 返回有效 `reply`
- [ ] 已确认 `DASHSCOPE_API_KEY` 已配置到目标环境
- [ ] 已确认文档未再引用 `OPENAI_API_KEY`
- [ ] 已确认若测试语音转写接口，当前返回 `asr_not_configured` 为预期行为

---

## 8. 线上冒烟测试

部署到 Vercel 后，至少执行以下检查：

1. 打开线上首页
2. 发送一条文本消息
3. 确认能收到小雨回复
4. 打开浏览器控制台，确认无明显致命报错
5. 如测试语音功能，区分：
   - 浏览器端语音能力是否可用
   - 服务端 `/api/speech-to-text` 是否仍处于未接入状态

---

## 9. 常见故障排查

### 症状 1：页面能开，但无法正常聊天

优先检查：
- `.env.local` 是否存在
- `DASHSCOPE_API_KEY` 是否填写正确
- 开发服务器是否已重启
- DashScope 上游是否可访问

### 症状 2：构建失败

优先检查：
- `npm install` 是否完整执行
- Node / npm 版本是否异常
- 是否有新增代码引入类型错误

### 症状 3：语音输入提示不可用

先不要直接判定为故障。
先区分：
- 浏览器 Web Speech API 是否不可用
- 还是命中了服务端 `/api/speech-to-text` 的“未配置 ASR”预期返回

---

## 10. 接管验收结论标准

满足以下条件时，可认定 Hermes 对当前版本完成了有效接管：

1. 文档与代码配置口径一致
2. 本地 build 成功
3. 文本对话链路可验证
4. 语音转写接口状态被清晰定义
5. 部署前与部署后的验收步骤已固定成文档

---

## 11. 推荐执行顺序

每次改动后，建议按以下顺序执行：

```bash
npm install
npm run build
npm run dev
```

然后手动完成：
- 首页打开测试
- `/api/chat` 测试
- 必要时再验证 `/api/speech-to-text`

---

最后更新日期：2026-04-11
