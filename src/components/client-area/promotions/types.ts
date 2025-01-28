export interface Banner {
  id: string;
  title: string;
  imageUrl: string;
  position: 'homepage' | 'category' | 'product' | 'footer';
  startDate: Date;
  endDate: Date;
  status: 'active' | 'scheduled' | 'expired';
  clicks?: number;
  impressions?: number;
  url?: string;
  dimensions?: {
    width: number;
    height: number;
  };
}

export interface EnhancedPromotion {
  id: string;
  name: string;
  type: 'percentage' | 'fixed' | 'bogo' | 'shipping';
  value: number;
  startDate: Date;
  endDate: Date;
  minPurchase?: number;
  maxDiscount?: number;
  applicableProducts: 'all' | 'specific' | 'category';
  status: 'active' | 'scheduled' | 'expired';
  usageLimit?: number;
  usageCount?: number;
  conditions?: {
    categories?: string[];
    products?: string[];
    customerGroups?: string[];
  };
  metrics?: {
    sales: number;
    revenue: number;
    averageOrderValue: number;
  };
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  startDate: Date;
  endDate: Date;
  usageLimit: number;
  usageCount: number;
  minPurchase?: number;
  maxDiscount?: number;
}