# WebNote

`PatTianFang.github.io` 是 Note to WebNote 的静态前端仓库。它只保存 HTML/CSS/JS/JSON 和少量静态资源，不保存 PDF 文件。

线上站点：

- `https://www.patfang.xyz/`
- GitHub Pages 源仓库：`PatTianFang/PatTianFang.github.io`

PDF 文件由 Cloudflare R2 提供：

- `https://static.patfang.xyz/pdfs/...`

## 功能

- 纯静态站点，无 npm、无构建步骤。
- 首页读取 `data/posts.json` 渲染文章列表。
- 支持分类过滤。
- 支持搜索标题、分类、摘要和日期。
- 支持分页，每页 10 篇文章。
- 文章详情页使用自适应宽屏布局，桌面端 PDF 预览更宽，移动端自动收缩。
- `records.html` 提供“记录”展厅，用于集中展示摄影照片和精选 post。
- 支持亮色/暗色模式切换、阅读进度条、返回顶部和文章页复制链接。
- PDF 使用 R2 公共 URL 嵌入，避免 GitHub 大文件限制。

## 目录结构

```text
.
├── css/style.css
├── data/posts.json
├── js/
│   ├── main.js
│   └── theme.js
├── posts/                 # 文章 HTML；大多数由 Publish.py 生成
│   └── demo/
│       └── record-post-template.html
├── images/
│   └── records/           # 记录页摄影图片资源
├── index.html
├── records.html
├── about.html
├── CNAME
└── README.md
```

## 生成规则

大多数文章页由根仓库的 `Publish.py` 生成，不建议手动编辑生成页。发布脚本会：

- 根据 `Note/` 下的 PDF 生成文章页。
- 更新 `data/posts.json`。
- 将 PDF 链接写成 R2 URL。
- 清理已经失效的旧文章页和空目录。

手写文章可以放在 `posts/` 下，但需要手动维护 `data/posts.json` 中的记录。

## 记录页

`records.html` 是摄影照片和精选 post 的展示入口，导航位置在“首页”和“关于”之间。

图片资源放在：

```text
images/records/
```

新增摄影记录 post 时，可以复制模板：

```text
posts/demo/record-post-template.html
```

模板中的图片路径默认指向 `images/records/`，替换图片时建议保持相对路径结构一致。

## 本地预览

直接打开 `index.html` 可能受浏览器 `file://` 限制，建议启动本地静态服务：

```powershell
cd WebNote\PatTianFang.github.io
python -m http.server 5500
```

然后访问：

```text
http://127.0.0.1:5500/
```

## 部署

本仓库推送后由 GitHub Pages 或已连接的 Cloudflare Pages 自动部署。

当前自定义域名由 `CNAME` 指定：

```text
www.patfang.xyz
```

## 注意

- 不要提交 `pdfs/` 目录。
- 不要把 R2 manifest、Wrangler 本地状态或本地缓存提交到本仓库。
- PDF 是否可访问取决于 Cloudflare R2 bucket、CORS 和自定义域名配置。
