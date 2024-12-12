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
    content: "Olá! 👋 Sou a Ana, sua assistente virtual. Como posso ajudar você hoje?",
    options: [
      { label: "Quero conhecer soluções para meu negócio", value: "solutions", nextQuestion: "business_type" },
      { label: "Preciso de suporte técnico", value: "support", nextQuestion: "support_type" },
      { label: "Tenho dúvidas sobre preços", value: "pricing", nextQuestion: "pricing_info" },
      { label: "Quero saber sobre integrações", value: "integrations", nextQuestion: "integration_type" }
    ]
  },
  business_type: {
    content: "Que tipo de negócio você possui ou pretende iniciar?",
    options: [
      { label: "Venda direta ao consumidor (B2C)", value: "B2C", nextQuestion: "business_size" },
      { label: "Vendas para empresas (B2B)", value: "B2B", nextQuestion: "business_size" },
      { label: "Marca própria (D2C)", value: "D2C", nextQuestion: "business_size" },
      { label: "Marketplace com múltiplos vendedores", value: "Marketplace", nextQuestion: "business_size" }
    ]
  },
  business_size: {
    content: "Qual o tamanho atual ou esperado do seu negócio?",
    options: [
      { label: "Iniciando agora (até 100 produtos)", value: "small", nextQuestion: "redirect_solution" },
      { label: "Em crescimento (100-1000 produtos)", value: "medium", nextQuestion: "redirect_solution" },
      { label: "Estabelecido (1000+ produtos)", value: "large", nextQuestion: "redirect_solution" }
    ]
  },
  support_type: {
    content: "Qual tipo de suporte você precisa?",
    options: [
      { label: "Problemas técnicos na plataforma", value: "technical", nextQuestion: "redirect_support" },
      { label: "Dúvidas sobre configurações", value: "settings", nextQuestion: "redirect_support" },
      { label: "Integrações e APIs", value: "api", nextQuestion: "redirect_support" },
      { label: "Outros assuntos", value: "other", nextQuestion: "contact_support" }
    ]
  },
  pricing_info: {
    content: "O que você gostaria de saber sobre nossos preços?",
    options: [
      { label: "Ver tabela de preços", value: "price_table", nextQuestion: "redirect_pricing" },
      { label: "Calcular custo personalizado", value: "calculator", nextQuestion: "redirect_calculator" },
      { label: "Falar com consultor", value: "sales", nextQuestion: "contact_sales" }
    ]
  },
  integration_type: {
    content: "Que tipo de integração você procura?",
    options: [
      { label: "ERPs e Sistemas de Gestão", value: "erp", nextQuestion: "redirect_integration" },
      { label: "Marketplaces", value: "marketplace", nextQuestion: "redirect_integration" },
      { label: "Meios de Pagamento", value: "payment", nextQuestion: "redirect_integration" },
      { label: "Logística e Entregas", value: "logistics", nextQuestion: "redirect_integration" }
    ]
  },
  redirect_solution: {
    content: "Baseado no seu perfil, vou te direcionar para a melhor solução. Como prefere prosseguir?",
    options: [
      { label: "Ver solução recomendada", value: "view_solution" },
      { label: "Falar com especialista", value: "talk_specialist" },
      { label: "Agendar demonstração", value: "schedule_demo" }
    ]
  },
  redirect_support: {
    content: "Entendi sua necessidade. Posso te ajudar das seguintes formas:",
    options: [
      { label: "Acessar central de ajuda", value: "help_center" },
      { label: "Abrir ticket de suporte", value: "open_ticket" },
      { label: "Chat com suporte técnico", value: "tech_support" }
    ]
  },
  redirect_pricing: {
    content: "Vou te mostrar nossas opções de preços. Você pode:",
    options: [
      { label: "Ver comparativo de planos", value: "compare_plans" },
      { label: "Simular preços", value: "price_simulator" },
      { label: "Consultar especialista", value: "pricing_specialist" }
    ]
  },
  contact_support: {
    content: "Como prefere receber nosso suporte?",
    options: [
      { label: "Chat ao vivo", value: "live_chat" },
      { label: "Email", value: "email_support" },
      { label: "Ligação telefônica", value: "phone_call" }
    ]
  },
  contact_sales: {
    content: "Ótimo! Como prefere que nosso time comercial entre em contato?",
    options: [
      { label: "WhatsApp", value: "whatsapp" },
      { label: "Email", value: "email" },
      { label: "Telefone", value: "phone" }
    ]
  }
};