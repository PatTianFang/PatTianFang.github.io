(function () {
    const viewer = document.querySelector('[data-pdf-viewer]');
    if (!viewer) return;

    const pdfUrl = viewer.getAttribute('data-pdf-url');
    const rootPrefix = viewer.getAttribute('data-root-prefix') || '';
    const stage = viewer.querySelector('.pdf-viewer-stage');
    const pagesList = viewer.querySelector('[data-pdf-pages]');
    const singlePanel = viewer.querySelector('[data-pdf-single]');
    const singleCanvas = viewer.querySelector('[data-pdf-canvas]');
    const status = viewer.querySelector('[data-pdf-status]');
    const pageCurrent = viewer.querySelector('[data-pdf-current]');
    const pageTotal = viewer.querySelector('[data-pdf-total]');
    const prevButton = viewer.querySelector('[data-pdf-prev]');
    const nextButton = viewer.querySelector('[data-pdf-next]');
    const zoomOutButton = viewer.querySelector('[data-pdf-zoom-out]');
    const zoomInButton = viewer.querySelector('[data-pdf-zoom-in]');
    const listModeButton = viewer.querySelector('[data-pdf-mode-list]');
    const singleModeButton = viewer.querySelector('[data-pdf-mode-single]');

    if (!pdfUrl || !stage || !pagesList || !singleCanvas) return;

    let pdfDoc = null;
    let pageNumber = 1;
    let scale = 1.2;
    let mode = 'list';
    let renderToken = 0;

    function setStatus(message) {
        if (status) status.textContent = message;
    }

    function updateControls() {
        if (pageCurrent) pageCurrent.textContent = String(pageNumber);
        if (pageTotal) pageTotal.textContent = pdfDoc ? String(pdfDoc.numPages) : '--';
        if (prevButton) prevButton.disabled = !pdfDoc || pageNumber <= 1;
        if (nextButton) nextButton.disabled = !pdfDoc || pageNumber >= pdfDoc.numPages;
        if (listModeButton) listModeButton.classList.toggle('active', mode === 'list');
        if (singleModeButton) singleModeButton.classList.toggle('active', mode === 'single');
        viewer.setAttribute('data-pdf-mode', mode);
    }

    function clearElement(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    function makeCanvas() {
        const canvas = document.createElement('canvas');
        canvas.className = 'pdf-page-canvas';
        return canvas;
    }

    async function drawPageToCanvas(pageIndex, canvas) {
        const page = await pdfDoc.getPage(pageIndex);
        const viewport = page.getViewport({ scale });
        const outputScale = window.devicePixelRatio || 1;
        const context = canvas.getContext('2d');

        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        await page.render({
            canvasContext: context,
            viewport,
            transform: outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null,
        }).promise;
    }

    async function renderList() {
        if (!pdfDoc) return;
        const token = ++renderToken;
        mode = 'list';
        pagesList.hidden = false;
        singlePanel.hidden = true;
        updateControls();
        setStatus('正在渲染 PDF...');
        clearElement(pagesList);

        try {
            for (let index = 1; index <= pdfDoc.numPages; index += 1) {
                if (token !== renderToken) return;
                const pageWrap = document.createElement('div');
                pageWrap.className = 'pdf-page';
                pageWrap.setAttribute('data-page-number', String(index));
                const pageLabel = document.createElement('span');
                pageLabel.className = 'pdf-page-label';
                pageLabel.textContent = `第 ${index} 页`;
                const canvas = makeCanvas();
                pageWrap.append(pageLabel, canvas);
                pagesList.appendChild(pageWrap);
                await drawPageToCanvas(index, canvas);
            }
            setStatus('');
            scrollToListPage(pageNumber, false);
            updateCurrentPageFromScroll();
        } catch (_error) {
            setStatus('当前环境无法直接预览 PDF，可使用上方按钮打开或下载。');
        }
    }

    async function renderSingle(nextPage) {
        if (!pdfDoc) return;
        const token = ++renderToken;
        mode = 'single';
        pageNumber = Math.min(Math.max(nextPage, 1), pdfDoc.numPages);
        pagesList.hidden = true;
        singlePanel.hidden = false;
        updateControls();
        setStatus('正在渲染 PDF...');

        try {
            await drawPageToCanvas(pageNumber, singleCanvas);
            if (token !== renderToken) return;
            setStatus('');
        } catch (_error) {
            setStatus('当前环境无法直接预览 PDF，可使用上方按钮打开或下载。');
        }
    }

    function scrollToListPage(nextPage, smooth) {
        const target = pagesList.querySelector(`[data-page-number="${nextPage}"]`);
        if (!target) return;
        stage.scrollTo({
            top: target.offsetTop - pagesList.offsetTop,
            behavior: smooth ? 'smooth' : 'auto',
        });
    }

    function updateCurrentPageFromScroll() {
        if (mode !== 'list' || !pdfDoc) return;
        const pages = Array.from(pagesList.querySelectorAll('.pdf-page'));
        if (!pages.length) return;
        const anchor = stage.scrollTop + stage.clientHeight * 0.32;
        let activePage = 1;
        pages.forEach(page => {
            if (page.offsetTop - pagesList.offsetTop <= anchor) {
                activePage = Number(page.getAttribute('data-page-number')) || activePage;
            }
        });
        pageNumber = activePage;
        updateControls();
    }

    function setMode(nextMode) {
        if (!pdfDoc || nextMode === mode) return;
        if (nextMode === 'single') {
            renderSingle(pageNumber);
        } else {
            renderList();
        }
    }

    function goToPage(nextPage) {
        if (!pdfDoc) return;
        const boundedPage = Math.min(Math.max(nextPage, 1), pdfDoc.numPages);
        pageNumber = boundedPage;
        updateControls();
        if (mode === 'single') {
            renderSingle(boundedPage);
        } else {
            scrollToListPage(boundedPage, true);
        }
    }

    function setScale(nextScale) {
        if (!pdfDoc) return;
        scale = Math.min(2.6, Math.max(0.7, nextScale));
        if (mode === 'single') {
            renderSingle(pageNumber);
        } else {
            renderList();
        }
    }

    async function loadPdf() {
        try {
            const pdfjs = await import(`${rootPrefix}vendor/pdfjs/pdf.mjs`);
            pdfjs.GlobalWorkerOptions.workerSrc = `${rootPrefix}vendor/pdfjs/pdf.worker.mjs`;
            setStatus('正在加载 PDF...');
            pdfDoc = await pdfjs.getDocument(pdfUrl).promise;
            updateControls();
            renderList();
        } catch (_error) {
            setStatus('当前环境无法直接预览 PDF，可使用上方按钮打开或下载。');
            updateControls();
        }
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => goToPage(pageNumber - 1));
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => goToPage(pageNumber + 1));
    }

    if (zoomOutButton) {
        zoomOutButton.addEventListener('click', () => setScale(scale - 0.2));
    }

    if (zoomInButton) {
        zoomInButton.addEventListener('click', () => setScale(scale + 0.2));
    }

    if (listModeButton) {
        listModeButton.addEventListener('click', () => setMode('list'));
    }

    if (singleModeButton) {
        singleModeButton.addEventListener('click', () => setMode('single'));
    }

    stage.addEventListener('scroll', () => {
        window.requestAnimationFrame(updateCurrentPageFromScroll);
    });

    stage.addEventListener('wheel', event => {
        if (!event.ctrlKey) return;
        event.preventDefault();
        setScale(scale + (event.deltaY < 0 ? 0.12 : -0.12));
    }, { passive: false });

    updateControls();
    loadPdf();
}());
