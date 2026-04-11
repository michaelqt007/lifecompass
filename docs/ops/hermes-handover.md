# LifeCompass Hermes 接管说明

## 1. 文档目的

这份文档用于明确：
- 当前 LifeCompass 项目中，哪些部分已经由 Hermes 接管
- 日常维护应从哪里进入
- 现阶段哪些事项属于已完成，哪些仍待继续
- 当后续继续开发或排障时，应该优先参考哪些文档

这是一份“接管状态说明”，不是功能设计稿，也不是部署教程。

---

## 2. 当前接管结论

结论：Hermes 已完成对 LifeCompass 项目的第一阶段标准接管。

当前已完成的接管内容包括：

1. 已确认主项目目录
   - `/root/.openclaw.pre-migration/workspace/lifecompass/web`

2. 已确认主 GitHub 仓库
   - `https://github.com/michaelqt007/lifecompass.git`

3. 已确认当前主分支
   - `main`

4. 已确认项目当前可构建
   - `npm run build` 已通过

5. 已完成配置口径归一
   - 公开文档已从 `OPENAI_API_KEY` 统一为 `DASHSCOPE_API_KEY`
   - AI 服务说明已对齐当前实现：DashScope Coding API + `glm-5`

6. 已完成验收流程固化
   - 已新增 `docs/ops/verification.md`
   - 已明确 `/api/chat` 与 `/api/speech-to-text` 的当前预期行为

---

## 3. 当前事实来源

为了避免后续再次出现“文档说一套、代码跑一套”，当前项目采用以下事实来源分层。

### 3.1 代码事实来源

以实际代码为准：
- `src/app/api/chat/route.ts`
- `src/app/api/speech-to-text/route.ts`
- `package.json`

用于判断：
- 当前模型供应商
- 当前环境变量名
- 当前 API 行为
- 当前本地运行命令

### 3.2 仓库事实来源

以 GitHub 仓库为准：
- `origin = https://github.com/michaelqt007/lifecompass.git`
- branch = `main`

用于判断：
- 主开发主线
- 可提交、可审阅、可回滚的代码来源

### 3.3 运维事实来源

以以下文档为准：
- `docs/plans/2026-04-11-hermes-standard-takeover-plan.md`
- `docs/ops/verification.md`
- 本文档 `docs/ops/hermes-handover.md`

用于判断：
- 接管范围
- 验收标准
- 后续维护入口

### 3.4 历史回溯来源

以归档目录为准：
- `/root/.openclaw.pre-migration`

说明：
- 该目录现在仅作为历史证据和回溯来源
- 不再作为日常开发主目录
- 如需追溯旧文档、旧配置、旧上下文，可只读查询

---

## 4. Hermes 已接管的范围

当前已接管：

- 项目主目录识别
- GitHub 主仓库识别
- 关键环境变量识别
- 文档与代码配置一致性修复
- 本地构建验收标准整理
- 部署前/部署后冒烟测试 checklist 整理
- 语音转写接口当前状态定义

这意味着：
- Hermes 已经可以继续负责该项目的文档维护
- Hermes 已经可以继续负责该项目的配置核查
- Hermes 已经可以继续负责该项目的接管后验收
- Hermes 已经可以继续负责下一步的结构化推进

---

## 5. Hermes 暂未完成的范围

以下事项目前还没有完成，不应误判为“已完全接管”：

1. 线上 Vercel 项目核对
   - 尚未实际登录并核验线上项目设置
   - 尚未确认线上环境变量是否与文档完全一致

2. 线上站点冒烟测试
   - 已对公开站点 `https://lifecompass-phi.vercel.app` 完成基础冒烟测试
   - 首页可正常打开
   - `/api/speech-to-text` 在上传文件时按预期返回 `asr_not_configured`
   - `/api/chat` 当前返回兜底文案 `抱歉，我刚才走神了...`，说明线上文本对话链路仍存在配置或上游问题，尚未完成最终闭环

3. ASR 正式接入
   - 当前 `/api/speech-to-text` 仍是“未接入”的占位实现

4. 代码提交与 PR 整理
   - 当前文档改动尚未提交到 git

5. 正式迁入新的 Hermes 工作区
   - 目前项目仍位于 `.openclaw.pre-migration` 路径下
   - 这不影响接管判断，但不算“最终形态”

---

## 6. 日常维护入口

后续如果继续维护这个项目，建议优先按下面顺序进入。

### 6.1 看项目状态

在项目目录执行：

```bash
git status
git remote -v
git branch --show-current
```

用于快速确认：
- 当前有没有未提交改动
- 当前远端是不是正确仓库
- 当前分支是否正确

### 6.2 做本地验收

优先参考：
- `docs/ops/verification.md`

常用命令：

```bash
npm install
npm run build
npm run dev
```

### 6.3 看接管边界和后续计划

优先参考：
- `docs/plans/2026-04-11-hermes-standard-takeover-plan.md`
- `docs/ops/hermes-handover.md`

### 6.4 看运行时真实行为

优先参考代码：
- `src/app/api/chat/route.ts`
- `src/app/api/speech-to-text/route.ts`

---

## 7. 当前关键判断

### 7.1 文本对话链路

当前判断：已具备继续维护条件。

原因：
- Chat API 路径明确
- 模型上游明确
- 环境变量明确
- 本地 build 已通过

### 7.2 语音输入链路

当前判断：尚未正式接管为“可用能力”，仅完成状态定义。

原因：
- 服务端 ASR 未真正接入
- 当前只能把它视为“已知未完成项”
- 文档中已明确返回 `asr_not_configured` 属于当前预期

### 7.3 文档体系

当前判断：已初步接管成功。

原因：
- README 已与当前实现对齐
- 部署文档已与当前变量口径对齐
- 验收文档已建立
- 接管文档已建立

---

## 8. 后续优先级

建议按以下顺序继续推进：

### P1：提交当前文档改动

目标：
- 把本轮接管产生的文档修改正式纳入 git 历史

建议动作：
- 查看 `git diff`
- 确认无误后提交一个文档类 commit

### P2：修复线上文本对话链路

目标：
- 让公开站点的 `/api/chat` 不再返回兜底文案

当前已知现象：
- 公开站点首页可打开
- 公开站点 `/api/chat` 当前返回 `{"reply":"抱歉，我刚才走神了..."}`
- 本地 `/api/chat` 复测结果相同
- 直接请求 DashScope 上游确认返回 `401 invalid_api_key`
- 当前最高优先级 blocker 已明确：需要替换失效的 `DASHSCOPE_API_KEY`

重点检查：
- 本地 `.env.local` 中的 `DASHSCOPE_API_KEY` 是否已替换为新 key
- Vercel 环境变量是否同步更新为新的 `DASHSCOPE_API_KEY`
- 部署使用的代码是否已包含当前文档和接口口径
- 新 key 更新后重新执行 `/api/chat` 冒烟测试

### P3：补环境文档

目标：
- 新增 `docs/ops/environment.md`
- 统一说明本地 / Vercel / 可选变量 / 未接入变量

### P4：定义 ASR 路线

二选一：
- 明确保留“浏览器侧语音输入为主，不接服务端 ASR”
- 或正式设计并接入服务端 ASR

### P5：迁入正式 Hermes 工作区

目标：
- 让项目不再依赖 `.openclaw.pre-migration` 路径作为主开发目录

---

## 9. 当前相关文档索引

建议优先阅读顺序：

1. `README.md`
2. `docs/ops/verification.md`
3. `docs/ops/hermes-handover.md`
4. `docs/plans/2026-04-11-hermes-standard-takeover-plan.md`
5. `部署指南.md`
6. `Vercel 部署教程.md`

---

## 10. 接管完成的判定标准

若满足以下条件，可认为第一阶段接管完成：

- 主目录明确
- 主仓库明确
- 本地构建通过
- 文档配置口径一致
- 验收流程可执行
- 接管边界已写清楚

当前状态：以上条件均已满足。

因此：
- 第一阶段标准接管：已完成
- 第二阶段（线上核查与正式提交）：待继续

---

最后更新日期：2026-04-11
