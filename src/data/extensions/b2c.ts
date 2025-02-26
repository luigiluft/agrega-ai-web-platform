
import { Extension } from "@/types/calculator-types";

export const b2cExtensions: Extension[] = [
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
    id: "page-builder",
    name: "Page Builder",
    category: "B2C",
    description: "Construtor de páginas avançado",
    price: 745,
    implementationHours: 24,
    maintenanceHours: 2
  }
].map(extension => ({
  ...extension,
  implementationCost: extension.price === 0 ? 1000 : extension.price,
  maintenanceCost: extension.price === 0 ? 200 : extension.price * 0.2
}));
