export type Feature = {
  id: string;
  name: string;
  description: string;
  hours: number;
};

export type FeatureCategory = {
  id: string;
  name: string;
  totalHours: number;
  features: Feature[];
};

export const calculatorFeatures: FeatureCategory[] = [
  {
    id: "layout",
    name: "Personalização de Layout",
    totalHours: 7,
    features: [
      {
        id: "layout-1",
        name: "Ajuste de cores, fontes e identidade visual",
        description: "Ajuste de cores, fontes e identidade visual da marca no front-end.",
        hours: 2
      },
      {
        id: "layout-2",
        name: "Customização de elementos principais",
        description: "Customização de cabeçalho, rodapé, menus e banners de destaque.",
        hours: 2
      },
      {
        id: "layout-3",
        name: "Criação de componentes visuais",
        description: "Criação ou modificação de componentes visuais (botões, ícones, sliders).",
        hours: 1
      },
      {
        id: "layout-4",
        name: "Adaptação responsiva",
        description: "Adaptação do layout para dispositivos móveis (responsividade).",
        hours: 1
      },
      {
        id: "layout-5",
        name: "Otimizações CSS",
        description: "Otimizações CSS e ajustes de espaçamento, margens e alinhamentos.",
        hours: 1
      }
    ]
  },
  {
    id: "functionality",
    name: "Implementação de Funcionalidades",
    totalHours: 48,
    features: [
      {
        id: "func-1",
        name: "Carrinho e Checkout",
        description: "Desenvolvimento ou integração de funcionalidades do carrinho de compras e checkout.",
        hours: 8
      },
      {
        id: "func-2",
        name: "Sistema de Pagamentos",
        description: "Configuração de sistemas de pagamento (cartões, PIX, PayPal, etc.).",
        hours: 6
      },
      {
        id: "func-3",
        name: "Integração de Frete",
        description: "Integração com sistemas de frete e cálculo automático de envio.",
        hours: 4
      },
      {
        id: "func-4",
        name: "Páginas Dinâmicas",
        description: "Criação de páginas dinâmicas (lista de produtos, página de produto, busca avançada).",
        hours: 6
      },
      {
        id: "func-5",
        name: "Sistema de Usuários",
        description: "Configuração de cadastro de usuários, login, recuperação de senha.",
        hours: 4
      },
      {
        id: "func-6",
        name: "Integrações Externas",
        description: "Integração com APIs externas (marketplaces, ERP, CRM, sistemas de marketing).",
        hours: 8
      },
      {
        id: "func-7",
        name: "Ferramentas de Produto",
        description: "Desenvolvimento de ferramentas de filtragem, recomendação de produtos e comparações.",
        hours: 6
      },
      {
        id: "func-8",
        name: "Sistema de Promoções",
        description: "Implementação de cupons de desconto, programas de fidelidade e promoções dinâmicas.",
        hours: 4
      },
      {
        id: "func-9",
        name: "Segurança Adicional",
        description: "Adição de funcionalidades de segurança (camadas extras de autenticação, validação de dados).",
        hours: 2
      }
    ]
  },
  {
    id: "maintenance",
    name: "Manutenção Mensal",
    totalHours: 10,
    features: [
      {
        id: "maint-1",
        name: "Correção de Bugs",
        description: "Correção de pequenos bugs e falhas identificadas no site.",
        hours: 2
      },
      {
        id: "maint-2",
        name: "Atualizações de Segurança",
        description: "Aplicação de atualizações de segurança, patches e upgrades de versão da plataforma.",
        hours: 2
      },
      {
        id: "maint-3",
        name: "Monitoramento",
        description: "Monitoramento de performance, ajustes em consultas ao banco de dados.",
        hours: 2
      },
      {
        id: "maint-4",
        name: "Ajustes Pontuais",
        description: "Ajustes pontuais em funcionalidades existentes, sem grande complexidade.",
        hours: 2
      },
      {
        id: "maint-5",
        name: "Suporte Técnico",
        description: "Suporte técnico para problemas operacionais e manutenção preventiva.",
        hours: 2
      }
    ]
  },
  {
    id: "meetings",
    name: "Reuniões de Alinhamento",
    totalHours: 16,
    features: [
      {
        id: "meet-1",
        name: "Reuniões Iniciais",
        description: "Reuniões iniciais para entendimento do escopo e definição de prioridades.",
        hours: 4
      },
      {
        id: "meet-2",
        name: "Sessões de Alinhamento",
        description: "Sessões de alinhamento para revisar o progresso do projeto, apresentar status e coletar feedback.",
        hours: 3
      },
      {
        id: "meet-3",
        name: "Planejamento",
        description: "Planejamento de sprints, definição de marcos, reavaliação do roadmap.",
        hours: 3
      },
      {
        id: "meet-4",
        name: "Discussões Estratégicas",
        description: "Discussão sobre melhorias contínuas, implementação de novas ideias e ajustes estratégicos.",
        hours: 3
      },
      {
        id: "meet-5",
        name: "Esclarecimentos Técnicos",
        description: "Sessões de esclarecimentos técnicos entre equipe de desenvolvimento e stakeholders.",
        hours: 3
      }
    ]
  },
  {
    id: "campaigns",
    name: "Implementação de Campanhas",
    totalHours: 10,
    features: [
      {
        id: "camp-1",
        name: "Landing Pages",
        description: "Criação de landing pages ou páginas promocionais para campanhas sazonais.",
        hours: 2
      },
      {
        id: "camp-2",
        name: "Ferramentas de Marketing",
        description: "Integração de ferramentas de marketing (e-mail marketing, pop-ups, banners promocionais).",
        hours: 2
      },
      {
        id: "camp-3",
        name: "Rastreamento",
        description: "Configuração de códigos de rastreamento e tags de conversão (Google Ads, Facebook Pixel).",
        hours: 2
      },
      {
        id: "camp-4",
        name: "Ajustes de Conteúdo",
        description: "Ajuste de conteúdos e layouts para destacar promoções e lançamentos de produtos.",
        hours: 2
      },
      {
        id: "camp-5",
        name: "Testes e Otimização",
        description: "Teste de diferentes variações de campanhas (A/B testing) e implementação de melhorias.",
        hours: 2
      }
    ]
  }
];