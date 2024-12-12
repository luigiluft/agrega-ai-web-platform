import { LatLngExpression } from 'leaflet';
import { StatusConfig } from '../types';
import { Truck, Clock, AlertTriangle, CheckCircle, Package } from 'lucide-react';

export const mapCenter: LatLngExpression = [-23.5505, -46.6333];

export const statusConfig: StatusConfig = {
  em_rota: {
    label: "Em Rota",
    color: "bg-blue-500",
    icon: Truck,
    markerColor: "bg-blue-500"
  },
  atrasado: {
    label: "Atrasado",
    color: "bg-red-500",
    icon: AlertTriangle,
    markerColor: "bg-red-500"
  },
  entregue: {
    label: "Entregue",
    color: "bg-green-500",
    icon: CheckCircle,
    markerColor: "bg-green-500"
  },
  pendente: {
    label: "Pendente",
    color: "bg-yellow-500",
    icon: Clock,
    markerColor: "bg-yellow-500"
  },
  risco_atraso: {
    label: "Risco de Atraso",
    color: "bg-orange-500",
    icon: Package,
    markerColor: "bg-orange-500"
  }
};