import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Map as LeafletMap } from "leaflet";
import DeliveryMarker from "./components/DeliveryMarker";

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
  return (
    <div className="h-[600px] w-full rounded-lg border">
      <MapContainer
        center={[-23.5505, -46.6333]}
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
  );
};

export default TrackingMap;