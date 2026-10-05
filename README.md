# Pat Fang / Personal Collection

这是 `PatTianFang.github.io` 的个人入口页。页面借鉴现代主机首页的阅读顺序：先看到一张有内容的大图，再在下方选择要进入的空间。

当前入口：

- [Gallery](https://gallery.patfang.xyz/)：照片、画册与正在发生的旅途
- [Note](https://note.patfang.xyz/)：技术、学习和生活记录
- [Photo](https://photo.patfang.xyz/)：影像、片段和记忆

## 设计规则

- **大图先行**：主视觉使用本地照片素材，不嵌入对应网站，不把首页做成网站预览器。
- **入口在下方**：所有站点选择卡片位于主视觉下方，当前选中项会放大、描边并同步主视觉信息。
- **主机式交互**：支持鼠标、Tab、方向键、数字键 `1` / `2` / `3` 和 Enter。
- **信息保持克制**：大图上只放标题、短说明、状态和三组必要元信息；详细内容留给对应站点。
- **避免模板感**：不用统一圆角 SaaS 卡片、无意义渐变或 iframe 预览，保留深色舞台、横向内容轨道和明确焦点。

## 文件结构

```text
.
├── index.html       # 顶栏、照片主舞台、下方入口轨道
├── styles.css       # 主机式深色视觉、焦点状态、响应式布局
├── app.js           # 入口数据、选择状态、图片切换、键盘交互
├── assets/sites/    # 首页主视觉和入口卡片使用的本地照片
├── README.md        # 项目维护说明
└── Problems/        # 每次编程任务的过程记录
```

页面不依赖框架和构建工具，可以直接部署到 GitHub Pages。

## 本地运行

在项目根目录执行：

```powershell
python -m http.server 4173
```

然后打开 `http://localhost:4173/`。不要直接双击 `index.html`，本地文件模式下浏览器对图片、hash 和资源加载的限制更多。

## 添加入口

入口数据集中在 `app.js` 顶部的 `sites` 数组。新增一个对象即可：

```js
{
  slug: "lab",
  index: "04",
  label: "LAB",
  title: "Lab",
  subtitle: "给还在变化中的项目留一个入口。",
  description: "实验、原型和进行中的想法。",
  summary: "实验 / 原型 / 进行中",
  tag: "EXPERIMENTS",
  state: "IN PROGRESS",
  buttonLabel: "OPEN LAB",
  url: "https://lab.patfang.xyz/",
  image: "assets/sites/lab.webp",
  alt: "Lab 入口主视觉照片",
  theme: "lab",
  meta: [
    ["COLLECTION", "IN PROGRESS"],
    ["LAST UPDATE", "2026 / 10 / 05"],
    ["MODE", "EXPERIMENTS"]
  ]
}
```

字段说明：

| 字段 | 用途 |
| --- | --- |
| `slug` | URL hash 和唯一标识，例如 `#lab` |
| `index` | 主视觉和入口卡片显示的序号 |
| `label` | 卡片顶部短标签 |
| `title` | 主视觉标题 |
| `subtitle` | 标题下方的一句定位 |
| `description` | 主视觉底部的补充说明 |
| `summary` | 下方入口卡片的短说明 |
| `tag` | 主视觉内容类型 |
| `state` | 主视觉右上角状态 |
| `buttonLabel` | 主按钮文字 |
| `url` | 点击主按钮或按 Enter 后打开的站点 |
| `image` | 首页本地照片路径 |
| `alt` | 主视觉图片的无障碍描述 |
| `theme` | 当前主题名，用于切换强调色 |
| `meta` | 主视觉右下角的三组信息 |

如果新增了主题色，在 `styles.css` 追加对应规则：

```css
.site-card--lab {
  --card-accent: #d8a36a;
}

body[data-theme="lab"] {
  --hero-accent: #d8a36a;
}
```

如果新增入口超过三项，`sites.length` 会自动同步序号、圆点和键盘循环；数字键提示只保留 `1 / 2 / 3`，更多入口使用下方卡片、方向键或圆点切换。

## 图片素材

当前 `assets/sites/` 中的四张封面来自个人 Gallery 的公开画册封面，用于首页主视觉和入口卡片：

- `gallery.webp`：20260308 天津
- `note.webp`：20260722 烟台
- `photo.webp`：20260524 厦门
- `lab.webp`：20260724 济南

后续替换图片时，尽量使用横向或主体明确的照片；主舞台使用 `object-fit: cover`，主体太靠边会在宽屏裁切。替换后要重新检查桌面和手机截图。

## 检查清单

1. 运行 `python -m http.server 4173`，确认首页可以打开。
2. 点击下方三个入口，确认主图、标题、说明、元信息和链接一起变化。
3. 用 Tab、方向键、数字键和 Enter 检查焦点与打开行为。
4. 在桌面和手机宽度下确认照片主体、卡片轨道和底部信息不溢出。
5. 执行 `node --check app.js` 和 `git diff --check`。
6. 提交前确认没有把 Playwright 截图、临时目录或远程预览代码带入仓库。

## 维护约定

- 不在 `index.html` 重复写入口数据；统一修改 `app.js` 的 `sites`。
- 不恢复 `iframe` 预览；首页职责是选择和展示入口照片，不是复制子站点内容。
- 新图片放在 `assets/sites/`，文件名用小写英文和短横线，避免部署路径问题。
- 颜色和间距优先使用 `styles.css` 顶部的变量。
- 每次编程任务在 `Problems/` 新建 `Problem日期时间.md`，记录目标、判断、问题、解决方法和验证结果。
- 提交前检查 `git diff --stat`、`git diff --check` 和真实浏览器效果。
