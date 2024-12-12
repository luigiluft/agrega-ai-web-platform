import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import DeliveryMarker from "./components/DeliveryMarker";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TrackingMapProps {
  deliveries: any[];
  selectedDelivery: any;
  setSelectedDelivery: (delivery: any) => void;
}

const TrackingMap = ({
  deliveries = [],
  selectedDelivery,
  setSelectedDelivery,
}: TrackingMapProps) => {
  const navigate = useNavigate();
  const center: LatLngExpression = [-23.5505, -46.6333];

  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 z-[1000] bg-white hover:bg-gray-100 shadow-md"
      >
        <ArrowLeft className="w-5 h-5" />
      </Button>
      
      <div className="h-[600px] w-full rounded-lg border">
        <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
          className="rounded-lg"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {deliveries.map((delivery) => (
            <DeliveryMarker
              key={delivery.id}
              delivery={delivery}
              isSelected={selectedDelivery?.id === delivery.id}
              onClick={() => setSelectedDelivery(delivery)}
            />
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default TrackingMap;