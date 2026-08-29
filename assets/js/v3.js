(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

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

  const revealEls = document.querySelectorAll('.reveal');
  if (!prefersReduced && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else revealEls.forEach((el) => el.classList.add('is-visible'));

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
