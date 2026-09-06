/* =============================================================================
   SETY STUDIO — Página de vendas · CONFIGURAÇÃO CENTRAL
   Edite só este arquivo pra trocar links, contato, projetos, depoimentos e time.
   ============================================================================= */

window.SITE_CONFIG = {
  brand: "Sety Studio",
  baseUrl: "https://www.setystudio.com.br", // domínio oficial

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

/* Pilares — as frentes que a Sety Studio conecta numa mesma operação.
   Só texto; renderizado no componente de cards existente. ---------------- */
window.SERVICES = [
  {
    icon: "layers",
    title: "Site &amp; Loja Virtual",
    html: "Experiências digitais profissionais criadas para apresentar sua marca e facilitar a venda.",
  },
  {
    icon: "star",
    title: "Web Design",
    html: "Design estratégico para transmitir valor, confiança e diferenciação.",
  },
  {
    icon: "target",
    title: "Tráfego Pago",
    html: "Campanhas para colocar sua oferta na frente das pessoas certas.",
  },
  {
    icon: "route",
    title: "Inteligência Artificial",
    html: "Tecnologia para acelerar processos, aumentar produtividade e tornar sua operação mais inteligente.",
  },
  {
    icon: "check",
    title: "Vendas &amp; Conversão",
    html: "Estratégias para transformar atenção, visitas e oportunidades em negócios.",
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

/* FAQ — perguntas comerciais reais (acordeão). Primeira já aberta.
   Cobre os serviços (site, landing page, loja Nuvemshop/Shopify, e-commerce,
   tráfego pago, Meta Ads, Google Ads, TikTok Ads, branding). Mesmo texto no
   FAQPage JSON-LD do index.html — manter os dois em sincronia. */
window.FAQ = [
  {
    q: "Vocês criam sites e landing pages?",
    a: "Sim. Sites institucionais, landing pages e páginas de vendas — em HTML/CSS/JS ou no builder que fizer sentido pro projeto. Cada seção é pensada pra tirar a dúvida, quebrar a objeção e levar ao próximo passo.",
  },
  {
    q: "Vocês criam e personalizam loja Nuvemshop?",
    a: "Sim. Criação e personalização de loja Nuvemshop: layout próprio, catálogo organizado, checkout simples e o tráfego direcionado pra quem já quer comprar.",
  },
  {
    q: "E loja Shopify?",
    a: "Também. Criação e personalização de loja Shopify, tema ajustado à identidade da marca e integração com a operação de anúncios.",
  },
  {
    q: "Vocês fazem e-commerce de verdade, não só o visual?",
    a: "Sim. Estrutura de e-commerce pensada pra vender: arquitetura de catálogo, páginas de produto que convencem, prova social, frete claro e recuperação de carrinho — não só uma home bonita.",
  },
  {
    q: "Vocês trabalham com tráfego pago?",
    a: "É metade do serviço. Gestão de tráfego pago em Meta Ads (Facebook e Instagram) e Google Ads, com verba de teste, leitura de número e escala quando o resultado aparece.",
  },
  {
    q: "Fazem TikTok Ads e Pinterest Ads também?",
    a: "Quando o público do negócio está nesses canais, sim. Normalmente entram depois que Meta Ads e Google Ads já estão estáveis e dando retorno.",
  },
  {
    q: "Vocês fazem branding e identidade visual?",
    a: "Fazemos identidade visual, logotipo e direção de marca quando o projeto pede — em geral junto com o site, pra tudo falar a mesma língua.",
  },
  {
    q: "Dá pra contratar site e tráfego juntos?",
    a: "É como a gente prefere trabalhar. Site e anúncio na mesma mesa: um atrai as pessoas certas, o outro transforma em contato — sem repasse entre fornecedores e sem uma ponta esperando a outra.",
  },
  {
    q: "Já tenho site / já rodo anúncio. Vocês aproveitam?",
    a: "A gente mede o que já existe antes de mexer. Se o site dá pra ajustar, ajusta; se não foi feito pra vender, vale refazer e você entra na conversa sabendo o porquê. Na conta de anúncio, assumimos a estrutura atual e preservamos o histórico de aprendizado.",
  },
  {
    q: "Quanto tempo até a estrutura estar no ar?",
    a: "Uma landing page fica pronta em poucos dias; um site completo, em cerca de duas a três semanas, dependendo do volume de conteúdo. As campanhas sobem assim que a página que recebe o tráfego está publicada.",
  },
  {
    q: "Como funciona o investimento?",
    a: "Tem o valor do projeto (site / landing / loja) e a gestão mensal do tráfego, cobrada à parte da verba de anúncio — que você define e paga direto pra plataforma. Na conversa a gente monta o escopo e o número fecha ali, sem surpresa depois.",
  },
  {
    q: "Não sei por onde começar. Isso é problema?",
    a: "É o cenário mais comum. A conversa inicial serve pra entender seu negócio, sua oferta e seu objetivo. O plano da estrutura — o que fazer primeiro e o que pode esperar — sai daí.",
  },
  {
    q: "Vocês usam inteligência artificial nos projetos?",
    a: "Usamos. IA acelera copy, estrutura, criativos e análise de campanha — sempre com uma pessoa decidindo o que entra. E quando faz sentido, montamos automação com IA e agente de atendimento no WhatsApp junto com o site e o tráfego. Detalhe na página de <a href=\"/ia\">inteligência artificial</a>.",
  },
];
/* alias legado */
window.OBJECTIONS = window.FAQ;
