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

    if (dotsWrap) {
      slides.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.className = "banner-dot" + (i === 0 ? " is-active" : "");
        dot.setAttribute("aria-label", `Ir para o banner ${i + 1}`);
        dot.addEventListener("click", () => goTo(i));
        dotsWrap.appendChild(dot);
      });
    }
    const dots = dotsWrap ? Array.from(dotsWrap.children) : [];

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

  const toggle = document.querySelector("[data-nav-toggle]");
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
      document.getElementById(btn.dataset.tab)?.classList.add("active");
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

  const galleryMain = document.getElementById("ProductMainImage");
  document.querySelectorAll(".gallery-thumb").forEach((thumb) => {
    thumb.addEventListener("click", () => {
      if (galleryMain) galleryMain.src = thumb.src;
    });
  });

  document.querySelectorAll(".qty-selector").forEach((selector) => {
    const input = selector.querySelector("input[type='number']");
    const minus = selector.querySelector(".qty-minus");
    const plus = selector.querySelector(".qty-plus");
    if (!input) return;
    minus?.addEventListener("click", () => {
      const min = parseInt(input.min, 10) || 0;
      input.value = Math.max(min, (parseInt(input.value, 10) || 1) - 1);
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });
    plus?.addEventListener("click", () => {
      input.value = (parseInt(input.value, 10) || 1) + 1;
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });
  });

  const variantPicker = document.querySelector(".variant-picker");
  if (variantPicker) {
    variantPicker.querySelectorAll("input[name='id']").forEach((input) => {
      input.addEventListener("change", () => {
        const url = new URL(window.location.href);
        url.searchParams.set("variant", input.value);
        window.location.href = url.toString();
      });
    });
  }

  document.querySelectorAll("[data-cart-remove]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const row = btn.closest(".cart-item");
      const input = row?.querySelector("input[type='number']");
      if (!input) return;
      input.value = 0;
      const form = btn.closest("form");
      const updateBtn = form?.querySelector("button[name='update']");
      updateBtn?.click();
    });
  });

  if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches && "IntersectionObserver" in window) {
    const revealEls = document.querySelectorAll(
      ".tiles-title, .tile, .about-media, .about-text, .culture-top, .culture-item"
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
});
