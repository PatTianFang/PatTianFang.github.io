# 快速维护指南

> 这是一个简化的维护文档，帮助你快速添加新网站或修改现有配置。

## 🚀 5分钟添加新网站

### 1️⃣ 准备图片（3张）

```
轮播图：1920x1080px  →  hero.jpg
卡片图：400x225px    →  thumb.jpg  
推荐图：800x600px    →  featured.jpg
```

上传到图床或使用 Unsplash：`https://images.unsplash.com/photo-xxx?w=1920&q=80`

### 2️⃣ 编辑 js/app.js（第2-46行）

在 `SITES_CONFIG` 中添加：

```javascript
mynewsite: {
    url: 'https://mynewsite.patfang.xyz/',
    title: 'My Site',
    description: '中文描述 · English Description',
    category: '分类',
    badge: '推荐',  // 推荐/热门/新品
    image: 'https://...hero.jpg',
    thumbnail: 'https://...thumb.jpg',
    featured: 'https://...featured.jpg',
    rating: 5.0
}
```

### 3️⃣ 编辑 index.html

#### A. 添加轮播图（第60行后）

```html
<div class="carousel-slide">
    <img src="图片URL" alt="My Site">
    <div class="slide-content">
        <span class="slide-badge">推荐</span>
        <h2 class="slide-title">My Site</h2>
        <p class="slide-description">中文描述 · English</p>
        <button class="slide-btn" data-url="https://mynewsite.patfang.xyz/">
            <span>立即访问</span>
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
        </button>
    </div>
    <div class="slide-overlay"></div>
</div>
```

#### B. 添加应用卡片（第129行前）

```html
<div class="app-card" data-url="https://mynewsite.patfang.xyz/">
    <div class="card-image">
        <img src="图片URL" alt="My Site">
        <div class="card-hover-overlay"></div>
    </div>
    <div class="card-info">
        <h4 class="card-title">My Site</h4>
        <p class="card-category">分类名称</p>
        <div class="card-rating">
            <span class="stars">★★★★★</span>
            <span class="rating-text">5.0</span>
        </div>
    </div>
</div>
```

#### C. 添加推荐卡片（可选，第161行后）

```html
<div class="recommended-card" data-url="https://mynewsite.patfang.xyz/">
    <img src="图片URL" alt="My Site">
    <div class="recommended-overlay"></div>
    <div class="recommended-content">
        <span class="recommended-badge">推荐</span>
        <h4>My Site</h4>
        <p>简短描述</p>
    </div>
</div>
```

### 4️⃣ 完成！

保存文件，刷新浏览器即可看到新网站。

---

## 🎨 快速自定义

### 修改主题颜色

编辑 `css/style.css` 第11-21行：

```css
:root {
    --primary-color: #0067c0;     /* 主按钮颜色 */
    --accent-color: #00bcf2;      /* 强调色 */
    --background: #f3f3f3;        /* 页面背景 */
}
```

### 修改轮播速度

编辑 `js/app.js` 第125行：

```javascript
state.autoPlayInterval = setInterval(() => {
    navigateCarousel(1);
}, 5000);  // 改这个数字（毫秒）
```

### 修改用户信息

编辑 `index.html` 第37-40行：

```html
<div class="user-avatar">P</div>  <!-- 改首字母 -->
<span class="user-name">PatFang</span>  <!-- 改名字 -->
```

---

## 🔍 文件对照表

| 文件 | 作用 | 关键位置 |
|------|------|----------|
| `index.html` | 页面结构 | 轮播图(60行), 卡片(129行) |
| `css/style.css` | 样式设计 | 颜色变量(11行), 布局(200行+) |
| `js/app.js` | 功能逻辑 | 网站配置(2行), 事件处理(60行+) |
| `README.md` | 详细文档 | 完整说明 |

---

## ⚡ 常用操作

### 删除网站

1. 从 `js/app.js` 的 `SITES_CONFIG` 中删除对应配置
2. 从 `index.html` 中删除对应的轮播图、卡片和推荐卡片

### 调整卡片顺序

直接在 `index.html` 中调整 `<div class="app-card">` 的顺序

### 禁用自动轮播

编辑 `js/app.js`，注释掉第125行：

```javascript
// startAutoPlay();  // 注释掉这行
```

### 修改搜索框文字

编辑 `index.html` 第58行：

```html
<input type="text" placeholder="搜索应用、游戏等" class="search-input">
```

---

## 📞 获取帮助

遇到问题？检查：

1. ✅ 浏览器控制台有无错误（F12）
2. ✅ 图片URL是否可访问
3. ✅ `data-url` 属性是否正确
4. ✅ JS配置和HTML内容是否匹配

参考完整文档：`README.md`

---

**最后更新：2024**
