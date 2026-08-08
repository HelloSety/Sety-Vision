// Imperial Store — catálogo compartilhado (home, coleção, produto, checkout)
var IMPERIAL_CATALOGO = {
  'off-white': { nome: 'Camiseta Off-White', variacao: 'Estampa David', imagem: 'assets/produtos/off-white-final.jpg', preco: 89.90, categoria: 'Camisetas' },
  'nocta': { nome: 'Moletom NOCTA', variacao: 'Canguru com Capuz', imagem: 'assets/produtos/nocta-final.jpg', preco: 159.90, categoria: 'Moletons' },
  'nike-air': { nome: 'Moletom Nike Air', variacao: 'Azul Marinho', imagem: 'assets/produtos/nike-air-final.jpg', preco: 149.90, categoria: 'Moletons' },
  'shorts-nike': { nome: 'Shorts Nike', variacao: 'Preto Dri-FIT', imagem: 'assets/produtos/shorts-nike-final.jpg', preco: 79.90, categoria: 'Shorts' },
  'jaqueta-nike': { nome: 'Jaqueta Corta-Vento Nike', variacao: 'Preta', imagem: 'assets/produtos/jaqueta-nike-final.jpg', preco: 169.90, categoria: 'Jaquetas' },
  'nike-branca': { nome: 'Camiseta Nike', variacao: 'Branca Oversized', imagem: 'assets/produtos/nike-branca-final.jpg', preco: 79.90, categoria: 'Camisetas' },
  'just-do-it': { nome: 'Moletom Nike', variacao: 'Just Do It', imagem: 'assets/produtos/just-do-it-final.jpg', preco: 139.90, categoria: 'Moletons' },
  'conjunto-nike': { nome: 'Conjunto Agasalho Nike', variacao: 'Preto Completo', imagem: 'assets/produtos/conjunto-nike-final.jpg', preco: 219.90, categoria: 'Conjuntos' }
};

var IMPERIAL_CATEGORIAS = ['Camisetas', 'Moletons', 'Shorts', 'Jaquetas', 'Conjuntos'];

var IMPERIAL_WHATS_NUMERO = '5561999999999';

function imperialFormatarPreco(v) {
  return 'R$ ' + v.toFixed(2).replace('.', ',');
}

function imperialCardProdutoHTML(slug) {
  var p = IMPERIAL_CATALOGO[slug];
  if (!p) return '';
  return '' +
    '<div class="sety-produto-card">' +
      '<a href="produto.html?p=' + slug + '" class="sety-produto-card__link">' +
        '<div class="sety-produto-card__imagem"><img src="' + p.imagem + '" alt="' + p.nome + '" loading="lazy"></div>' +
        '<p class="sety-produto-card__nome">' + p.nome + '<em>' + p.variacao + '</em></p>' +
      '</a>' +
      '<div class="sety-produto-card__tamanhos">' +
        '<span class="sety-produto-card__tamanho">P</span>' +
        '<span class="sety-produto-card__tamanho">M</span>' +
        '<span class="sety-produto-card__tamanho">G</span>' +
        '<span class="sety-produto-card__tamanho">GG</span>' +
      '</div>' +
      '<hr class="sety-produto-card__divisor">' +
      '<p class="sety-produto-card__preco">' + imperialFormatarPreco(p.preco) + '</p>' +
      '<div class="sety-produto-card__cta">' +
        '<a href="produto.html?p=' + slug + '">Comprar</a>' +
        '<button type="button" aria-label="Adicionar à sacola" onclick="carrinhoAdicionar(\'' + slug + '\', \'M\', 1); event.stopPropagation();">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 8h12l1 12H5z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>' +
        '</button>' +
      '</div>' +
    '</div>';
}
