import { useState } from "react";
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Card } from '@/components/ui/card';
import { DeliveryStatus } from './types';
import DeliveryFilters from './DeliveryFilters';
import DeliveryMarker from './components/DeliveryMarker';
import { mapCenter, statusConfig } from './config/mapConfig';
import { deliveries } from './config/mockData';
import type { Map as LeafletMap } from 'leaflet';

const TrackingMap = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<DeliveryStatus | "all">("all");
  const [filteredDeliveries, setFilteredDeliveries] = useState(deliveries);
  const [map, setMap] = useState<LeafletMap | null>(null);

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

  return (
    <Card className="p-6 bg-white shadow-lg">
      <DeliveryFilters
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        statusConfig={statusConfig}
        onSearch={handleSearch}
        onStatusFilter={handleStatusFilter}
      />

      <div className="h-[600px] relative rounded-lg overflow-hidden border border-gray-200">
        <MapContainer
          defaultCenter={mapCenter}
          defaultZoom={4}
          scrollWheelZoom={true}
          className="h-full w-full"
          ref={(mapRef) => setMap(mapRef)}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredDeliveries.map((delivery) => (
            <DeliveryMarker key={delivery.id} delivery={delivery} />
          ))}
        </MapContainer>
      </div>
    </Card>
  );
};

export default TrackingMap;