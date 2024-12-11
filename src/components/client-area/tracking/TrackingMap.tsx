import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { Search, Truck, Clock, AlertTriangle, CheckCircle, Package } from 'lucide-react';
import type { LatLngExpression } from 'leaflet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

type DeliveryStatus = 'em_rota' | 'atrasado' | 'entregue' | 'pendente' | 'risco_atraso';

interface Delivery {
  id: string;
  trackingNumber: string;
  status: DeliveryStatus;
  estimatedDelivery: string;
  currentLocation: { lat: number; lng: number };
  destination: string;
  lastUpdate: string;
  customer: string;
}

const deliveries: Delivery[] = [
  {
    id: "DEL001",
    trackingNumber: "BR123456789",
    status: "em_rota",
    estimatedDelivery: "2024-04-15",
    currentLocation: { lat: -23.5505, lng: -46.6333 },
    destination: "Rua Augusta, 1500 - São Paulo, SP",
    lastUpdate: "2024-04-13 14:30",
    customer: "João Silva"
  },
  {
    id: "DEL002",
    trackingNumber: "BR987654321",
    status: "atrasado",
    estimatedDelivery: "2024-04-14",
    currentLocation: { lat: -22.9068, lng: -43.1729 },
    destination: "Av. Atlântica, 2000 - Rio de Janeiro, RJ",
    lastUpdate: "2024-04-13 10:15",
    customer: "Maria Santos"
  },
  {
    id: "DEL003",
    trackingNumber: "BR456789123",
    status: "risco_atraso",
    estimatedDelivery: "2024-04-16",
    currentLocation: { lat: -25.4284, lng: -49.2733 },
    destination: "Rua XV de Novembro, 1000 - Curitiba, PR",
    lastUpdate: "2024-04-13 16:45",
    customer: "Pedro Oliveira"
  },
];

const statusConfig = {
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
        delivery.customer.toLowerCase().includes(query.toLowerCase());
      
      const matchesStatus = status === "all" || delivery.status === status;
      
      return matchesSearch && matchesStatus;
    });
    setFilteredDeliveries(filtered);
  };

  const defaultCenter: LatLngExpression = [-23.5505, -46.6333];

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

  const renderStatusIcon = (status: DeliveryStatus) => {
    const IconComponent = statusConfig[status].icon;
    return <IconComponent className="h-4 w-4" />;
  };

  return (
    <Card className="p-6">
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por número de rastreio, endereço ou cliente..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select value={statusFilter} onValueChange={(value) => handleStatusFilter(value as DeliveryStatus | "all")}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Status</SelectItem>
              {Object.entries(statusConfig).map(([key, config]) => (
                <SelectItem key={key} value={key}>
                  <div className="flex items-center gap-2">
                    {React.createElement(config.icon, { className: "h-4 w-4" })}
                    {config.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex flex-wrap gap-2">
            {Object.entries(statusConfig).map(([key, config]) => (
              <Badge
                key={key}
                variant="secondary"
                className={`flex items-center gap-1 ${
                  statusFilter === key ? config.color + " text-white" : ""
                }`}
              >
                {React.createElement(config.icon, { className: "h-3 w-3" })}
                <span>{config.label}</span>
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="h-[600px] relative">
        <MapContainer
          className="h-full w-full"
          defaultCenter={defaultCenter}
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
                <div className="p-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {renderStatusIcon(delivery.status)}
                      <h3 className="font-semibold">{delivery.trackingNumber}</h3>
                    </div>
                    <Badge className={statusConfig[delivery.status].color + " text-white"}>
                      {statusConfig[delivery.status].label}
                    </Badge>
                  </div>
                  <div className="text-sm space-y-1">
                    <p><span className="font-medium">Cliente:</span> {delivery.customer}</p>
                    <p><span className="font-medium">Destino:</span> {delivery.destination}</p>
                    <p><span className="font-medium">Previsão:</span> {new Date(delivery.estimatedDelivery).toLocaleDateString('pt-BR')}</p>
                    <p><span className="font-medium">Última Atualização:</span> {delivery.lastUpdate}</p>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </Card>
  );
};

export default TrackingMap;
