const { Resend } = require('resend');

const fmtBRL = (n) => Number(n || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

function addressLine(addr) {
  if (!addr || !addr.street) return 'Endereço não informado';
  const parts = [
    `${addr.street}, ${addr.number || 's/n'}`,
    addr.complement,
    addr.district,
    `${addr.city || ''} - ${addr.state || ''}`,
    addr.cep ? `CEP ${addr.cep}` : '',
  ].filter(Boolean);
  return parts.join(' — ');
}

async function sendOrderApprovedEmail(order) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;
  if (!apiKey || !to) {
    console.warn('RESEND_API_KEY ou NOTIFY_EMAIL não configurados — notificação de venda pulada.');
    return;
  }

  const resend = new Resend(apiKey);
  const items = order.items || [];
  const itemsHTML = items
    .map((i) => `<li>${i.qty}x ${i.name}${i.color ? ` — ${i.color}` : ''}${i.size ? ` (Tam. ${i.size})` : ''} — ${fmtBRL(i.price * i.qty)}</li>`)
    .join('');

  await resend.emails.send({
    from: process.env.NOTIFY_FROM || 'Autênticas Store <onboarding@resend.dev>',
    to,
    subject: `Nova venda aprovada — ${fmtBRL(order.total)}`,
    html: `
      <h2>Venda aprovada 🎉</h2>
      <p><b>Cliente:</b> ${order.customer_name}<br>
      <b>Telefone:</b> ${order.customer_phone}<br>
      ${order.customer_email ? `<b>E-mail:</b> ${order.customer_email}<br>` : ''}
      <b>Endereço de entrega:</b> ${addressLine(order.shipping_address)}</p>
      <p><b>Itens:</b></p>
      <ul>${itemsHTML}</ul>
      <p><b>Total:</b> ${fmtBRL(order.total)}</p>
      <p>Pedido: ${order.id}</p>
    `,
  });
}

module.exports = { sendOrderApprovedEmail };
