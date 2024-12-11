import { LucideIcon } from 'lucide-react';

export type DeliveryStatus = 'em_rota' | 'atrasado' | 'entregue' | 'pendente' | 'risco_atraso';

export interface Delivery {
  id: string;
  trackingNumber: string;
  status: DeliveryStatus;
  estimatedDelivery: string;
  currentLocation: { lat: number; lng: number };
  destination: string;
  lastUpdate: string;
  customer: string;
  contact: string;
  value: number;
  notes?: string;
  priority: 'baixa' | 'media' | 'alta';
  items: number;
}

export interface StatusConfig {
  [key: string]: {
    label: string;
    color: string;
    icon: LucideIcon;
    markerColor: string;
  };
}