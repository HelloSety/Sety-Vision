"use strict";
const electron = require("electron");
const INVOKE = {
  /*
      A conta do Claude.
  
      O Kaptar não tem cadastro, não tem servidor e não tem licença: quem paga o
      token é a assinatura que já está na máquina. Estes quatro canais existem
      para a tela saber COM QUAL conta está gastando, e para oferecer um caminho
      a quem ainda não entrou.
  
      Nenhum deles devolve segredo. `ler` traz nome, e-mail, organização e plano;
      `diagnostico` traz booleanos.
    */
  CONTA_LER: "conta:ler",
  CONTA_DIAGNOSTICO: "conta:diagnostico",
  /** Abre um terminal rodando o login do Claude Code. Sem payload. */
  CONTA_ENTRAR: "conta:entrar",
  CONTA_CHAVE_API: "conta:chaveApi",
  CONTA_ESQUECER_CHAVE_API: "conta:esquecerChaveApi",
  TEMA_LER: "tema:ler",
  TEMA_GRAVAR: "tema:gravar",
  /*
      A versão nova, quando existir. Ver `main/atualizacao.ts`.
  
      Quatro canais porque são quatro atos com custos diferentes: perguntar é um
      GET de um kilobyte, baixar é o instalador inteiro, e instalar fecha o app.
      Espremer os três num só tiraria de quem usa a chance de dizer "agora não".
    */
  ATZ_ESTADO: "atualizacao:estado",
  ATZ_PROCURAR: "atualizacao:procurar",
  ATZ_BAIXAR: "atualizacao:baixar",
  ATZ_INSTALAR: "atualizacao:instalar",
  /*
      A automação: prospectar e disparar no dia e na hora marcados.
  
      Ela NÃO tem canal de envio. Quem manda mensagem é o motor da campanha, e a
      automação entrega a fila a ele — ver o cabeçalho de `automacao/motor.ts`.
      Um canal de "automacao:enviar" aqui seria o começo do segundo caminho de
      disparo que este módulo existe para não ter.
    */
  AUT_LISTAR: "automacao:listar",
  AUT_SALVAR: "automacao:salvar",
  AUT_APAGAR: "automacao:apagar",
  /** Os leads da fila de uma automação — para poder VER para quem ela manda. */
  AUT_FILA: "automacao:fila",
  AUT_RODAR_AGORA: "automacao:rodarAgora",
  AUT_PROGRESSO: "automacao:progresso",
  /*
      O livro do número: o teto do dia, a carência e o não-perturbe.
  
      Fica fora de `scrapper:` porque não é da captação — é da CONTA de WhatsApp,
      e sobrevive a apagar todos os leads.
    */
  ZAP_LIVRO: "zap:livro",
  ZAP_NAO_PERTURBAR: "zap:naoPerturbar",
  ZAP_VOLTAR_A_PERTURBAR: "zap:voltarAPerturbar",
  /*
      A captação.
  
      Vinte e nove canais para um app de uma tela só, e o motivo é que quase todo
      verbo aqui gasta alguma coisa: requisição do Google, token do Claude, ou
      mensagem de WhatsApp para uma pessoa de verdade. Um canal por verbo é o que
      deixa cada gasto ter o próprio schema, o próprio portão e o próprio teste.
    */
  SCR_ESTADO: "scrapper:estado",
  SCR_NICHOS: "scrapper:nichos",
  SCR_ESTIMAR: "scrapper:estimar",
  SCR_BUSCAR: "scrapper:buscar",
  SCR_PALCO: "scrapper:palco",
  SCR_LEADS: "scrapper:leads",
  SCR_ABRIR: "scrapper:abrir",
  SCR_HERO: "scrapper:hero",
  /*
      A análise do site do lead — o que transforma "tem site" num argumento.
  
      Dois canais, e não um: o de UM lead responde em segundos e é chamado da
      prévia; o de LOTE leva meia hora para duzentos e precisa de progresso e de
      parada. Espremer os dois num canal só daria uma chamada que às vezes volta
      em oito segundos e às vezes some por trinta minutos.
    */
  /*
      Parar a busca em andamento.
  
      Existe porque uma busca local de 3 pins × 10 nichos são trinta cargas de
      mapa e centenas de turnos de Claude — dezenas de minutos sem saída. O
      encanamento de cancelamento já existia inteiro; faltava o canal.
    */
  SCR_BUSCAR_PARAR: "scrapper:buscarParar",
  SCR_SCAN: "scrapper:scan",
  SCR_SCAN_LOTE: "scrapper:scanLote",
  SCR_SCAN_PARAR: "scrapper:scanParar",
  /*
      A primeira mensagem, escrita a partir do laudo do site.
  
      Recebe UM id, e nunca um array — e continua assim depois de a campanha
      existir. Redigir e enviar são atos diferentes: manter os dois em canais
      separados é o que permite escrever a mensagem de um lead sem pôr nada em
      fila, e é o que garante que a campanha só ande com mensagem escrita POR
      LEAD. Um canal de redigir em lote produziria duzentos textos parecidos, que
      é o sinal de spam que custou restrição de conta na versão web do Kaptar.
    */
  SCR_ABORDAGEM: "scrapper:abordagem",
  /*
      Escrever as mensagens que faltam, uma por lead.
  
      NÃO é redigir em lote a partir de um molde — é chamar `abordagem` N vezes,
      cada uma com o laudo daquele site. O que ele poupa é o clique, nunca a
      personalização.
    */
  SCR_ABORDAGEM_LOTE: "scrapper:abordagemLote",
  SCR_ABORDAGEM_PARAR: "scrapper:abordagemParar",
  /*
      ── A campanha de WhatsApp ──
  
      O motor de `zap/campanha.ts`: cadência sorteada, teto do dia com rampa de
      aquecimento, janela de horário e parada dura ao primeiro sinal ruim.
  
      `ZAP_ABRIR` recebe só o retângulo, e `ZAP_ENVIAR_UM` só o id do lead: a URL
      do WhatsApp e o telefone são do main. O renderer nunca escolhe o que esta
      view carrega nem para quem ela manda.
    */
  SCR_ZAP_ESTADO: "scrapper:zapEstado",
  SCR_ZAP_ABRIR: "scrapper:zapAbrir",
  SCR_ZAP_FECHAR: "scrapper:zapFechar",
  SCR_ZAP_SAIR: "scrapper:zapSair",
  SCR_ZAP_ENVIAR_UM: "scrapper:zapEnviarUm",
  SCR_ZAP_INICIAR: "scrapper:zapIniciar",
  SCR_ZAP_PARAR: "scrapper:zapParar",
  /*
      O molde: o texto que sai para quem NÃO tem mensagem do laudo.
  
      Persiste em disco porque é texto que a pessoa escreveu à mão — fechar o app
      e perder três variações escritas é a diferença entre ferramenta e rascunho.
      A mensagem do laudo continua ganhando dele sempre que existe.
    */
  SCR_MOLDE_LER: "scrapper:moldeLer",
  SCR_MOLDE_GRAVAR: "scrapper:moldeGravar",
  SCR_APAGAR: "scrapper:apagar",
  SCR_LUGAR: "scrapper:lugar",
  SCR_CHAVE: "scrapper:chave",
  SCR_TESTAR: "scrapper:testar",
  SCR_CSV: "scrapper:csv",
  /*
      Salvar o CSV.
  
      Canal próprio, e não um retorno de `SCR_CSV`, porque são duas permissões
      diferentes: montar o texto não toca em disco, e escolher onde gravá-lo abre
      um diálogo do sistema. O caminho é escolhido pela PESSOA, no diálogo — o
      renderer nunca manda destino.
    */
  SCR_SALVAR_CSV: "scrapper:salvarCsv"
};
const EMIT = {
  TEMA_MUDOU: "tema:mudou",
  ATUALIZACAO: "atualizacao:mudou",
  /* A automação da vez, enquanto ela roda. Vazio quando não há nenhuma. */
  AUT_ANDANDO: "automacao:andando",
  /*
      Os quatro progressos.
  
      Nenhum deles é conforto. A busca varre pin por pin e leva minutos; a análise
      de lote leva meia hora para duzentos sites; a campanha anda a uma mensagem
      a cada dois minutos e dura horas. Sem evento a tela ficaria parada entre um
      passo e o outro — e "parada" e "travada" se parecem demais quando se está
      mandando mensagem para cliente de verdade.
    */
  SCR_PROGRESSO: "scrapper:progresso",
  /**
   * A base de leads mudou no disco — a busca gravou um lote, o scan atualizou
   * um lead, a automação captou. A tela recarrega ao ouvir.
   *
   * Sem payload de propósito: mandar a lista inteira por evento a cada lote
   * duplicaria o canal de leitura; quem ouve chama `SCR_LEADS`, que já existe.
   */
  SCR_LEADS_MUDOU: "scrapper:leadsMudou",
  SCR_SCAN_PROGRESSO: "scrapper:scanProgresso",
  SCR_ABORDAGEM_PROGRESSO: "scrapper:abordagemProgresso",
  SCR_ZAP_PROGRESSO: "scrapper:zapProgresso"
};
function subscribe(channel, cb) {
  const handler = (_e, payload) => {
    cb(payload);
  };
  electron.ipcRenderer.on(channel, handler);
  return () => {
    electron.ipcRenderer.removeListener(channel, handler);
  };
}
const api = {
  conta: {
    ler: async () => await electron.ipcRenderer.invoke(INVOKE.CONTA_LER, {}),
    diagnostico: async () => await electron.ipcRenderer.invoke(INVOKE.CONTA_DIAGNOSTICO, {}),
    entrar: async (modo) => await electron.ipcRenderer.invoke(INVOKE.CONTA_ENTRAR, { modo }),
    chaveApi: async (chave) => await electron.ipcRenderer.invoke(INVOKE.CONTA_CHAVE_API, { chave }),
    esquecerChaveApi: async () => await electron.ipcRenderer.invoke(INVOKE.CONTA_ESQUECER_CHAVE_API, {})
  },
  tema: {
    ler: async () => await electron.ipcRenderer.invoke(INVOKE.TEMA_LER, {}),
    gravar: async (preferencia) => await electron.ipcRenderer.invoke(INVOKE.TEMA_GRAVAR, { preferencia }),
    onMudou: (cb) => subscribe(EMIT.TEMA_MUDOU, cb)
  },
  atualizacao: {
    estado: async () => await electron.ipcRenderer.invoke(INVOKE.ATZ_ESTADO, {}),
    procurar: async () => await electron.ipcRenderer.invoke(INVOKE.ATZ_PROCURAR, {}),
    baixar: async () => await electron.ipcRenderer.invoke(INVOKE.ATZ_BAIXAR, {}),
    instalar: async () => await electron.ipcRenderer.invoke(INVOKE.ATZ_INSTALAR, {}),
    onMudou: (cb) => subscribe(EMIT.ATUALIZACAO, cb)
  },
  automacao: {
    listar: async () => await electron.ipcRenderer.invoke(INVOKE.AUT_LISTAR, {}),
    salvar: async (a) => await electron.ipcRenderer.invoke(INVOKE.AUT_SALVAR, a),
    fila: async (id) => await electron.ipcRenderer.invoke(INVOKE.AUT_FILA, { id }),
    apagar: async (id) => await electron.ipcRenderer.invoke(INVOKE.AUT_APAGAR, { id }),
    rodarAgora: async (id, tipo) => await electron.ipcRenderer.invoke(INVOKE.AUT_RODAR_AGORA, {
      id,
      // `exactOptionalPropertyTypes`: mandar `tipo: undefined` faria o
      // `.strict()` ver a chave e recusar o payload inteiro.
      ...tipo === void 0 ? {} : { tipo }
    }),
    progresso: async () => await electron.ipcRenderer.invoke(INVOKE.AUT_PROGRESSO, {}),
    onAndando: (cb) => subscribe(EMIT.AUT_ANDANDO, cb)
  },
  livro: {
    ler: async () => await electron.ipcRenderer.invoke(INVOKE.ZAP_LIVRO, {}),
    naoPerturbar: async (telefone) => await electron.ipcRenderer.invoke(INVOKE.ZAP_NAO_PERTURBAR, { telefone }),
    voltarAPerturbar: async (telefone) => await electron.ipcRenderer.invoke(INVOKE.ZAP_VOLTAR_A_PERTURBAR, { telefone })
  },
  scrapper: {
    estado: async () => await electron.ipcRenderer.invoke(INVOKE.SCR_ESTADO, {}),
    nichos: async () => await electron.ipcRenderer.invoke(INVOKE.SCR_NICHOS, {}),
    estimar: async (opts) => await electron.ipcRenderer.invoke(INVOKE.SCR_ESTIMAR, opts),
    buscar: async (opts) => await electron.ipcRenderer.invoke(INVOKE.SCR_BUSCAR, opts),
    palco: async (r) => await electron.ipcRenderer.invoke(INVOKE.SCR_PALCO, r),
    onProgresso: (cb) => subscribe(EMIT.SCR_PROGRESSO, cb),
    onLeadsMudou: (cb) => subscribe(EMIT.SCR_LEADS_MUDOU, cb),
    leads: async () => await electron.ipcRenderer.invoke(INVOKE.SCR_LEADS, {}),
    abrir: async (id, alvo, texto) => await electron.ipcRenderer.invoke(INVOKE.SCR_ABRIR, {
      id,
      alvo,
      ...texto === void 0 || texto === "" ? {} : { texto }
    }),
    hero: async (id) => await electron.ipcRenderer.invoke(INVOKE.SCR_HERO, { id }),
    heroCelular: async (id) => await electron.ipcRenderer.invoke(INVOKE.SCR_HERO, { id, celular: true }),
    scan: async (id, refazer) => await electron.ipcRenderer.invoke(INVOKE.SCR_SCAN, {
      id,
      ...refazer === void 0 ? {} : { refazer }
    }),
    scanLote: async (ids) => await electron.ipcRenderer.invoke(INVOKE.SCR_SCAN_LOTE, { ids }),
    scanParar: async () => await electron.ipcRenderer.invoke(INVOKE.SCR_SCAN_PARAR, {}),
    buscarParar: async () => await electron.ipcRenderer.invoke(INVOKE.SCR_BUSCAR_PARAR, {}),
    onScanProgresso: (cb) => subscribe(EMIT.SCR_SCAN_PROGRESSO, cb),
    abordagem: async (id, canal) => await electron.ipcRenderer.invoke(INVOKE.SCR_ABORDAGEM, { id, canal }),
    abordagemLote: async (ids, canal) => await electron.ipcRenderer.invoke(INVOKE.SCR_ABORDAGEM_LOTE, { ids, canal }),
    abordagemParar: async () => await electron.ipcRenderer.invoke(INVOKE.SCR_ABORDAGEM_PARAR, {}),
    onAbordagemProgresso: (cb) => subscribe(EMIT.SCR_ABORDAGEM_PROGRESSO, cb),
    /*
          A campanha de WhatsApp.
    
          Repare no que NÃO atravessa: nenhum telefone e nenhuma URL. `zapAbrir`
          leva só o retângulo — a origem é constante do main — e `zapEnviarUm` e
          `zapIniciar` levam só id de lead. Quem monta o número internacional e o
          endereço da conversa é o main, do que está gravado em disco.
        */
    zapEstado: async () => await electron.ipcRenderer.invoke(INVOKE.SCR_ZAP_ESTADO, {}),
    zapAbrir: async (bounds) => await electron.ipcRenderer.invoke(INVOKE.SCR_ZAP_ABRIR, { bounds }),
    zapFechar: async () => await electron.ipcRenderer.invoke(INVOKE.SCR_ZAP_FECHAR, {}),
    zapSair: async () => await electron.ipcRenderer.invoke(INVOKE.SCR_ZAP_SAIR, {}),
    zapEnviarUm: async (id) => await electron.ipcRenderer.invoke(INVOKE.SCR_ZAP_ENVIAR_UM, { id }),
    zapIniciar: async (ids, intervalo) => await electron.ipcRenderer.invoke(INVOKE.SCR_ZAP_INICIAR, {
      ids,
      ...intervalo === void 0 ? {} : { intervaloMin: Math.round(intervalo.min), intervaloMax: Math.round(intervalo.max) }
    }),
    zapParar: async () => await electron.ipcRenderer.invoke(INVOKE.SCR_ZAP_PARAR, {}),
    onZapProgresso: (cb) => subscribe(EMIT.SCR_ZAP_PROGRESSO, cb),
    moldeLer: async () => await electron.ipcRenderer.invoke(INVOKE.SCR_MOLDE_LER, {}),
    moldeGravar: async (m) => await electron.ipcRenderer.invoke(INVOKE.SCR_MOLDE_GRAVAR, m),
    apagar: async (ids) => await electron.ipcRenderer.invoke(INVOKE.SCR_APAGAR, { ids }),
    lugar: async (lat, lng) => await electron.ipcRenderer.invoke(INVOKE.SCR_LUGAR, { lat, lng }),
    chave: async (chave) => await electron.ipcRenderer.invoke(INVOKE.SCR_CHAVE, { chave }),
    testar: async () => await electron.ipcRenderer.invoke(INVOKE.SCR_TESTAR, {}),
    csv: async () => await electron.ipcRenderer.invoke(INVOKE.SCR_CSV, {}),
    salvarCsv: async (texto) => await electron.ipcRenderer.invoke(INVOKE.SCR_SALVAR_CSV, { texto })
  }
};
function deepFreeze(obj) {
  for (const valor of Object.values(obj)) {
    if (typeof valor === "object" && valor !== null) deepFreeze(valor);
  }
  return Object.freeze(obj);
}
electron.contextBridge.exposeInMainWorld("kaptar", deepFreeze(api));
