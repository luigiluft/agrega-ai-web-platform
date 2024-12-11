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
    content: "Oi! 👋 Que bom te ver por aqui! Sou a Ana, vou te ajudar a encontrar a solução perfeita pra você decolar no digital. Me conta, como você planeja vender online?",
    options: [
      { label: "Vendo direto pro consumidor final", value: "B2C", nextQuestion: "products" },
      { label: "Vendo pra outras empresas", value: "B2B", nextQuestion: "products" },
      { label: "Quero vender sem intermediários", value: "D2C", nextQuestion: "products" },
      { label: "Preciso de um marketplace com vários vendedores", value: "Marketplace", nextQuestion: "products" },
      { label: "Busco uma operação completa e personalizada", value: "Fullcommerce", nextQuestion: "products" }
    ]
  },
  products: {
    content: "Legal! E quantos produtos você pretende ter na sua loja?",
    options: [
      { label: "Até mil produtos tá ótimo", value: "1000", nextQuestion: "integrations" },
      { label: "Uns 10 mil produtos", value: "10000", nextQuestion: "integrations" },
      { label: "Quero sem limites!", value: "unlimited", nextQuestion: "integrations" }
    ]
  },
  integrations: {
    content: "Entendi! Agora me diz: você precisa de integrações especiais ou quer vender em vários canais diferentes?",
    options: [
      { label: "Nada muito complexo", value: "basic", nextQuestion: "final" },
      { label: "Preciso de algumas integrações", value: "intermediate", nextQuestion: "final" },
      { label: "Quero tudo personalizado", value: "advanced", nextQuestion: "final" }
    ]
  },
  final: {
    content: "Perfeito! Já sei qual é a melhor solução pra você. Como quer prosseguir?",
    options: [
      { label: "💬 Falar com um consultor", value: "consultant" },
      { label: "📧 Receber mais informações por email", value: "email" },
      { label: "🧮 Calcular o custo exato do meu site", value: "calculator" }
    ]
  }
};