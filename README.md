# WebNote - 极简个人笔记/博客模板

WebNote 是一个基于 **纯 HTML/CSS/JS** 构建的静态网页模板，专为 GitHub Pages 设计。它摒弃了复杂的框架和构建工具，回归网页最原始的开发方式，旨在为用户提供一个极简、快速且易于维护的个人笔记空间。

## ✨ 特性

- **零依赖**：无 npm，无 Webpack，无外部框架。打开即运行，修改即生效。
- **动态渲染**：通过 `data/posts.json` 统一管理文章元数据，JS 自动渲染列表。
- **分类过滤**：内置分类过滤器，支持按标签筛选文章。
- **PDF 嵌入**：特别优化了 PDF 文件的展示，适合学术研究或技术文档分享。
- **响应式设计**：完美适配桌面端和移动端浏览器。
- **一键部署**：由于是纯静态文件，完美支持 GitHub Pages、Vercel 等托管平台。

## 🚀 快速开始

### 1. 克隆仓库
```bash
git clone https://github.com/PatTianFang/WebNote.git
cd WebNote
```

### 2. 本地预览
直接在浏览器中打开 `index.html` 即可预览效果。
> **注意**：由于浏览器安全策略（CORS），直接通过 `file://` 协议打开可能无法加载 `posts.json` 数据。建议使用 VS Code 的 **Live Server** 扩展或简单的本地服务器（如 `python -m http.server`）运行。

### 3. 部署到 GitHub Pages
1. 将项目推送到你的 GitHub 仓库。
2. 进入仓库设置：`Settings` > `Pages`。
3. 在 `Build and deployment` 下选择 `Deploy from a branch`。
4. 选择 `main` 分支并保存。

## 📝 如何添加文章

1. **准备 HTML 文件**：在 `posts/` 相应的目录下（如 `posts/tech/`）创建你的文章 HTML 文件。
2. **准备 PDF（可选）**：如果是 PDF 展示类文章，将 PDF 放入 `pdfs/` 目录。
3. **更新索引**：在 `data/posts.json` 中添加新条目：
   ```json
   {
       "id": "your-post-id",
       "title": "文章标题",
       "date": "2026-03-21",
       "category": "分类名称",
       "url": "posts/your-category/your-file.html",
       "excerpt": "文章简短摘要..."
   }
   ```

## 📁 目录结构

```text
WebNote/
├── css/            # 样式表
├── data/           # 数据文件 (posts.json)
├── js/             # 逻辑脚本
├── posts/          # 文章 HTML 页面
├── pdfs/           # PDF 资源文件
├── images/         # 图片资源
├── index.html      # 首页
└── about.html      # 关于页
```

## 📄 开源协议

本项目采用 [MIT License](LICENSE) 协议。

## 🤝 联系作者

- **GitHub**: [FangTian](https://github.com/PatTianFang)
- **Email**: PatTianFang@outlook.com
- **Project Link**: [https://github.com/PatTianFang/WebNote](https://github.com/PatTianFang/WebNote)

---
*如果你觉得这个项目对你有帮助，欢迎点个 ⭐ Star！*
