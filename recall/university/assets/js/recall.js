const photoStories = [
    {
        title: "床沿上的早晨",
        text: "毕业季的宿舍总有一种半醒的状态：东西还没完全收好，人也还没准备好离开。坐在床边的一刻，像是在确认自己真的走到这里了。",
        tag: "宿舍"
    },
    {
        title: "楼前的正式合影",
        text: "站在熟悉的楼前，姿势比平时认真一点，表情也比平时收敛一点。照片里是几个人，背后其实是很多次一起上课、吃饭和赶路。",
        tag: "毕业"
    },
    {
        title: "再站近一点",
        text: "同一处台阶，同一群人，距离稍微变近，画面就多了一点默契。毕业照的意义不在于多完美，而在于那天大家真的都在。",
        tag: "合影"
    },
    {
        title: "风从树洞里穿过",
        text: "校园和旅途里最容易被记住的，常常是这样的小场景。人只是从树影下经过，夏天却把这一秒留得很长。",
        tag: "路上"
    },
    {
        title: "城市忽然很亮",
        text: "抬头看到高楼、蓝天和刺眼的光，会突然意识到这些日子并不只属于学校。毕业前的城市，也在替我们把下一程打开。",
        tag: "城市"
    },
    {
        title: "人群里的古城",
        text: "景点很热闹，人也很多，但回忆会自动把背景虚化，只留下同行的人、那天的天气，以及走了很久还不觉得累的心情。",
        tag: "旅行"
    },
    {
        title: "镜子里的自己",
        text: "不是每张照片都要正式。偶尔对着镜子随手拍下来的样子，反而把当时的身体状态、情绪和年轻气都保存得很直接。",
        tag: "日常"
    },
    {
        title: "站上灯光",
        text: "有些瞬间像临时舞台，可能只是一次活动、一次上台、一次被朋友拍到。毕业之后再看，会发现那些小紧张也很珍贵。",
        tag: "舞台"
    },
    {
        title: "夜色和游乐场",
        text: "晚上适合把话说慢一点。身后的灯光、脸上的疲惫和靠近镜头的朋友，都让这张照片像一段没有结尾的聊天。",
        tag: "夜晚"
    },
    {
        title: "笑到低头",
        text: "真正放松的时候，不需要看镜头。一个低头的笑，比很多精心摆好的姿势更能说明那天发生过什么。",
        tag: "朋友"
    },
    {
        title: "香火和石阶",
        text: "在古老建筑前停一下，时间会变得不一样。四年的快和一座城的慢放在一起，心里也会安静一点。",
        tag: "停留"
    },
    {
        title: "海边并肩",
        text: "海风会把毕业的情绪吹散一些。站在水边合影时，好像离开不再只是告别，也像是去更远地方的开始。",
        tag: "海边"
    },
    {
        title: "宿舍桌前",
        text: "日常最容易消失，也最值得留下。椅子、拖鞋、桌面和还没结束的一天，组成了毕业前最真实的背景。",
        tag: "寝室"
    },
    {
        title: "热闹街头",
        text: "朋友一起挤进镜头，身后是人声和店招。这样的照片不会解释路线，却能把一路上的热闹都带回来。",
        tag: "街头"
    },
    {
        title: "饭桌上的一晚",
        text: "很多重要的话，最后都落在饭桌上。菜还热着，人还坐着，离别就被暂时推迟到下一次举杯之后。",
        tag: "聚餐"
    },
    {
        title: "校门前的光",
        text: "站在校名旁边，终于把自己和这几年放进同一张照片。夕阳照过来的时候，告别也显得没有那么突然。",
        tag: "校园"
    },
    {
        title: "电梯里的同行",
        text: "生活里的很多合影发生在最普通的地方。电梯门、镜子和两个人的肩膀，反而让这张照片有很亲近的温度。",
        tag: "同行"
    },
    {
        title: "桥上的合照",
        text: "旅途中遇到的卡通人物、桥和风景，都变成了笑的理由。毕业前的出门，像是在给四年补上一段轻快的尾声。",
        tag: "出游"
    },
    {
        title: "屏幕里的路线",
        text: "电脑屏幕也能成为回忆的一部分。它记录了某段行程、某个游戏或某次并排坐着的晚上，安静但具体。",
        tag: "屏幕"
    },
    {
        title: "灯光下的并排",
        text: "寝室或网吧的光照在脸上，时间就变得很晚。那些一起熬过的夜，后来都会变成很难复刻的陪伴。",
        tag: "深夜"
    },
    {
        title: "一个表情",
        text: "表情包式的截图也是毕业相册的一部分。它不负责好看，只负责把那种只有熟人才懂的玩笑留住。",
        tag: "玩笑"
    },
    {
        title: "被定格的神态",
        text: "有些照片像意外截取的表情，却很像某个阶段的真实状态。不是每一帧都完美，但每一帧都属于那时。",
        tag: "瞬间"
    },
    {
        title: "彩色背景里的梗",
        text: "大学里总会留下几张无法严肃解释的图。它们可能没有标准叙事，却能在多年后快速把人带回同一个笑点。",
        tag: "梗图"
    },
    {
        title: "手机里的歌",
        text: "截图保存了某首歌、某段文字和某个当下的心情。毕业回忆不只有照片，也有那些被单曲循环过的时刻。",
        tag: "音乐"
    },
    {
        title: "夜路上的队伍",
        text: "一群人走在夜里，背影比正脸更像告别。路灯、车流和慢慢向前的人，把散场写得很轻。",
        tag: "夜路"
    },
    {
        title: "最后一觉",
        text: "被子、床铺和还没起身的人，是这组照片里最安静的一张。毕业之后，连赖床都变成了具体的怀念。",
        tag: "尾声"
    }
];

const photos = photoStories.map((story, index) => {
    const number = String(index + 1).padStart(2, "0");
    return {
        number,
        thumb: `assets/webp/thumbs/photo-${number}.webp`,
        large: `assets/webp/large/photo-${number}.webp`,
        fallback: `assets/images/photo-${number}.jpg`,
        alt: `${story.title}，大学毕业回忆照片 ${index + 1}`,
        caption: `${story.title} · ${story.tag}`,
        ...story
    };
});

const gallery = document.querySelector("#photoGallery");
const memoryList = document.querySelector("#memoryList");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox.querySelector(".lightbox-image");
const lightboxCaption = lightbox.querySelector(".lightbox-caption");
const closeButton = lightbox.querySelector(".lightbox-close");
const prevButton = lightbox.querySelector(".lightbox-prev");
const nextButton = lightbox.querySelector(".lightbox-next");
let activeIndex = 0;

function buildGallery() {
    const fragment = document.createDocumentFragment();

    photos.forEach((photo, index) => {
        const button = document.createElement("button");
        button.className = "photo-tile reveal";
        button.type = "button";
        button.dataset.index = String(index);

        const image = document.createElement("img");
        image.src = photo.thumb;
        image.alt = photo.alt;
        image.loading = "lazy";
        image.decoding = "async";

        const meta = document.createElement("span");
        meta.className = "photo-tile-meta";
        meta.textContent = photo.title;

        button.appendChild(image);
        button.appendChild(meta);
        fragment.appendChild(button);
    });

    gallery.appendChild(fragment);
}

function buildMemoryList() {
    const fragment = document.createDocumentFragment();

    photos.forEach((photo, index) => {
        const article = document.createElement("article");
        article.className = `memory-card reveal ${index % 2 === 0 ? "memory-left" : "memory-right"}`;

        const imageWrap = document.createElement("button");
        imageWrap.className = "memory-image";
        imageWrap.type = "button";
        imageWrap.dataset.index = String(index);
        imageWrap.setAttribute("aria-label", `打开照片：${photo.title}`);

        const picture = document.createElement("picture");
        const source = document.createElement("source");
        source.srcset = photo.large;
        source.type = "image/webp";

        const image = document.createElement("img");
        image.src = photo.fallback;
        image.alt = photo.alt;
        image.loading = "lazy";
        image.decoding = "async";

        picture.appendChild(source);
        picture.appendChild(image);
        imageWrap.appendChild(picture);

        const copy = document.createElement("div");
        copy.className = "memory-copy";

        const number = document.createElement("p");
        number.className = "memory-number";
        number.textContent = photo.number;

        const title = document.createElement("h3");
        title.textContent = photo.title;

        const text = document.createElement("p");
        text.textContent = photo.text;

        const tag = document.createElement("span");
        tag.className = "memory-tag";
        tag.textContent = photo.tag;

        copy.appendChild(number);
        copy.appendChild(title);
        copy.appendChild(text);
        copy.appendChild(tag);

        article.appendChild(imageWrap);
        article.appendChild(copy);
        fragment.appendChild(article);
    });

    memoryList.appendChild(fragment);
}

function openLightbox(index) {
    activeIndex = (index + photos.length) % photos.length;
    const photo = photos[activeIndex];
    lightboxImage.src = photo.large;
    lightboxImage.alt = photo.alt;
    lightboxImage.onerror = () => {
        lightboxImage.onerror = null;
        lightboxImage.src = photo.fallback;
    };
    lightboxCaption.textContent = photo.caption;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

function showNextPhoto(step) {
    openLightbox(activeIndex + step);
}

function initReveal() {
    const targets = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
        targets.forEach((target) => target.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px"
    });

    targets.forEach((target) => observer.observe(target));
}

buildGallery();
buildMemoryList();
initReveal();

gallery.addEventListener("click", (event) => {
    const tile = event.target.closest(".photo-tile");
    if (!tile) return;
    openLightbox(Number(tile.dataset.index));
});

memoryList.addEventListener("click", (event) => {
    const image = event.target.closest(".memory-image");
    if (!image) return;
    openLightbox(Number(image.dataset.index));
});

closeButton.addEventListener("click", closeLightbox);
prevButton.addEventListener("click", () => showNextPhoto(-1));
nextButton.addEventListener("click", () => showNextPhoto(1));

lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

window.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) return;

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowLeft") {
        showNextPhoto(-1);
    }

    if (event.key === "ArrowRight") {
        showNextPhoto(1);
    }
});
