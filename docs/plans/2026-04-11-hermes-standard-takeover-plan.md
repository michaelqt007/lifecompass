# LifeCompass Hermes 标准接管实施方案

> **For Hermes:** 按此文档作为接管 runbook 执行；先做只读核查，再做最小改动修正，最后再切流。

**Goal:** 让 Hermes 在不打断现有 LifeCompass 服务的前提下，完整接管项目上下文、仓库、环境、验证流程与后续运维入口。

**Architecture:** 采用“资产盘点 → 配置归一 → 本地验收 → 部署验收 → 切换接管权”的标准方案。先保留 OpenClaw 归档数据作为只读证据源，再以 GitHub 仓库 `michaelqt007/lifecompass` 和当前可构建代码作为新的主线，最后把运行、配置、文档、后续入口统一到 Hermes。

**Tech Stack:** Next.js 14, React 18, Tailwind CSS, Vercel, DashScope Coding API (`glm-5`), Hermes Agent, GitHub

---

## 一、当前已确认事实

1. OpenClaw 历史数据已归档到：`/root/.openclaw.pre-migration`
2. LifeCompass 项目目录存在：`/root/.openclaw.pre-migration/workspace/lifecompass/web`
3. 该目录是 git 仓库，远端为：`https://github.com/michaelqt007/lifecompass.git`
4. 远端仓库可访问，`main` 分支存在
5. 本地 `npm run build` 已成功，说明项目当前可被接管、可构建
6. 当前发现一个配置/文档不一致：
   - `README.md` 仍写 `OPENAI_API_KEY`
   - `.env.example` 和 `src/app/api/chat/route.ts` 实际使用 `DASHSCOPE_API_KEY`
7. `src/app/api/speech-to-text/route.ts` 当前明确返回 `asr_not_configured`，说明语音输入尚未真正接入服务端 ASR

---

## 二、标准接管目标定义

Hermes 接管后，应满足以下 6 个标准：

1. **代码主线唯一**
   - GitHub 仓库作为唯一事实来源
   - OpenClaw 目录仅作为归档，不再继续开发

2. **配置口径唯一**
   - 文档、示例环境变量、运行时代码使用同一套变量名
   - 明确区分“必填”和“可选”变量

3. **验证流程唯一**
   - 本地验证命令固定
   - 部署验证 checklist 固定
   - 故障排查入口固定

4. **运维入口唯一**
   - 由 Hermes 接管项目说明、接管 runbook、后续 TODO
   - 后续优先在 Hermes 中继续维护记忆、技能与项目文档

5. **风险最小化**
   - 不直接覆盖旧目录
   - 不先动线上，再修文档
   - 先校准配置，再做功能扩展

6. **可回滚**
   - 保留 `.openclaw.pre-migration`
   - 保留 Git 历史
   - 每次改动小步提交

---

## 三、接管范围

### 纳入 Hermes 接管

- 项目代码：`/root/.openclaw.pre-migration/workspace/lifecompass/web`
- 远端仓库：`michaelqt007/lifecompass`
- 环境配置：`.env.example` / `.env.local` / Vercel 环境变量
- 运行文档：`README.md` / 部署文档 / 接管文档
- 产品上下文：小雨人设、LifeCompass MVP 已上线信息

### 暂不纳入第一阶段

- OpenClaw 扩展开发目录
- 旧插件 runtime
- 非 LifeCompass 的历史实验项目
- 任何需要额外外部授权的第三方系统改造

---

## 四、标准接管阶段

### Phase 0：冻结与标记

**Objective:** 明确主项目、归档旧环境、避免“双写”

**Files:**
- Read-only: `/root/.openclaw.pre-migration/**`
- Working repo: `/root/.openclaw.pre-migration/workspace/lifecompass/web`

**Step 1: 认定主仓库**
- 主仓库：`michaelqt007/lifecompass`
- 主分支：`main`
- 主工作目录：`/root/.openclaw.pre-migration/workspace/lifecompass/web`

**Step 2: 标记旧目录只读用途**
- 约定：`.openclaw.pre-migration` 仅用于回溯，不再作为开发主目录来源

**Step 3: 接管验收标准**
- 代码能本地 build
- 环境变量说明一致
- 部署文档可执行
- API 路由状态清楚（可用/未接入）

---

### Phase 1：资产盘点

**Objective:** 把 Hermes 需要持续掌握的资产列成清单

**Files:**
- Read: `README.md`
- Read: `.env.example`
- Read: `src/app/api/chat/route.ts`
- Read: `src/app/api/speech-to-text/route.ts`
- Read: `Vercel 部署教程.md`
- Read: `开发计划.md`

**Step 1: 记录运行面资产**
- Web 应用：Next.js 14
- Chat API：`src/app/api/chat/route.ts`
- Speech-to-text API：`src/app/api/speech-to-text/route.ts`
- 部署平台：Vercel

**Step 2: 记录配置面资产**
- 关键变量：`DASHSCOPE_API_KEY`
- 可选变量：`NEXT_PUBLIC_API_URL`
- 待定义：是否需要 TTS / ASR 供应商变量

**Step 3: 记录仓库面资产**
- Remote: `origin https://github.com/michaelqt007/lifecompass.git`
- Branch: `main`

**Step 4: 记录风险项**
- README 与代码变量名不一致
- ASR 实际未接入
- 可能缺少正式的接管/运维文档

---

### Phase 2：配置归一化

**Objective:** 统一“代码 / README / 环境变量 / 部署文档”口径

**Files:**
- Modify: `README.md`
- Modify: `.env.example`
- Optional modify: `Vercel 部署教程.md`
- Optional create: `docs/ops/environment.md`

**Step 1: 修正文档变量名**
- 把 README 中的 `OPENAI_API_KEY` 改成实际使用的 `DASHSCOPE_API_KEY`
- 若后续决定改回 OpenAI SDK，再同步改代码，不允许文档和代码长期分叉

**Step 2: 明确变量分层**
- 必填：`DASHSCOPE_API_KEY`
- 可选：`NEXT_PUBLIC_API_URL`
- 未启用：ASR/TTS 相关变量（如没有，就在文档里写“暂未接入”）

**Step 3: 固化部署口径**
- 本地：`.env.local`
- Vercel：Project Settings → Environment Variables
- 不把真实密钥写入仓库

**Step 4: 增加故障提示映射**
- Chat 接口失败 → 检查 `DASHSCOPE_API_KEY`
- Speech-to-text 返回 `asr_not_configured` → 属于预期状态，不算线上异常

**Verification:**
- README、`.env.example`、代码中的变量名一致
- 新人只看文档即可完成本地启动

---

### Phase 3：本地验收标准化

**Objective:** 形成固定的 Hermes 接管验收命令

**Files:**
- Optional create: `docs/ops/verification.md`

**Step 1: 安装依赖**
Run:
```bash
npm install
```

**Step 2: 本地开发启动**
Run:
```bash
npm run dev
```

**Step 3: 生产构建验证**
Run:
```bash
npm run build
```
Expected:
- 构建成功
- 若只有 `metadataBase` warning，可暂列为低优先级优化

**Step 4: 核查 API 行为**
- `/api/chat`：在配置正确 key 后应返回模型回复
- `/api/speech-to-text`：当前应明确返回未配置提示

**Step 5: 定义接管通过条件**
- 本地 dev 可启动
- build 成功
- 关键 API 状态可解释
- 文档与代码一致

---

### Phase 4：部署验收

**Objective:** 确认线上部署仍与当前代码口径一致

**Files:**
- Read/Modify: `vercel.json`
- Read/Modify: `Vercel 部署教程.md`

**Step 1: 核查 Vercel 环境变量**
- `DASHSCOPE_API_KEY` 是否已配置
- 是否存在过期或误导性的 `OPENAI_API_KEY` 说明

**Step 2: 核查线上域名**
- 现有记忆显示站点：`https://lifecompass-phi.vercel.app`
- 需要确认其对应仓库/项目仍指向当前主仓库

**Step 3: 线上冒烟测试**
- 首页可访问
- 发起一次文本对话
- 验证 API 正常返回
- 语音输入若报“未配置”，应与产品预期一致

**Step 4: 明确上线状态说明**
- 若语音输入仍依赖浏览器 Web Speech API 或尚未接入服务端 ASR，需要在文档中写清楚“支持范围”

---

### Phase 5：Hermes 正式接管

**Objective:** 让 Hermes 成为该项目的默认维护代理

**Files:**
- Create: `docs/ops/hermes-handover.md`
- Optional modify: `AGENTS.md`（若未来迁入新的正式 workspace）

**Step 1: 写明接管原则**
- Hermes 负责：项目盘点、文档维护、环境核查、验收 checklist、后续实现规划
- GitHub 为代码事实源
- Vercel 为部署事实源

**Step 2: 写明日常入口**
- 看状态：`git status`
- 本地验证：`npm run build`
- 部署核查：Vercel dashboard
- 功能核查：`/api/chat` 与页面交互

**Step 3: 写明后续优先级**
1. 修复 README / `.env.example` 口径不一致
2. 明确 ASR 能力是“未接入”还是“待接入”
3. 补充正式运维文档
4. 如需持续开发，再迁入新的 Hermes 正式 workspace

---

## 五、当前建议的最小执行清单

按标准方案，建议先只做这 4 件事：

1. 修 README，把 `OPENAI_API_KEY` 改为 `DASHSCOPE_API_KEY`
2. 补一份 `docs/ops/verification.md`，固定 build / smoke test 步骤
3. 补一份 `docs/ops/hermes-handover.md`，明确 Hermes 已接管哪些内容
4. 复核 Vercel 项目变量与线上站点是否仍对应当前仓库

---

## 六、当前接管结论

结论：LifeCompass 已具备“按标准方案接管”的条件。

原因：
- 有明确代码目录
- 有明确 GitHub 远端
- 有成功的本地构建
- 有清晰的主要配置项
- 风险主要集中在“文档与配置口径不一致”，不是代码不可用

因此，下一步不应该重做迁移，而应该进入“文档归一 + 验收固化 + 线上核查”的标准接管执行阶段。

---

## 七、执行命令（当前已验证/后续建议）

已验证：
```bash
git remote -v
git ls-remote --heads origin
node -v
npm -v
npm run build
```

后续建议：
```bash
npm run dev
git status
git checkout -b chore/hermes-takeover
```

---

## 八、回滚策略

- 代码回滚：使用 git revert / 切回 `main`
- 环境回滚：恢复 Vercel 原变量值
- 历史回滚：参考 `/root/.openclaw.pre-migration`
- 文档回滚：git 历史恢复
