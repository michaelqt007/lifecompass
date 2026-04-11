# LifeCompass Vercel 部署教程

## 🚀 5 分钟部署完成

---

## 步骤 1：上传代码到 GitHub

### 1.1 创建 GitHub 仓库

1. 打开 https://github.com/new
2. 仓库名：`lifecompass`
3. 选择 **Private**（私有）或 **Public**（公开）
4. 点击 **Create repository**

### 1.2 初始化 Git

在项目根目录执行：

```bash
cd /root/.openclaw.pre-migration/workspace/lifecompass/web

# 初始化 Git
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit - LifeCompass MVP"

# 关联 GitHub 仓库（替换为你的用户名）
git remote add origin https://github.com/你的用户名/lifecompass.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

---

## 步骤 2：在 Vercel 导入项目

### 2.1 登录 Vercel

1. 打开 https://vercel.com
2. 点击 **Continue with GitHub**
3. 授权 Vercel 访问你的 GitHub

### 2.2 导入项目

1. 点击 **Add New...** → **Project**
2. 找到 `lifecompass` 仓库
3. 点击 **Import**

### 2.3 配置环境变量

在 Vercel 配置页面：

1. 点击 **Environment Variables**
2. 添加以下变量：

| Name | Value |
|------|-------|
| `DASHSCOPE_API_KEY` | `你的真实 API Key` |

3. 点击 **Save**

### 2.4 部署

1. 点击 **Deploy**
2. 等待 2-3 分钟
3. 部署完成后会显示一个链接

---

## 步骤 3：访问你的应用

部署完成后，你会得到一个链接：

```
https://lifecompass-xxx.vercel.app
```

**这个链接：**
- ✅ 永久有效
- ✅ 全球都能访问
- ✅ 手机电脑都能用
- ✅ 自动 HTTPS

---

## 步骤 4：自定义域名（可选）

如果需要自己的域名：

1. Vercel 项目 → **Settings** → **Domains**
2. 添加你的域名
3. 按提示配置 DNS

---

## 💰 费用

**Vercel 免费版：**
- ✅ 无限个人项目
- ✅ 每月 100GB 流量
- ✅ 自动 SSL 证书
- ✅ 全球 CDN

**对 MVP 测试完全够用！**

---

## 📱 手机访问

部署完成后：
1. 把链接发到手机
2. 浏览器打开
3. 添加到主屏幕（可选）

---

## ⚠️ 常见问题

### Q: 部署失败怎么办？

A: 查看 Vercel 的 **Deployments** → **View Build Logs** 找错误

### Q: API Key 安全吗？

A: 安全！Vercel 的环境变量不会泄露到前端代码

### Q: 如何更新代码？

A: 修改后 `git push`，Vercel 自动重新部署

### Q: 流量超了怎么办？

A: Vercel 会邮件通知，免费版限制内随便用

---

## 🎯 下一步

部署完成后：
1. 手机浏览器打开链接
2. 试试小雨对话
3. 找朋友测试

---

**如果代码已经在 GitHub，就直接导入 Vercel 即可。** 🚀
