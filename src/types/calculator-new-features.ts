
export type SupportLevel = 'basic' | 'standard' | 'premium';
export type SecurityFeature = 'ssl' | 'lgpd' | 'pentests' | 'waf';
export type MarketingFeature = 'seo' | 'email' | 'analytics' | 'social';
export type PerformanceFeature = 'cdn' | 'cache' | 'optimization' | 'accessibility';

export interface SupportPackage {
  level: SupportLevel;
  hours: number;
  price: number;
  features: string[];
}

export interface SecurityOption {
  id: SecurityFeature;
  name: string;
  description: string;
  price: number;
  implementationHours: number;
}

export interface MarketingOption {
  id: MarketingFeature;
  name: string;
  description: string;
  price: number;
  implementationHours: number;
}

export interface PerformanceOption {
  id: PerformanceFeature;
  name: string;
  description: string;
  price: number;
  implementationHours: number;
}

export interface Documentation {
  technical: boolean;
  userGuide: boolean;
  training: boolean;
}
