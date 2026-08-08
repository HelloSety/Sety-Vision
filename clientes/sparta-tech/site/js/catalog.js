// SPARTA TECH — catálogo de produtos
// Nomes e preços reais de mercado (nicho de acessórios para celular), sem atribuição de marca de terceiros.
// Fotos: banco de imagens de uso comercial livre (Pexels), sem produtos gerados por IA e sem marca/logo de terceiros visível.
var SPARTA_PRODUTOS = [
  // ===== CAPAS =====
  {
    handle: "capa-anti-slip",
    nome: "Capa Anti-Slip",
    variacao: "Compatível com diversos modelos",
    categoria: "Capas",
    preco: 9.99,
    precoOriginal: 16.66,
    imagens: ["imagens/produtos/reais/capa-real-01.webp"],
    badge: "OFERTA",
    opcoes: ["iPhone 15", "iPhone 16", "Galaxy S25", "Galaxy S24"]
  },
  {
    handle: "capa-anti-slip-magsafe",
    nome: "Capa Anti-Slip Magsafe",
    variacao: "Compatível com carregamento magnético",
    categoria: "Capas",
    preco: 9.99,
    precoOriginal: 16.66,
    imagens: ["imagens/produtos/reais/capa-real-01.webp"],
    badge: "OFERTA",
    opcoes: ["iPhone 15 Pro", "iPhone 15 Pro Max", "iPhone 16"]
  },
  {
    handle: "capa-crystal-slim",
    nome: "Capa Crystal Slim",
    variacao: "Transparente Anti-Amarelamento",
    categoria: "Capas",
    preco: 97.97,
    precoOriginal: 163.0,
    imagens: ["imagens/produtos/reais/capa-real-01.webp"],
    badge: null,
    opcoes: ["iPhone 17 Pro", "iPhone 17 Pro Max"]
  },
  {
    handle: "capa-woov",
    nome: "Capa Woov",
    variacao: "Azul",
    categoria: "Capas",
    preco: 179.0,
    precoOriginal: 299.0,
    imagens: ["imagens/produtos/reais/capa-real-01.webp"],
    badge: "MAIS VENDIDO",
    opcoes: ["iPhone 17 Pro", "iPhone 17 Pro Max"]
  },
  {
    handle: "capa-raptor",
    nome: "Capa Raptor",
    variacao: "Reforçada Anti-Impacto",
    categoria: "Capas",
    preco: 137.0,
    precoOriginal: 229.0,
    imagens: ["imagens/produtos/reais/capa-real-01.webp"],
    badge: null,
    opcoes: ["iPhone 17 Pro Max", "Galaxy S26 Ultra"]
  },
  {
    handle: "capa-silicon-liquid",
    nome: "Capa Silicon Liquid Magsafe",
    variacao: "Preta",
    categoria: "Capas",
    preco: 97.97,
    precoOriginal: 163.0,
    imagens: ["imagens/produtos/reais/capa-real-01.webp"],
    badge: null,
    opcoes: ["iPhone 17"]
  },
  {
    handle: "capa-rugged-shield",
    nome: "Capa Rugged Shield",
    variacao: "Proteção Reforçada nas Bordas",
    categoria: "Capas",
    preco: 16.32,
    precoOriginal: 27.2,
    imagens: ["imagens/produtos/reais/capa-real-01.webp"],
    badge: "OFERTA",
    opcoes: ["Galaxy A57"]
  },

  // ===== PELÍCULAS =====
  {
    handle: "pelicula-hydrogel-gamer",
    nome: "Película Hydrogel Gamer",
    variacao: "Acabamento Fosco",
    categoria: "Películas",
    preco: 49.97,
    precoOriginal: 83.0,
    imagens: ["imagens/produtos/reais/pelicula-real-01.webp"],
    badge: null,
    opcoes: ["Universal"]
  },
  {
    handle: "pelicula-ultra-glass",
    nome: "Película Ultra Glass",
    variacao: "Preta — Alta Resistência",
    categoria: "Películas",
    preco: 99.97,
    precoOriginal: 166.0,
    imagens: ["imagens/produtos/reais/pelicula-real-01.webp"],
    badge: "MAIS VENDIDO",
    opcoes: ["iPhone 17 Pro Max"]
  },
  {
    handle: "protetor-lente-camera",
    nome: "Protetor de Lente de Câmera",
    variacao: "Transparente com Molde Aplicador",
    categoria: "Películas",
    preco: 49.99,
    precoOriginal: 83.0,
    imagens: ["imagens/produtos/reais/pelicula-real-01.webp"],
    badge: null,
    opcoes: ["iPhone 17", "iPhone 17 Pro", "Galaxy S26 Ultra"]
  },
  {
    handle: "pelicula-privacidade",
    nome: "Película de Privacidade",
    variacao: "Com Aplicador",
    categoria: "Películas",
    preco: 147.97,
    precoOriginal: 246.0,
    imagens: ["imagens/produtos/reais/pelicula-real-01.webp"],
    badge: "OFERTA",
    opcoes: ["iPhone 17 Pro Max"]
  },
  {
    handle: "pelicula-hydrogel-hd",
    nome: "Película Hydrogel HD",
    variacao: "Traseira ou Frontal",
    categoria: "Películas",
    preco: 49.97,
    precoOriginal: 83.0,
    imagens: ["imagens/produtos/reais/pelicula-real-01.webp"],
    badge: null,
    opcoes: ["iPhone 17", "iPhone 17 Pro Max"]
  },

  // ===== CABOS =====
  {
    handle: "cabo-slim-3em1",
    nome: "Cabo Slim 3 em 1",
    variacao: "Micro USB / Lightning / Tipo C",
    categoria: "Cabos",
    preco: 7.0,
    precoOriginal: 12.0,
    imagens: ["imagens/produtos/reais/cabo-real-01.webp"],
    badge: "OFERTA",
    opcoes: ["Preto"]
  },
  {
    handle: "cabo-dual-shock",
    nome: "Cabo Dual Shock",
    variacao: "USB-A / Tipo C — 2 Metros",
    categoria: "Cabos",
    preco: 79.97,
    precoOriginal: 133.0,
    imagens: ["imagens/produtos/reais/cabo-real-01.webp"],
    badge: null,
    opcoes: ["Preto"]
  },
  {
    handle: "cabo-turbo-militar-lightning",
    nome: "Cabo Turbo Militar",
    variacao: "Lightning / USB-A Reforçado 1,5M — Certificado MFI",
    categoria: "Cabos",
    preco: 139.97,
    precoOriginal: 233.0,
    imagens: ["imagens/produtos/reais/cabo-real-01.webp"],
    badge: "MAIS VENDIDO",
    opcoes: ["Preto"]
  },
  {
    handle: "cabo-nylon-kevlar-tipoc",
    nome: "Cabo Nylon Kevlar",
    variacao: "Tipo C / Tipo C — 1,5M — Branco",
    categoria: "Cabos",
    preco: 33.0,
    precoOriginal: 55.0,
    imagens: ["imagens/produtos/reais/cabo-real-01.webp"],
    badge: null,
    opcoes: ["Branco"]
  },
  {
    handle: "cabo-symetric",
    nome: "Cabo Symetric",
    variacao: "Tipo C / Tipo C — 1,5M — Cinza",
    categoria: "Cabos",
    preco: 29.97,
    precoOriginal: 50.0,
    imagens: ["imagens/produtos/reais/cabo-real-01.webp"],
    badge: "OFERTA",
    opcoes: ["Cinza", "Branco"]
  },
  {
    handle: "cabo-dual-armor",
    nome: "Cabo Dual Armor",
    variacao: "Tipo C / Tipo C 65W — Nylon Balístico — Branco",
    categoria: "Cabos",
    preco: 79.99,
    precoOriginal: 133.0,
    imagens: ["imagens/produtos/reais/cabo-real-01.webp"],
    badge: null,
    opcoes: ["Branco"]
  },
  {
    handle: "cabo-greenecoo",
    nome: "Cabo GreenEcoo",
    variacao: "Tipo C / Tipo C — 1M",
    categoria: "Cabos",
    preco: 9.99,
    precoOriginal: 17.0,
    imagens: ["imagens/produtos/reais/cabo-real-01.webp"],
    badge: "OFERTA",
    opcoes: ["Preto"]
  },

  // ===== FONES =====
  {
    handle: "earbuds-orbit",
    nome: "Earbuds Bluetooth Orbit",
    variacao: "TWS Compacto — Branco",
    categoria: "Fones",
    preco: 127.0,
    precoOriginal: 277.0,
    imagens: ["imagens/produtos/reais/fone-earbuds-real-01.webp"],
    badge: "OFERTA",
    opcoes: ["Branco"]
  },
  {
    handle: "headphone-anc-survivor",
    nome: "Headphone Bluetooth ANC",
    variacao: "Cancelamento Ativo de Ruído",
    categoria: "Fones",
    preco: 139.97,
    precoOriginal: 297.0,
    imagens: ["imagens/produtos/reais/fone-headphone-real-01.webp"],
    badge: "MAIS VENDIDO",
    opcoes: ["Preto"]
  },
  {
    handle: "fone-atomic",
    nome: "Fone de Ouvido Atomic",
    variacao: "Earbuds Entrada — Preto",
    categoria: "Fones",
    preco: 29.99,
    precoOriginal: 79.99,
    imagens: ["imagens/produtos/reais/fone-earbuds-real-01.webp"],
    badge: "OFERTA",
    opcoes: ["Preto"]
  },
  {
    handle: "earbuds-hybrid-anc",
    nome: "Earbuds Bluetooth 5.4 Hybrid",
    variacao: "ANC + Baixa Latência + Adaptador USB-C",
    categoria: "Fones",
    preco: 267.0,
    precoOriginal: 329.99,
    imagens: ["imagens/produtos/reais/fone-earbuds-real-01.webp"],
    badge: null,
    opcoes: ["Preto"]
  },
  {
    handle: "ear-clip-ia",
    nome: "Fone Auricular Ear Clip",
    variacao: "Baixa Latência + Tradução por IA",
    categoria: "Fones",
    preco: 127.0,
    precoOriginal: 157.0,
    imagens: ["imagens/produtos/reais/fone-earbuds-real-01.webp"],
    badge: null,
    opcoes: ["Preto"]
  },
  {
    handle: "headphone-flex-bass",
    nome: "Headphone Flex Extra Bass",
    variacao: "Graves Reforçados",
    categoria: "Fones",
    preco: 267.0,
    precoOriginal: 296.97,
    imagens: ["imagens/produtos/reais/fone-headphone-real-01.webp"],
    badge: null,
    opcoes: ["Preto", "Branco"]
  },
  {
    handle: "headset-gamer-rgb",
    nome: "Headset Gamer RGB Sem Fio",
    variacao: "2.4G + Bluetooth, Microfone",
    categoria: "Fones",
    preco: 229.99,
    precoOriginal: 257.0,
    imagens: ["imagens/produtos/reais/fone-headphone-real-01.webp"],
    badge: "MAIS VENDIDO",
    opcoes: ["Preto"]
  },
  {
    handle: "headphone-orbit-max",
    nome: "Headphone Orbit Max",
    variacao: "Dobrável — Prata",
    categoria: "Fones",
    preco: 167.0,
    precoOriginal: 227.99,
    imagens: ["imagens/produtos/reais/fone-headphone-real-01.webp"],
    badge: null,
    opcoes: ["Prata", "Cinza Escuro"]
  },
  {
    handle: "fone-fio-classico",
    nome: "Fone com Fio Clássico",
    variacao: "Conector P2 — Branco",
    categoria: "Fones",
    preco: 39.97,
    precoOriginal: 79.99,
    imagens: ["imagens/produtos/reais/fone-headphone-real-01.webp"],
    badge: null,
    opcoes: ["Branco"]
  },
  {
    handle: "fone-magnetico-dual",
    nome: "Fone Magnético Dual Shock",
    variacao: "In-Ear Esportivo com Fio",
    categoria: "Fones",
    preco: 67.0,
    precoOriginal: 179.99,
    imagens: ["imagens/produtos/reais/fone-earbuds-real-01.webp"],
    badge: "OFERTA",
    opcoes: ["Preto"]
  },

  // ===== SMARTWATCH =====
  {
    handle: "pulseira-smartwatch-silicone",
    nome: "Pulseira Smartwatch Silicone",
    variacao: "Ajuste Universal",
    categoria: "Smartwatch",
    preco: 27.9,
    precoOriginal: 44.9,
    imagens: ["imagens/produtos/reais/smartwatch-real-01.webp"],
    badge: null,
    opcoes: ["20mm", "22mm", "24mm"]
  },

  // ===== CARREGADORES =====
  {
    handle: "regua-multi-tomadas",
    nome: "Régua Multi-Tomadas USB",
    variacao: "Entradas USB-A / Tipo C + 4 Tomadas",
    categoria: "Carregadores",
    preco: 147.0,
    precoOriginal: 387.0,
    imagens: ["imagens/produtos/reais/hub-real-01.webp"],
    badge: "OFERTA",
    opcoes: ["Preto"]
  },
  {
    handle: "carregador-inducao-3em1",
    nome: "Carregador por Indução 3 em 1",
    variacao: "Wireless Sem Fio Universal",
    categoria: "Carregadores",
    preco: 157.0,
    precoOriginal: 449.99,
    imagens: ["imagens/produtos/reais/wireless-charger-real-01.webp"],
    badge: "OFERTA",
    opcoes: ["Preto"]
  },
  {
    handle: "carregador-turbo-qc3",
    nome: "Carregador Turbo Tipo C",
    variacao: "QC 3.0 até 25W — Branco",
    categoria: "Carregadores",
    preco: 177.0,
    precoOriginal: 295.0,
    imagens: ["imagens/produtos/reais/wireless-charger-real-01.webp"],
    badge: null,
    opcoes: ["Branco"]
  },
  {
    handle: "powerbank-5000",
    nome: "Power Bank 5.000mAh",
    variacao: "Portátil Compacto",
    categoria: "Carregadores",
    preco: 192.0,
    precoOriginal: 320.0,
    imagens: ["imagens/produtos/reais/powerbank-real-01.webp"],
    badge: null,
    opcoes: ["Preto"]
  },
  {
    handle: "powerbank-10000-magsafe",
    nome: "Power Bank 10.000mAh Wireless",
    variacao: "Carregamento 15W + Fixação Magnética",
    categoria: "Carregadores",
    preco: 97.0,
    precoOriginal: 194.0,
    imagens: ["imagens/produtos/reais/powerbank-real-01.webp"],
    badge: "MAIS VENDIDO",
    opcoes: ["Preto"]
  },
  {
    handle: "carregador-turbo-gan-20w",
    nome: "Carregador Turbo GaN Ultra Slim",
    variacao: "20W — Branco",
    categoria: "Carregadores",
    preco: 59.97,
    precoOriginal: 109.99,
    imagens: ["imagens/produtos/reais/wireless-charger-real-01.webp"],
    badge: "OFERTA",
    opcoes: ["Branco"]
  },
  {
    handle: "powerbank-turbo-45w",
    nome: "Power Bank Turbo 45W",
    variacao: "10.000mAh — Notebook, MacBook e Celular",
    categoria: "Carregadores",
    preco: 297.0,
    precoOriginal: 367.99,
    imagens: ["imagens/produtos/reais/powerbank-real-01.webp"],
    badge: null,
    opcoes: ["Preto"]
  },
  {
    handle: "carregador-universal-pd",
    nome: "Carregador e Adaptador Universal",
    variacao: "Turbo Power Delivery",
    categoria: "Carregadores",
    preco: 137.0,
    precoOriginal: 179.99,
    imagens: ["imagens/produtos/reais/wireless-charger-real-01.webp"],
    badge: null,
    opcoes: ["Branco"]
  },

  // ===== SUPORTES =====
  {
    handle: "suporte-veicular-encosto",
    nome: "Suporte Veicular Tank Car",
    variacao: "Para encosto — Celular e Tablet até 11\"",
    categoria: "Suportes",
    preco: 47.0,
    precoOriginal: 78.0,
    imagens: ["imagens/produtos/reais/suporte-veicular-real-01.webp"],
    badge: "OFERTA",
    opcoes: ["Preto"]
  },
  {
    handle: "suporte-mesa-hydra-4em1",
    nome: "Suporte de Mesa Hydra 4 em 1",
    variacao: "MagSafe Ajustável — Celular, Tablet e Notebook",
    categoria: "Suportes",
    preco: 127.0,
    precoOriginal: 212.0,
    imagens: ["imagens/produtos/reais/suporte-veicular-real-01.webp"],
    badge: "MAIS VENDIDO",
    opcoes: ["Preto"]
  },
  {
    handle: "suporte-anel-grip",
    nome: "Suporte de Anel Grip 360°",
    variacao: "Com Base Magnética",
    categoria: "Suportes",
    preco: 19.9,
    precoOriginal: 34.9,
    imagens: ["imagens/produtos/reais/suporte-veicular-real-01.webp"],
    badge: null,
    opcoes: ["Preto", "Azul"]
  },
  {
    handle: "adaptador-3em1-hdmi",
    nome: "Adaptador 3 em 1",
    variacao: "Tipo C / HDMI / USB-A 3.0",
    categoria: "Cabos",
    preco: 89.97,
    precoOriginal: 119.99,
    imagens: ["imagens/produtos/reais/hub-real-01.webp"],
    badge: "OFERTA",
    opcoes: ["Verde"]
  },
  {
    handle: "capa-para-iphone-17-pro-max-crystal-slim-nao-amarela",
    nome: "Capa para iPhone 17 Pro Max - Crystal Slim - NÃO AMARELA",
    variacao: "",
    categoria: "Capas",
    preco: 97.97,
    precoOriginal: 127.99,
    imagens: ["imagens/produtos/reais/capa-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "capa-para-iphone-16-pro-max-anti-slip",
    nome: "Capa para iPhone 16 Pro Max - Anti-Slip",
    variacao: "",
    categoria: "Capas",
    preco: 9.99,
    precoOriginal: 49.99,
    imagens: ["imagens/produtos/reais/capa-real-01.webp"],
    badge: "OFERTA",
    opcoes: ["Padrão"]
  },
  {
    handle: "capa-para-iphone-17-pro-max-woov-azul",
    nome: "Capa para iPhone 17 Pro Max - Woov - Azul",
    variacao: "",
    categoria: "Capas",
    preco: 179,
    precoOriginal: 179.99,
    imagens: ["imagens/produtos/reais/capa-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "capa-para-iphone-15-pro-max-anti-slip-magsafe",
    nome: "Capa para iPhone 15 Pro Max - Anti-Slip Magsafe",
    variacao: "",
    categoria: "Capas",
    preco: 9.99,
    precoOriginal: 49.99,
    imagens: ["imagens/produtos/reais/capa-real-01.webp"],
    badge: "OFERTA",
    opcoes: ["Padrão"]
  },
  {
    handle: "capa-para-iphone-17-pro-max-raptor",
    nome: "Capa para iPhone 17 Pro Max - Raptor",
    variacao: "",
    categoria: "Capas",
    preco: 137,
    precoOriginal: 189,
    imagens: ["imagens/produtos/reais/capa-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "capa-para-iphone-17-pro-max-octacore-magsafe-azul",
    nome: "Capa para iPhone 17 Pro Max - Octacore Magsafe - Azul",
    variacao: "",
    categoria: "Capas",
    preco: 127.97,
    precoOriginal: 157.99,
    imagens: ["imagens/produtos/reais/capa-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "capa-para-iphone-17-silicon-liquid-magsafe-preta",
    nome: "Capa para iPhone 17 - Silicon Liquid Magsafe - Preta",
    variacao: "",
    categoria: "Capas",
    preco: 97.97,
    precoOriginal: 127.99,
    imagens: ["imagens/produtos/reais/capa-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "capa-para-iphone-16-pro-max-couro-dual-magsafe-preta",
    nome: "Capa para iPhone 16 Pro Max - Couro Dual Magsafe - Preta",
    variacao: "",
    categoria: "Capas",
    preco: 49.97,
    precoOriginal: 199.99,
    imagens: ["imagens/produtos/reais/capa-real-01.webp"],
    badge: "OFERTA",
    opcoes: ["Padrão"]
  },
  {
    handle: "capa-para-iphone-17-pro-max-magsafe-techcouro-preta",
    nome: "Capa para iPhone 17 Pro Max - Magsafe TechCouro - Preta",
    variacao: "",
    categoria: "Capas",
    preco: 97.97,
    precoOriginal: 127.99,
    imagens: ["imagens/produtos/reais/capa-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "capa-para-iphone-17-pro-max-magsafe-wave-fume-preta",
    nome: "Capa para iPhone 17 Pro Max - Magsafe Wave Fumê - Preta",
    variacao: "",
    categoria: "Capas",
    preco: 97.97,
    precoOriginal: 127.99,
    imagens: ["imagens/produtos/reais/capa-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "capa-para-iphone-17-crystal-slim-magsafe-nao-amarela-transpa",
    nome: "Capa para iPhone 17 - Crystal Slim Magsafe - NÃO AMARELA - Transparente",
    variacao: "",
    categoria: "Capas",
    preco: 109.97,
    precoOriginal: 139.99,
    imagens: ["imagens/produtos/reais/capa-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "capa-para-samsung-galaxy-s25-plus-anti-slip",
    nome: "Capa para Samsung Galaxy S25 Plus - Anti-Slip",
    variacao: "",
    categoria: "Capas",
    preco: 9.99,
    precoOriginal: 49.99,
    imagens: ["imagens/produtos/reais/capa-real-01.webp"],
    badge: "OFERTA",
    opcoes: ["Padrão"]
  },
  {
    handle: "capa-para-samsung-galaxy-a57-rugged-shield",
    nome: "Capa para Samsung Galaxy A57 - Rugged Shield",
    variacao: "",
    categoria: "Capas",
    preco: 97.97,
    precoOriginal: 127.99,
    imagens: ["imagens/produtos/reais/capa-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "capa-para-samsung-galaxy-a57-crystal-slim-nao-amarela",
    nome: "Capa para Samsung Galaxy A57 - Crystal Slim - NÃO AMARELA",
    variacao: "",
    categoria: "Capas",
    preco: 97.97,
    precoOriginal: 127.99,
    imagens: ["imagens/produtos/reais/capa-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "capa-para-samsung-galaxy-s25-fe-silicon-veloz-preta",
    nome: "Capa para Samsung Galaxy S25 FE - Silicon Veloz - Preta",
    variacao: "",
    categoria: "Capas",
    preco: 49.97,
    precoOriginal: 79.99,
    imagens: ["imagens/produtos/reais/capa-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "capa-para-samsung-galaxy-s26-ultra-raptor",
    nome: "Capa para Samsung Galaxy S26 Ultra - Raptor",
    variacao: "",
    categoria: "Capas",
    preco: 157,
    precoOriginal: 300,
    imagens: ["imagens/produtos/reais/capa-real-01.webp"],
    badge: "OFERTA",
    opcoes: ["Padrão"]
  },
  {
    handle: "capa-para-samsung-galaxy-s26-ultra-crystal-slim-magsafe-nao-",
    nome: "Capa para Samsung Galaxy S26 Ultra - Crystal Slim Magsafe - NÃO AMARELA - Transparente",
    variacao: "",
    categoria: "Capas",
    preco: 109.97,
    precoOriginal: 139.99,
    imagens: ["imagens/produtos/reais/capa-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "capa-para-samsung-galaxy-s24-ultra-snap-guardian",
    nome: "Capa para Samsung Galaxy S24 Ultra - Snap Guardian",
    variacao: "",
    categoria: "Capas",
    preco: 49.99,
    precoOriginal: 129,
    imagens: ["imagens/produtos/reais/capa-real-01.webp"],
    badge: "OFERTA",
    opcoes: ["Padrão"]
  },
  {
    handle: "capa-para-motorola-moto-edge-70-fusion-darktek",
    nome: "Capa para Motorola Moto Edge 70 Fusion - Darktek",
    variacao: "",
    categoria: "Capas",
    preco: 97,
    precoOriginal: 100,
    imagens: ["imagens/produtos/reais/capa-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "pelicula-para-iphone-17-hydrogel-hd",
    nome: "Película para iPhone 17 - Hydrogel HD",
    variacao: "",
    categoria: "Películas",
    preco: 49.97,
    precoOriginal: 79.99,
    imagens: ["imagens/produtos/reais/pelicula-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "pelicula-para-samsung-galaxy-s26-ultra-hydrogel-hd",
    nome: "Película para Samsung Galaxy S26 Ultra - Hydrogel HD",
    variacao: "",
    categoria: "Películas",
    preco: 49.97,
    precoOriginal: 79.99,
    imagens: ["imagens/produtos/reais/pelicula-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "pelicula-para-xiaomi-poco-f8-ultra-hydrogel-gamer-fosca",
    nome: "Película para Xiaomi Poco F8 Ultra - Hydrogel Gamer Fosca",
    variacao: "",
    categoria: "Películas",
    preco: 49.97,
    precoOriginal: 79.99,
    imagens: ["imagens/produtos/reais/pelicula-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "pelicula-para-iphone-17-pro-max-ultra-glass-preta",
    nome: "Película para iPhone 17 Pro Max - Ultra Glass - Preta",
    variacao: "",
    categoria: "Películas",
    preco: 99.97,
    precoOriginal: 129.97,
    imagens: ["imagens/produtos/reais/pelicula-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "pelicula-para-iphone-16-ultra-glass-preta",
    nome: "Película para iPhone 16 - Ultra Glass - Preta",
    variacao: "",
    categoria: "Películas",
    preco: 99.97,
    precoOriginal: 129.97,
    imagens: ["imagens/produtos/reais/pelicula-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "pelicula-para-iphone-17-pro-max-privacidade-com-aplicador-su",
    nome: "Película para iPhone 17 Pro Max - Privacidade com Aplicador - Survivor",
    variacao: "",
    categoria: "Películas",
    preco: 147.97,
    precoOriginal: 177.99,
    imagens: ["imagens/produtos/reais/pelicula-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "pelicula-para-samsung-galaxy-s25-ultra-privacidade-hydrogel",
    nome: "Película para Samsung Galaxy S25 Ultra - Privacidade Hydrogel",
    variacao: "",
    categoria: "Películas",
    preco: 79.97,
    precoOriginal: 109.97,
    imagens: ["imagens/produtos/reais/pelicula-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "protetor-de-lente-para-iphone-17-pro-max-survivor-transparen",
    nome: "Protetor de Lente para iPhone 17 Pro Max - Survivor - Transparente com molde aplicador - Frame para câmera",
    variacao: "",
    categoria: "Películas",
    preco: 49.99,
    precoOriginal: 109.99,
    imagens: ["imagens/produtos/reais/pelicula-real-01.webp"],
    badge: "OFERTA",
    opcoes: ["Padrão"]
  },
  {
    handle: "protetor-de-lente-para-samsung-galaxy-s26-ultra-survivor-tra",
    nome: "Protetor de Lente para Samsung Galaxy S26 Ultra - Survivor - Transparente com molde aplicador",
    variacao: "",
    categoria: "Películas",
    preco: 49.99,
    precoOriginal: 109.99,
    imagens: ["imagens/produtos/reais/pelicula-real-01.webp"],
    badge: "OFERTA",
    opcoes: ["Padrão"]
  },
  {
    handle: "pelicula-para-iphone-17-pro-max-traseira-hydrogel-hd",
    nome: "Película para iPhone 17 Pro Max - Traseira Hydrogel HD",
    variacao: "",
    categoria: "Películas",
    preco: 49.97,
    precoOriginal: 79.99,
    imagens: ["imagens/produtos/reais/pelicula-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "pelicula-para-samsung-galaxy-s26-ultra-traseira-hydrogel-hd",
    nome: "Película para Samsung Galaxy S26 Ultra - Traseira Hydrogel HD",
    variacao: "",
    categoria: "Películas",
    preco: 49.97,
    precoOriginal: 79.99,
    imagens: ["imagens/produtos/reais/pelicula-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "pelicula-para-iphone-17-pro-max-traseira-de-fibra-de-carbono",
    nome: "Película para iPhone 17 Pro Max - Traseira de Fibra de Carbono",
    variacao: "",
    categoria: "Películas",
    preco: 19.97,
    precoOriginal: 39.99,
    imagens: ["imagens/produtos/reais/pelicula-real-01.webp"],
    badge: "OFERTA",
    opcoes: ["Padrão"]
  },
  {
    handle: "pelicula-para-iphone-17-pro-max-dual-glass-preta",
    nome: "Película para iPhone 17 Pro Max - Dual Glass Preta",
    variacao: "",
    categoria: "Películas",
    preco: 129.97,
    precoOriginal: 159.99,
    imagens: ["imagens/produtos/reais/pelicula-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "pelicula-para-samsung-galaxy-s26-ultra-6-meses-de-garantia-d",
    nome: "Película para Samsung Galaxy S26 Ultra - 6 meses de garantia de tela - Ultra Safe",
    variacao: "",
    categoria: "Películas",
    preco: 297.97,
    precoOriginal: 327.99,
    imagens: ["imagens/produtos/reais/pelicula-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "pelicula-para-iphone-hydroshield",
    nome: "Película para iPhone - Hydroshield",
    variacao: "",
    categoria: "Películas",
    preco: 49.97,
    precoOriginal: 82.45,
    imagens: ["imagens/produtos/reais/pelicula-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "cabo-curto-slim-3-em-1-micro-usb-lightning-tipo-c",
    nome: "Cabo curto Slim 3 em 1 - Micro USB / Lightning / Tipo C",
    variacao: "",
    categoria: "Cabos",
    preco: 7,
    precoOriginal: 11.55,
    imagens: ["imagens/produtos/reais/cabo-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "cabo-nylon-kevlar-tipo-c-tipo-c-1-5m-branco",
    nome: "Cabo Nylon Kevlar Tipo C / Tipo C - 1,5M - Branco",
    variacao: "",
    categoria: "Cabos",
    preco: 33,
    precoOriginal: 79.99,
    imagens: ["imagens/produtos/reais/cabo-real-01.webp"],
    badge: "OFERTA",
    opcoes: ["Padrão"]
  },
  {
    handle: "cabo-nylon-kevlar-lightning-tipo-c-1-5m-branco",
    nome: "Cabo Nylon Kevlar Lightning / Tipo C - 1,5M - Branco",
    variacao: "",
    categoria: "Cabos",
    preco: 29.97,
    precoOriginal: 59.99,
    imagens: ["imagens/produtos/reais/cabo-real-01.webp"],
    badge: "OFERTA",
    opcoes: ["Padrão"]
  },
  {
    handle: "cabo-nylon-kevlar-usb-a-tipo-c-1-5m-branco",
    nome: "Cabo Nylon Kevlar USB-A / Tipo C - 1,5M - Branco",
    variacao: "",
    categoria: "Cabos",
    preco: 29.97,
    precoOriginal: 59.99,
    imagens: ["imagens/produtos/reais/cabo-real-01.webp"],
    badge: "OFERTA",
    opcoes: ["Padrão"]
  },
  {
    handle: "cabo-dual-armor-tipo-c-tipo-c-1m-com-carregamento-rapido-65w",
    nome: "Cabo Dual Armor Tipo C/ Tipo C 1M com Carregamento Rápido 65W Revestido em Nylon Balístico - Branco",
    variacao: "",
    categoria: "Cabos",
    preco: 79.99,
    precoOriginal: 109.99,
    imagens: ["imagens/produtos/reais/cabo-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "cabo-dual-armor-tipo-c-lightning-1m-com-carregamento-rapido-",
    nome: "Cabo Dual Armor Tipo C/ Lightning 1M com Carregamento Rápido 27W Revestido em Nylon Balístico - Branco",
    variacao: "",
    categoria: "Cabos",
    preco: 79.99,
    precoOriginal: 109.99,
    imagens: ["imagens/produtos/reais/cabo-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "cabo-dual-armor-tipo-c-usb-a-1m-com-carregamento-rapido-18w-",
    nome: "Cabo Dual Armor Tipo C/ USB-A 1M com Carregamento Rápido 18W Revestido em Nylon Balístico - Branco",
    variacao: "",
    categoria: "Cabos",
    preco: 79.99,
    precoOriginal: 109.99,
    imagens: ["imagens/produtos/reais/cabo-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "cabo-turbo-militar-1-5m-type-c-tipo-c-original",
    nome: "Cabo Turbo Militar - 1,5M - Type C / Tipo C - Original",
    variacao: "",
    categoria: "Cabos",
    preco: 69.97,
    precoOriginal: 89.99,
    imagens: ["imagens/produtos/reais/cabo-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "cabo-micro-usb-v8-reforcado-1-5m-para-carregamento-rapido-e-",
    nome: "Cabo Micro USB V8 Reforçado 1,5m para Carregamento Rápido e Transferência de Dados - Turbo Militar",
    variacao: "",
    categoria: "Cabos",
    preco: 49.97,
    precoOriginal: 79.99,
    imagens: ["imagens/produtos/reais/cabo-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "cabo-lightning-usb-a-reforcado-1-5m-certificado-mfi-para-iph",
    nome: "Cabo Lightning/USB-A Reforçado 1,5M Certificado MFI para iPhone/iPad - Turbo Militar",
    variacao: "",
    categoria: "Cabos",
    preco: 139.97,
    precoOriginal: 169.99,
    imagens: ["imagens/produtos/reais/cabo-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "cabo-symetric-cinza-tipo-c-tipo-c-1-5m",
    nome: "Cabo Symetric - Cinza - Tipo C / Tipo C - 1,5M",
    variacao: "",
    categoria: "Cabos",
    preco: 29.97,
    precoOriginal: 59.99,
    imagens: ["imagens/produtos/reais/cabo-real-01.webp"],
    badge: "OFERTA",
    opcoes: ["Padrão"]
  },
  {
    handle: "cabo-symetric-branco-lightning-tipo-c-1-5m",
    nome: "Cabo Symetric - Branco - Lightning / Tipo C - 1,5M",
    variacao: "",
    categoria: "Cabos",
    preco: 29.97,
    precoOriginal: 59.99,
    imagens: ["imagens/produtos/reais/cabo-real-01.webp"],
    badge: "OFERTA",
    opcoes: ["Padrão"]
  },
  {
    handle: "cabo-symetric-usb-a-tipo-c-cinza-1-5m",
    nome: "Cabo Symetric USB-A/Tipo-C - Cinza - 1,5M",
    variacao: "",
    categoria: "Cabos",
    preco: 29.97,
    precoOriginal: 59.99,
    imagens: ["imagens/produtos/reais/cabo-real-01.webp"],
    badge: "OFERTA",
    opcoes: ["Padrão"]
  },
  {
    handle: "cabo-greenecoo-tipo-c-tipo-c-1m",
    nome: "Cabo GreenEcoo Tipo C / Tipo C - 1M",
    variacao: "",
    categoria: "Cabos",
    preco: 9.99,
    precoOriginal: 79.99,
    imagens: ["imagens/produtos/reais/cabo-real-01.webp"],
    badge: "OFERTA",
    opcoes: ["Padrão"]
  },
  {
    handle: "cabo-greenecoo-usb-lightning-1m",
    nome: "Cabo GreenEcoo USB / Lightning - 1M",
    variacao: "",
    categoria: "Cabos",
    preco: 29.99,
    precoOriginal: 94.99,
    imagens: ["imagens/produtos/reais/cabo-real-01.webp"],
    badge: "OFERTA",
    opcoes: ["Padrão"]
  },
  {
    handle: "carregador-turbo-gan-ultra-slim-tipo-c-20w-branco",
    nome: "Carregador Turbo Gan Ultra Slim Tipo C 20W - Branco",
    variacao: "",
    categoria: "Carregadores",
    preco: 59.97,
    precoOriginal: 109.99,
    imagens: ["imagens/produtos/reais/powerbank-real-01.webp"],
    badge: "OFERTA",
    opcoes: ["Padrão"]
  },
  {
    handle: "carregador-turbo-gan-ultra-slim-tipo-c-usb-a-20w-branco",
    nome: "Carregador Turbo Gan Ultra Slim Tipo-C + USB-A 20W - Branco",
    variacao: "",
    categoria: "Carregadores",
    preco: 77,
    precoOriginal: 127.99,
    imagens: ["imagens/produtos/reais/powerbank-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "carregador-de-parede-turbo-100w-4-em-1-gan-3-portas-usb-c-1-",
    nome: "Carregador de Parede Turbo 100W 4 em 1 GaN - 3 Portas USB-C + 1 Porta USB-A - Discovery",
    variacao: "",
    categoria: "Carregadores",
    preco: 329.97,
    precoOriginal: 359.99,
    imagens: ["imagens/produtos/reais/powerbank-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "carregador-turbo-tipo-c-qc-3-0-ate-25w-branco",
    nome: "Carregador Turbo Tipo C - QC 3.0 até 25W - Branco",
    variacao: "",
    categoria: "Carregadores",
    preco: 177,
    precoOriginal: 292.05,
    imagens: ["imagens/produtos/reais/powerbank-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "carregador-e-adaptador-universal-turbo-power-delivery",
    nome: "Carregador e Adaptador Universal Turbo Power Delivery",
    variacao: "",
    categoria: "Carregadores",
    preco: 137,
    precoOriginal: 179.99,
    imagens: ["imagens/produtos/reais/powerbank-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "carregador-turbo-delivery-qc-4-0-fonte-usb-a-tipo-c",
    nome: "Carregador Turbo Delivery Qc 4.0 - Fonte USB-A / Tipo C",
    variacao: "",
    categoria: "Carregadores",
    preco: 119.97,
    precoOriginal: 189.99,
    imagens: ["imagens/produtos/reais/powerbank-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "carregador-de-parede-turbo-35w-com-cabo-retratil-tipo-c-1-en",
    nome: "Carregador de Parede Turbo 35W com Cabo Retrátil Tipo C + 1 Entrada USB-A + 1 Entrada USB-C - Raptor",
    variacao: "",
    categoria: "Carregadores",
    preco: 197,
    precoOriginal: 239.99,
    imagens: ["imagens/produtos/reais/powerbank-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "carregador-por-inducao-3-em-1-wireless-sem-fio-future-univer",
    nome: "Carregador por indução 3 em 1 Wireless Sem Fio Future [Universal]",
    variacao: "",
    categoria: "Carregadores",
    preco: 157,
    precoOriginal: 449.99,
    imagens: ["imagens/produtos/reais/wireless-charger-real-01.webp"],
    badge: "OFERTA",
    opcoes: ["Padrão"]
  },
  {
    handle: "carregador-de-parede-universal-survivor-2-em-1-power-deliver",
    nome: "Carregador de Parede Universal Survivor 2 em 1 Power Delivery 23W Tipo C Ultra Rápido + USB A e Base de Carregamento Magnética Sem Fio para Apple Watch",
    variacao: "",
    categoria: "Carregadores",
    preco: 167,
    precoOriginal: 217.99,
    imagens: ["imagens/produtos/reais/powerbank-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "carregador-wireless-3-em-1-magsafe-para-smartphone-apple-wat",
    nome: "Carregador Wireless 3 em 1 MagSafe - para Smartphone, Apple Watch e Fones de Ouvido - Branco, USB-C, 15W - Dock Station",
    variacao: "",
    categoria: "Carregadores",
    preco: 267.97,
    precoOriginal: 297.99,
    imagens: ["imagens/produtos/reais/wireless-charger-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "carregador-portatil-powerfit-5-000mah",
    nome: "Carregador Portátil Powerfit - 5.000mAh",
    variacao: "",
    categoria: "Carregadores",
    preco: 192,
    precoOriginal: 316.8,
    imagens: ["imagens/produtos/reais/powerbank-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "carregador-portatil-magsafe-5-000mah-wireless-15w-usb-c-pd-u",
    nome: "Carregador Portátil MagSafe - 5.000mAh - Wireless 15W, USB-C PD, Ultrafino e Magnético para iPhone e Android - Titanium",
    variacao: "",
    categoria: "Carregadores",
    preco: 267.97,
    precoOriginal: 297.99,
    imagens: ["imagens/produtos/reais/wireless-charger-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "carregador-portatil-powerbank-10-000mah-com-carregamento-wir",
    nome: "Carregador Portátil Powerbank 10.000mAh com Carregamento Wireless 15W, USB-A, Type-C e Fixação Magnética Compatível com MagSafe - TankSafe",
    variacao: "",
    categoria: "Carregadores",
    preco: 97,
    precoOriginal: 160.05,
    imagens: ["imagens/produtos/reais/wireless-charger-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "carregador-portatil-hybrid-10-000mah",
    nome: "Carregador Portátil Hybrid - 10.000mAh",
    variacao: "",
    categoria: "Carregadores",
    preco: 97,
    precoOriginal: 160.05,
    imagens: ["imagens/produtos/reais/powerbank-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "carregador-portatil-magsafe-10-000mah-wireless-15w-usb-c-pd-",
    nome: "Carregador Portátil MagSafe - 10.000mAh - Wireless 15W, USB-C PD, Ultrafino e Magnético para iPhone e Android - Titanium",
    variacao: "",
    categoria: "Carregadores",
    preco: 357.99,
    precoOriginal: 397,
    imagens: ["imagens/produtos/reais/wireless-charger-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "carregador-portatil-turbo-10-000-mah-45w-bateria-externa-par",
    nome: "Carregador Portátil Turbo 10.000 mAh 45W - Bateria Externa para Notebook, MacBook e Celular com Saída Tipo-C e USB-A - Powerstation",
    variacao: "",
    categoria: "Carregadores",
    preco: 297,
    precoOriginal: 367.99,
    imagens: ["imagens/produtos/reais/powerbank-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "carregador-portatil-powerfast-20-000mah",
    nome: "Carregador Portátil Powerfast - 20.000mAh",
    variacao: "",
    categoria: "Carregadores",
    preco: 297,
    precoOriginal: 397.99,
    imagens: ["imagens/produtos/reais/powerbank-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "carregador-veicular-triplo-turbo-tank-usb-e-tipo-c",
    nome: "Carregador Veicular Triplo Turbo Tank - USB e Tipo C",
    variacao: "",
    categoria: "Carregadores",
    preco: 87,
    precoOriginal: 109.99,
    imagens: ["imagens/produtos/reais/powerbank-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "carregador-veicular-usb-a-turbo-one",
    nome: "Carregador Veicular USB-A Turbo One",
    variacao: "",
    categoria: "Carregadores",
    preco: 29.97,
    precoOriginal: 69.99,
    imagens: ["imagens/produtos/reais/powerbank-real-01.webp"],
    badge: "OFERTA",
    opcoes: ["Padrão"]
  },
  {
    handle: "filtro-de-linha-multiplicador-de-tomadas-bivolt-entrada-usb-",
    nome: "Filtro de Linha Multiplicador de Tomadas Bivolt - Entrada USB-A + Tipo C + 4 Tomadas com Cabo 1,5M - Energy Cube",
    variacao: "",
    categoria: "Carregadores",
    preco: 147,
    precoOriginal: 367.99,
    imagens: ["imagens/produtos/reais/hub-real-01.webp"],
    badge: "OFERTA",
    opcoes: ["Padrão"]
  },
  {
    handle: "earbuds-fone-de-ouvido-bluetooth-symetric",
    nome: "Earbuds Fone de Ouvido Bluetooth Symetric",
    variacao: "",
    categoria: "Fones",
    preco: 197,
    precoOriginal: 299.99,
    imagens: ["imagens/produtos/reais/fone-earbuds-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "fone-de-ouvido-bluetooth-5-4-sem-fio-tws-com-estojo-de-recar",
    nome: "Fone de Ouvido Bluetooth 5.4 Sem Fio TWS com Estojo de Recarga, Baixa Latência e Áudio HD",
    variacao: "",
    categoria: "Fones",
    preco: 120.97,
    precoOriginal: 150.99,
    imagens: ["imagens/produtos/reais/fone-earbuds-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "fone-bluetooth-com-visor-touch-led-controle-de-musica-bateri",
    nome: "Fone Bluetooth com Visor Touch LED, Controle de Música, Bateria de Longa Duração e Estojo Inteligente",
    variacao: "",
    categoria: "Fones",
    preco: 97,
    precoOriginal: 149.99,
    imagens: ["imagens/produtos/reais/fone-earbuds-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "earbuds-fone-de-ouvido-sem-fio-digital-bluetooth",
    nome: "Earbuds - Fone de ouvido sem fio digital Bluetooth",
    variacao: "",
    categoria: "Fones",
    preco: 149.97,
    precoOriginal: 179.99,
    imagens: ["imagens/produtos/reais/fone-earbuds-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "fone-de-ouvido-earbuds-v5-4",
    nome: "Fone de ouvido Earbuds V5.4",
    variacao: "",
    categoria: "Fones",
    preco: 89.97,
    precoOriginal: 119.99,
    imagens: ["imagens/produtos/reais/fone-earbuds-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "fone-de-ouvido-dual-air-lightning-mfi",
    nome: "Fone de Ouvido Dual Air Lightning MFI",
    variacao: "",
    categoria: "Fones",
    preco: 147,
    precoOriginal: 269.97,
    imagens: ["imagens/produtos/reais/fone-earbuds-real-01.webp"],
    badge: "OFERTA",
    opcoes: ["Padrão"]
  },
  {
    handle: "headset-gamer-usb-2-0-com-microfone-rgb-som-imersivo-e-confo",
    nome: "Headset Gamer USB 2.0 com Microfone, RGB, Som Imersivo e Conforto Premium",
    variacao: "",
    categoria: "Fones",
    preco: 79.97,
    precoOriginal: 109.99,
    imagens: ["imagens/produtos/reais/fone-headphone-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "fone-de-ouvido-bluetooth-tws-sem-fio-conexao-rapida-audio-im",
    nome: "Fone de Ouvido Bluetooth TWS Sem Fio – Conexão Rápida, Áudio Imersivo, Case Carregador Portátil e Design Ergonômico",
    variacao: "",
    categoria: "Fones",
    preco: 120.97,
    precoOriginal: 150.99,
    imagens: ["imagens/produtos/reais/fone-earbuds-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "earbuds-fone-de-ouvido-sem-fio-bluetooth-gpro-air-com-pop-up",
    nome: "Earbuds - Fone de ouvido sem fio bluetooth GPro Air - Com Pop-up Connection",
    variacao: "",
    categoria: "Fones",
    preco: 349,
    precoOriginal: 399.99,
    imagens: ["imagens/produtos/reais/fone-earbuds-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "fone-de-ouvido-bluetooth-earbuds-pro-v5-4-com-estojo-de-reca",
    nome: "Fone de Ouvido Bluetooth Earbuds Pro V5.4 com Estojo de Recarga, Baixa Latência e Tradução por IA",
    variacao: "",
    categoria: "Fones",
    preco: 120,
    precoOriginal: 150,
    imagens: ["imagens/produtos/reais/fone-earbuds-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "suporte-de-mesa-hydra-4-em-1-magsafe-ajustavel-para-celular-",
    nome: "Suporte de Mesa Hydra 4 em 1 MagSafe Ajustável para Celular, Tablet e Notebook",
    variacao: "",
    categoria: "Suportes",
    preco: 127,
    precoOriginal: 169.99,
    imagens: ["imagens/produtos/reais/suporte-veicular-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "suporte-universal-de-mesa-lives-e-videos-easy-stand",
    nome: "Suporte Universal de Mesa - Lives e vídeos - Easy Stand",
    variacao: "",
    categoria: "Suportes",
    preco: 29.99,
    precoOriginal: 79.99,
    imagens: ["imagens/produtos/reais/suporte-veicular-real-01.webp"],
    badge: "OFERTA",
    opcoes: ["Padrão"]
  },
  {
    handle: "anel-de-parede-magnetico-magsafe-compativel-com-capas-magsaf",
    nome: "Anel de Parede Magnético MagSafe - Compatível com capas Magsafe - Victus",
    variacao: "",
    categoria: "Suportes",
    preco: 59.97,
    precoOriginal: 97.99,
    imagens: ["imagens/produtos/reais/suporte-veicular-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "adaptador-multifuncional-6-em-1-hdmi-usb-c-hub-usb-3-0",
    nome: "Adaptador Multifuncional 6 em 1 - HDMI / USB-C / Hub Usb 3.0",
    variacao: "",
    categoria: "Acessórios",
    preco: 197,
    precoOriginal: 319.99,
    imagens: ["imagens/produtos/reais/hub-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "cordao-corda-alca-para-case-cordinha-salva-celular",
    nome: "Cordão corda - Alça para case - cordinha - salva celular",
    variacao: "",
    categoria: "Acessórios",
    preco: 19.97,
    precoOriginal: 49.99,
    imagens: ["imagens/produtos/reais/hub-real-01.webp"],
    badge: "OFERTA",
    opcoes: ["Padrão"]
  },
  {
    handle: "cordao-phone-strap-armor-preto",
    nome: "Cordão Phone Strap Armor - Preto",
    variacao: "",
    categoria: "Acessórios",
    preco: 81,
    precoOriginal: 89.99,
    imagens: ["imagens/produtos/reais/hub-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "carteira-de-couro-masculina-porta-cartao-ultra-slim",
    nome: "Carteira de Couro masculina - Porta cartão - Ultra Slim",
    variacao: "",
    categoria: "Acessórios",
    preco: 97,
    precoOriginal: 149.99,
    imagens: ["imagens/produtos/reais/hub-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
  {
    handle: "rastreador-localizador-bluetooth-smart-tag-st-01-resistente-",
    nome: "Rastreador Localizador Bluetooth Smart Tag ST-01 Resistente à Água compatível com Apple - Tomate",
    variacao: "",
    categoria: "Acessórios",
    preco: 29.97,
    precoOriginal: 49.45,
    imagens: ["imagens/produtos/reais/hub-real-01.webp"],
    badge: null,
    opcoes: ["Padrão"]
  },
];

function spartaBuscarProduto(handle) {
  return SPARTA_PRODUTOS.find(function (p) { return p.handle === handle; });
}

function spartaFormatarPreco(valor) {
  return valor.toFixed(2).replace(".", ",");
}

function spartaProdutoCardHTML(p) {
  var badgeHTML = p.badge
    ? '<span class="sety-badge sety-badge--oferta" style="position:absolute;top:8px;left:8px;">' + p.badge + '</span>'
    : "";
  var opcoesHTML = p.opcoes.slice(0, 3).map(function (o) {
    return '<span class="sety-produto-card__tamanho">' + o.slice(0, 2).toUpperCase() + "</span>";
  }).join("");
  var extra = p.opcoes.length > 3 ? '<span class="sety-produto-card__tamanho">+' + (p.opcoes.length - 3) + "</span>" : "";

  return (
    '<a class="sety-produto-card" href="produto.html?p=' + p.handle + '" style="position:relative;display:block;">' +
    badgeHTML +
    '<div class="sety-produto-card__imagem"><img src="' + p.imagens[0] + '" alt="' + p.nome + '" loading="lazy"></div>' +
    '<p class="sety-produto-card__nome">' + p.nome + "<em>" + p.variacao + "</em></p>" +
    '<div class="sety-produto-card__tamanhos">' + opcoesHTML + extra + "</div>" +
    '<hr class="sety-produto-card__divisor">' +
    '<p class="sety-produto-card__preco">R$ ' + spartaFormatarPreco(p.preco) + "</p>" +
    '<div class="sety-produto-card__cta">' +
    '<span type="button">Comprar</span>' +
    '<span aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 8h12l1 12H5z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg></span>' +
    "</div>" +
    "</a>"
  );
}
