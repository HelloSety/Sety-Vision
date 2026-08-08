// SPARTA TECH — interações compartilhadas (home, catálogo, produto)

document.addEventListener("DOMContentLoaded", function () {
  // Barra de anúncio giratória
  var anuncioMsgs = ["Frete Grátis acima de R$ 149", "10% OFF no Pix", "Compra 100% Segura"];
  var anuncioEl = document.getElementById("sety-anuncio-texto");
  if (anuncioEl) {
    var idx = 0;
    var render = function () { anuncioEl.textContent = anuncioMsgs[idx]; };
    window.setyAnuncio = function (delta) {
      idx = (idx + delta + anuncioMsgs.length) % anuncioMsgs.length;
      render();
    };
    render();
    setInterval(function () { window.setyAnuncio(1); }, 4000);
  }

  // Menu mobile
  var menuBtn = document.querySelector(".sety-menu-mobile-btn");
  var nav = document.querySelector(".sety-nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () { nav.classList.toggle("is-aberto"); });
  }

  // Carrossel horizontal (setas)
  document.querySelectorAll(".sety-carrossel__seta").forEach(function (botao) {
    botao.addEventListener("click", function () {
      var track = botao.parentElement.querySelector(".sety-produtos-track");
      var direcao = botao.classList.contains("sety-carrossel__seta--prev") ? -1 : 1;
      track.scrollBy({ left: direcao * 260, behavior: "smooth" });
    });
  });

  // FAQ accordion (home e produto)
  document.querySelectorAll(".sety-faq-home, .sety-faq").forEach(function (faq) {
    faq.addEventListener("click", function (e) {
      var btn = e.target.closest(".sety-faq-home__pergunta, .sety-faq__pergunta");
      if (!btn) return;
      btn.closest(".sety-faq-home__item, .sety-faq__item").classList.toggle("is-aberto");
    });
  });

  // Renderização de listas de produtos via data-sety-produtos
  document.querySelectorAll("[data-sety-produtos]").forEach(function (container) {
    var filtro = container.getAttribute("data-sety-produtos");
    var lista = SPARTA_PRODUTOS;
    if (filtro.indexOf("categoria:") === 0) {
      var categoria = filtro.split(":")[1];
      lista = SPARTA_PRODUTOS.filter(function (p) { return p.categoria === categoria; });
    }
    var excluir = container.getAttribute("data-sety-excluir");
    if (excluir) lista = lista.filter(function (p) { return p.handle !== excluir; });
    var limite = container.getAttribute("data-sety-limite");
    if (limite) lista = lista.slice(0, parseInt(limite, 10));
    container.innerHTML = lista.map(spartaProdutoCardHTML).join("");
  });

  // Filtros de categoria no catálogo
  var filtrosEl = document.getElementById("sety-catalogo-filtros");
  var gridEl = document.getElementById("sety-catalogo-grid");
  if (filtrosEl && gridEl) {
    filtrosEl.addEventListener("click", function (e) {
      var btn = e.target.closest("button");
      if (!btn) return;
      filtrosEl.querySelectorAll("button").forEach(function (b) { b.classList.remove("is-ativo"); });
      btn.classList.add("is-ativo");
      var categoria = btn.dataset.categoria;
      var lista = categoria === "todos" ? SPARTA_PRODUTOS : SPARTA_PRODUTOS.filter(function (p) { return p.categoria === categoria; });
      gridEl.innerHTML = lista.map(spartaProdutoCardHTML).join("");
    });
  }
});
