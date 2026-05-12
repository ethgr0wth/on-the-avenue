/**
 * Mint on the Avenue — Theme JS v2.0
 * GSAP + ScrollTrigger · no jQuery dependency
 */

(function () {
  'use strict';

  /* ─── GSAP Setup ─────────────────────────────────────────────── */
  gsap.registerPlugin(ScrollTrigger);

  /* ─── DOM Ready ──────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initDrawerMenu();
    initHeroParallax();
    initFadeUps();
    initMarquee();
    initLookbookDrag();
    initServiceTabs();
  });

  /* ─── Header scroll state ────────────────────────────────────── */
  function initHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const onScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─── Drawer / Mobile Menu ───────────────────────────────────── */
  function initDrawerMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const overlay = document.querySelector('.drawer-overlay');
    const links = overlay ? overlay.querySelectorAll('a') : [];
    if (!toggle || !overlay) return;

    let open = false;

    const openMenu = () => {
      open = true;
      overlay.classList.add('open');
      document.documentElement.classList.add('menu-open');
      document.body.style.overflow = 'hidden';
      gsap.to(links, {
        x: 0, opacity: 1,
        duration: 0.6, stagger: 0.06,
        ease: 'power3.out',
        delay: 0.1,
      });
    };

    const closeMenu = () => {
      open = false;
      overlay.classList.remove('open');
      document.documentElement.classList.remove('menu-open');
      document.body.style.overflow = '';
      gsap.set(links, { x: -20, opacity: 0 });
    };

    toggle.addEventListener('click', () => open ? closeMenu() : openMenu());

    overlay.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && open) closeMenu();
    });

    // Init link positions
    gsap.set(links, { x: -20, opacity: 0 });
  }

  /* ─── Hero Parallax ──────────────────────────────────────────── */
  function initHeroParallax() {
    const heroSplit = document.querySelector('.hero-split');
    if (!heroSplit) return;

    gsap.to(heroSplit, {
      y: '-15%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.site-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  /* ─── Fade-up Entrance Animations ───────────────────────────── */
  function initFadeUps() {
    const els = document.querySelectorAll('.fade-up');
    els.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0,
          duration: 1.0,
          ease: 'power3.out',
          delay: el.dataset.delay ? parseFloat(el.dataset.delay) : 0,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        }
      );
    });

    // Featured blockquote with blur
    document.querySelectorAll('.fade-blur').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 24, filter: 'blur(8px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });
  }

  /* ─── Marquee Ticker ─────────────────────────────────────────── */
  function initMarquee() {
    const track = document.querySelector('.js-marquee-track');
    if (!track) return;

    const clone = track.cloneNode(true);
    track.parentElement.appendChild(clone);

    const speed = 0.4; // px per frame
    let raf;
    let pos = 0;
    const totalW = track.scrollWidth;

    const tick = () => {
      pos -= speed;
      if (Math.abs(pos) >= totalW) pos = 0;
      track.parentElement.style.transform = `translateX(${pos}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Pause on hover
    const wrapper = track.parentElement.parentElement;
    if (wrapper) {
      wrapper.addEventListener('mouseenter', () => cancelAnimationFrame(raf));
      wrapper.addEventListener('mouseleave', () => { raf = requestAnimationFrame(tick); });
    }
  }

  /* ─── Lookbook horizontal drag scroll ───────────────────────── */
  function initLookbookDrag() {
    const scroll = document.querySelector('.lookbook-scroll');
    if (!scroll) return;

    let isDown = false;
    let startX, scrollLeft;

    scroll.addEventListener('mousedown', e => {
      isDown = true;
      scroll.style.cursor = 'grabbing';
      startX = e.pageX - scroll.offsetLeft;
      scrollLeft = scroll.scrollLeft;
    });
    scroll.addEventListener('mouseleave', () => { isDown = false; scroll.style.cursor = ''; });
    scroll.addEventListener('mouseup', () => { isDown = false; scroll.style.cursor = ''; });
    scroll.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scroll.offsetLeft;
      scroll.scrollLeft = scrollLeft - (x - startX) * 1.5;
    });
  }

  /* ─── Services Tabs ──────────────────────────────────────────── */
  function initServiceTabs() {
    const btns = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.tab-panel');
    if (!btns.length) return;

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const target = document.getElementById('panel-' + btn.dataset.tab);
        if (target) {
          target.classList.add('active');
          gsap.fromTo(target, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
        }
      });
    });
  }

})();
