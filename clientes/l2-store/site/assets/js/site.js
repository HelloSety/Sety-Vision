function renderGrid(container, products) {
  container.innerHTML = products.map(productCardHTML).join('');
}

function scrollCarrossel(botao, direcao) {
  const track = botao.parentElement.querySelector('.produtos-track');
  track.scrollBy({ left: direcao * 260, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-whats-link]').forEach(el => {
    el.href = whatsLink('Olá! Vim pelo site e quero saber mais sobre os produtos da L2 Store.');
  });

  const catContainer = document.getElementById('cat-cards');
  if (catContainer) {
    catContainer.innerHTML = CATEGORIES.map(c => `
      <button type="button" class="categoria" data-filter="${c.id}">
        <div class="categoria__imagem"><img src="${c.img}" alt="${c.label}" loading="lazy"></div>
        <p class="categoria__nome">${c.label}</p>
      </button>`).join('');
  }

  const trackDestaques = document.getElementById('track-destaques');
  if (trackDestaques) renderGrid(trackDestaques, PRODUCTS.slice(0, 8));

  const grid = document.getElementById('grid-catalogo');
  const filtersBar = document.getElementById('filters');
  const countLabel = document.getElementById('catalogo-count');

  function applyFilter(filterId) {
    const filtered = filterId === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.type === filterId);
    renderGrid(grid, filtered);
    if (countLabel) countLabel.textContent = `${filtered.length} produtos encontrados`;
    filtersBar.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b.dataset.filter === filterId));
  }

  if (grid && filtersBar) {
    filtersBar.innerHTML = ['<button class="filter-btn active" data-filter="all" type="button">Todos</button>']
      .concat(CATEGORIES.map(c => `<button class="filter-btn" data-filter="${c.id}" type="button">${c.label}</button>`))
      .join('');
    filtersBar.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
    });
    applyFilter('all');
  }

  document.addEventListener('click', (e) => {
    const catBtn = e.target.closest('.categoria[data-filter]');
    if (catBtn && filtersBar) {
      applyFilter(catBtn.dataset.filter);
      document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
    }
  });

  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => btn.closest('.faq-item').classList.toggle('open'));
  });

  // Barra de anúncio giratória
  const anuncioMensagens = ['Compre com Quem Tem Referência', 'Produtos Originais e de Primeira Linha', 'Atendimento Direto no WhatsApp'];
  let anuncioIndex = 0;
  window.anuncioNav = function (delta) {
    anuncioIndex = (anuncioIndex + delta + anuncioMensagens.length) % anuncioMensagens.length;
    document.getElementById('anuncio-texto').textContent = anuncioMensagens[anuncioIndex];
  };
  setInterval(() => window.anuncioNav(1), 4000);
});
