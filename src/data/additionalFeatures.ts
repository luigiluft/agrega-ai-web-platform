
import { 
  SupportPackage, 
  SecurityOption, 
  MarketingOption, 
  PerformanceOption 
} from "@/types/calculator-new-features";

export const supportPackages: SupportPackage[] = [
  {
    level: 'basic',
    hours: 10,
    price: 800, // 80 reais * 10 horas
    features: [
      'Suporte por email',
      'Tempo de resposta em até 48h',
      'Manutenção básica',
      'Atualizações de segurança'
    ]
  },
  {
    level: 'standard',
    hours: 20,
    price: 1600, // 80 reais * 20 horas
    features: [
      'Suporte por email e chat',
      'Tempo de resposta em até 24h',
      'Manutenção preventiva',
      'Atualizações de segurança',
      'Monitoramento 24/7',
      'Backups diários'
    ]
  },
  {
    level: 'premium',
    hours: 40,
    price: 3200, // 80 reais * 40 horas
    features: [
      'Suporte prioritário',
      'Tempo de resposta em até 4h',
      'Manutenção preventiva e corretiva',
      'Atualizações de segurança',
      'Monitoramento 24/7',
      'Backups em tempo real',
      'Consultor dedicado',
      'Treinamento mensal'
    ]
  }
];

export const securityOptions: SecurityOption[] = [
  {
    id: 'ssl',
    name: 'Certificado SSL Premium',
    description: 'Certificado SSL com validação estendida e garantia de $1.5M',
    price: 699,
    implementationHours: 2
  },
  {
    id: 'lgpd',
    name: 'Compliance LGPD',
    description: 'Implementação completa das diretrizes da LGPD',
    price: 4500,
    implementationHours: 40
  },
  {
    id: 'pentests',
    name: 'Testes de Penetração',
    description: 'Testes de segurança completos e relatório detalhado',
    price: 3500,
    implementationHours: 20
  },
  {
    id: 'waf',
    name: 'Web Application Firewall',
    description: 'Proteção contra ataques web e monitoramento',
    price: 1500,
    implementationHours: 8
  }
];

export const marketingOptions: MarketingOption[] = [
  {
    id: 'seo',
    name: 'Otimização SEO',
    description: 'Configuração completa de SEO técnico e estrutural',
    price: 2500,
    implementationHours: 20
  },
  {
    id: 'email',
    name: 'E-mail Marketing',
    description: 'Integração com plataforma de e-mail marketing e automações',
    price: 1800,
    implementationHours: 16
  },
  {
    id: 'analytics',
    name: 'Google Analytics 4',
    description: 'Implementação do GA4 com eventos personalizados',
    price: 1200,
    implementationHours: 8
  },
  {
    id: 'social',
    name: 'Redes Sociais',
    description: 'Integração com principais redes sociais e pixel',
    price: 1500,
    implementationHours: 12
  }
];

export const performanceOptions: PerformanceOption[] = [
  {
    id: 'cdn',
    name: 'CDN Enterprise',
    description: 'Distribuição global de conteúdo com edge locations',
    price: 2000,
    implementationHours: 8
  },
  {
    id: 'cache',
    name: 'Sistema de Cache',
    description: 'Cache em múltiplas camadas com invalidação inteligente',
    price: 1500,
    implementationHours: 16
  },
  {
    id: 'optimization',
    name: 'Otimização de Performance',
    description: 'Otimização de imagens, código e recursos',
    price: 2800,
    implementationHours: 24
  },
  {
    id: 'accessibility',
    name: 'Acessibilidade WCAG',
    description: 'Conformidade com WCAG 2.1 nível AA',
    price: 3500,
    implementationHours: 32
  }
];
