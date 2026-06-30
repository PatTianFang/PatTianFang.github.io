const grid = document.querySelector("#personGrid");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox.querySelector(".lightbox-image");
const closeButton = lightbox.querySelector(".lightbox-close");

function buildPersonGrid() {
    const fragment = document.createDocumentFragment();

    personPhotos.forEach((photo, index) => {
        const button = document.createElement("button");
        button.className = "person-card";
        button.type = "button";
        button.dataset.index = String(index);

        const image = document.createElement("img");
        image.src = photo.thumb;
        image.alt = photo.alt;
        image.loading = index < 2 ? "eager" : "lazy";
        image.decoding = "async";
        image.fetchPriority = index < 2 ? "high" : "low";

        button.appendChild(image);
        fragment.appendChild(button);
    });

    grid.appendChild(fragment);
}

function openLightbox(index) {
    const photo = personPhotos[index];
    lightboxImage.src = photo.large;
    lightboxImage.alt = photo.alt;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

buildPersonGrid();

grid.addEventListener("click", (event) => {
    const card = event.target.closest(".person-card");
    if (!card) return;
    openLightbox(Number(card.dataset.index));
});

closeButton.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
});

window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
        closeLightbox();
    }
});
