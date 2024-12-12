import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Truck, Car, Van } from "lucide-react";
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
  // Choose vehicle icon based on items quantity
  const getVehicleIcon = () => {
    if (delivery.items > 3) return Truck;
    if (delivery.items > 1) return Van;
    return Car;
  };

  const VehicleIcon = getVehicleIcon();

  const markerHtml = `
    <div class="flex items-center justify-center w-8 h-8 rounded-full ${
      isSelected ? 'bg-primary' : 'bg-gray-500'
    } text-white">
      ${VehicleIcon({
        width: 16,
        height: 16,
        color: 'white',
      }).outerHTML}
    </div>
  `;

  const icon = new L.DivIcon({
    className: 'custom-marker',
    html: markerHtml,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  return (
    <Marker
      position={[delivery.currentLocation.lat, delivery.currentLocation.lng]}
      icon={icon}
      eventHandlers={{ click: onClick }}
    >
      <Popup>
        <div className="p-2">
          <div className="flex items-center gap-2">
            <VehicleIcon className="h-4 w-4" />
            <span className="font-medium">Entrega #{delivery.trackingNumber}</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {delivery.items} {delivery.items > 1 ? 'itens' : 'item'}
          </p>
        </div>
      </Popup>
    </Marker>
  );
};

export default DeliveryMarker;