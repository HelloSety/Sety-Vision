document.addEventListener("DOMContentLoaded", () => {
  const bannerSlider = document.querySelector(".banner-slider");
  if (bannerSlider) {
    const track = bannerSlider.querySelector(".banner-track");
    const slides = Array.from(track.children);
    const dotsWrap = bannerSlider.querySelector(".banner-dots");
    const prevBtn = bannerSlider.querySelector(".banner-arrow.prev");
    const nextBtn = bannerSlider.querySelector(".banner-arrow.next");
    let index = 0;
    let timer = null;

    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "banner-dot" + (i === 0 ? " is-active" : "");
      dot.setAttribute("aria-label", `Ir para o banner ${i + 1}`);
      dot.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, di) => d.classList.toggle("is-active", di === index));
    }
    function restartAutoplay() {
      clearInterval(timer);
      timer = setInterval(() => goTo(index + 1), 5000);
    }

    if (slides.length > 1) {
      prevBtn?.addEventListener("click", () => { goTo(index - 1); restartAutoplay(); });
      nextBtn?.addEventListener("click", () => { goTo(index + 1); restartAutoplay(); });

      let startX = 0;
      track.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, { passive: true });
      track.addEventListener("touchend", (e) => {
        const diff = e.changedTouches[0].clientX - startX;
        if (Math.abs(diff) > 40) {
          goTo(diff < 0 ? index + 1 : index - 1);
          restartAutoplay();
        }
      }, { passive: true });

      restartAutoplay();
    } else {
      prevBtn?.remove();
      nextBtn?.remove();
    }
  }

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav-main");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.style.display = nav.style.display === "flex" ? "none" : "flex";
      nav.style.flexDirection = "column";
      nav.style.width = "100%";
    });
  }

  const tabButtons = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".tab-panel");
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");
    });
  });

  document.querySelectorAll(".product-row").forEach((row) => {
    const grid = row.querySelector(".product-grid");
    const prev = row.querySelector(".carousel-arrow.prev");
    const next = row.querySelector(".carousel-arrow.next");
    if (!grid) return;
    const step = () => grid.firstElementChild?.getBoundingClientRect().width + 20 || 260;
    prev?.addEventListener("click", () => grid.scrollBy({ left: -step(), behavior: "smooth" }));
    next?.addEventListener("click", () => grid.scrollBy({ left: step(), behavior: "smooth" }));
  });

  const galleryMain = document.querySelector(".gallery-main img");
  document.querySelectorAll(".gallery-thumb").forEach((thumb) => {
    thumb.addEventListener("click", () => {
      if (galleryMain) galleryMain.src = thumb.src;
    });
  });

  const cartelaTable = document.querySelector(".cartela-table");
  if (cartelaTable) {
    const countEl = document.querySelector(".cartela-count");
    const addBtn = document.querySelector(".cartela-add");
    const productName = cartelaTable.dataset.productName || "";

    function updateTotal() {
      const inputs = cartelaTable.querySelectorAll(".qty-input");
      let total = 0;
      inputs.forEach((i) => (total += parseInt(i.value, 10) || 0));
      if (countEl) countEl.textContent = total;
      if (addBtn) addBtn.disabled = total === 0;
    }

    cartelaTable.addEventListener("click", (e) => {
      const btn = e.target.closest(".qty-btn");
      if (!btn) return;
      const row = btn.closest(".swatch-card");
      const input = row.querySelector(".qty-input");
      let value = parseInt(input.value, 10) || 0;
      if (btn.classList.contains("qty-plus")) value += 1;
      if (btn.classList.contains("qty-minus")) value = Math.max(0, value - 1);
      input.value = value;
      updateTotal();
    });

    addBtn?.addEventListener("click", () => {
      const rows = cartelaTable.querySelectorAll(".swatch-card");
      const lines = [];
      rows.forEach((row) => {
        const qty = parseInt(row.querySelector(".qty-input").value, 10) || 0;
        if (qty > 0) {
          const name = row.dataset.name;
          const code = row.dataset.code;
          lines.push(`${qty}x ${name}${code ? " " + code : ""}`);
        }
      });
      if (!lines.length) return;
      const msg = encodeURIComponent(
        `Olá! Quero comprar ${productName}:\n${lines.join("\n")}`
      );
      window.open(`https://wa.me/5521983913873?text=${msg}`, "_blank", "noopener");
    });
  }

  if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches && "IntersectionObserver" in window) {
    const revealEls = document.querySelectorAll(
      ".tiles-title, .tile, .about-media, .about-text, .culture-top, .culture-item, .highlight-content"
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el, i) => {
      el.classList.add("reveal-init");
      el.style.transitionDelay = `${Math.min(i % 6, 5) * 60}ms`;
      io.observe(el);
    });
  }

  const newsletterForm = document.getElementById("newsletter-form");
  newsletterForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("newsletter-email")?.value || "";
    const msg = encodeURIComponent(
      `Olá! Quero receber novidades e promoções da Dona Bomba. Meu e-mail: ${email}`
    );
    window.open(`https://wa.me/5521983913873?text=${msg}`, "_blank", "noopener");
    newsletterForm.reset();
  });

  let heroIndex = 0;
  const heroDots = document.querySelectorAll(".hero-dots span");
  const heroSlides = document.querySelectorAll(".hero-slide");
  if (heroSlides.length > 1) {
    setInterval(() => {
      heroSlides[heroIndex].classList.remove("active");
      heroDots[heroIndex]?.classList.remove("active");
      heroIndex = (heroIndex + 1) % heroSlides.length;
      heroSlides[heroIndex].classList.add("active");
      heroDots[heroIndex]?.classList.add("active");
    }, 4500);
  }
});
