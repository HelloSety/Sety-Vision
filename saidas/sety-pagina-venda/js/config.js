/* =============================================================================
   SETY STUDIO — Página de vendas · CONFIGURAÇÃO CENTRAL
   Edite só este arquivo pra trocar links, contato, projetos, depoimentos e time.
   ============================================================================= */

window.SITE_CONFIG = {
  brand: "Sety Studio",
  baseUrl: "https://www.setystudio.com.br", // domínio oficial

  // Canal comercial principal — todos os CTAs de contato usam isto.
  // CTAs podem sobrescrever com data-wa="mensagem" pra contextualizar a origem.
  whatsapp: "5519988090110", // só dígitos, com DDI+DDD
  whatsappMessage:
    "Olá, vi o site da Sety Studio e quero entender como vocês podem estruturar meu negócio com site, tráfego e conversão.",

  instagram: "https://www.instagram.com/sety.studio/",
  behance: "https://www.behance.net/sevendsgnn",
  email: "contato@setystudio.com.br", // ajuste se o e-mail comercial for outro
};

/* Tracking — preencha os IDs quando tiver. Vazio = não carrega nada. -------- */
window.TRACKING_CONFIG = {
  metaPixelId: "",          // ex: "123456789012345"
  googleAnalyticsId: "",    // ex: "G-XXXXXXXXXX"
  googleTagManagerId: "",   // ex: "GTM-XXXXXXX"
};

/* Time — SEVEN (web/direção) + GABRIEL (tráfego). image "" usa selo com inicial. */
window.TEAM_MEMBERS = [
  {
    name: "Gabriel",
    role: "Aquisição",
    skills: ["Tráfego pago", "Estratégia", "Dados", "Testes"],
    bio: "Coloca a empresa na frente das pessoas certas e transforma anúncio em oportunidade, com teste, ajuste e constância.",
    image: "",
    instagram: "https://www.instagram.com/r.gabriel_mariani/",
  },
  {
    name: "Seven",
    role: "Experiência & conversão",
    skills: ["Web design", "Landing pages", "Experiência", "Conversão"],
    bio: "Constrói o site e a landing page que transformam a visita em percepção de valor, confiança e contato.",
    image: "",
    instagram: "https://www.instagram.com/sety.studio/",
  },
];

/* OFERTA — 6 cards orientados a resultado. Renderizados em data-services. --- */
window.SERVICES = [
  {
    icon: "layers",
    title: "Site / Landing page",
    html: "Para empresas que precisam de uma presença digital profissional e preparada para gerar oportunidades.",
  },
  {
    icon: "cart",
    title: "Loja virtual",
    html: "Para marcas que querem vender seus produtos online com uma estrutura profissional.",
  },
  {
    icon: "star",
    title: "Web design",
    html: "Para empresas que precisam transformar uma experiência comum em uma experiência que transmite valor.",
  },
  {
    icon: "target",
    title: "Tráfego pago",
    html: "Para colocar sua oferta diante das pessoas certas e gerar demanda.",
  },
  {
    icon: "route",
    title: "Conversão",
    html: "Para transformar mais visitas em contatos, leads e vendas.",
  },
  {
    icon: "bolt",
    title: "Inteligência artificial",
    html: "Para automatizar processos, ganhar produtividade e construir uma operação mais inteligente.",
  },
];

/* Portfólio — projetos reais da Sety Studio (lista + links do Seven). ---- */
window.PORTFOLIO_ITEMS = [
  { title: "Underz Store",    category: "Streetwear",     image: "assets/portfolio/underz-store.webp?v=18",     url: "https://loja.underzstore.com/" },
  { title: "Mantos Sports",   category: "Esportivo",      image: "assets/portfolio/mantos-sports.webp?v=18",    url: "https://www.mantossportslem.com.br/" },
  { title: "Fist Street",     category: "Streetwear",     image: "assets/portfolio/fist-street.webp?v=18",      url: "https://usefist.com.br/" },
  { title: "Autêntica Store", category: "Moda masculina", image: "assets/portfolio/autenticas-store.webp?v=18", url: "https://autenticastoreoficial.com.br/" },
  { title: "Decria Store",    category: "Streetwear",     image: "assets/portfolio/decria-store.webp?v=18",     url: "https://decriastore031.com/" },
  { title: "Valadão Surf",    category: "Surfwear",       image: "assets/portfolio/valadao-surf.webp?v=18",     url: "https://valadaosurf.com.br/" },
  { title: "Goat Club",       category: "Streetwear",     image: "assets/portfolio/goat-club.webp?v=18",        url: "https://www.goatcluboficial.com.br/" },
  { title: "Dias Sport",      category: "Esportivo",      image: "assets/portfolio/dias-sport.webp?v=18",       url: "https://diassport.com.br/" },
];

/* Resultados — prova REAL, extraída da pasta RESULTADOS do cliente (nada inventado).
   3 vídeos verticais (clique = play com som) + 3 prints de feedback (clique = amplia).
   Legenda descreve fielmente o que aparece no material — sem número que não esteja lá. */
window.RESULTS = [
  { video: "assets/depoimentos/res-italo.mp4?v=41", poster: "assets/depoimentos/res-italo.jpg?v=41",
    caption: "Campanha no ar: 75 conversas, 11.115 alcançados, 6 vendas",
    alt: "Print de resultado: cliente com 75 conversas geradas, 11.115 pessoas alcançadas e 6 vendas com a campanha rodando" },
  { video: "assets/depoimentos/res-sparta.mp4?v=41", poster: "assets/depoimentos/res-sparta.jpg?v=41",
    caption: "Feedback do cliente em áudio — projeto Sparta Tech",
    alt: "Cliente Sparta Tech enviando feedback em áudio sobre o projeto entregue" },
  { video: "assets/depoimentos/res-fist.mp4?v=41", poster: "assets/depoimentos/res-fist.jpg?v=41",
    caption: "@fist.street: feedback do cliente e vendas na loja",
    alt: "Cliente Fist Street mostrando o perfil no ar, com feedback positivo e vendas" },
  { image: "assets/depoimentos/res-5k.webp?v=41",
    caption: "“Batemos 5k no Insta” — crescimento de perfil do cliente",
    alt: "Print de conversa: cliente comemora ter batido 5 mil seguidores no Instagram" },
  { image: "assets/depoimentos/res-cobby.webp?v=41",
    caption: "@cobbyoutlet: “conheci pelo tráfego pago, o perfil passou credibilidade”",
    alt: "Print de WhatsApp do cliente @cobbyoutlet elogiando o trabalho de tráfego pago, a credibilidade do perfil e os prazos rápidos" },
  { image: "assets/depoimentos/res-campanhas.webp?v=41",
    caption: "Bastidor: 3 campanhas no ar — venda, remarketing e estrutura completa",
    alt: "Foto de dois monitores com o Gerenciador de Anúncios aberto: três campanhas ativas de venda e remarketing" },
];
/* aliases legados */
window.TESTIMONIALS = window.RESULTS;

/* FAQ — perguntas comerciais e objetivas (acordeão). Primeira já aberta.
   Mesmo texto no FAQPage JSON-LD do index.html — manter os dois em sincronia. */
window.FAQ = [
  {
    q: "Vocês fazem apenas sites?",
    a: "Não. A Sety Studio trabalha com uma estrutura integrada de site, web design, tráfego pago, conversão e inteligência artificial.",
  },
  {
    q: "Vocês trabalham com lojas virtuais?",
    a: "Sim. Desenvolvemos estruturas para lojas virtuais e podemos trabalhar com plataformas como Nuvemshop, Shopify e outras soluções conforme o projeto.",
  },
  {
    q: "Vocês fazem tráfego pago?",
    a: "Sim. Trabalhamos com aquisição e campanhas em plataformas como Meta Ads, Google Ads e TikTok Ads, conforme a estratégia.",
  },
  {
    q: "Vocês trabalham com inteligência artificial?",
    a: "Sim. A IA pode ser aplicada ao projeto de diferentes formas, como automação, produtividade, conteúdo, análise e processos comerciais, dependendo da necessidade da empresa. Mais na página de <a href=\"/ia\">inteligência artificial</a>.",
  },
  {
    q: "Quanto custa um projeto?",
    a: "Depende da estrutura necessária. Após entender o negócio, o objetivo e o escopo, apresentamos uma proposta adequada ao projeto.",
  },
  {
    q: "Posso contratar apenas um serviço?",
    a: "Sim. A empresa pode contratar apenas uma frente ou construir uma operação integrada.",
  },
];
/* alias legado */
window.OBJECTIONS = window.FAQ;
