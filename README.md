# Pat's Portal - 现代化网站入口

一个参考 Microsoft Store、Apple TV 和 PS5 风格设计的现代化网站入口页面，提供优雅的视觉体验和流畅的交互效果。

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🎨 设计特点

- **左侧导航栏**：固定式侧边栏，带自定义Logo和主导航
- **顶部搜索栏**：实时搜索过滤应用
- **大型轮播图**：自动播放的英雄区域，展示主要网站入口（5秒切换）
- **大卡片式布局**：采用推荐内容风格的大方块展示，支持悬停放大效果
- **响应式设计**：完美适配桌面、平板和移动设备
- **流畅动画**：精心设计的过渡效果和交互反馈

## 📁 项目结构

```
.
├── index.html              # 主页面结构
├── css/
│   └── style.css           # 样式文件（Microsoft Store 风格）
├── js/
│   └── app.js              # 功能脚本和配置
├── assets/
│   └── images/
│       ├── logo.png        # 自定义Logo（动漫角色）
│       ├── hero-gallery.jpg    # Gallery轮播图
│       ├── hero-notes.jpg      # Notes轮播图
│       └── hero-photos.jpg     # Photos轮播图
├── README.md               # 项目文档
└── MAINTENANCE.md          # 快速维护指南
```

## 🚀 快速开始

### 本地预览

1. 克隆或下载项目到本地
2. 用浏览器打开 `index.html` 文件
3. 无需构建工具，即开即用

### 部署到 GitHub Pages

项目已配置 GitHub Pages，推送到 master 分支后自动部署。

访问地址：`https://patfang.xyz`

## ➕ 添加新网站

### 步骤 1: 准备资源

**图片资源（推荐尺寸）：**
- 轮播图：1920 x 1280px+ (16:9 或类似比例)
- 应用卡片：800 x 600px (4:3 或类似比例)

**将图片放入：** `assets/images/`

### 步骤 2: 编辑配置文件

打开 `js/app.js`，在 `SITES_CONFIG` 对象中添加新网站配置：

```javascript
const SITES_CONFIG = {
    // 现有网站...
    
    // 添加新网站
    newsite: {
        url: 'https://newsite.patfang.xyz/',
        title: 'New Site',                    // 显示标题
        description: '网站描述 · Description', // 双语描述
        category: '分类名称',                  // 应用分类
        badge: '标签',                        // 推荐/热门/新品
        image: 'assets/images/hero-new.jpg',  // 轮播图
        thumbnail: 'assets/images/card-new.jpg', // 卡片图
        featured: 'assets/images/featured-new.jpg', // 推荐图
        rating: 5.0                           // 评分
    }
};
```

### 步骤 3: 添加轮播图

在 `index.html` 中找到 `.carousel-track`，添加新的轮播幻灯片：

```html
<div class="carousel-slide">
    <img src="assets/images/hero-new.jpg" alt="New Site">
    <div class="slide-content">
        <span class="slide-badge">标签</span>
        <h2 class="slide-title">New Site</h2>
        <p class="slide-description">网站描述 · Description</p>
        <button class="slide-btn" data-url="https://newsite.patfang.xyz/">
            <span>立即访问</span>
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
        </button>
    </div>
    <div class="slide-overlay"></div>
</div>
```

### 步骤 4: 添加应用大卡片

在 `index.html` 中找到 `.recommended-grid`，在占位符卡片前添加：

```html
<div class="recommended-card" data-url="https://newsite.patfang.xyz/">
    <img src="assets/images/card-new.jpg" alt="New Site">
    <div class="recommended-overlay"></div>
    <div class="recommended-content">
        <span class="recommended-badge">标签</span>
        <h4>New Site</h4>
        <p>简短描述</p>
    </div>
</div>
```

**卡片尺寸说明：**
- 普通卡片：占1列
- 大卡片：添加 `class="recommended-card large"` 占2列

## 🎯 当前网站

| 网站 | URL | 描述 | 轮播图 |
|------|-----|------|--------|
| Gallery | https://gallery.patfang.xyz/ | 探索视觉作品集 | ✅ |
| Notes | https://note.patfang.xyz/ | 阅读思考与记录 | ✅ |
| Photos | https://photo.patfang.xyz/ | 发现精彩瞬间 | ✅ |

## 🎨 自定义样式

### 修改Logo

替换 `assets/images/logo.png` 文件，推荐尺寸：40x40px 或更大（会自动缩放）

### 修改主题色

编辑 `css/style.css` 中的 CSS 变量：

```css
:root {
    --primary-color: #0067c0;      /* 主色调 */
    --primary-hover: #005a9e;      /* 悬停色 */
    --accent-color: #00bcf2;       /* 强调色 */
    --background: #f3f3f3;         /* 背景色 */
    --surface: #ffffff;            /* 卡片背景 */
    /* ... 更多变量 */
}
```

### 调整侧边栏宽度

```css
:root {
    --sidebar-width: 240px;        /* 展开宽度 */
    --sidebar-collapsed: 60px;     /* 折叠宽度（移动端）*/
}
```

### 修改轮播速度

编辑 `js/app.js` 第125行：

```javascript
state.autoPlayInterval = setInterval(() => {
    navigateCarousel(1);
}, 5000);  // 改这个数字（毫秒），默认5秒
```

## ⌨️ 键盘快捷键

- `←` / `→` - 切换轮播图
- `/` - 聚焦搜索框
- `Esc` - 取消搜索焦点
- `Enter` - 点击当前激活的卡片访问网站

## 📱 响应式断点

- **桌面**: > 768px - 完整布局，展开侧边栏
- **移动**: < 768px - 折叠侧边栏（仅显示图标），卡片自适应

## 🔧 技术栈

- **HTML5** - 语义化结构
- **CSS3** - 现代样式和动画（Grid、Flexbox、CSS变量）
- **Vanilla JavaScript** - 无依赖，轻量级
- **本地图片资源** - 快速加载，无需CDN

## 🌐 浏览器支持

- Chrome / Edge (推荐)
- Firefox
- Safari
- Opera

最低要求：支持 ES6 和 CSS Grid 的现代浏览器

## 📝 维护建议

### 图片资源优化

**推荐尺寸：**
- Logo：40 x 40px 或更大
- 轮播图：1920 x 1280px+ (16:9)
- 应用大卡片：800 x 600px (4:3)
- 大型卡片：1200 x 800px (3:2)

**优化建议：**
- 使用 JPG 格式（照片）或 PNG 格式（Logo/图标）
- 压缩图片，轮播图保持 < 500KB，卡片图 < 200KB
- 使用渐进式 JPEG 提升加载体验
- 建议使用 [TinyPNG](https://tinypng.com/) 或 [Squoosh](https://squoosh.app/) 压缩

### 性能优化

- ✅ 本地图片资源（无需CDN请求）
- ✅ 使用 CSS 动画代替 JS 动画
- ✅ 防抖搜索输入
- ✅ 最小化重排和重绘
- ✅ 图片懒加载支持

### SEO 优化

建议在 `index.html` 的 `<head>` 中添加：

```html
<meta name="description" content="Pat's Portal - 现代化网站入口，探索Gallery、Notes和Photos">
<meta name="keywords" content="gallery, notes, photos, portfolio, PatFang">
<meta name="author" content="PatFang">
<meta property="og:title" content="Pat's Portal">
<meta property="og:description" content="探索视觉作品集、笔记和照片">
<meta property="og:image" content="https://patfang.xyz/assets/images/hero-gallery.jpg">
<meta property="og:url" content="https://patfang.xyz">
<meta property="og:type" content="website">
```

## 🐛 故障排除

### 轮播图不自动播放

检查 `js/app.js` 中的 `startAutoPlay()` 函数，确认间隔时间设置正确（默认 5000ms）。

### 卡片点击无响应

确认 `data-url` 属性已正确设置在对应的 HTML 元素上。

### 图片不显示

1. 检查图片路径是否正确（相对路径）
2. 确认图片文件存在于 `assets/images/` 目录
3. 清除浏览器缓存（Ctrl+F5）
4. 检查图片文件格式和大小

### 样式错乱

清除浏览器缓存，确保 CSS 文件正确加载。按 F12 打开开发者工具查看控制台错误。

## 📄 文件清单

```
核心文件：
├── index.html          (主页面)
├── css/style.css       (样式)
├── js/app.js           (功能)

资源文件：
├── assets/images/
│   ├── logo.png            (284KB - Logo)
│   ├── hero-gallery.jpg    (150KB - Gallery轮播)
│   ├── hero-notes.jpg      (274KB - Notes轮播)
│   └── hero-photos.jpg     (347KB - Photos轮播)

文档文件：
├── README.md           (完整文档)
├── MAINTENANCE.md      (快速维护指南)
└── CNAME              (自定义域名配置)
```

## 📄 许可证

MIT License - 自由使用和修改

## 👤 作者

**PatFang**
- Website: https://patfang.xyz
- Gallery: https://gallery.patfang.xyz
- Notes: https://note.patfang.xyz
- Photos: https://photo.patfang.xyz

## 📮 反馈与贡献

欢迎提交 Issues 和 Pull Requests！

## 🎯 设计灵感

- Microsoft Store (应用商店布局)
- Apple TV+ (卡片式展示)
- PlayStation 5 (现代化界面)

---

**版本历史：**
- v2.0.0 (2024) - Microsoft Store风格重构，大卡片布局
- v1.0.0 - 初始版本，Fluent Design风格

**享受你的现代化入口页面！** ✨
