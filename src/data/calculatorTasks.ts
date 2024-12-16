import { TaskCategory } from "@/types/calculator-types";

export const calculatorTasks: TaskCategory[] = [
  {
    id: "implementation",
    name: "Implementação",
    tasks: [
      {
        id: "briefing-tech",
        category: "Implementação",
        story: "Briefing",
        name: "Reunião do briefing técnico",
        description: "Alinhamento inicial do projeto, levantamento de requisitos e definição do escopo",
        type: "essential",
        hours: 4
      },
      {
        id: "briefing-doc",
        category: "Implementação", 
        story: "Briefing",
        name: "Documentação do briefing técnico",
        description: "Documentação detalhada das decisões e requisitos definidos na reunião",
        type: "essential",
        hours: 4
      },
      {
        id: "catalog-def",
        category: "Implementação",
        story: "Briefing", 
        name: "Definição do catálogo de produtos",
        description: "Estruturação do catálogo, categorias e atributos dos produtos",
        type: "essential",
        hours: 8
      },
      {
        id: "homepage-layout",
        category: "Implementação",
        story: "Elaboração dos criativos",
        name: "Criar layout da Homepage",
        description: "Design completo da página inicial, incluindo hero section, destaques e seções principais",
        type: "optional",
        hours: 16,
        dependencies: {
          essential: ["homepage-impl"],
          recurring: ["content-updates"]
        }
      },
      {
        id: "homepage-impl",
        category: "Implementação",
        story: "Implementação do layout",
        name: "Implementar Homepage",
        description: "Desenvolvimento front-end da página inicial seguindo o layout aprovado",
        type: "essential",
        hours: 24
      },
      {
        id: "about-layout",
        category: "Implementação",
        story: "Elaboração dos criativos",
        name: "Criar layout da página Sobre nós",
        description: "Design da página institucional com a história e valores da empresa",
        type: "optional",
        hours: 8,
        dependencies: {
          essential: ["about-impl"],
          recurring: ["content-updates"]
        }
      },
      {
        id: "about-impl",
        category: "Implementação",
        story: "Implementação do layout",
        name: "Implementar página Sobre nós",
        description: "Desenvolvimento front-end da página institucional",
        type: "essential",
        hours: 12
      },
      {
        id: "products-layout",
        category: "Implementação",
        story: "Elaboração dos criativos",
        name: "Criar layout da página de produtos",
        description: "Design da página de listagem e detalhes dos produtos com filtros e navegação",
        type: "optional",
        hours: 16,
        dependencies: {
          essential: ["products-impl"],
          recurring: ["bug-monitoring"]
        }
      },
      {
        id: "products-impl",
        category: "Implementação",
        story: "Implementação do layout",
        name: "Implementar página de Produtos",
        description: "Desenvolvimento front-end das páginas de produtos com filtros e navegação",
        type: "essential",
        hours: 24
      },
      {
        id: "checkout-layout",
        category: "Implementação",
        story: "Elaboração dos criativos",
        name: "Criar layout do Checkout",
        description: "Design do processo de compra, carrinho e finalização do pedido",
        type: "optional",
        hours: 16,
        dependencies: {
          essential: ["checkout-impl"],
          recurring: ["payment-monitoring"]
        }
      },
      {
        id: "checkout-impl",
        category: "Implementação",
        story: "Implementação do layout",
        name: "Implementar Checkout",
        description: "Desenvolvimento do processo de compra completo",
        type: "essential",
        hours: 32
      }
    ]
  },
  {
    id: "sustentation",
    name: "Sustentação",
    tasks: [
      {
        id: "content-updates",
        category: "Sustentação",
        story: "Atualizações e Melhorias",
        name: "Atualizações de conteúdo",
        description: "Atualização periódica de textos, imagens e informações do site",
        type: "recurring",
        hours: 8
      },
      {
        id: "bug-monitoring",
        category: "Sustentação",
        story: "Monitoramento",
        name: "Monitoramento de bugs",
        description: "Acompanhamento e correção de problemas técnicos",
        type: "recurring",
        hours: 8
      },
      {
        id: "payment-monitoring",
        category: "Sustentação",
        story: "Monitoramento",
        name: "Monitoramento de pagamentos",
        description: "Acompanhamento de transações e resolução de problemas de pagamento",
        type: "recurring",
        hours: 8
      }
    ]
  }
];