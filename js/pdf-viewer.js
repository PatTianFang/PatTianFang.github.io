(function () {
    const viewer = document.querySelector('[data-pdf-viewer]');
    if (!viewer) return;

    const pdfUrl = viewer.getAttribute('data-pdf-url');
    const rootPrefix = viewer.getAttribute('data-root-prefix') || '';
    const canvas = viewer.querySelector('[data-pdf-canvas]');
    const status = viewer.querySelector('[data-pdf-status]');
    const pageCurrent = viewer.querySelector('[data-pdf-current]');
    const pageTotal = viewer.querySelector('[data-pdf-total]');
    const prevButton = viewer.querySelector('[data-pdf-prev]');
    const nextButton = viewer.querySelector('[data-pdf-next]');
    const zoomOutButton = viewer.querySelector('[data-pdf-zoom-out]');
    const zoomInButton = viewer.querySelector('[data-pdf-zoom-in]');

    if (!pdfUrl || !canvas) return;

    const context = canvas.getContext('2d');
    let pdfDoc = null;
    let pageNumber = 1;
    let scale = 1.2;
    let rendering = false;
    let pendingPage = null;

    function setStatus(message) {
        if (status) status.textContent = message;
    }

    function updateControls() {
        if (pageCurrent) pageCurrent.textContent = String(pageNumber);
        if (pageTotal) pageTotal.textContent = pdfDoc ? String(pdfDoc.numPages) : '--';
        if (prevButton) prevButton.disabled = !pdfDoc || pageNumber <= 1;
        if (nextButton) nextButton.disabled = !pdfDoc || pageNumber >= pdfDoc.numPages;
    }

    function queueRender(nextPage) {
        if (rendering) {
            pendingPage = nextPage;
            return;
        }
        renderPage(nextPage);
    }

    async function renderPage(nextPage) {
        if (!pdfDoc) return;
        rendering = true;
        pageNumber = nextPage;
        updateControls();
        setStatus('正在渲染 PDF...');

        try {
            const page = await pdfDoc.getPage(pageNumber);
            const viewport = page.getViewport({ scale });
            const outputScale = window.devicePixelRatio || 1;

            canvas.width = Math.floor(viewport.width * outputScale);
            canvas.height = Math.floor(viewport.height * outputScale);
            canvas.style.width = `${Math.floor(viewport.width)}px`;
            canvas.style.height = `${Math.floor(viewport.height)}px`;

            await page.render({
                canvasContext: context,
                viewport,
                transform: outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null,
            }).promise;

            setStatus('');
        } catch (_error) {
            setStatus('当前环境无法直接预览 PDF，可使用上方按钮打开或下载。');
        } finally {
            rendering = false;
            if (pendingPage !== null) {
                const page = pendingPage;
                pendingPage = null;
                queueRender(page);
            }
        }
    }

    async function loadPdf() {
        try {
            const pdfjs = await import(`${rootPrefix}vendor/pdfjs/pdf.mjs`);
            pdfjs.GlobalWorkerOptions.workerSrc = `${rootPrefix}vendor/pdfjs/pdf.worker.mjs`;
            setStatus('正在加载 PDF...');
            pdfDoc = await pdfjs.getDocument(pdfUrl).promise;
            updateControls();
            queueRender(1);
        } catch (_error) {
            setStatus('当前环境无法直接预览 PDF，可使用上方按钮打开或下载。');
            updateControls();
        }
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            if (!pdfDoc || pageNumber <= 1) return;
            queueRender(pageNumber - 1);
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            if (!pdfDoc || pageNumber >= pdfDoc.numPages) return;
            queueRender(pageNumber + 1);
        });
    }

    if (zoomOutButton) {
        zoomOutButton.addEventListener('click', () => {
            if (!pdfDoc) return;
            scale = Math.max(0.7, scale - 0.2);
            queueRender(pageNumber);
        });
    }

    if (zoomInButton) {
        zoomInButton.addEventListener('click', () => {
            if (!pdfDoc) return;
            scale = Math.min(2.2, scale + 0.2);
            queueRender(pageNumber);
        });
    }

    updateControls();
    loadPdf();
}());
