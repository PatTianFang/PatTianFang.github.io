const photos = Array.from({ length: 26 }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    return {
        thumb: `assets/webp/thumbs/photo-${number}.webp`,
        large: `assets/webp/large/photo-${number}.webp`,
        fallback: `assets/images/photo-${number}.jpg`,
        alt: `大学毕业回忆照片 ${index + 1}`,
        caption: `大学毕业回忆 · ${number}`
    };
});

const gallery = document.querySelector("#photoGallery");
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

        button.appendChild(image);
        fragment.appendChild(button);
    });

    gallery.appendChild(fragment);
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
initReveal();

gallery.addEventListener("click", (event) => {
    const tile = event.target.closest(".photo-tile");
    if (!tile) return;
    openLightbox(Number(tile.dataset.index));
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
