
import { 
  SecurityFeature, 
  MarketingFeature, 
  PerformanceFeature, 
  SupportPackage 
} from "@/types/calculator-new-features";

export const supportPackages: SupportPackage[] = [
  {
    level: 'basic',
    hours: 4,
    price: 800,
    features: [
      'Suporte por e-mail',
      'Tempo de resposta em até 48h',
      'Horário comercial'
    ]
  },
  {
    level: 'standard',
    hours: 8,
    price: 1600,
    features: [
      'Suporte por e-mail e telefone',
      'Tempo de resposta em até 24h',
      'Horário comercial estendido'
    ]
  },
  {
    level: 'priority',
    hours: 12,
    price: 2400,
    features: [
      'Suporte prioritário',
      'Tempo de resposta em até 4h',
      'Suporte 24/7'
    ]
  }
];

export const securityOptions: Array<{ id: SecurityFeature; name: string; description: string; price: number }> = [
  {
    id: 'ssl',
    name: 'Certificado SSL Premium',
    description: 'Proteção avançada com garantia extendida',
    price: 699
  },
  {
    id: 'waf',
    name: 'Firewall de Aplicação Web',
    description: 'Proteção contra ataques e monitoramento',
    price: 1500
  },
  {
    id: 'pentests',
    name: 'Testes de Penetração',
    description: 'Análise completa de vulnerabilidades',
    price: 3500
  }
];

export const marketingOptions: Array<{ id: MarketingFeature; name: string; description: string; price: number }> = [
  {
    id: 'seo',
    name: 'SEO Avançado',
    description: 'Otimização completa para mecanismos de busca',
    price: 2500
  },
  {
    id: 'analytics',
    name: 'Google Analytics 4',
    description: 'Implementação e configuração do GA4',
    price: 1200
  },
  {
    id: 'social',
    name: 'Integração com Redes Sociais',
    description: 'Conexão com principais plataformas',
    price: 1500
  }
];

export const performanceOptions: Array<{ id: PerformanceFeature; name: string; description: string; price: number }> = [
  {
    id: 'cdn',
    name: 'CDN Enterprise',
    description: 'Distribuição global de conteúdo',
    price: 2000
  },
  {
    id: 'cache',
    name: 'Sistema de Cache Avançado',
    description: 'Otimização de performance com cache',
    price: 1500
  },
  {
    id: 'accessibility',
    name: 'Acessibilidade WCAG',
    description: 'Conformidade com padrões WCAG 2.1',
    price: 3500
  }
];
