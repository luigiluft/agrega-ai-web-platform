import { Marker } from "react-leaflet";
import L from "leaflet";
import { Truck } from "lucide-react";
import DeliveryPopup from "../DeliveryPopup";
import { Delivery } from "../types";

interface DeliveryMarkerProps {
  delivery: Delivery;
  isSelected: boolean;
  onClick: (delivery: Delivery) => void;
}

export const DeliveryMarker = ({ delivery, isSelected, onClick }: DeliveryMarkerProps) => {
  const getVehicleIcon = () => {
    const iconHtml = `
      <div class="${isSelected ? 'bg-primary' : 'bg-gray-500'} text-white p-2 rounded-full shadow-lg">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3h14v12h-2.5M3 15h.5m9.5 0H8m-4.5 0H7m1 0v2a2 2 0 104 0v-2m4 0v2a2 2 0 104 0v-2m3-3h-3V7h2l1 5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    `;

    return L.divIcon({
      html: iconHtml,
      className: 'custom-div-icon',
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });
  };

  return (
    <Marker 
      position={[delivery.currentLocation.lat, delivery.currentLocation.lng]} 
      eventHandlers={{
        click: () => onClick(delivery)
      }}
      icon={getVehicleIcon()}
    >
      <DeliveryPopup delivery={delivery} statusConfig={statusConfig} />
    </Marker>
  );
};