const { MercadoPagoConfig, Preference, Payment } = require('mercadopago');

let mpClient;

function getClient() {
  if (!mpClient) {
    const accessToken = process.env.MP_ACCESS_TOKEN;
    if (!accessToken) throw new Error('MP_ACCESS_TOKEN não configurada');
    mpClient = new MercadoPagoConfig({ accessToken });
  }
  return mpClient;
}

function getPreferenceApi() {
  return new Preference(getClient());
}

function getPaymentApi() {
  return new Payment(getClient());
}

module.exports = { getPreferenceApi, getPaymentApi };
