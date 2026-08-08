(function () {
  'use strict';

  // ===== Header solid on scroll =====
  var header = document.getElementById('header');
  function onScroll() {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ===== Mobile nav toggle =====
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');
  navToggle.addEventListener('click', function () {
    var isOpen = mainNav.classList.toggle('open');
    navToggle.classList.toggle('active', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });
  mainNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mainNav.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // ===== FAQ accordion =====
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var question = item.querySelector('.faq-question');
    question.addEventListener('click', function () {
      var wasActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item.active').forEach(function (other) {
        if (other !== item) {
          other.classList.remove('active');
          other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });
      item.classList.toggle('active', !wasActive);
      question.setAttribute('aria-expanded', String(!wasActive));
    });
  });

  // ===== Scroll reveal (IntersectionObserver) =====
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, index) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var delay = (index % 4) * 90;
            el.style.transitionDelay = delay + 'ms';
            el.classList.add('is-visible');
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // ===== Footer year =====
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
