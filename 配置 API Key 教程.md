# 配置通义千问 API Key 教程

## 📋 步骤说明（5 分钟搞定）

### 步骤 1：访问阿里云控制台

打开链接：https://dashscope.console.aliyun.com/apiKey

---

### 步骤 2：登录阿里云账号

- 有淘宝/支付宝账号的直接登录
- 没有的话注册一个（免费）

---

### 步骤 3：实名认证（必须）

如果是第一次用阿里云：
1. 点击头像 → 实名认证
2. 选择"个人实名认证"
3. 用支付宝扫码认证（最快）

---

### 步骤 4：创建 API Key

1. 进入 API Key 管理页面
2. 点击"创建新的 API Key"
3. 给 Key 起个名字（比如：LifeCompass）
4. 点击确定

---

### 步骤 5：复制 API Key

- 创建成功后会显示一串字符
- 点击"复制"按钮
- **⚠️ 只会出现一次，赶紧保存！**

格式类似：`sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

---

### 步骤 6：填入项目

**方法 A：直接创建 .env.local 文件**

在项目根目录创建文件：`/root/.openclaw/workspace/lifecompass-web/.env.local`

内容：
```
DASHSCOPE_API_KEY=sk-你的 Key 粘贴在这里
```

**方法 B：命令行创建**

```bash
cd /root/.openclaw/workspace/lifecompass-web
echo "DASHSCOPE_API_KEY=sk-你的 Key 粘贴在这里" > .env.local
```

---

### 步骤 7：重启开发服务器

```bash
# 停止当前服务（Ctrl + C）

# 重新启动
npm run dev
```

---

## ✅ 验证是否成功

1. 手机浏览器访问：`http://10.4.0.15:3000`
2. 输入一句话："你好，小雨"
3. 如果小雨回复了，说明配置成功！🎉

---

## 💰 费用说明

**新用户福利：**
- 注册送 ¥20 免费额度
- qwen-plus 模型：约 ¥0.002 / 1K tokens

**换算：**
- 一次对话（10 轮）约 ¥0.05 - 0.1 元
- ¥20 可以聊 200-400 次

**查看用量：**
https://dashscope.console.aliyun.com/usage

---

## ⚠️ 常见问题

### Q: API Key 泄露了怎么办？
A: 在控制台删除这个 Key，重新创建一个

### Q: 额度用完了怎么办？
A: 在控制台充值（最少 ¥10）

### Q: 如何设置消费上限？
A: 控制台 → 费用中心 → 设置预算告警

### Q: .env.local 文件要上传到 Git 吗？
A: **千万不要！** 已经加到 .gitignore 了

---

## 🎯 下一步

配置好后：
1. 自己先测试几轮对话
2. 找 2-3 个朋友测试
3. 收集反馈

**开始改变人生的对话吧！** 🌧
