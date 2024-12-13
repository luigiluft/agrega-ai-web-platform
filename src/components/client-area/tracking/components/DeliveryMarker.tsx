import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Truck, Car, PackagePlus } from "lucide-react";
import { Delivery } from "../types";
import { createElement } from "react";

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
    if (delivery.items > 1) return PackagePlus;
    return Car;
  };

  const VehicleIcon = getVehicleIcon();

  // Create a simple SVG string for the marker icon
  const svgString = `
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="16" 
      height="16" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="white" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path>
      <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4"></path>
    </svg>
  `;

  const divIcon = L.divIcon({
    className: `custom-marker flex items-center justify-center w-8 h-8 rounded-full ${
      isSelected ? 'bg-primary' : 'bg-gray-500'
    } text-white`,
    html: svgString,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  return (
    <Marker
      position={[delivery.currentLocation.lat, delivery.currentLocation.lng]}
      icon={divIcon as L.DivIcon}
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