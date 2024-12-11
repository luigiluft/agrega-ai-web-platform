import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Search, Truck } from 'lucide-react';
import type { LatLngExpression } from 'leaflet';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Mock data for deliveries
const deliveries = [
  {
    id: "DEL001",
    trackingNumber: "BR123456789",
    status: "Em trânsito",
    estimatedDelivery: "2024-04-15",
    currentLocation: { lat: -23.5505, lng: -46.6333 }, // São Paulo
    destination: "Rua Augusta, 1500 - São Paulo, SP",
  },
  {
    id: "DEL002",
    trackingNumber: "BR987654321",
    status: "Saiu para entrega",
    estimatedDelivery: "2024-04-14",
    currentLocation: { lat: -22.9068, lng: -43.1729 }, // Rio de Janeiro
    destination: "Av. Atlântica, 2000 - Rio de Janeiro, RJ",
  },
  {
    id: "DEL003",
    trackingNumber: "BR456789123",
    status: "Em separação",
    estimatedDelivery: "2024-04-16",
    currentLocation: { lat: -25.4284, lng: -49.2733 }, // Curitiba
    destination: "Rua XV de Novembro, 1000 - Curitiba, PR",
  },
];

const TrackingMap = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDeliveries, setFilteredDeliveries] = useState(deliveries);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = deliveries.filter(delivery => 
      delivery.trackingNumber.toLowerCase().includes(query.toLowerCase()) ||
      delivery.destination.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDeliveries(filtered);
  };

  const defaultCenter: LatLngExpression = [-23.5505, -46.6333]; // São Paulo as default center

  // Custom truck icon
  const truckIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  return (
    <Card className="p-6">
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por número de rastreio ou endereço..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-8"
          />
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
            attributionControl={true}
          />
          {filteredDeliveries.map((delivery) => (
            <Marker
              key={delivery.id}
              position={[delivery.currentLocation.lat, delivery.currentLocation.lng] as LatLngExpression}
              icon={truckIcon as L.Icon}
            >
              <Popup>
                <div className="p-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="h-4 w-4" />
                    <h3 className="font-semibold">Pedido {delivery.trackingNumber}</h3>
                  </div>
                  <p className="text-sm text-gray-600">Status: {delivery.status}</p>
                  <p className="text-sm text-gray-600">
                    Previsão: {new Date(delivery.estimatedDelivery).toLocaleDateString('pt-BR')}
                  </p>
                  <p className="text-sm text-gray-600">Destino: {delivery.destination}</p>
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