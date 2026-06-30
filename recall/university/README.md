# 大学毕业回忆页

本目录是独立的静态回忆页，入口为 `index.html`。

当前照片故事共 91 张，每张照片在 `assets/images/`、`assets/webp/large/`、`assets/webp/thumbs/` 和 `assets/originals/` 中保持同编号资源。
主视觉使用 `photo-00`，对应资源同样位于上述图片目录中。

## 结构

- `index.html`：页面主体，包含主视觉、时间线、章节、相册、逐张照片故事与尾声。
- `assets/css/recall.css`：页面样式与移动端适配。
- `assets/js/recall.js`：照片文案数据、相册生成、逐张故事模块、滚动过渡与照片预览。
- `assets/images/`：网页加载使用的压缩图片。
- `assets/webp/`：网页优先加载的 WebP 大图与缩略图。
- `assets/originals/`：从原始微信图片整理来的原图备份。

所有路径均使用相对路径，页面可以直接通过 `recall/university/` 访问。
