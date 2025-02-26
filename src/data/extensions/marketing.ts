
import { Extension } from "@/types/calculator-types";

export const marketingExtensions: Extension[] = [
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
  }
].map(extension => ({
  ...extension,
  implementationCost: extension.price === 0 ? 1000 : extension.price,
  maintenanceCost: extension.price === 0 ? 200 : extension.price * 0.2
}));
