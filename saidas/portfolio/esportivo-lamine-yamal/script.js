// ===== Lamine Yamal · 19 — Site Conceito · Sety Studio =====

document.addEventListener('DOMContentLoaded', () => {
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;

  /* ---------- Custom cursor ---------- */
  if (isFinePointer) {
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button, [data-cursor="hover"], .tilt-card').forEach((el) => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
  }

  /* ---------- Hero spotlight follows cursor ---------- */
  const hero = document.getElementById('hero');
  const spotlight = document.getElementById('spotlight');
  if (hero && spotlight) {
    let sx = window.innerWidth / 2, sy = window.innerHeight * 0.4;
    let tx = sx, ty = sy;
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      tx = e.clientX - rect.left;
      ty = e.clientY - rect.top;
    });
    function animateSpotlight() {
      sx += (tx - sx) * 0.08;
      sy += (ty - sy) * 0.08;
      spotlight.style.transform = `translate(${sx}px, ${sy}px)`;
      requestAnimationFrame(animateSpotlight);
    }
    animateSpotlight();
  }

  /* ---------- Nav scroll state ---------- */
  const nav = document.getElementById('nav');
  const progressBar = document.getElementById('progressBar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    progressBar.style.width = pct + '%';
  }, { passive: true });

  /* ---------- Mobile nav ---------- */
  const burger = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const duration = 1400;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      }
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach((el) => counterObserver.observe(el));

  /* ---------- Parallax hero number ---------- */
  const parallaxNum = document.getElementById('parallaxNum');
  if (parallaxNum) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      parallaxNum.style.transform = `translate(-50%, calc(-46% + ${y * 0.15}px))`;
    }, { passive: true });
  }

  /* ---------- 3D tilt cards ---------- */
  if (isFinePointer) {
    document.querySelectorAll('.tilt-card').forEach((card) => {
      const inner = card.querySelector('.tilt-card-inner');
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        inner.style.transform = `rotateY(${px * 16}deg) rotateX(${-py * 16}deg) scale(1.03)`;
      });
      card.addEventListener('mouseleave', () => {
        inner.style.transform = 'rotateY(0) rotateX(0) scale(1)';
      });
    });
  }

  /* ---------- Smooth anchor scroll ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
