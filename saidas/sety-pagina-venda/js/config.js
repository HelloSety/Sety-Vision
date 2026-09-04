/* =============================================================================
   SETY STUDIO — Página de vendas · CONFIGURAÇÃO CENTRAL
   Edite só este arquivo pra trocar links, contato, projetos, depoimentos e time.
   ============================================================================= */

window.SITE_CONFIG = {
  brand: "Sety Studio",
  baseUrl: "https://sety-pagina-venda.vercel.app", // trocar quando tiver domínio próprio

  // Canal comercial principal — todos os CTAs de contato usam isto
  whatsapp: "5519988090110", // só dígitos, com DDI+DDD
  whatsappMessage:
    "Olá! Vim pela página da Sety Studio e quero uma estratégia de tráfego + site pro meu negócio.",

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

/* Serviços — 3 cards (mesma estrutura do Figma). -------------------------- */
window.SERVICES = [
  {
    icon: "target",
    title: "Tráfego Pago",
    html:
      "<strong>Colocamos sua empresa na frente de quem já está pronto pra comprar.</strong> " +
      "Campanhas de Meta Ads e Google Ads com método, previsibilidade e acompanhamento número por número.",
  },
  {
    icon: "layers",
    title: "Sites e Landing Pages",
    html:
      "<strong>Seu site precisa fazer mais do que existir. Precisa vender.</strong> " +
      "Páginas rápidas, responsivas e com cada seção pensada pra tirar a dúvida, quebrar a objeção e levar ao próximo passo.",
  },
  {
    icon: "route",
    title: "Estratégia de Conversão",
    html:
      "<strong>Anúncio, página, oferta e criativo trabalhando juntos.</strong> " +
      "Conectamos as pontas pra cada real investido em tráfego voltar em oportunidade e venda.",
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

/* Depoimentos — vídeos reais de resultado de gestão de tráfego (pasta GESTÃO).
   Cada card: vídeo vertical + poster + caption (frase real transcrita do vídeo).
   Clique = play com som. Não inventar dado — caption sai do próprio conteúdo. */
window.TESTIMONIALS = [
  { video: "assets/depoimentos/t1.mp4?v=18", poster: "assets/depoimentos/t1.jpg?v=18",
    caption: "1ª venda por tráfego pago em 2 dias de campanha",
    alt: "Feedback: 1ª venda por tráfego pago em 2 dias de campanha" },
  { video: "assets/depoimentos/t3.mp4?v=18", poster: "assets/depoimentos/t3.jpg?v=18",
    caption: "Resultado quando a estratégia é pensada pro produto certo",
    alt: "Feedback: resultado quando a estratégia é pensada pro produto certo" },
  { video: "assets/depoimentos/t4.mp4?v=18", poster: "assets/depoimentos/t4.jpg?v=18",
    caption: "Campanha direcionada: +R$ 1,9 mil em vendas",
    alt: "Feedback: campanha direcionada, mais de R$ 1,9 mil em vendas" },
  { video: "assets/depoimentos/t5.mp4?v=18", poster: "assets/depoimentos/t5.jpg?v=18",
    caption: "Venda com a jornada inteira, do site ao WhatsApp",
    alt: "Feedback: venda com jornada bem construída, do site ao WhatsApp" },
  { video: "assets/depoimentos/t6.mp4?v=18", poster: "assets/depoimentos/t6.jpg?v=18",
    caption: "R$ 512 em anúncios → R$ 4.318 a mais no caixa · 8,4x",
    alt: "Feedback: R$ 512 em anúncios, R$ 4.318 a mais no caixa, 8,43x de retorno" },
  { video: "assets/depoimentos/t2.mp4?v=18", poster: "assets/depoimentos/t2.jpg?v=18",
    caption: "Cliente de tráfego: campanha rodando e vendendo",
    alt: "Feedback de cliente: campanha de tráfego rodando e gerando venda" },
];

/* FAQ — perguntas e respostas reais (acordeão). Primeira já aberta. ----- */
window.FAQ = [
  {
    q: "Já tenho um site. Vocês aproveitam ou refazem tudo?",
    a: "A gente analisa o que já existe e mede o que está travando a conversão antes de tocar em qualquer coisa. Se dá pra ajustar, ajusta. Se o site não foi feito pra vender, aí sim vale refazer, e você entra na conversa sabendo o porquê.",
  },
  {
    q: "Já rodo anúncios. Vocês assumem a conta ou começam do zero?",
    a: "Assumimos a conta que já existe, revisamos estrutura, públicos e criativos, e mantemos o histórico de aprendizado. Tráfego sem uma página preparada pra converter queima parte do investimento. A gente arruma a ponta que falta.",
  },
  {
    q: "Quanto tempo até a estrutura estar no ar?",
    a: "Uma landing page fica pronta em poucos dias; um site completo, em cerca de duas a três semanas, dependendo do volume de conteúdo. As campanhas sobem assim que a página que recebe o tráfego está publicada.",
  },
  {
    q: "Como funciona o investimento?",
    a: "Tem o valor do projeto (site / landing) e a gestão mensal do tráfego, cobrada à parte da verba de anúncio, que você define e paga direto pra plataforma. Na conversa a gente monta o escopo e o número fecha ali, sem surpresa depois.",
  },
  {
    q: "Preciso ter uma verba grande de anúncio pra começar?",
    a: "Não. A gente começa com um orçamento de teste pra validar oferta e criativo, lê os números e só então escala. O objetivo é cada real investido voltar em oportunidade, não gastar muito rápido.",
  },
  {
    q: "Não sei por onde começar. Isso é problema?",
    a: "É o cenário mais comum. A conversa inicial serve pra entender seu negócio, sua oferta e seu objetivo. O plano da estrutura, o que fazer primeiro e o que pode esperar, sai daí.",
  },
];
/* alias legado */
window.OBJECTIONS = window.FAQ;
