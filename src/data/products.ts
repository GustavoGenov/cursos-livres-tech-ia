export interface VideoLesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  description: string;
}

export interface VideoModule {
  title: string;
  lessons: VideoLesson[];
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: "Inteligência Artificial" | "Apostilas" | "Livros" | "Vídeos" | "Diversos";
  format: "Download Imediato (PDF)" | "Acesso à Área de Membros (Vídeo)";
  formatShort: "PDF" | "Vídeo";
  price: number;
  originalPrice?: number;
  featured?: boolean;
  bestseller?: boolean;
  pagesOrDuration: string; // Ex: "148 páginas" ou "6h 40min de aulas"
  updatedAt: string;
  images: {
    cover: string;       // 1. Capa oficial
    summary: string;     // 2. Sumário / Índice
    sample: string;      // 3. Amostra de página / tela
  };
  whatYouWillLearn: string[];
  whatIsIncluded: string[];
  deliveryDetails: {
    formatDescription: string;
    fileSizeOrAccess: string;
    immediateDelivery: boolean;
  };
  requirements: string[];
  samplePdfUrl?: string;
  videoModules?: VideoModule[];
}

export const PRODUCTS: Product[] = [
  {
    id: "ia-guia-definitivo-2026",
    slug: "manual-pratico-de-engenharia-de-prompts-ia",
    title: "Manual Prático de Engenharia de Prompts para Inteligência Artificial",
    subtitle: "Domine comandos avançados para ChatGPT, Claude e Gemini com técnicas testadas e validadas em projetos reais de engenharia.",
    category: "Inteligência Artificial",
    format: "Download Imediato (PDF)",
    formatShort: "PDF",
    price: 47.0,
    originalPrice: 97.0,
    featured: true,
    bestseller: true,
    pagesOrDuration: "186 páginas",
    updatedAt: "Março 2026",
    images: {
      cover: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
      summary: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      sample: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    },
    whatYouWillLearn: [
      "Estrutura canônica de um mega-prompt de alta conversão e produtividade",
      "Técnicas de Few-Shot, Chain-of-Thought e Role Playing profissional",
      "Como calibrar alucinações a zero para relatórios e análises jurídicas/financeiras",
      "Biblioteca de mais de 120 prompts prontos e testados para negócios e redação",
      "Fluxos de automação conectando LLMs a planilhas e tarefas diárias",
    ],
    whatIsIncluded: [
      "Livro digital completo em PDF diagramado em alta resolução",
      "Planilha com 120+ prompts indexados por categoria e modelo",
      "Acesso vitalício a futuras atualizações desta edição",
      "Certificado de Conclusão de Curso Livre (LDB nº 9.394/96)",
    ],
    deliveryDetails: {
      formatDescription: "Arquivo digital em formato PDF legível em qualquer celular, tablet ou computador",
      fileSizeOrAccess: "Arquivo de 14.8 MB com download direto e sem bloqueios de impressão pessoal",
      immediateDelivery: true,
    },
    requirements: [
      "Qualquer computador, tablet ou smartphone com leitor de PDF",
      "Acesso gratuito ou pago a ferramentas como ChatGPT, Claude ou Google Gemini",
    ],
  },
  {
    id: "apostila-automacoes-ia-n8n",
    slug: "apostila-passo-a-passo-automacoes-com-ia-e-n8n",
    title: "Apostila Passo a Passo: Automações com IA e Workflows no n8n",
    subtitle: "Construa robôs de atendimento, triagem de leads e geradores automáticos de conteúdo sem precisar programar.",
    category: "Apostilas",
    format: "Download Imediato (PDF)",
    formatShort: "PDF",
    price: 39.9,
    originalPrice: 79.0,
    featured: true,
    bestseller: false,
    pagesOrDuration: "142 páginas",
    updatedAt: "Fevereiro 2026",
    images: {
      cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      summary: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80",
      sample: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    },
    whatYouWillLearn: [
      "Como instalar o n8n localmente ou em servidor VPS barato",
      "Integração do WhatsApp e Telegram com agentes de IA inteligentes",
      "Criação de esteiras automáticas de pesquisa e resumos de notícias",
      "Tratamento de erros e controle de custos de tokens das APIs",
      "Exportação e importação de templates JSON prontos para uso",
    ],
    whatIsIncluded: [
      "Apostila técnica ilustrada com capturas de tela passo a passo",
      "8 arquivos JSON prontos de fluxos completos para importação no n8n",
      "Guia de bolso de boas práticas de segurança de API Keys",
    ],
    deliveryDetails: {
      formatDescription: "Apostila digital em PDF + Pacote ZIP com arquivos de fluxo JSON",
      fileSizeOrAccess: "Arquivo ZIP de 22.4 MB (Download imediato)",
      immediateDelivery: true,
    },
    requirements: [
      "Conhecimento básico de navegação na internet",
      "Não é necessário saber programar nem dominar código complexo",
    ],
  },
  {
    id: "curso-video-agentes-ia",
    slug: "curso-em-video-criando-agentes-autonomos-de-ia",
    title: "Curso em Vídeo: Criando Agentes Autônomos de Inteligência Artificial",
    subtitle: "Aprenda a orquestrar agentes que pesquisam, analisam e tomam decisões práticas para o seu negócio.",
    category: "Vídeos",
    format: "Acesso à Área de Membros (Vídeo)",
    formatShort: "Vídeo",
    price: 147.0,
    originalPrice: 297.0,
    featured: true,
    bestseller: true,
    pagesOrDuration: "8 módulos • 6h 30min de aulas",
    updatedAt: "Março 2026",
    images: {
      cover: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      summary: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
      sample: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    },
    whatYouWillLearn: [
      "Fundamentos teóricos e práticos de agentes autônomos e arquiteturas ReAct",
      "Configuração de ferramentas de busca na web, leitura de arquivos e APIs externas",
      "Técnicas para mitigar loops infinitos e gerenciar memória de longo prazo",
      "Estudos de caso reais: agente pesquisador de mercado e agente assistente de suporte",
      "Deploy e monitoramento de agentes em ambientes de produção",
    ],
    whatIsIncluded: [
      "Acesso completo à Área de Membros com player de alta definição integrado",
      "Código-fonte comentado de todos os projetos ensinados",
      "Suporte a dúvidas direto na plataforma durante 1 ano",
      "Certificado digital de conclusão de curso livre (LDB 9.394/96)",
    ],
    deliveryDetails: {
      formatDescription: "Acesso imediato à Área do Aluno com login e senha/CPF",
      fileSizeOrAccess: "Aulas em vídeo Full HD com materiais didáticos para download",
      immediateDelivery: true,
    },
    requirements: [
      "Navegador de internet moderno (Google Chrome, Firefox, Edge ou Safari)",
      "Vontade de aprender metodologias práticas de automação inteligente",
    ],
    videoModules: [
      {
        title: "Módulo 1: O Que São Agentes Autônomos?",
        lessons: [
          {
            id: "m1-a1",
            title: "1. Introdução à Era dos Agentes vs. Chatbots Tradicionais",
            duration: "18:42",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            description: "Compreenda a diferença fundamental entre respostas isoladas e sistemas agentes capazes de planejar e executar.",
          },
          {
            id: "m1-a2",
            title: "2. Como Agentes Raciocinam: Loops de Ação e Pensamento (ReAct)",
            duration: "24:15",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            description: "Entenda o ciclo de observação, raciocínio e execução das ferramentas externas.",
          },
        ],
      },
      {
        title: "Módulo 2: Equipando Agentes com Ferramentas Reais",
        lessons: [
          {
            id: "m2-a1",
            title: "1. Conectando Buscadores Web e Raspadores de Dados",
            duration: "32:10",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            description: "Como permitir que a IA consulte a internet ao vivo com segurança e filtros anti-spam.",
          },
          {
            id: "m2-a2",
            title: "2. Manipulação de Arquivos e Execução Segura de Comandos",
            duration: "28:50",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            description: "Como criar ambientes isolados para os agentes lerem planilhas, PDFs e gerarem relatórios.",
          },
        ],
      },
      {
        title: "Módulo 3: Projeto Prático - O Agente Pesquisador",
        lessons: [
          {
            id: "m3-a1",
            title: "1. Montando o Agente do Zero ao Deploy",
            duration: "45:30",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            description: "Construção de ponta a ponta de um agente que pesquisa notícias, sintetiza tópicos e envia relatório formatado.",
          },
        ],
      },
    ],
  },
  {
    id: "livro-revolucao-ia-negocios",
    slug: "livro-a-revolucao-silenciosa-da-ia-nos-negocios",
    title: "Livro: A Revolução Silenciosa da IA nos Negócios e Carreiras",
    subtitle: "Uma análise profunda, lúcida e sem sensacionalismo sobre as transformações do mercado de trabalho por quem acompanha a vanguarda.",
    category: "Livros",
    format: "Download Imediato (PDF)",
    formatShort: "PDF",
    price: 34.9,
    originalPrice: 65.0,
    featured: false,
    bestseller: false,
    pagesOrDuration: "214 páginas",
    updatedAt: "Janeiro 2026",
    images: {
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80",
      summary: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
      sample: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80",
    },
    whatYouWillLearn: [
      "Quais profissões estão realmente sob risco de disrupção e quais estão sendo potencializadas",
      "O paradoxo da produtividade: como trabalhar menos e produzir mais valor intelectual",
      "Casos reais de empresas brasileiras que aumentaram margem de lucro com IA enxuta",
      "Princípios éticos, regulamentação brasileira e o impacto da proteção de dados",
      "O mapa de competências humanas insubstituíveis para os próximos 10 anos",
    ],
    whatIsIncluded: [
      "E-book completo em alta resolução diagramado para leitura confortável",
      "Versões otimizadas tanto para tela clara quanto para modo escuro",
      "Guia de referências bibliográficas comentadas",
    ],
    deliveryDetails: {
      formatDescription: "Arquivo PDF em alta fidelidade tipográfica",
      fileSizeOrAccess: "Arquivo de 18.2 MB com entrega imediata pós-aprovação",
      immediateDelivery: true,
    },
    requirements: [
      "Qualquer dispositivo capaz de abrir arquivos PDF ou ePUB",
    ],
  },
  {
    id: "apostila-redacao-jornalistica-ia",
    slug: "apostila-redacao-e-copywriting-com-ia-jornalismo-ao-marketing",
    title: "Apostila: Redação & Copywriting com IA — Do Jornalismo ao Marketing",
    subtitle: "Como criar textos que soam humanos, prendem a atenção e convertem vendas, eliminando a escrita genérica de robô.",
    category: "Apostilas",
    format: "Download Imediato (PDF)",
    formatShort: "PDF",
    price: 29.0,
    originalPrice: 59.0,
    featured: false,
    bestseller: true,
    pagesOrDuration: "110 páginas",
    updatedAt: "Março 2026",
    images: {
      cover: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
      summary: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=800&q=80",
      sample: "https://images.unsplash.com/photo-1507842229451-77b1b3923366?auto=format&fit=crop&w=800&q=80",
    },
    whatYouWillLearn: [
      "O checklist da redação anti-robótica: como expurgar clichês gerados por IA",
      "Criação de tom de voz consistente para marcas e perfis pessoais",
      "Técnicas de storytelling aplicadas a artigos de opinião e newsletters",
      "Estrutura de landing pages e e-mails que vendem sem promessas milagrosas",
    ],
    whatIsIncluded: [
      "Apostila em PDF com dezenas de exemplos de antes/depois",
      "Matriz de calibração de estilo para colar nas instruções personalizadas do ChatGPT",
    ],
    deliveryDetails: {
      formatDescription: "Apostila digital em PDF",
      fileSizeOrAccess: "Arquivo de 9.5 MB para download instantâneo",
      immediateDelivery: true,
    },
    requirements: [
      "Aparelho com leitor de PDF",
    ],
  },
  {
    id: "kit-prompts-produtividade-diversos",
    slug: "kit-de-prompts-de-alta-precisao-para-tarefas-diarias",
    title: "Kit de Prompts de Alta Precisão para Produtividade Diária",
    subtitle: "Mais de 250 fórmulas de comandos para responder e-mails difíceis, analisar contratos, resumir atas e organizar rotinas.",
    category: "Diversos",
    format: "Download Imediato (PDF)",
    formatShort: "PDF",
    price: 24.9,
    originalPrice: 49.0,
    featured: false,
    bestseller: false,
    pagesOrDuration: "95 páginas",
    updatedAt: "Fevereiro 2026",
    images: {
      cover: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80",
      summary: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
      sample: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80",
    },
    whatYouWillLearn: [
      "Como instruir a IA para sintetizar conversas longas sem perder pontos críticos",
      "Prompts jurídicos preliminares para decifrar contratos em português claro",
      "Geração de respostas empáticas e assertivas para clientes e chefes",
      "Técnica do 'contra-interrogatório': fazer a IA te entrevistar antes de responder",
    ],
    whatIsIncluded: [
      "Guia PDF estruturado com índice clicável para cópia rápida",
      "Arquivo de texto puro (.TXT) para acesso relâmpago via bloco de notas",
    ],
    deliveryDetails: {
      formatDescription: "Pacote PDF + TXT com download imediato",
      fileSizeOrAccess: "Arquivo ZIP de 4.1 MB",
      immediateDelivery: true,
    },
    requirements: [
      "Qualquer computador ou celular",
    ],
  },
  {
    id: "curso-video-jornalismo-digital-ia",
    slug: "curso-em-video-o-novo-jornalismo-e-curadoria-com-ia",
    title: "Curso em Vídeo: Jornalismo Ágil, Fact-Checking e Curadoria com IA",
    subtitle: "Aprenda a metodologia de apuração ágil e checagem de fatos aplicada à curadoria e análise crítica de informações técnicas.",
    category: "Vídeos",
    format: "Acesso à Área de Membros (Vídeo)",
    formatShort: "Vídeo",
    price: 97.0,
    originalPrice: 197.0,
    featured: false,
    bestseller: false,
    pagesOrDuration: "5 módulos • 4h 15min de aulas",
    updatedAt: "Março 2026",
    images: {
      cover: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80",
      summary: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80",
      sample: "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=800&q=80",
    },
    whatYouWillLearn: [
      "Como monitorar centenas de fontes globais de IA em minutos",
      "Técnicas de fact-checking para desmascarar fake news geradas por deepfakes",
      "Redação jornalística objetiva e neutralidade informacional",
      "Construção de boletins diários e newsletters de alto engajamento",
    ],
    whatIsIncluded: [
      "Acesso completo à Área de Membros com player de vídeo",
      "Scripts de monitoramento de RSS e fontes de notícias",
      "Certificado de Conclusão de Curso Livre (LDB nº 9.394/96)",
    ],
    deliveryDetails: {
      formatDescription: "Acesso instantâneo à Área do Aluno com player de vídeo",
      fileSizeOrAccess: "Aulas em vídeo Full HD e materiais para download",
      immediateDelivery: true,
    },
    requirements: [
      "Conexão à internet estável para streaming de vídeo",
    ],
    videoModules: [
      {
        title: "Módulo 1: Curadoria e Filtro de Ruído",
        lessons: [
          {
            id: "m1-j1",
            title: "1. Como Separar Notícia de Sensacionalismo Tecnológico",
            duration: "21:05",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            description: "O método de triagem de fontes de confiança e checagem cruzada.",
          },
          {
            id: "m1-j2",
            title: "2. Montando seu Radar de Notícias em Tempo Real",
            duration: "25:40",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            description: "Automações limpas para receber comunicados de papers científicos.",
          },
        ],
      },
      {
        title: "Módulo 2: Fact-checking e Ética",
        lessons: [
          {
            id: "m2-j1",
            title: "1. Validação de Conteúdos Sintéticos e IA",
            duration: "30:15",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            description: "Procedimentos de checagem jurídica e prevenção de desinformação.",
          },
        ],
      },
    ],
  },
];

export const CATEGORIES = [
  "Todas",
  "Inteligência Artificial",
  "Apostilas",
  "Livros",
  "Vídeos",
  "Diversos",
] as const;

export const DELIVERY_FORMATS = [
  "Todos",
  "Download Imediato (PDF)",
  "Acesso à Área de Membros (Vídeo)",
] as const;
