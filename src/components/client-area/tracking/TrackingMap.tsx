import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import { Search, Truck, Clock, AlertTriangle, CheckCircle, Package } from 'lucide-react';
import type { LatLngExpression } from 'leaflet';
import DeliveryFilters from './DeliveryFilters';
import DeliveryPopup from './DeliveryPopup';
import { Delivery, DeliveryStatus, StatusConfig } from './types';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const deliveries: Delivery[] = [
  {
    id: "DEL001",
    trackingNumber: "BR123456789",
    status: "em_rota",
    estimatedDelivery: "2024-04-15",
    currentLocation: { lat: -23.5505, lng: -46.6333 },
    destination: "Rua Augusta, 1500 - São Paulo, SP",
    lastUpdate: "2024-04-13 14:30",
    customer: "João Silva",
    contact: "(11) 98765-4321",
    value: 1250.90,
    priority: "alta",
    items: 3
  },
  {
    id: "DEL002",
    trackingNumber: "BR987654321",
    status: "atrasado",
    estimatedDelivery: "2024-04-14",
    currentLocation: { lat: -22.9068, lng: -43.1729 },
    destination: "Av. Atlântica, 2000 - Rio de Janeiro, RJ",
    lastUpdate: "2024-04-13 10:15",
    customer: "Maria Santos",
    contact: "(21) 98765-4321",
    value: 789.50,
    notes: "Cliente solicitou entrega no período da manhã",
    priority: "media",
    items: 1
  },
  {
    id: "DEL003",
    trackingNumber: "BR456789123",
    status: "risco_atraso",
    estimatedDelivery: "2024-04-16",
    currentLocation: { lat: -25.4284, lng: -49.2733 },
    destination: "Rua XV de Novembro, 1000 - Curitiba, PR",
    lastUpdate: "2024-04-13 16:45",
    customer: "Pedro Oliveira",
    contact: "(41) 98765-4321",
    value: 2340.00,
    priority: "baixa",
    items: 5
  },
  {
    id: "DEL004",
    trackingNumber: "BR789123456",
    status: "entregue",
    estimatedDelivery: "2024-04-13",
    currentLocation: { lat: -30.0277, lng: -51.2287 },
    destination: "Av. Ipiranga, 500 - Porto Alegre, RS",
    lastUpdate: "2024-04-13 09:30",
    customer: "Ana Souza",
    contact: "(51) 98765-4321",
    value: 567.80,
    priority: "media",
    items: 2
  },
  {
    id: "DEL005",
    trackingNumber: "BR321654987",
    status: "pendente",
    estimatedDelivery: "2024-04-17",
    currentLocation: { lat: -19.9167, lng: -43.9345 },
    destination: "Av. do Contorno, 1500 - Belo Horizonte, MG",
    lastUpdate: "2024-04-13 11:20",
    customer: "Carlos Lima",
    contact: "(31) 98765-4321",
    value: 1890.30,
    notes: "Necessário agendamento prévio",
    priority: "alta",
    items: 4
  }
];

const statusConfig: StatusConfig = {
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

const TrackingMap = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<DeliveryStatus | "all">("all");
  const [filteredDeliveries, setFilteredDeliveries] = useState(deliveries);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterDeliveries(query, statusFilter);
  };

  const handleStatusFilter = (status: DeliveryStatus | "all") => {
    setStatusFilter(status);
    filterDeliveries(searchQuery, status);
  };

  const filterDeliveries = (query: string, status: DeliveryStatus | "all") => {
    const filtered = deliveries.filter(delivery => {
      const matchesSearch = 
        delivery.trackingNumber.toLowerCase().includes(query.toLowerCase()) ||
        delivery.destination.toLowerCase().includes(query.toLowerCase()) ||
        delivery.customer.toLowerCase().includes(query.toLowerCase()) ||
        delivery.contact.toLowerCase().includes(query.toLowerCase());
      
      const matchesStatus = status === "all" || delivery.status === status;
      
      return matchesSearch && matchesStatus;
    });
    setFilteredDeliveries(filtered);
  };

  const mapCenter: LatLngExpression = [-23.5505, -46.6333];

  const createMarkerIcon = (status: DeliveryStatus) => {
    return new L.Icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${statusConfig[status].markerColor}.png`,
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  };

  return (
    <Card className="p-6">
      <DeliveryFilters
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        statusConfig={statusConfig}
        onSearch={handleSearch}
        onStatusFilter={handleStatusFilter}
      />

      <div className="h-[600px] relative">
        <MapContainer
          className="h-full w-full rounded-lg border"
          center={mapCenter}
          zoom={4}
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {filteredDeliveries.map((delivery) => (
            <Marker
              key={delivery.id}
              position={[delivery.currentLocation.lat, delivery.currentLocation.lng]}
              icon={createMarkerIcon(delivery.status)}
            >
              <Popup>
                <DeliveryPopup delivery={delivery} statusConfig={statusConfig} />
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </Card>
  );
};

export default TrackingMap;