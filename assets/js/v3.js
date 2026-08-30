(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

  /* ------------------------------------------------------------
     Microinteractions layer
     Keeps the Jaque visual identity while adding the interaction
     language used on the reference site: stronger card states,
     subtle physical movement, responsive buttons and staggered UI.
     ------------------------------------------------------------ */
  const microStyles = document.createElement('style');
  microStyles.id = 'jaque-microinteractions';
  microStyles.textContent = `
    /* Motion polish */
    .section h2.reveal {
      filter: blur(3px);
      transform: translateY(30px);
      transition: opacity .78s var(--ease), transform .78s var(--ease), filter .78s var(--ease);
    }
    .section h2.reveal.is-visible { filter: blur(0); transform: translateY(0); }
    .section-kicker.reveal { transform: translateY(14px); }
    .section-kicker.reveal.is-visible { transform: translateY(0); }

    .page-hero-grid > div:first-child > h1 {
      animation: jaqueHeroIn .82s var(--ease) both;
    }
    .page-hero-grid > div:first-child > p {
      animation: jaqueHeroIn .82s .10s var(--ease) both;
    }
    .page-hero-grid > div:first-child > .hero-actions {
      animation: jaqueHeroIn .82s .18s var(--ease) both;
    }
    @keyframes jaqueHeroIn {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Buttons */
    .btn {
      will-change: transform;
      transition: transform .28s var(--ease), box-shadow .28s var(--ease), background .28s var(--ease), color .28s var(--ease), border-color .28s var(--ease);
    }
    .btn-light:hover { background: #F1E2D3; color: var(--wine-2); box-shadow: 0 14px 30px rgba(62,24,33,.14); }
    .btn:focus-visible { outline: 3px solid rgba(201,162,126,.46); outline-offset: 3px; }

    /* Home journey cards */
    .journey-card {
      transition: transform .45s var(--ease), box-shadow .45s var(--ease);
      will-change: transform;
    }
    .journey-content { transition: transform .45s var(--ease); }

    /* Service cards: strong interaction */
    .service-card {
      overflow: hidden;
      transition: transform .4s var(--ease), box-shadow .4s var(--ease), border-color .4s var(--ease), background .4s var(--ease), color .4s var(--ease);
    }
    .service-card h3,
    .service-card p,
    .service-number {
      transition: color .4s var(--ease), transform .4s var(--ease);
    }

    /* Course proof cards: strong interaction + image zoom */
    .proof-card {
      overflow: hidden;
      transition: transform .42s var(--ease), background .42s var(--ease), border-color .42s var(--ease), box-shadow .42s var(--ease), color .42s var(--ease);
    }
    .proof-card img { transition: transform .7s var(--ease), filter .7s var(--ease); }
    .proof-card small,
    .proof-card h3,
    .proof-card p { transition: color .42s var(--ease); }

    /* Curriculum: medium interaction */
    .curriculum-item {
      border-radius: 18px;
      transition: transform .35s var(--ease), background .35s var(--ease), box-shadow .35s var(--ease), border-color .35s var(--ease);
    }
    .curriculum-item .num {
      transition: background .35s var(--ease), color .35s var(--ease), transform .35s var(--ease);
    }
    .curriculum-item strong,
    .curriculum-item p { transition: color .35s var(--ease); }

    /* FAQ: compact interactive cards */
    .faq { display: grid; gap: 8px; }
    .faq details {
      margin: 0;
      padding: 18px 18px;
      border: 1px solid transparent;
      border-bottom-color: var(--line);
      border-radius: 18px;
      background: rgba(255,255,255,0);
      transition: background .32s var(--ease), border-color .32s var(--ease), box-shadow .32s var(--ease), transform .32s var(--ease);
    }
    .faq summary {
      align-items: center;
      transition: color .3s var(--ease), transform .3s var(--ease);
    }
    .faq summary::after {
      content: '+';
      flex: 0 0 34px;
      width: 34px;
      height: 34px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      background: var(--paper-2);
      color: var(--wine);
      font-size: 19px;
      line-height: 1;
      transition: transform .35s var(--ease), background .35s var(--ease), color .35s var(--ease);
    }
    .faq details[open] {
      background: rgba(255,255,255,.62);
      border-color: rgba(201,162,126,.45);
      box-shadow: 0 16px 38px rgba(92,38,51,.08);
    }
    .faq details[open] summary { color: var(--wine); }
    .faq details[open] summary::after {
      content: '–';
      background: var(--wine);
      color: white;
      transform: rotate(180deg);
    }
    .faq details[open] p { animation: faqAnswerIn .34s var(--ease) both; }
    @keyframes faqAnswerIn {
      from { opacity: 0; transform: translateY(-6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .faq.is-visible details { animation: faqItemIn .55s var(--ease) both; }
    .faq.is-visible details:nth-child(2) { animation-delay: 70ms; }
    .faq.is-visible details:nth-child(3) { animation-delay: 140ms; }
    .faq.is-visible details:nth-child(4) { animation-delay: 210ms; }
    .faq.is-visible details:nth-child(5) { animation-delay: 280ms; }
    @keyframes faqItemIn {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Gallery and media: movement rather than color changes */
    .gallery figure {
      transition: transform .42s var(--ease), box-shadow .42s var(--ease);
      will-change: transform;
    }
    .media-card { transition: transform .42s var(--ease), box-shadow .42s var(--ease); }

    /* Trust strip: restrained response */
    .trust-item { transition: background .3s var(--ease), transform .3s var(--ease); }

    @media (hover:hover) and (pointer:fine) {
      .btn:hover { transform: translateY(-3px); }
      .btn-secondary:hover {
        background: var(--wine);
        color: white;
        border-color: var(--wine);
        box-shadow: 0 12px 28px rgba(92,38,51,.16);
      }
      .callout .btn-secondary:hover {
        background: rgba(255,255,255,.12);
        color: white;
        border-color: rgba(255,255,255,.5);
        box-shadow: none;
      }

      .journey-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 30px 76px rgba(62,24,33,.18);
      }
      .journey-card:hover .journey-content { transform: translateY(-4px); }

      .service-card:hover {
        transform: translateY(-6px);
        background: var(--wine);
        color: white;
        border-color: transparent;
        box-shadow: 0 20px 44px rgba(92,38,51,.20);
      }
      .service-card:hover .service-number { color: #E7C9AB; transform: translateY(-1px); }
      .service-card:hover h3 { color: white; }
      .service-card:hover p { color: rgba(255,255,255,.82); }

      .proof-card:hover {
        transform: translateY(-6px);
        background: var(--wine);
        color: white;
        border-color: transparent;
        box-shadow: 0 20px 46px rgba(92,38,51,.20);
      }
      .proof-card:hover img { transform: scale(1.045); filter: saturate(.96); }
      .proof-card:hover small { color: #E7C9AB; }
      .proof-card:hover h3 { color: white; }
      .proof-card:hover p { color: rgba(255,255,255,.82); }

      .curriculum-item:hover {
        transform: translate3d(4px,-2px,0);
        background: rgba(239,231,225,.78);
        box-shadow: 0 12px 30px rgba(92,38,51,.07);
        border-color: rgba(201,162,126,.4);
      }
      .curriculum-item:hover .num {
        background: var(--wine);
        color: white;
        transform: scale(1.04);
      }
      .curriculum-item:hover strong { color: var(--wine); }

      .faq details:hover:not([open]) {
        background: rgba(239,231,225,.60);
        border-color: rgba(92,38,51,.10);
        transform: translateX(3px);
      }
      .faq details:hover summary::after { background: var(--wine); color: white; }

      .gallery figure:hover {
        transform: translateY(-3px);
        box-shadow: 0 18px 38px rgba(62,24,33,.14);
      }
      .gallery figure:hover img { transform: scale(1.05); }
      .media-card:hover { transform: translateY(-4px); box-shadow: 0 28px 70px rgba(62,24,33,.16); }
      .trust-item:hover { background: rgba(239,231,225,.55); transform: translateY(-2px); }
    }

    @media (hover:none) {
      .btn:active { transform: scale(.985); }
      .journey-card:active { transform: scale(.992); }
      .service-card:active {
        background: var(--wine);
        color: white;
        border-color: transparent;
        transform: scale(.992);
      }
      .service-card:active h3 { color: white; }
      .service-card:active p { color: rgba(255,255,255,.82); }
      .proof-card:active {
        background: var(--wine);
        color: white;
        border-color: transparent;
        transform: scale(.992);
      }
      .proof-card:active small { color: #E7C9AB; }
      .proof-card:active h3 { color: white; }
      .proof-card:active p { color: rgba(255,255,255,.82); }
      .proof-card:active img { transform: scale(1.025); }
      .curriculum-item:active { background: rgba(239,231,225,.8); transform: scale(.995); }
      .curriculum-item:active .num { background: var(--wine); color: white; }
      .faq summary:active { transform: translateX(2px); }
      .gallery figure:active { transform: scale(.995); }
    }

    @media (prefers-reduced-motion: reduce) {
      .page-hero-grid > div:first-child > h1,
      .page-hero-grid > div:first-child > p,
      .page-hero-grid > div:first-child > .hero-actions,
      .faq.is-visible details,
      .faq details[open] p { animation: none !important; }
      .section h2.reveal { filter: none !important; transform: none !important; }
    }
  `;
  document.head.appendChild(microStyles);

  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const updateNav = () => nav?.classList.toggle('is-scrolled', window.scrollY > 18);
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });

  navToggle?.addEventListener('click', () => {
    const open = navLinks?.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(Boolean(open)));
  });
  navLinks?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }));

  /* Stagger reveal order inside each section. Delay is cleared after
     entrance so it never makes hover/touch interactions feel sluggish. */
  document.querySelectorAll('.section').forEach((section) => {
    const items = [...section.querySelectorAll('.reveal')];
    items.forEach((el, index) => {
      el.dataset.revealDelay = String(Math.min(index * 75, 300));
    });
  });
  document.querySelectorAll('.journey, .services-grid, .course-proof, .curriculum').forEach((group) => {
    [...group.querySelectorAll('.reveal')].forEach((el, index) => {
      el.dataset.revealDelay = String(Math.min(index * 80, 320));
    });
  });

  const revealEls = document.querySelectorAll('.reveal');
  const revealNow = (el) => {
    const delay = Number(el.dataset.revealDelay || 0);
    if (delay) el.style.transitionDelay = `${delay}ms`;
    el.classList.add('is-visible');
    window.setTimeout(() => { el.style.transitionDelay = '0ms'; }, delay + 900);
  };

  if (!prefersReduced && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealNow(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else revealEls.forEach(revealNow);

  if (!prefersReduced && !coarsePointer) {
    const parallaxEls = [...document.querySelectorAll('[data-parallax]')];
    let ticking = false;
    const renderParallax = () => {
      const vh = window.innerHeight;
      parallaxEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < vh) {
          const centerOffset = ((rect.top + rect.height / 2) - vh / 2) / vh;
          const speed = Number(el.dataset.parallax || .07);
          el.style.transform = `translate3d(0, ${centerOffset * speed * -100}px, 0)`;
        }
      });
      ticking = false;
    };
    const requestParallax = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(renderParallax); }
    };
    renderParallax();
    window.addEventListener('scroll', requestParallax, { passive: true });
    window.addEventListener('resize', requestParallax);
  }

  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = lightbox?.querySelector('img');
  const closeLightbox = () => {
    lightbox?.classList.remove('is-open');
    document.body.style.overflow = '';
  };
  document.querySelectorAll('[data-lightbox]').forEach((item) => {
    item.addEventListener('click', () => {
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = item.dataset.lightbox;
      lightboxImg.alt = item.dataset.alt || 'Trabalho de Jaqueline Lopes';
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    });
  });
  lightbox?.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
  lightbox?.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeLightbox(); });

  const curtain = document.querySelector('.transition-curtain');
  const resetCurtain = () => curtain?.classList.remove('is-leaving');

  // Chrome/Safari can restore a page from the back-forward cache without
  // rerunning this script. Reset the transition overlay whenever the page
  // becomes active again so browser Back/Forward never leaves it covering UI.
  window.addEventListener('pageshow', resetCurtain);
  resetCurtain();

  if (curtain && !prefersReduced) {
    document.querySelectorAll('a[data-transition]').forEach((link) => {
      link.addEventListener('click', (event) => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#') || link.target === '_blank') return;
        event.preventDefault();
        curtain.classList.add('is-leaving');
        window.setTimeout(() => { window.location.href = href; }, 390);
      });
    });
  }

  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
