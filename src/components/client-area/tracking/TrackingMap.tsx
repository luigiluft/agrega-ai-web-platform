import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
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
  const defaultCenter: LatLngExpression = [-23.5505, -46.6333];

  return (
    <div className="h-[600px] w-full rounded-lg border">
      <MapContainer
        defaultCenter={defaultCenter}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        className="rounded-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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