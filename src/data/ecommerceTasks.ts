import { TaskCategory } from "@/types/calculator-types";

export const ecommerceTasks: TaskCategory[] = [
  {
    id: "ecommerce",
    name: "Funcionalidades E-commerce",
    tasks: [
      {
        id: "payment-gateway",
        category: "E-commerce",
        story: "Pagamentos",
        name: "Gateway de Pagamento Avançado",
        description: "Integração com múltiplos meios de pagamento, split de pagamentos e checkout transparente",
        type: "optional",
        hours: 24,
        dependencies: {
          essential: ["payment-setup"],
          recurring: ["payment-monitoring"]
        }
      },
      {
        id: "payment-setup",
        category: "E-commerce",
        story: "Pagamentos",
        name: "Configuração Base de Pagamentos",
        description: "Configuração inicial do gateway de pagamentos",
        type: "essential",
        hours: 8
      },
      {
        id: "inventory",
        category: "E-commerce",
        story: "Estoque",
        name: "Gestão de Estoque Avançada",
        description: "Sistema de controle de estoque com múltiplos depósitos e alertas",
        type: "optional",
        hours: 16,
        dependencies: {
          essential: ["inventory-setup"],
          recurring: ["inventory-monitoring"]
        }
      },
      {
        id: "inventory-setup",
        category: "E-commerce",
        story: "Estoque",
        name: "Configuração Base de Estoque",
        description: "Configuração inicial do sistema de estoque",
        type: "essential",
        hours: 6
      },
      {
        id: "shipping",
        category: "E-commerce",
        story: "Logística",
        name: "Cálculo de Frete em Tempo Real",
        description: "Integração com múltiplas transportadoras e cálculo dinâmico",
        type: "optional",
        hours: 20,
        dependencies: {
          essential: ["shipping-setup"],
          recurring: ["shipping-monitoring"]
        }
      },
      {
        id: "shipping-setup",
        category: "E-commerce",
        story: "Logística",
        name: "Configuração Base de Frete",
        description: "Configuração inicial do sistema de fretes",
        type: "essential",
        hours: 8
      }
    ]
  }
];