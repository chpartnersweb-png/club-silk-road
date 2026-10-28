import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

let dispose: (() => void) | undefined;
let heroPlayed = false;

export function initMotion() {
  dispose?.();
  const media = gsap.matchMedia();
  const controller = new AbortController();
  const { signal } = controller;
  let active = true;
  let refreshFrame = 0;

  function scheduleRefresh() {
    if (!active || refreshFrame) return;
    refreshFrame = window.requestAnimationFrame(() => {
      refreshFrame = 0;
      if (active) ScrollTrigger.refresh();
    });
  }

  media.add({
    reduced: '(prefers-reduced-motion: reduce)',
    desktop: '(min-width: 701px) and (hover: hover) and (pointer: fine)',
    all: '(min-width: 0px)',
  }, context => {
    const conditions = context.conditions as { reduced: boolean; desktop: boolean };
    if (conditions.reduced) return;

    let lenis: Lenis | undefined;
    let ticker: ((time: number) => void) | undefined;
    const onLenisScroll = () => ScrollTrigger.update();
    if (conditions.desktop) {
      lenis = new Lenis({ duration: 1, smoothWheel: true, syncTouch: false, autoRaf: false, anchors: false });
      lenis.on('scroll', onLenisScroll);
      ticker = time => lenis?.raf(time * 1000);
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
      if (document.querySelector('dialog[open]')) lenis.stop();
    }

    if (!heroPlayed) {
      heroPlayed = true;
      gsap.fromTo('[data-hero-media]', { scale: 1.025 }, { scale: 1, duration: 1.5, ease: 'power2.out' });
    }

    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(element => {
      gsap.fromTo(element, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: .85, ease: 'power2.out', immediateRender: false,
        scrollTrigger: { trigger: element, start: 'top 94%', once: true },
        onComplete: () => { gsap.set(element, { clearProps: 'opacity,transform' }); },
      });
    });

    if (conditions.desktop) {
      gsap.to('.hero-media img', { y: 18, scale: 1.06, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach(element => {
        const frame = element.closest<HTMLElement>('.photo-frame');
        if (!frame) return;
        const distance = Number(element.dataset.parallax || 18) / 2;
        gsap.fromTo(element, { y: -distance, scale: 1.08 }, { y: distance, scale: 1.08, ease: 'none', scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: .8 } });
      });
    }

    function onModalChange(event: Event) {
      if (!(event instanceof CustomEvent)) return;
      if (event.detail.open) lenis?.stop();
      else { lenis?.start(); lenis?.resize(); scheduleRefresh(); }
    }

    function onAnchor(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
      const href = link?.getAttribute('href');
      if (!href || href === '#') return;
      let target: HTMLElement | null = null;
      try { target = document.getElementById(decodeURIComponent(href.slice(1))); } catch { return; }
      if (!target) return;
      event.preventDefault();
      const offset = (document.querySelector<HTMLElement>('[data-header]')?.offsetHeight || 68) + 20;
      if (lenis) lenis.scrollTo(target, { offset: -offset, duration: 1 });
      else target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (window.location.hash !== href) window.history.pushState(null, '', href);
      const hadTabindex = target.hasAttribute('tabindex');
      if (!hadTabindex) {
        target.setAttribute('tabindex', '-1');
        target.addEventListener('blur', () => target?.removeAttribute('tabindex'), { once: true });
      }
      target.focus({ preventScroll: true });
    }

    document.addEventListener('silkroad:modalchange', onModalChange);
    document.addEventListener('click', onAnchor);
    return () => {
      document.removeEventListener('silkroad:modalchange', onModalChange);
      document.removeEventListener('click', onAnchor);
      if (ticker) gsap.ticker.remove(ticker);
      lenis?.off('scroll', onLenisScroll);
      lenis?.destroy();
    };
  });

  document.querySelectorAll('details').forEach(detail => detail.addEventListener('toggle', scheduleRefresh, { signal }));
  document.querySelectorAll('img').forEach(image => {
    if (!image.complete) image.addEventListener('load', scheduleRefresh, { once: true, signal });
  });
  document.fonts.ready.then(() => { if (active) scheduleRefresh(); });
  scheduleRefresh();

  dispose = () => {
    active = false;
    controller.abort();
    window.cancelAnimationFrame(refreshFrame);
    media.revert();
  };
}

if (import.meta.hot) import.meta.hot.dispose(() => dispose?.());
