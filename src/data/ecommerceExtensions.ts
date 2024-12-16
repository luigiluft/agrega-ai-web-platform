import { Extension } from "@/types/calculator-types";

export const ecommerceExtensions: Extension[] = [
  {
    id: "payment-services",
    name: "Serviços de Pagamento",
    category: "Pagamentos e Segurança",
    description: "Integração com múltiplos meios de pagamento",
    price: 500,
    implementationHours: 8,
    maintenanceHours: 2
  },
  {
    id: "product-recommendations",
    name: "Recomendações de Produto",
    category: "Marketing",
    description: "Sistema inteligente de recomendação de produtos",
    price: 500,
    implementationHours: 12,
    maintenanceHours: 2
  },
  {
    id: "live-search",
    name: "Busca ao Vivo",
    category: "Otimização de Site",
    description: "Busca em tempo real com sugestões",
    price: 500,
    implementationHours: 16,
    maintenanceHours: 1
  },
  {
    id: "data-connection",
    name: "Conexão de Dados",
    category: "Relatórios e Análises",
    description: "Integração com Adobe Experience Platform",
    price: 500,
    implementationHours: 24,
    maintenanceHours: 4
  },
  {
    id: "ga4-gtm",
    name: "Google Analytics 4 com GTM",
    category: "Relatórios e Análises",
    description: "Rastreamento avançado de e-commerce",
    price: 774.8,
    implementationHours: 8,
    maintenanceHours: 1
  },
  {
    id: "first-data-payment",
    name: "Pagamento First Data",
    category: "Pagamentos e Segurança",
    description: "Integração com First Data",
    price: 1294.8,
    implementationHours: 16,
    maintenanceHours: 2
  },
  {
    id: "order-attribute",
    name: "Atributo de Pedido M2",
    category: "Conteúdo e Personalizações",
    description: "Atributos personalizados para pedidos",
    price: 930.8,
    implementationHours: 12,
    maintenanceHours: 1
  },
  {
    id: "authorize-net",
    name: "Authorize.net CIM",
    category: "Pagamentos e Segurança",
    description: "Pagamentos com cartão salvo",
    price: 1294.8,
    implementationHours: 24,
    maintenanceHours: 4
  },
  {
    id: "acumatica-erp",
    name: "Conector ERP Acumatica",
    category: "Contabilidade e Finanças",
    description: "Integração completa com ERP",
    price: 33800.0,
    implementationHours: 80,
    maintenanceHours: 8
  }
];

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
