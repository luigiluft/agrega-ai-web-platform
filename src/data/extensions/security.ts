
import { Extension } from "@/types/calculator-types";

export const securityExtensions: Extension[] = [
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
  }
].map(extension => ({
  ...extension,
  implementationCost: extension.price === 0 ? 1000 : extension.price,
  maintenanceCost: extension.price === 0 ? 200 : extension.price * 0.2
}));
