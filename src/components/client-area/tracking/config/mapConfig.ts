import { LatLngExpression } from 'leaflet';
import { StatusConfig } from '../types';
import { Truck, Clock, AlertTriangle, CheckCircle, Package } from 'lucide-react';

export const mapCenter: LatLngExpression = [-23.5505, -46.6333];

export const statusConfig: StatusConfig = {
  em_rota: {
    label: "Em Rota",
    color: "bg-blue-500",
    icon: Truck,
    markerColor: "blue"
  },
  atrasado: {
    label: "Atrasado",
    color: "bg-red-500",
    icon: AlertTriangle,
    markerColor: "red"
  },
  entregue: {
    label: "Entregue",
    color: "bg-green-500",
    icon: CheckCircle,
    markerColor: "green"
  },
  pendente: {
    label: "Pendente",
    color: "bg-yellow-500",
    icon: Clock,
    markerColor: "yellow"
  },
  risco_atraso: {
    label: "Risco de Atraso",
    color: "bg-orange-500",
    icon: Package,
    markerColor: "orange"
  }
};