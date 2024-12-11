export type MessageType = 'bot' | 'user';

export interface Message {
  id: string;
  type: MessageType;
  content: string;
  options?: ChatOption[];
}

export interface ChatOption {
  label: string;
  value: string;
  nextQuestion?: string;
}

export interface ChatState {
  messages: Message[];
  isOpen: boolean;
}

export type BusinessModel = 'B2C' | 'B2B' | 'D2C' | 'Marketplace' | 'Fullcommerce';
export type ProductQuantity = '1000' | '10000' | 'unlimited';
export type IntegrationType = 'basic' | 'intermediate' | 'advanced';
export type PlanType = 'Starter' | 'Business' | 'Enterprise';

export interface UserProfile {
  businessModel?: BusinessModel;
  productQuantity?: ProductQuantity;
  integrationType?: IntegrationType;
}