import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Truck } from "lucide-react";
import { Delivery } from "../types";

interface DeliveryMarkerProps {
  delivery: Delivery;
  isSelected: boolean;
  onClick: () => void;
}

const DeliveryMarker = ({
  delivery,
  isSelected,
  onClick,
}: DeliveryMarkerProps) => {
  const markerHtml = `
    <div class="flex items-center justify-center w-8 h-8 rounded-full ${
      isSelected ? 'bg-primary' : 'bg-gray-500'
    } text-white">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 3h18v13H3z"/>
        <path d="M21 16V7l-9 9"/>
      </svg>
    </div>
  `;

  const customIcon = L.divIcon({
    className: 'custom-marker',
    html: markerHtml,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  return (
    <Marker
      position={[delivery.currentLocation.lat, delivery.currentLocation.lng]}
      icon={customIcon}
      eventHandlers={{ click: onClick }}
    >
      <Popup>
        <div className="p-2">
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            <span className="font-medium">Entrega #{delivery.trackingNumber}</span>
          </div>
          <p className="text-sm text-gray-600">{delivery.status}</p>
        </div>
      </Popup>
    </Marker>
  );
};

export default DeliveryMarker;