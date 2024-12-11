import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Search } from 'lucide-react';

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
          center={[-23.5505, -46.6333]} // São Paulo as default center
          zoom={4}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {filteredDeliveries.map((delivery) => (
            <Marker
              key={delivery.id}
              position={[delivery.currentLocation.lat, delivery.currentLocation.lng]}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold">Pedido {delivery.trackingNumber}</h3>
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