# Pat's Portal - 现代化网站入口

一个参考 Microsoft Store、Apple TV 和 PS5 风格设计的现代化网站入口页面，提供优雅的视觉体验和流畅的交互效果。

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🎨 设计特点

- **左侧导航栏**：固定式侧边栏，包含主导航和用户信息
- **顶部搜索栏**：实时搜索过滤应用
- **大型轮播图**：自动播放的英雄区域，展示主要网站入口
- **卡片式布局**：网格化的应用展示，支持悬停效果
- **响应式设计**：完美适配桌面、平板和移动设备
- **流畅动画**：精心设计的过渡效果和交互反馈

## 📁 项目结构

```
.
├── index.html          # 主页面结构
├── css/
│   └── style.css       # 样式文件（Microsoft Store 风格）
├── js/
│   └── app.js          # 功能脚本和配置
└── README.md           # 项目文档
```

## 🚀 快速开始

### 本地预览

1. 克隆或下载项目到本地
2. 用浏览器打开 `index.html` 文件
3. 无需构建工具，即开即用

### 部署到 GitHub Pages

项目已配置 GitHub Pages，推送到 master 分支后自动部署。

访问地址：`https://yourusername.github.io/`

## ➕ 添加新网站

### 步骤 1: 编辑配置文件

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
        image: 'https://...hero.jpg',         // 轮播图（1920x1080）
        thumbnail: 'https://...thumb.jpg',    // 卡片缩略图（400x225）
        featured: 'https://...featured.jpg',  // 推荐区图片（800x600）
        rating: 5.0                           // 评分
    }
};
```

### 步骤 2: 添加轮播图

在 `index.html` 中找到 `.carousel-track`，添加新的轮播幻灯片：

```html
<div class="carousel-slide">
    <img src="https://...hero.jpg" alt="New Site">
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

### 步骤 3: 添加应用卡片

在 `index.html` 中找到 `.apps-grid`，在占位符卡片前添加：

```html
<div class="app-card" data-url="https://newsite.patfang.xyz/">
    <div class="card-image">
        <img src="https://...thumb.jpg" alt="New Site">
        <div class="card-hover-overlay"></div>
    </div>
    <div class="card-info">
        <h4 class="card-title">New Site</h4>
        <p class="card-category">分类名称</p>
        <div class="card-rating">
            <span class="stars">★★★★★</span>
            <span class="rating-text">5.0</span>
        </div>
    </div>
</div>
```

### 步骤 4: 添加推荐卡片（可选）

在 `.recommended-grid` 中添加：

```html
<div class="recommended-card" data-url="https://newsite.patfang.xyz/">
    <img src="https://...featured.jpg" alt="New Site Featured">
    <div class="recommended-overlay"></div>
    <div class="recommended-content">
        <span class="recommended-badge">标签</span>
        <h4>New Site</h4>
        <p>简短描述</p>
    </div>
</div>
```

## 🎯 当前网站

| 网站 | URL | 描述 |
|------|-----|------|
| Gallery | https://gallery.patfang.xyz/ | 探索视觉作品集 |
| Notes | https://note.patfang.xyz/ | 阅读思考与记录 |
| Photos | https://photo.patfang.xyz/ | 发现精彩瞬间 |

## 🎨 自定义样式

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

## ⌨️ 键盘快捷键

- `←` / `→` - 切换轮播图
- `/` - 聚焦搜索框
- `Esc` - 取消搜索焦点

## 📱 响应式断点

- **桌面**: > 1200px - 完整布局
- **平板**: 768px - 1200px - 自适应网格
- **移动**: < 768px - 折叠侧边栏，单列布局

## 🔧 技术栈

- **HTML5** - 语义化结构
- **CSS3** - 现代样式和动画
- **Vanilla JavaScript** - 无依赖，轻量级
- **Unsplash API** - 高质量图片（可替换为自己的图片）

## 🌐 浏览器支持

- Chrome / Edge (推荐)
- Firefox
- Safari
- Opera

最低要求：支持 ES6 和 CSS Grid 的现代浏览器

## 📝 维护建议

### 图片资源

**推荐尺寸：**
- 轮播图：1920 x 1080px (16:9)
- 应用卡片：400 x 225px (16:9)
- 推荐卡片：800 x 600px (4:3)
- 大型推荐：1200 x 800px (3:2)

**优化建议：**
- 使用 WebP 格式提高加载速度
- 压缩图片，保持文件大小 < 500KB
- 使用 CDN 加速图片加载

### 性能优化

- ✅ 已实现延迟加载
- ✅ 使用 CSS 动画代替 JS 动画
- ✅ 防抖搜索输入
- ✅ 最小化重排和重绘

### SEO 优化

建议在 `<head>` 中添加：

```html
<meta name="description" content="Pat's Portal - 现代化网站入口">
<meta name="keywords" content="gallery, notes, photos, portfolio">
<meta property="og:title" content="Pat's Portal">
<meta property="og:description" content="探索视觉作品集、笔记和照片">
<meta property="og:image" content="https://...preview.jpg">
```

## 🐛 故障排除

### 轮播图不自动播放

检查 `js/app.js` 中的 `startAutoPlay()` 函数，确认间隔时间设置正确（默认 5000ms）。

### 卡片点击无响应

确认 `data-url` 属性已正确设置在对应的 HTML 元素上。

### 样式错乱

清除浏览器缓存，确保 CSS 文件正确加载。

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

---

**享受你的现代化入口页面！** ✨
