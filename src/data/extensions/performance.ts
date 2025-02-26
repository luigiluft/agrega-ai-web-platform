
import { Extension } from "@/types/calculator-types";

export const performanceExtensions: Extension[] = [
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
  }
].map(extension => ({
  ...extension,
  implementationCost: extension.price === 0 ? 1000 : extension.price,
  maintenanceCost: extension.price === 0 ? 200 : extension.price * 0.2
}));
