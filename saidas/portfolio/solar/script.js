(function () {
  'use strict';

  var WHATSAPP_NUMBER = '5519988090110';

  /* ---------- Header: shadow + scroll state ---------- */
  var header = document.getElementById('header');
  function onScroll() {
    if (window.scrollY > 12) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');

  navToggle.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Scroll reveal via IntersectionObserver ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---------- Calculadora de economia ---------- */
  var calcForm = document.getElementById('calcForm');
  var contaLuzInput = document.getElementById('contaLuz');
  var calcResult = document.getElementById('calcResult');
  var resultMensal = document.getElementById('resultMensal');
  var resultAnual = document.getElementById('resultAnual');
  var resultVida = document.getElementById('resultVida');
  var calcWhatsapp = document.getElementById('calcWhatsapp');

  var currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
  });

  var ECONOMIA_PERCENTUAL = 0.9; // estimativa fixa, apenas demonstrativa

  function parseValorConta(raw) {
    var cleaned = raw.replace(/[^\d,.-]/g, '');
    cleaned = cleaned.replace(/\.(?=\d{3}(\D|$))/g, '');
    cleaned = cleaned.replace(',', '.');
    var value = parseFloat(cleaned);
    return isNaN(value) ? 0 : value;
  }

  calcForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var valorConta = parseValorConta(contaLuzInput.value);
    if (valorConta <= 0) {
      contaLuzInput.focus();
      contaLuzInput.style.borderColor = '#EF4444';
      setTimeout(function () { contaLuzInput.style.borderColor = ''; }, 1600);
      return;
    }

    var economiaMensal = valorConta * ECONOMIA_PERCENTUAL;
    var economiaAnual = economiaMensal * 12;
    var economiaVida = economiaAnual * 25;

    resultMensal.textContent = currencyFormatter.format(economiaMensal);
    resultAnual.textContent = currencyFormatter.format(economiaAnual);
    resultVida.textContent = currencyFormatter.format(economiaVida);

    calcResult.hidden = false;
    calcResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    var msg = 'Olá! Simulei no site da Sety Solar: minha conta de luz é de ' +
      currencyFormatter.format(valorConta) +
      ' e a estimativa de economia mensal foi de ' +
      currencyFormatter.format(economiaMensal) +
      '. Quero uma simulação real.';

    calcWhatsapp.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg);
  });

  /* ---------- Ano dinâmico no rodapé ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

  /* ---------- FAQ: fecha os outros ao abrir um ---------- */
  var faqItems = document.querySelectorAll('.faq__item');
  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (item.open) {
        faqItems.forEach(function (other) {
          if (other !== item) { other.open = false; }
        });
      }
    });
  });
})();
