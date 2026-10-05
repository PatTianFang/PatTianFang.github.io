const sites = [
  {
    slug: "gallery",
    index: "01",
    label: "GALLERY",
    title: "Gallery",
    subtitle: "照片、画册与正在发生的旅途。",
    description: "把值得留下的画面，放在一个可以慢慢浏览的房间。",
    summary: "作品 / 收藏 / 现场",
    tag: "VISUALS",
    state: "LIVE COLLECTION",
    buttonLabel: "OPEN GALLERY",
    url: "https://gallery.patfang.xyz/",
    image: "assets/sites/gallery.webp",
    alt: "Gallery 画册封面：飞过水面的海鸟",
    theme: "gallery",
    meta: [
      ["COLLECTION", "07 VOLUMES"],
      ["LAST UPDATE", "2026 / 10 / 04"],
      ["MODE", "PHOTO ARCHIVE"]
    ]
  },
  {
    slug: "note",
    index: "02",
    label: "NOTE",
    title: "Note",
    subtitle: "记录想法，也记录还没有结论的东西。",
    description: "技术、学习和生活的片段，先放在这里，再慢慢长出形状。",
    summary: "技术 / 学习 / 生活",
    tag: "FIELD NOTES",
    state: "IN PROGRESS",
    buttonLabel: "OPEN NOTE",
    url: "https://note.patfang.xyz/",
    image: "assets/sites/note.webp",
    alt: "Note 封面照片：蓝天下的建筑结构",
    theme: "note",
    meta: [
      ["COLLECTION", "FIELD NOTES"],
      ["LAST UPDATE", "IN PROGRESS"],
      ["MODE", "WRITING SPACE"]
    ]
  },
  {
    slug: "photo",
    index: "03",
    label: "PHOTO",
    title: "Photo",
    subtitle: "把生活里不经意的光，留成可以回看的片段。",
    description: "不急着整理的影像，也值得有一个自己的入口。",
    summary: "影像 / 片段 / 记忆",
    tag: "PHOTO ARCHIVE",
    state: "MEMORY COLLECTION",
    buttonLabel: "OPEN PHOTO",
    url: "https://photo.patfang.xyz/",
    image: "assets/sites/photo.webp",
    alt: "Photo 封面照片：绿色藤叶与紫色花朵",
    theme: "photo",
    meta: [
      ["COLLECTION", "02 ALBUMS"],
      ["LAST UPDATE", "2026 / 10 / 04"],
      ["MODE", "PHOTO ARCHIVE"]
    ]
  }
];

const elements = {
  body: document.body,
  clock: document.querySelector("#clock"),
  year: document.querySelector("#year"),
  heroImage: document.querySelector("#hero-image"),
  heroKicker: document.querySelector("#hero-kicker"),
  heroState: document.querySelector("#hero-state"),
  heroTitle: document.querySelector("#hero-title"),
  heroSubtitle: document.querySelector("#hero-subtitle"),
  heroDescription: document.querySelector("#hero-description"),
  heroMeta: document.querySelector("#hero-meta"),
  heroDots: document.querySelector("#hero-dots"),
  openSite: document.querySelector("#open-site"),
  openLabel: document.querySelector("#open-label"),
  siteGrid: document.querySelector("#site-grid"),
  selectionCount: document.querySelector("#selection-count"),
  selectionHint: document.querySelector("#selection-hint")
};

let activeIndex = 0;
let imageRequest = 0;

function renderDots() {
  elements.heroDots.innerHTML = sites.map((site, siteIndex) => `
    <button
      class="hero-dot"
      type="button"
      data-index="${siteIndex}"
      aria-label="查看 ${site.title}"
    ></button>
  `).join("");

  elements.heroDots.querySelectorAll(".hero-dot").forEach((dot) => {
    dot.addEventListener("click", () => selectSite(Number(dot.dataset.index), { focus: true }));
  });
}

function renderCards() {
  elements.siteGrid.innerHTML = sites.map((site, siteIndex) => `
    <button
      class="site-card site-card--${site.theme}"
      type="button"
      role="tab"
      data-index="${siteIndex}"
      aria-selected="false"
      tabindex="-1"
      aria-label="选择 ${site.title} 入口"
    >
      <span class="site-card__image-wrap">
        <img src="${site.image}" alt="" loading="lazy">
        <span class="site-card__shade" aria-hidden="true"></span>
        <span class="site-card__number">${site.index}</span>
      </span>
      <span class="site-card__body">
        <span class="site-card__tag">${site.label}</span>
        <strong>${site.title}</strong>
        <small>${site.summary}</small>
      </span>
      <span class="site-card__arrow" aria-hidden="true">↗</span>
    </button>
  `).join("") + `
    <div class="site-card site-card--future" aria-label="未来入口占位">
      <span class="site-card__future-mark" aria-hidden="true">+</span>
      <span class="site-card__future-copy">
        <span class="site-card__tag">COMING SOON</span>
        <strong>下一个空间</strong>
        <small>等你命名</small>
      </span>
    </div>
  `;

  elements.siteGrid.querySelectorAll(".site-card[data-index]").forEach((card) => {
    card.addEventListener("click", () => selectSite(Number(card.dataset.index), { focus: true }));
  });
}

function renderMeta(site) {
  elements.heroMeta.innerHTML = site.meta.map(([label, value]) => `
    <div>
      <span>${label}</span>
      <strong>${value}</strong>
    </div>
  `).join("");
}

function updateActiveStates() {
  elements.siteGrid.querySelectorAll(".site-card[data-index]").forEach((card) => {
    const isActive = Number(card.dataset.index) === activeIndex;
    card.classList.toggle("is-active", isActive);
    card.setAttribute("aria-selected", String(isActive));
    card.tabIndex = isActive ? 0 : -1;
  });

  elements.heroDots.querySelectorAll(".hero-dot").forEach((dot) => {
    dot.classList.toggle("is-active", Number(dot.dataset.index) === activeIndex);
  });
}

function updateHeroImage(site) {
  const requestId = ++imageRequest;
  elements.heroImage.classList.add("is-changing");
  const nextImage = new Image();

  nextImage.onload = () => {
    if (requestId !== imageRequest) return;
    elements.heroImage.src = site.image;
    elements.heroImage.alt = site.alt;
    window.requestAnimationFrame(() => elements.heroImage.classList.remove("is-changing"));
  };

  nextImage.onerror = () => {
    if (requestId !== imageRequest) return;
    elements.heroImage.classList.remove("is-changing");
  };

  nextImage.src = site.image;
}

function selectSite(index, options = {}) {
  const site = sites[index];
  if (!site) return;

  const { updateHash = true, focus = false } = options;
  activeIndex = index;
  elements.body.dataset.theme = site.theme;
  elements.heroKicker.textContent = `${site.index} / ${String(sites.length).padStart(2, "0")} · ${site.label}`;
  elements.heroState.textContent = site.state;
  elements.heroTitle.textContent = site.title;
  elements.heroSubtitle.textContent = site.subtitle;
  elements.heroDescription.textContent = site.description;
  elements.openSite.href = site.url;
  elements.openLabel.textContent = site.buttonLabel;
  elements.selectionCount.textContent = site.index;
  elements.selectionHint.textContent = `${site.title} 已选中 · 按方向键切换`;
  renderMeta(site);
  updateHeroImage(site);
  updateActiveStates();

  const selectedCard = elements.siteGrid.querySelector(`[data-index="${index}"]`);
  if (selectedCard) {
    selectedCard.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    if (focus) selectedCard.focus({ preventScroll: true });
  }

  if (updateHash) {
    window.history.replaceState(null, "", `#${site.slug}`);
  }
}

function moveSelection(step) {
  const nextIndex = (activeIndex + step + sites.length) % sites.length;
  selectSite(nextIndex, { focus: true });
}

function openActiveSite() {
  window.open(sites[activeIndex].url, "_blank", "noopener,noreferrer");
}

function scrollRail(direction) {
  moveSelection(direction === "next" ? 1 : -1);
}

function updateClock() {
  const now = new Date();
  elements.clock.textContent = new Intl.DateTimeFormat("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(now);
  elements.year.textContent = String(now.getFullYear());
}

function selectFromHash() {
  const slug = window.location.hash.slice(1).toLowerCase();
  const index = sites.findIndex((site) => site.slug === slug);
  selectSite(index >= 0 ? index : 0, { updateHash: false });
}

document.querySelectorAll("[data-direction]").forEach((button) => {
  button.addEventListener("click", () => moveSelection(button.dataset.direction === "next" ? 1 : -1));
});

document.querySelectorAll("[data-rail]").forEach((button) => {
  button.addEventListener("click", () => scrollRail(button.dataset.rail));
});

document.addEventListener("keydown", (event) => {
  const target = event.target;
  if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) return;

  const key = event.key.toLowerCase();
  if (key === "arrowright" || key === "arrowdown") {
    event.preventDefault();
    moveSelection(1);
  } else if (key === "arrowleft" || key === "arrowup") {
    event.preventDefault();
    moveSelection(-1);
  } else if (key === "enter") {
    event.preventDefault();
    openActiveSite();
  } else if (["1", "2", "3"].includes(key)) {
    selectSite(Number(key) - 1, { focus: true });
  }
});

renderDots();
renderCards();
selectFromHash();
updateClock();
window.setInterval(updateClock, 30000);
window.addEventListener("hashchange", selectFromHash);
