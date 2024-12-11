import { BusinessModel, ProductQuantity, IntegrationType, PlanType, UserProfile } from './types';

export const determinePlan = (profile: UserProfile): PlanType => {
  if (!profile.businessModel || !profile.productQuantity || !profile.integrationType) {
    return 'Starter';
  }

  if (
    profile.businessModel === 'Marketplace' ||
    profile.businessModel === 'Fullcommerce' ||
    profile.productQuantity === 'unlimited' ||
    profile.integrationType === 'advanced'
  ) {
    return 'Enterprise';
  }

  if (
    profile.productQuantity === '10000' ||
    profile.integrationType === 'intermediate' ||
    ['B2B', 'D2C'].includes(profile.businessModel)
  ) {
    return 'Business';
  }

  return 'Starter';
};

export const chatFlow = {
  initial: {
    content: "Olá, bem-vindo(a) à Agrega ai! Vou te ajudar a encontrar a melhor solução digital para o seu negócio. Posso começar entendendo qual é o seu modelo de atuação online?",
    options: [
      { label: "B2C - Vendo direto para consumidores", value: "B2C", nextQuestion: "products" },
      { label: "B2B - Vendo para empresas", value: "B2B", nextQuestion: "products" },
      { label: "D2C - Vendo sem intermediários", value: "D2C", nextQuestion: "products" },
      { label: "Marketplace - Múltiplos vendedores", value: "Marketplace", nextQuestion: "products" },
      { label: "Fullcommerce - Operação complexa", value: "Fullcommerce", nextQuestion: "products" }
    ]
  },
  products: {
    content: "Quantos produtos você planeja ter na sua loja online?",
    options: [
      { label: "Até 1.000 produtos", value: "1000", nextQuestion: "integrations" },
      { label: "Até 10.000 produtos", value: "10000", nextQuestion: "integrations" },
      { label: "Quantidade ilimitada", value: "unlimited", nextQuestion: "integrations" }
    ]
  },
  integrations: {
    content: "Você precisa de integrações avançadas, customizações específicas ou deseja gerenciar múltiplos canais?",
    options: [
      { label: "Requisitos básicos", value: "basic", nextQuestion: "final" },
      { label: "Integrações intermediárias", value: "intermediate", nextQuestion: "final" },
      { label: "Requisitos altamente customizados", value: "advanced", nextQuestion: "final" }
    ]
  },
  final: {
    content: "Ótimo! Com base nas suas respostas, já sei qual é a melhor solução para você. Gostaria de falar com um de nossos consultores para uma proposta detalhada?",
    options: [
      { label: "Sim, quero falar com um consultor", value: "consultant" },
      { label: "Não, apenas mais informações por email", value: "email" }
    ]
  }
};