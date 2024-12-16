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
        type: "essential",
        hours: 4
      },
      {
        id: "briefing-doc",
        category: "Implementação", 
        story: "Briefing",
        name: "Documentação do briefing técnico",
        type: "essential",
        hours: 4
      },
      {
        id: "catalog-def",
        category: "Implementação",
        story: "Briefing", 
        name: "Definição do catálogo de produtos",
        type: "essential",
        hours: 8
      },
      {
        id: "homepage-layout",
        category: "Implementação",
        story: "Elaboração dos criativos",
        name: "Criar layout da Homepage",
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
        type: "essential",
        hours: 24
      },
      {
        id: "products-layout",
        category: "Implementação",
        story: "Elaboração dos criativos",
        name: "Criar layout da página de produtos",
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
        type: "essential",
        hours: 24
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
        type: "recurring",
        hours: 8
      },
      {
        id: "bug-monitoring",
        category: "Sustentação",
        story: "Monitoramento",
        name: "Monitoramento de bugs",
        type: "recurring",
        hours: 8
      }
    ]
  }
];