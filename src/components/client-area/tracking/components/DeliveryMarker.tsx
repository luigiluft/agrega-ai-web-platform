import { Marker } from "react-leaflet";
import L from "leaflet";
import { Truck } from "lucide-react";
import { DeliveryPopup } from "../DeliveryPopup";
import { Delivery } from "../types";

interface DeliveryMarkerProps {
  delivery: Delivery;
  onSelect: (delivery: Delivery) => void;
}

export const DeliveryMarker = ({ delivery, onSelect }: DeliveryMarkerProps) => {
  const getVehicleIcon = () => {
    const iconHtml = `
      <div class="bg-primary text-white p-2 rounded-full shadow-lg">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          ${Truck({}).props.children}
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
      position={[delivery.latitude, delivery.longitude]} 
      eventHandlers={{
        click: () => onSelect(delivery)
      }}
      icon={getVehicleIcon()}
    >
      <DeliveryPopup delivery={delivery} />
    </Marker>
  );
};