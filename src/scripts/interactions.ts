let dispose: (() => void) | undefined;

export function initInteractions() {
  dispose?.();
  const controller = new AbortController();
  const { signal } = controller;
  const root = document.documentElement;
  const header = document.querySelector<HTMLElement>('[data-header]');
  const menu = document.querySelector<HTMLDialogElement>('#site-menu');
  const menuButton = document.querySelector<HTMLButtonElement>('[data-menu-open]');
  const viewer = document.querySelector<HTMLDialogElement>('#image-viewer');
  const image = document.querySelector<HTMLImageElement>('#image-viewer-image');
  const caption = document.querySelector<HTMLElement>('#image-viewer-caption');
  const counter = document.querySelector<HTMLElement>('#image-viewer-counter');
  const original = document.querySelector<HTMLAnchorElement>('#image-viewer-original');
  const zoomButton = document.querySelector<HTMLButtonElement>('[data-viewer-zoom]');
  const previous = document.querySelector<HTMLButtonElement>('[data-viewer-prev]');
  const next = document.querySelector<HTMLButtonElement>('[data-viewer-next]');
  const status = viewer?.querySelector<HTMLElement>('.viewer-status');
  const viewport = viewer?.querySelector<HTMLElement>('.image-dialog-viewport');
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[data-lightbox]'));
  let currentGroup: HTMLAnchorElement[] = [];
  let currentIndex = 0;
  let returnFocus: HTMLElement | null = null;
  let headerFrame = 0;
  let touchOrigin: { x: number; y: number } | null = null;

  function syncModalState() {
    const open = Boolean(document.querySelector('dialog[open]'));
    root.classList.toggle('dialog-open', open);
    document.dispatchEvent(new CustomEvent('silkroad:modalchange', { detail: { open } }));
  }

  function closeDialog(dialog: HTMLDialogElement) {
    dialog.close();
    syncModalState();
  }

  function openDialog(dialog: HTMLDialogElement, trigger: HTMLElement) {
    returnFocus = trigger;
    dialog.showModal();
    syncModalState();
  }

  function setZoom(zoomed: boolean) {
    if (!viewer || !zoomButton) return;
    viewer.classList.toggle('is-zoomed', zoomed);
    zoomButton.setAttribute('aria-pressed', String(zoomed));
    const label = zoomButton.querySelector('span');
    if (label) label.textContent = zoomed ? '全体を表示' : '拡大する';
    viewport?.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }

  function showImage(index: number) {
    if (!image || !caption || !counter || !original || !currentGroup.length) return;
    currentIndex = (index + currentGroup.length) % currentGroup.length;
    const link = currentGroup[currentIndex];
    const label = link.dataset.caption || 'Club シルクロードの写真';
    setZoom(false);
    image.hidden = true;
    image.alt = label;
    caption.textContent = label;
    counter.textContent = `${currentIndex + 1} / ${currentGroup.length}`;
    original.href = link.href;
    if (previous) previous.disabled = currentGroup.length < 2;
    if (next) next.disabled = currentGroup.length < 2;
    if (zoomButton) zoomButton.disabled = true;
    if (status) { status.hidden = false; status.textContent = '画像を読み込んでいます…'; }
    image.src = link.href;
  }

  if (image) {
    image.addEventListener('load', () => {
      image.hidden = false;
      image.style.setProperty('--natural-width', `${image.naturalWidth}px`);
      if (status) status.hidden = true;
      if (zoomButton) zoomButton.disabled = false;
    }, { signal });
    image.addEventListener('error', () => {
      image.hidden = true;
      if (status) { status.hidden = false; status.textContent = '画像を表示できませんでした。「元の画像」からご覧ください。'; }
    }, { signal });
  }

  for (const dialog of [menu, viewer]) {
    if (!dialog || typeof dialog.showModal !== 'function') continue;
    dialog.querySelectorAll<HTMLButtonElement>('[data-dialog-close]').forEach(button => {
      button.addEventListener('click', () => closeDialog(dialog), { signal });
    });
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const box = dialog.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) closeDialog(dialog);
    }, { signal });
    dialog.addEventListener('close', () => {
      syncModalState();
      if (dialog === menu) menuButton?.setAttribute('aria-expanded', 'false');
      if (dialog === viewer) {
        setZoom(false);
        image?.removeAttribute('src');
        if (image) image.hidden = true;
      }
      returnFocus?.focus({ preventScroll: true });
      returnFocus = null;
    }, { signal });
  }

  if (menu && menuButton && typeof menu.showModal === 'function') {
    menuButton.hidden = false;
    menuButton.setAttribute('aria-expanded', 'false');
    root.classList.add('interactions-ready');
    menuButton.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'true');
      openDialog(menu, menuButton);
    }, { signal });
    menu.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(link => {
      link.addEventListener('click', () => {
        // Let the destination receive focus instead of returning to the menu button.
        returnFocus = null;
        closeDialog(menu);
      }, { signal });
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 700 && menu.open) closeDialog(menu);
    }, { signal, passive: true });
  }

  if (viewer && typeof viewer.showModal === 'function') {
    links.forEach(link => {
      link.addEventListener('click', event => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
        event.preventDefault();
        currentGroup = links.filter(item => item.dataset.gallery === link.dataset.gallery);
        showImage(currentGroup.indexOf(link));
        openDialog(viewer, link);
      }, { signal });
    });
    previous?.addEventListener('click', () => showImage(currentIndex - 1), { signal });
    next?.addEventListener('click', () => showImage(currentIndex + 1), { signal });
    zoomButton?.addEventListener('click', () => setZoom(!viewer.classList.contains('is-zoomed')), { signal });
    viewer.addEventListener('keydown', event => {
      if (viewer.classList.contains('is-zoomed')) return;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        showImage(currentIndex + (event.key === 'ArrowRight' ? 1 : -1));
      }
    }, { signal });
    viewport?.setAttribute('tabindex', '0');
    viewport?.setAttribute('data-lenis-prevent', '');
    viewport?.addEventListener('touchstart', event => {
      touchOrigin = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
    }, { signal, passive: true });
    viewport?.addEventListener('touchend', event => {
      if (!touchOrigin || !event.changedTouches.length || viewer.classList.contains('is-zoomed')) { touchOrigin = null; return; }
      const dx = event.changedTouches[0].clientX - touchOrigin.x;
      const dy = event.changedTouches[0].clientY - touchOrigin.y;
      if (Math.abs(dx) > 65 && Math.abs(dx) > Math.abs(dy) * 1.5) showImage(currentIndex + (dx < 0 ? 1 : -1));
      touchOrigin = null;
    }, { signal, passive: true });
  }

  function updateHeader() {
    header?.classList.toggle('is-scrolled', window.scrollY > 35);
    headerFrame = 0;
  }
  updateHeader();
  window.addEventListener('scroll', () => {
    if (!headerFrame) headerFrame = window.requestAnimationFrame(updateHeader);
  }, { signal, passive: true });

  dispose = () => {
    controller.abort();
    window.cancelAnimationFrame(headerFrame);
    [menu, viewer].forEach(dialog => { if (dialog?.open) dialog.close(); });
    root.classList.remove('dialog-open', 'interactions-ready');
    if (menuButton) menuButton.hidden = true;
  };
}

if (import.meta.hot) import.meta.hot.dispose(() => dispose?.());
