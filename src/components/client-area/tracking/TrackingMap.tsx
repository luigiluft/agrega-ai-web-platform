import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Map as LeafletMap } from "leaflet";
import DeliveryMarker from "./components/DeliveryMarker";

interface TrackingMapProps {
  deliveries: any[];
  selectedDelivery: any | null;
  setSelectedDelivery: (delivery: any) => void;
}

const TrackingMap = ({
  deliveries = [],
  selectedDelivery,
  setSelectedDelivery,
}: TrackingMapProps) => {
  const handleMapCreated = (map: LeafletMap) => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  };

  return (
    <div className="h-[600px] w-full rounded-lg border">
      <MapContainer
        style={{ height: "100%", width: "100%" }}
        className="rounded-lg"
        whenCreated={handleMapCreated}
        defaultCenter={[-23.5505, -46.6333]}
        defaultZoom={13}
      >
        <TileLayer
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