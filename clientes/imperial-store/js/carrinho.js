// Imperial Store — carrinho (localStorage), compartilhado entre todas as páginas
var CARRINHO_KEY = 'imperial_carrinho';

function carrinhoLer() {
  try { return JSON.parse(localStorage.getItem(CARRINHO_KEY)) || []; } catch (e) { return []; }
}

function carrinhoSalvar(itens) {
  localStorage.setItem(CARRINHO_KEY, JSON.stringify(itens));
  carrinhoAtualizarContador();
}

function carrinhoAdicionar(slug, tamanho, quantidade) {
  var itens = carrinhoLer();
  var existente = itens.find(function (i) { return i.slug === slug && i.tamanho === tamanho; });
  if (existente) {
    existente.quantidade += quantidade;
  } else {
    itens.push({ slug: slug, tamanho: tamanho, quantidade: quantidade });
  }
  carrinhoSalvar(itens);
  carrinhoMostrarToast(slug);
}

function carrinhoRemover(index) {
  var itens = carrinhoLer();
  itens.splice(index, 1);
  carrinhoSalvar(itens);
  if (typeof carrinhoRenderizarCheckout === 'function') carrinhoRenderizarCheckout();
}

function carrinhoAlterarQuantidade(index, delta) {
  var itens = carrinhoLer();
  if (!itens[index]) return;
  itens[index].quantidade = Math.max(1, itens[index].quantidade + delta);
  carrinhoSalvar(itens);
  if (typeof carrinhoRenderizarCheckout === 'function') carrinhoRenderizarCheckout();
}

function carrinhoContarItens() {
  return carrinhoLer().reduce(function (acc, i) { return acc + i.quantidade; }, 0);
}

function carrinhoAtualizarContador() {
  var el = document.querySelector('.sety-header__carrinho-count');
  if (el) el.textContent = carrinhoContarItens();
}

function carrinhoMostrarToast(slug) {
  var p = (typeof IMPERIAL_CATALOGO !== 'undefined') ? IMPERIAL_CATALOGO[slug] : null;
  var nome = p ? p.nome : 'Produto';
  var toast = document.createElement('div');
  toast.className = 'sety-toast-carrinho';
  toast.textContent = nome + ' adicionado à sacola';
  document.body.appendChild(toast);
  requestAnimationFrame(function () { toast.classList.add('is-visivel'); });
  setTimeout(function () {
    toast.classList.remove('is-visivel');
    setTimeout(function () { toast.remove(); }, 300);
  }, 2200);
}

document.addEventListener('DOMContentLoaded', carrinhoAtualizarContador);
