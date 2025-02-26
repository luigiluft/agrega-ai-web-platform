
import { Extension } from "@/types/calculator-types";

export const b2bExtensions: Extension[] = [
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
    id: "company-accounts",
    name: "Company Accounts",
    category: "B2B",
    description: "Gestão de contas empresariais",
    price: 745,
    implementationHours: 16,
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
    id: "b2b-marketplace",
    name: "B2B Marketplace",
    category: "B2B",
    description: "Plataforma marketplace B2B",
    price: 1495,
    implementationHours: 40,
    maintenanceHours: 4
  }
].map(extension => ({
  ...extension,
  implementationCost: extension.price === 0 ? 1000 : extension.price,
  maintenanceCost: extension.price === 0 ? 200 : extension.price * 0.2
}));
