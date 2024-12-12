import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

interface DeliveryMarkerProps {
  delivery: any;
  isSelected: boolean;
  onClick: () => void;
}

const DeliveryMarker = ({
  delivery,
  isSelected,
  onClick,
}: DeliveryMarkerProps) => {
  const markerIcon = L.icon({
    iconUrl: "/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <Marker
      position={[delivery.lat, delivery.lng]}
      eventHandlers={{ click: onClick }}
      icon={markerIcon}
    >
      <Popup>
        <div className="p-2">
          <h3 className="font-semibold">Entrega #{delivery.id}</h3>
          <p className="text-sm">Status: {delivery.status}</p>
          <p className="text-sm">
            Previsão: {delivery.estimatedDelivery}
          </p>
        </div>
      </Popup>
    </Marker>
  );
};

export default DeliveryMarker;