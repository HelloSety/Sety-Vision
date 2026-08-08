/* Autênticas Store — painel admin (dashboard.html). Vendas consultadas direto do Mercado Pago. */

const ORDER_STATUS_LABELS = { pending: 'Pendente', approved: 'Aprovado', rejected: 'Recusado', cancelled: 'Cancelado' };

const fmtBRL = (n) => Number(n || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const fmtDate = (iso) => new Date(iso).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });

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
  return res.json();
}

async function loadOrders() {
  try {
    const orders = await api('/api/admin/orders');
    renderOrderStats(orders);
    renderOrdersTable(orders);
  } catch (err) {
    showToast(err.message, true);
  }
}

function renderOrderStats(orders) {
  const approved = orders.filter((o) => o.status === 'approved');
  const revenue = approved.reduce((s, o) => s + Number(o.total), 0);
  document.getElementById('orderStats').innerHTML = `
    <div class="stat-card"><span>Pedidos totais</span><b>${orders.length}</b></div>
    <div class="stat-card"><span>Pagos</span><b>${approved.length}</b></div>
    <div class="stat-card"><span>Faturamento (pago)</span><b>${fmtBRL(revenue)}</b></div>
  `;
}

function renderOrdersTable(orders) {
  const tbody = document.getElementById('ordersTable');
  if (!orders.length) {
    tbody.innerHTML = '<tr class="empty-row"><td colspan="6">Nenhuma venda ainda.</td></tr>';
    return;
  }
  tbody.innerHTML = orders.map((o) => {
    const itemsHTML = (o.items || []).map((i) => `<div>${i.qty}x ${i.name}</div>`).join('') || '—';
    return `
    <tr>
      <td>${fmtDate(o.created_at)}</td>
      <td>${o.customer_name}${o.customer_phone ? `<br><span style="color:var(--cinza);font-size:12px">${o.customer_phone}</span>` : ''}</td>
      <td class="order-items-list">${itemsHTML}</td>
      <td>${fmtBRL(o.total)}</td>
      <td><span class="badge-pill ${o.status}">${ORDER_STATUS_LABELS[o.status] || o.status}</span></td>
      <td style="font-size:12px;color:var(--cinza)">${o.mp_status || '—'}</td>
    </tr>`;
  }).join('');
}

async function init() {
  try {
    await api('/api/admin/me');
  } catch {
    return;
  }

  document.getElementById('logoutBtn').addEventListener('click', async () => {
    await api('/api/admin/logout', { method: 'POST' });
    window.location.href = 'index.html';
  });
  document.getElementById('refreshBtn').addEventListener('click', loadOrders);

  await loadOrders();
}

document.addEventListener('DOMContentLoaded', init);
