/* Autênticas Store — painel admin (dashboard.html) */

const CATEGORY_LABELS = { roupas: 'Roupas', tenis: 'Tênis', chinelos: 'Chinelos', acessorios: 'Bonés & Acessórios' };
const ORDER_STATUS_LABELS = { pending: 'Pendente', approved: 'Aprovado', rejected: 'Recusado', cancelled: 'Cancelado' };

const fmtBRL = (n) => Number(n || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const fmtDate = (iso) => new Date(iso).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });

let products = [];
let orders = [];
let settings = {};

function showToast(message, isError = false) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.toggle('is-error', isError);
  toast.classList.add('is-visible');
  setTimeout(() => toast.classList.remove('is-visible'), 3200);
}

async function api(path, options = {}) {
  const res = await fetch(path, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
  });
  if (res.status === 401) {
    window.location.href = 'index.html';
    throw new Error('Não autenticado');
  }
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Erro ${res.status}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function uploadFile(file) {
  const dataBase64 = await readFileAsBase64(file);
  const { url } = await api('/api/upload', {
    method: 'POST',
    body: JSON.stringify({ filename: file.name, contentType: file.type, dataBase64 }),
  });
  return url;
}

/* ---------------- Navegação ---------------- */
function initNav() {
  document.querySelectorAll('.admin-nav button').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.admin-nav button').forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      document.querySelectorAll('.admin-view').forEach((v) => v.classList.remove('is-active'));
      document.getElementById(`view-${btn.dataset.view}`).classList.add('is-active');
    });
  });

  document.getElementById('logoutBtn').addEventListener('click', async () => {
    await api('/api/logout', { method: 'POST' });
    window.location.href = 'index.html';
  });
}

/* ---------------- Produtos ---------------- */
async function loadProducts() {
  products = await api('/api/products');
  renderProductStats();
  renderProductsTable();
}

function renderProductStats() {
  const total = products.length;
  const active = products.filter((p) => p.active).length;
  const outOfStock = products.filter((p) => (p.variants || []).every((v) => (v.stock ?? 0) <= 0)).length;
  document.getElementById('productStats').innerHTML = `
    <div class="stat-card"><span>Total de produtos</span><b>${total}</b></div>
    <div class="stat-card"><span>Ativos na loja</span><b>${active}</b></div>
    <div class="stat-card"><span>Sem estoque</span><b>${outOfStock}</b></div>
  `;
}

function renderProductsTable() {
  const tbody = document.getElementById('productsTable');
  if (!products.length) {
    tbody.innerHTML = '<tr class="empty-row"><td colspan="8">Nenhum produto cadastrado ainda.</td></tr>';
    return;
  }
  tbody.innerHTML = products.map((p) => {
    const cover = p.variants?.[0]?.img || '';
    return `
    <tr>
      <td>${cover ? `<img class="table-thumb" src="${cover}" alt="">` : ''}</td>
      <td>${p.name}</td>
      <td>${CATEGORY_LABELS[p.category] || p.category}</td>
      <td>${fmtBRL(p.price)}</td>
      <td>${(p.variants || []).length}</td>
      <td>${p.featured ? 'Sim' : '—'}</td>
      <td><span class="badge-pill ${p.active ? 'active-yes' : 'active-no'}">${p.active ? 'Ativo' : 'Inativo'}</span></td>
      <td>
        <div class="table-actions">
          <button type="button" class="btn-ghost" data-edit="${p.id}">Editar</button>
          <button type="button" class="btn-danger" data-delete="${p.id}">Excluir</button>
        </div>
      </td>
    </tr>`;
  }).join('');

  tbody.querySelectorAll('[data-edit]').forEach((btn) => {
    btn.addEventListener('click', () => openProductModal(btn.dataset.edit));
  });
  tbody.querySelectorAll('[data-delete]').forEach((btn) => {
    btn.addEventListener('click', () => deleteProduct(btn.dataset.delete));
  });
}

async function deleteProduct(id) {
  const product = products.find((p) => p.id === id);
  if (!confirm(`Excluir "${product?.name || id}"? Essa ação não pode ser desfeita.`)) return;
  try {
    await api(`/api/products/${id}`, { method: 'DELETE' });
    showToast('Produto excluído.');
    await loadProducts();
  } catch (err) {
    showToast(err.message, true);
  }
}

/* ---------------- Modal de produto ---------------- */
let editingVariants = [];

function variantRowHTML(v, i) {
  return `
    <div class="variant-row" data-variant-index="${i}">
      ${v.img ? `<img src="${v.img}" alt="">` : '<div></div>'}
      <div class="field" style="margin:0"><label>Cor</label><input data-variant-name value="${v.name || ''}" placeholder="Ex: Preto"></div>
      <div class="field" style="margin:0"><label>Estoque</label><input data-variant-stock type="number" min="0" value="${v.stock ?? 15}"></div>
      <div style="display:flex;gap:6px;align-items:center">
        <label class="btn-ghost" style="cursor:pointer">
          Imagem <input type="file" accept="image/*" data-variant-upload style="display:none">
        </label>
        <button type="button" class="btn-danger" data-variant-remove>✕</button>
      </div>
    </div>`;
}

function renderVariants() {
  document.getElementById('variantsList').innerHTML = editingVariants.map(variantRowHTML).join('');

  document.querySelectorAll('[data-variant-remove]').forEach((btn, i) => {
    btn.addEventListener('click', () => {
      editingVariants.splice(i, 1);
      renderVariants();
    });
  });
  document.querySelectorAll('[data-variant-name]').forEach((input, i) => {
    input.addEventListener('input', () => { editingVariants[i].name = input.value; });
  });
  document.querySelectorAll('[data-variant-stock]').forEach((input, i) => {
    input.addEventListener('input', () => { editingVariants[i].stock = Number(input.value) || 0; });
  });
  document.querySelectorAll('[data-variant-upload]').forEach((input, i) => {
    input.addEventListener('change', () => uploadVariantImage(input, i));
  });
}

async function uploadVariantImage(input, index) {
  const file = input.files[0];
  if (!file) return;
  try {
    showToast('Enviando imagem...');
    const url = await uploadFile(file);
    editingVariants[index].img = url;
    renderVariants();
    showToast('Imagem enviada.');
  } catch (err) {
    showToast(err.message, true);
  }
}

function openProductModal(id) {
  const product = id ? products.find((p) => p.id === id) : null;
  document.getElementById('productModalTitle').textContent = product ? 'Editar Produto' : 'Novo Produto';
  document.getElementById('pId').value = product?.id || '';
  document.getElementById('pName').value = product?.name || '';
  document.getElementById('pCategory').value = product?.category || 'roupas';
  document.getElementById('pPrice').value = product?.price ?? '';
  document.getElementById('pOldPrice').value = product?.old_price ?? '';
  document.getElementById('pInstallment').value = product?.installment || '';
  document.getElementById('pTagline').value = product?.tagline || '';
  document.getElementById('pFeatured').checked = !!product?.featured;
  document.getElementById('pActive').checked = product ? !!product.active : true;

  editingVariants = product?.variants?.length ? JSON.parse(JSON.stringify(product.variants)) : [{ name: '', img: '', stock: 15 }];
  renderVariants();

  document.getElementById('productModal').classList.add('is-open');
}

function closeProductModal() {
  document.getElementById('productModal').classList.remove('is-open');
}

async function submitProductForm(e) {
  e.preventDefault();
  const id = document.getElementById('pId').value;
  const variants = editingVariants
    .filter((v) => v.name && v.name.trim())
    .map((v) => ({ name: v.name.trim(), img: v.img || '', stock: Number(v.stock) || 0 }));

  if (!variants.length) {
    showToast('Adicione ao menos uma cor com nome.', true);
    return;
  }

  const payload = {
    name: document.getElementById('pName').value.trim(),
    category: document.getElementById('pCategory').value,
    price: Number(document.getElementById('pPrice').value),
    oldPrice: document.getElementById('pOldPrice').value ? Number(document.getElementById('pOldPrice').value) : null,
    installment: document.getElementById('pInstallment').value.trim(),
    tagline: document.getElementById('pTagline').value.trim(),
    featured: document.getElementById('pFeatured').checked,
    active: document.getElementById('pActive').checked,
    variants,
  };

  try {
    if (id) {
      await api(`/api/products/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
    } else {
      await api('/api/products', { method: 'POST', body: JSON.stringify(payload) });
    }
    showToast('Produto salvo com sucesso.');
    closeProductModal();
    await loadProducts();
  } catch (err) {
    showToast(err.message, true);
  }
}

function initProductModal() {
  document.getElementById('newProductBtn').addEventListener('click', () => openProductModal(null));
  document.getElementById('closeProductModal').addEventListener('click', closeProductModal);
  document.getElementById('productModal').addEventListener('click', (e) => {
    if (e.target.id === 'productModal') closeProductModal();
  });
  document.getElementById('addVariantBtn').addEventListener('click', () => {
    editingVariants.push({ name: '', img: '', stock: 15 });
    renderVariants();
  });
  document.getElementById('productForm').addEventListener('submit', submitProductForm);
}

/* ---------------- Banners & Tema ---------------- */
const PLACEHOLDER_IMG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="150"><rect width="400" height="150" fill="%23f0efec"/></svg>';

async function loadSettings() {
  settings = await api('/api/settings');
  document.getElementById('heroDesktopPreview').src = settings.hero_banner?.desktop || PLACEHOLDER_IMG;
  document.getElementById('heroMobilePreview').src = settings.hero_banner?.mobile || PLACEHOLDER_IMG;
  document.getElementById('promoDesktopPreview').src = settings.promo_banner?.desktop || PLACEHOLDER_IMG;
  document.getElementById('promoMobilePreview').src = settings.promo_banner?.mobile || PLACEHOLDER_IMG;
  const accent = settings.accent_color?.value || '#c9962e';
  document.getElementById('accentColorInput').value = accent;
  document.getElementById('accentSwatch').style.background = accent;
}

async function saveSetting(key, value) {
  await api('/api/settings', { method: 'PUT', body: JSON.stringify({ key, value }) });
}

async function handleBannerUpload(inputId, previewId, settingKey, slot) {
  const input = document.getElementById(inputId);
  input.addEventListener('change', async () => {
    const file = input.files[0];
    if (!file) return;
    try {
      showToast('Enviando banner...');
      const url = await uploadFile(file);
      document.getElementById(previewId).src = url;
      const current = settings[settingKey] || {};
      current[slot] = url;
      settings[settingKey] = current;
      await saveSetting(settingKey, current);
      showToast('Banner atualizado — já reflete no site.');
    } catch (err) {
      showToast(err.message, true);
    }
  });
}

function initTemaView() {
  handleBannerUpload('heroDesktopUpload', 'heroDesktopPreview', 'hero_banner', 'desktop');
  handleBannerUpload('heroMobileUpload', 'heroMobilePreview', 'hero_banner', 'mobile');
  handleBannerUpload('promoDesktopUpload', 'promoDesktopPreview', 'promo_banner', 'desktop');
  handleBannerUpload('promoMobileUpload', 'promoMobilePreview', 'promo_banner', 'mobile');

  document.getElementById('accentColorInput').addEventListener('input', (e) => {
    document.getElementById('accentSwatch').style.background = e.target.value;
  });
  document.getElementById('saveAccentBtn').addEventListener('click', async () => {
    try {
      const value = document.getElementById('accentColorInput').value.trim();
      await saveSetting('accent_color', { value });
      showToast('Cor de destaque salva.');
    } catch (err) {
      showToast(err.message, true);
    }
  });
}

/* ---------------- Pedidos ---------------- */
async function loadOrders() {
  orders = await api('/api/orders');
  renderOrderStats();
  renderOrdersTable();
}

function renderOrderStats() {
  const approved = orders.filter((o) => o.status === 'approved');
  const revenue = approved.reduce((s, o) => s + Number(o.total), 0);
  document.getElementById('orderStats').innerHTML = `
    <div class="stat-card"><span>Pedidos totais</span><b>${orders.length}</b></div>
    <div class="stat-card"><span>Pagos</span><b>${approved.length}</b></div>
    <div class="stat-card"><span>Faturamento (pago)</span><b>${fmtBRL(revenue)}</b></div>
  `;
}

function addressLine(addr) {
  if (!addr || !addr.street) return '—';
  return `${addr.street}, ${addr.number || 's/n'}${addr.complement ? ` (${addr.complement})` : ''} — ${addr.district || ''}, ${addr.city || ''}/${addr.state || ''} — ${addr.cep || ''}`;
}

function renderOrdersTable() {
  const tbody = document.getElementById('ordersTable');
  if (!orders.length) {
    tbody.innerHTML = '<tr class="empty-row"><td colspan="7">Nenhum pedido ainda.</td></tr>';
    return;
  }
  tbody.innerHTML = orders.map((o) => {
    const itemsHTML = (o.items || []).map((i) => `<div>${i.qty}x ${i.name}${i.color ? ` (${i.color}${i.size ? ', ' + i.size : ''})` : ''}</div>`).join('');
    return `
    <tr>
      <td>${fmtDate(o.created_at)}</td>
      <td>${o.customer_name}<br><span style="color:var(--cinza);font-size:12px">${o.customer_phone}</span></td>
      <td class="order-address">${addressLine(o.shipping_address)}</td>
      <td class="order-items-list">${itemsHTML}</td>
      <td>${fmtBRL(o.total)}</td>
      <td><span class="badge-pill ${o.status}">${ORDER_STATUS_LABELS[o.status] || o.status}</span></td>
      <td style="font-size:12px;color:var(--cinza)">${o.mp_status || '—'}</td>
    </tr>`;
  }).join('');
}

/* ---------------- Init ---------------- */
async function init() {
  try {
    await api('/api/me');
  } catch {
    return;
  }
  initNav();
  initProductModal();
  initTemaView();
  await loadProducts();
  await loadSettings();
  await loadOrders();
}

document.addEventListener('DOMContentLoaded', init);
