/**
 * Mint on the Avenue v2 — front-end JS (GSAP scroll + drawer)
 * Loaded after Imaginal's site-js.
 */
(function () {
  'use strict';
  if (typeof gsap === 'undefined') return;
  if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

  document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initDrawer();
    initDropdowns();
    initHeroParallax();
    initFadeIns();
  });

  function initDropdowns() {
    const items = document.querySelectorAll('.header-nav .menu-item-has-children');
    if (!items.length) return;
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

    items.forEach(item => {
      const link = item.querySelector(':scope > a');
      if (!link) return;
      const href = (link.getAttribute('href') || '').trim();
      const label = (link.textContent || '').trim().toLowerCase();
      if (!href || href === '#' || href.endsWith('/#') || href.endsWith('#')) {
        if (label.indexOf('service') !== -1) link.setAttribute('href', '/services/');
      }
      link.addEventListener('click', (e) => {
        if (!isTouch) return;
        if (!item.classList.contains('open')) {
          e.preventDefault();
          document.querySelectorAll('.header-nav .menu-item-has-children.open').forEach(o => {
            if (o !== item) o.classList.remove('open');
          });
          item.classList.add('open');
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.header-nav .menu-item-has-children')) {
        document.querySelectorAll('.header-nav .menu-item-has-children.open')
          .forEach(o => o.classList.remove('open'));
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.header-nav .menu-item-has-children.open')
          .forEach(o => o.classList.remove('open'));
      }
    });
  }

  function initHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function initDrawer() {
    const toggle = document.querySelector('.menu-toggle');
    const overlay = document.querySelector('.drawer-overlay');
    if (!toggle || !overlay) return;
    let open = false;

    const openMenu = () => {
      open = true;
      overlay.classList.add('open');
      document.documentElement.classList.add('menu-open');
      document.body.style.overflow = 'hidden';
      toggle.setAttribute('aria-expanded', 'true');
    };
    const closeMenu = () => {
      open = false;
      overlay.classList.remove('open');
      document.documentElement.classList.remove('menu-open');
      document.body.style.overflow = '';
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => open ? closeMenu() : openMenu());
    overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && open) closeMenu(); });
  }

  function initHeroParallax() {
    if (typeof ScrollTrigger === 'undefined') return;
    const heroSplit = document.querySelector('.hero-split');
    if (!heroSplit) return;
    gsap.to(heroSplit, {
      y: '-15%', ease: 'none',
      scrollTrigger: { trigger: '.site-hero', start: 'top top', end: 'bottom top', scrub: true },
    });
  }

  function initFadeIns() {
    if (typeof ScrollTrigger === 'undefined') {
      document.querySelectorAll('.fade-up, .fade-blur').forEach(el => {
        el.style.opacity = 1;
        el.style.transform = 'none';
        el.style.filter = 'none';
      });
      return;
    }
    document.querySelectorAll('.fade-up').forEach(el => {
      const delay = parseFloat(el.dataset.delay || 0);
      gsap.fromTo(el,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', delay,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true } }
      );
    });
    document.querySelectorAll('.fade-blur').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 24, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true } }
      );
    });
  }
})();
