import { Extension } from "@/types/calculator-types";

export const ecommerceExtensions: Extension[] = [
  {
    id: "ssl-premium",
    name: "Certificado SSL Premium",
    description: "Certificado SSL com validação estendida e garantia de $1.5M",
    price: 699,
    implementationHours: 2,
    maintenanceHours: 1,
    category: "Segurança e Compliance"
  },
  {
    id: "lgpd",
    name: "Compliance LGPD",
    description: "Implementação completa das diretrizes da LGPD",
    price: 4500,
    implementationHours: 40,
    maintenanceHours: 4,
    category: "Segurança e Compliance"
  },
  {
    id: "pentests",
    name: "Testes de Penetração",
    description: "Testes de segurança completos e relatório detalhado",
    price: 3500,
    implementationHours: 20,
    maintenanceHours: 2,
    category: "Segurança e Compliance"
  },
  {
    id: "waf",
    name: "Web Application Firewall",
    description: "Proteção contra ataques web e monitoramento",
    price: 1500,
    implementationHours: 8,
    maintenanceHours: 2,
    category: "Segurança e Compliance"
  },
  {
    id: "seo",
    name: "Otimização SEO",
    description: "Configuração completa de SEO técnico e estrutural",
    price: 2500,
    implementationHours: 20,
    maintenanceHours: 4,
    category: "Marketing Digital"
  },
  {
    id: "email-marketing",
    name: "E-mail Marketing",
    description: "Integração com plataforma de e-mail marketing e automações",
    price: 1800,
    implementationHours: 16,
    maintenanceHours: 2,
    category: "Marketing Digital"
  },
  {
    id: "analytics",
    name: "Google Analytics 4",
    description: "Implementação do GA4 com eventos personalizados",
    price: 1200,
    implementationHours: 8,
    maintenanceHours: 1,
    category: "Marketing Digital"
  },
  {
    id: "social",
    name: "Redes Sociais",
    description: "Integração com principais redes sociais e pixel",
    price: 1500,
    implementationHours: 12,
    maintenanceHours: 2,
    category: "Marketing Digital"
  },
  {
    id: "cdn",
    name: "CDN Enterprise",
    description: "Distribuição global de conteúdo com edge locations",
    price: 2000,
    implementationHours: 8,
    maintenanceHours: 2,
    category: "Performance e Acessibilidade"
  },
  {
    id: "cache",
    name: "Sistema de Cache",
    description: "Cache em múltiplas camadas com invalidação inteligente",
    price: 1500,
    implementationHours: 16,
    maintenanceHours: 2,
    category: "Performance e Acessibilidade"
  },
  {
    id: "performance",
    name: "Otimização de Performance",
    description: "Otimização de imagens, código e recursos",
    price: 2800,
    implementationHours: 24,
    maintenanceHours: 3,
    category: "Performance e Acessibilidade"
  },
  {
    id: "accessibility",
    name: "Acessibilidade WCAG",
    description: "Conformidade com WCAG 2.1 nível AA",
    price: 3500,
    implementationHours: 32,
    maintenanceHours: 4,
    category: "Performance e Acessibilidade"
  },
  {
    id: "b2b-suite",
    name: "B2B eCommerce Suite",
    category: "B2B",
    description: "Suite completa de funcionalidades B2B",
    price: 2495,
    implementationHours: 40,
    maintenanceHours: 4
  },
  {
    id: "cart2quote",
    name: "Cart2Quote",
    category: "B2B",
    description: "Sistema de cotações e negociações",
    price: 1495,
    implementationHours: 24,
    maintenanceHours: 2
  },
  {
    id: "b2b-package",
    name: "B2B Extension Package",
    category: "B2B",
    description: "Pacote de extensões B2B essenciais",
    price: 1250,
    implementationHours: 32,
    maintenanceHours: 3
  },
  {
    id: "customer-group-catalog",
    name: "Customer Group Catalog",
    category: "B2B",
    description: "Catálogo personalizado por grupo de cliente",
    price: 745,
    implementationHours: 16,
    maintenanceHours: 1
  },
  {
    id: "company-accounts",
    name: "Company Accounts",
    category: "B2B",
    description: "Gestão de contas empresariais",
    price: 745,
    implementationHours: 16,
    maintenanceHours: 1
  },
  {
    id: "one-step-checkout",
    name: "One Step Checkout",
    category: "B2C",
    description: "Checkout otimizado em uma página",
    price: 0,
    implementationHours: 8,
    maintenanceHours: 1
  },
  {
    id: "order-approval",
    name: "Order Approval Manager",
    category: "B2B",
    description: "Gestão de aprovação de pedidos",
    price: 495,
    implementationHours: 12,
    maintenanceHours: 1
  },
  {
    id: "multi-user",
    name: "Multi User Account",
    category: "B2B",
    description: "Múltiplos usuários por conta",
    price: 495,
    implementationHours: 12,
    maintenanceHours: 1
  },
  {
    id: "minimum-order",
    name: "Minimum Order Amount",
    category: "B2B",
    description: "Valor mínimo de pedido",
    price: 395,
    implementationHours: 8,
    maintenanceHours: 1
  },
  {
    id: "quick-order",
    name: "Quick Order",
    category: "B2B",
    description: "Pedido rápido B2B",
    price: 645,
    implementationHours: 16,
    maintenanceHours: 1
  },
  {
    id: "related-products",
    name: "Automatic Related Products",
    category: "B2C",
    description: "Produtos relacionados automáticos",
    price: 995,
    implementationHours: 16,
    maintenanceHours: 2
  },
  {
    id: "seo-suite",
    name: "SEO Suite Ultimate",
    category: "B2C",
    description: "Suite completa de SEO",
    price: 1245,
    implementationHours: 24,
    maintenanceHours: 2
  },
  {
    id: "stripe-payments",
    name: "Stripe Payments",
    category: "B2C",
    description: "Integração com Stripe",
    price: 0,
    implementationHours: 8,
    maintenanceHours: 1
  },
  {
    id: "social-login",
    name: "Social Login",
    category: "B2C",
    description: "Login com redes sociais",
    price: 645,
    implementationHours: 12,
    maintenanceHours: 1
  },
  {
    id: "yotpo-reviews",
    name: "Yotpo Reviews",
    category: "B2C",
    description: "Sistema de avaliações Yotpo",
    price: 0,
    implementationHours: 8,
    maintenanceHours: 1
  },
  {
    id: "gdpr-compliance",
    name: "GDPR Compliance",
    category: "B2C",
    description: "Conformidade com GDPR",
    price: 495,
    implementationHours: 16,
    maintenanceHours: 1
  },
  {
    id: "xml-sitemap",
    name: "XML Google Sitemap",
    category: "B2C",
    description: "Sitemap XML otimizado",
    price: 395,
    implementationHours: 8,
    maintenanceHours: 1
  },
  {
    id: "page-builder",
    name: "Page Builder",
    category: "B2C",
    description: "Construtor de páginas avançado",
    price: 745,
    implementationHours: 24,
    maintenanceHours: 2
  },
  {
    id: "b2b-marketplace",
    name: "B2B Marketplace",
    category: "B2B",
    description: "Plataforma marketplace B2B",
    price: 1495,
    implementationHours: 40,
    maintenanceHours: 4
  },
  {
    id: "nosto",
    name: "Nosto Personalization",
    category: "B2C",
    description: "Personalização com IA",
    price: 1000,
    implementationHours: 16,
    maintenanceHours: 2
  },
  {
    id: "algolia-search",
    name: "Algolia Search",
    category: "B2C",
    description: "Busca avançada com Algolia",
    price: 0,
    implementationHours: 16,
    maintenanceHours: 2
  },
  {
    id: "layered-navigation",
    name: "Advanced Layered Navigation",
    category: "B2C",
    description: "Navegação em camadas avançada",
    price: 745,
    implementationHours: 16,
    maintenanceHours: 1
  },
  {
    id: "product-attachments",
    name: "Product Attachments",
    category: "B2C",
    description: "Anexos em produtos",
    price: 645,
    implementationHours: 12,
    maintenanceHours: 1
  },
  {
    id: "advanced-reports",
    name: "Advanced Reports",
    category: "B2C",
    description: "Relatórios avançados",
    price: 1495,
    implementationHours: 24,
    maintenanceHours: 2
  },
  {
    id: "store-pickup",
    name: "Store Pickup",
    category: "B2C",
    description: "Retirada na loja",
    price: 495,
    implementationHours: 16,
    maintenanceHours: 1
  },
  {
    id: "gift-card",
    name: "Gift Card",
    category: "B2C",
    description: "Sistema de vale-presente",
    price: 645,
    implementationHours: 16,
    maintenanceHours: 1
  },
  {
    id: "reward-points",
    name: "Reward Points",
    category: "B2C",
    description: "Sistema de pontos e recompensas",
    price: 995,
    implementationHours: 24,
    maintenanceHours: 2
  },
  {
    id: "abandoned-cart",
    name: "Abandoned Cart Email",
    category: "B2C",
    description: "Recuperação de carrinhos abandonados",
    price: 745,
    implementationHours: 16,
    maintenanceHours: 1
  },
  {
    id: "google-shopping",
    name: "Google Shopping Feed",
    category: "B2C",
    description: "Feed para Google Shopping",
    price: 995,
    implementationHours: 24,
    maintenanceHours: 2
  },
  {
    id: "layered-navigation-pro",
    name: "Layered Navigation Pro",
    category: "B2C",
    description: "Navegação em camadas profissional",
    price: 645,
    implementationHours: 16,
    maintenanceHours: 1
  }
].map(extension => ({
  ...extension,
  implementationCost: extension.price === 0 ? 1000 : extension.price,
  maintenanceCost: extension.price === 0 ? 200 : extension.price * 0.2
}));

export const getExtensionsByCategory = () => {
  const categories = new Map<string, Extension[]>();
  
  ecommerceExtensions.forEach(extension => {
    if (!categories.has(extension.category)) {
      categories.set(extension.category, []);
    }
    categories.get(extension.category)?.push(extension);
  });
  
  return categories;
};
