document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const handle = params.get('p');
  const p = PRODUCTS.find(x => x.handle === handle) || PRODUCTS[0];

  document.title = `${p.title} — L2 Store`;
  document.getElementById('page-title').textContent = `${p.title} — L2 Store`;
  document.getElementById('p-breadcrumb-nome').textContent = p.title;
  document.getElementById('p-imagem').src = `assets/produtos/${p.type}.svg`;
  document.getElementById('p-imagem').alt = p.title;
  document.getElementById('p-vendor').textContent = p.vendor;
  document.getElementById('p-titulo').textContent = p.title;
  document.getElementById('p-preco').textContent = fmtBRL(p.price);
  document.getElementById('p-parcelas').textContent = `em até 3x de ${fmtBRL(p.price / 3)} sem juros`;
  document.getElementById('p-pix-valor').textContent = `${fmtBRL(p.price * 0.9)} no Pix`;
  document.getElementById('p-descricao').textContent = p.desc;

  if (p.estimated) document.getElementById('p-badge-exemplo').style.display = '';

  // Seletor de tamanho
  let tamanhoSelecionado = p.sizes[0];
  const swatchContainer = document.getElementById('p-swatch-tamanho');
  function renderSwatches() {
    swatchContainer.innerHTML = p.sizes.map((s, i) => `
      <button type="button" class="swatch ${s === tamanhoSelecionado ? 'is-selected' : ''}" data-size="${s}">${s}</button>`).join('');
    document.getElementById('p-tamanho-selecionado').textContent = tamanhoSelecionado;
  }
  swatchContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.swatch');
    if (!btn) return;
    tamanhoSelecionado = btn.dataset.size;
    renderSwatches();
    updateWhatsLinks();
  });
  renderSwatches();

  function updateWhatsLinks() {
    document.getElementById('p-btn-comprar').href = whatsLink(
      `Olá! Quero comprar: ${p.title} - ${fmtBRL(p.price)} | Tamanho: ${tamanhoSelecionado}`
    );
    document.getElementById('p-btn-duvidas').href = whatsLink(
      `Olá! Gostaria de mais informações sobre o produto: ${p.title}`
    );
    document.getElementById('p-whats-float').href = whatsLink('Olá! Vim pelo site e quero saber mais sobre os produtos da L2 Store.');
  }
  updateWhatsLinks();

  document.querySelectorAll('[data-whats-link]').forEach(el => {
    el.href = whatsLink('Olá! Vim pelo site e quero saber mais sobre os produtos da L2 Store.');
  });

  // Relacionados: mesma categoria, excluindo o próprio produto
  const relacionados = PRODUCTS.filter(x => x.type === p.type && x.handle !== p.handle).slice(0, 4);
  document.getElementById('p-relacionados').innerHTML = relacionados.map(productCardHTML).join('');

  // Abas
  document.querySelector('.tabs__nav')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.tabs__item');
    if (!btn) return;
    document.querySelectorAll('.tabs__item').forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    document.querySelectorAll('.tabs__content').forEach(c => {
      c.classList.toggle('is-active', c.dataset.tabContent === btn.dataset.tab);
    });
  });

  // FAQ accordion
  document.getElementById('p-faq')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.faq-q');
    if (!btn) return;
    btn.closest('.faq-item').classList.toggle('open');
  });

  // Barra de anúncio giratória
  const anuncioMensagens = ['10% OFF comprando no Pix', 'Produtos Originais e de Primeira Linha', 'Atendimento Direto no WhatsApp'];
  let anuncioIndex = 0;
  window.anuncioNav = function (delta) {
    anuncioIndex = (anuncioIndex + delta + anuncioMensagens.length) % anuncioMensagens.length;
    document.getElementById('anuncio-texto').textContent = anuncioMensagens[anuncioIndex];
  };
  setInterval(() => window.anuncioNav(1), 4000);
});
