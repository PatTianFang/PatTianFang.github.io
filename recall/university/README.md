# 大学毕业回忆页

本目录是独立的静态回忆页，入口为 `index.html`。

当前照片故事共 220 张，每张照片在 `assets/images/`、`assets/webp/story/`、`assets/webp/large/` 和 `assets/webp/thumbs/` 中保持同编号资源。
主视觉使用 `photo-00`，对应资源同样位于上述图片目录中。

## 结构

- `index.html`：页面主体，包含主视觉、人物入口、章节、逐张照片故事与尾声。
- `assets/css/recall.css`：页面样式与移动端适配。
- `assets/js/recall.js`：照片文案数据、逐张故事模块、滚动过渡与照片预览。
- `assets/images/`：网页加载使用的压缩图片。
- `assets/webp/`：网页优先加载的 WebP 故事图、大图与缩略图。
- `assets/originals/`：早期整理时保留的部分原图备份；新增照片仅保留网页加载所需的压缩资源。
- `陈世扬/`、`方添/`、`谷冰/`、`蒋子逸/`、`刘哲豪/`、`彭佳鑫/`、`秦煜杰/`、`张立超/`、`张森/`、`赵龙浩/`：个人二级回忆页，内部有各自独立的图片资源和入口页。

所有路径均使用相对路径，页面可以直接通过 `recall/university/` 访问。
