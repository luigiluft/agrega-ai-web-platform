import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Truck } from "lucide-react";

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
  const customIcon = new L.DivIcon({
    className: "custom-div-icon",
    html: `<div class="marker-pin ${
      isSelected ? "bg-primary" : "bg-gray-500"
    }"></div>`,
    iconSize: [30, 42],
    iconAnchor: [15, 42],
  });

  return (
    <Marker
      position={[delivery.latitude, delivery.longitude]}
      eventHandlers={{ click: onClick }}
      icon={customIcon}
    >
      <Popup>
        <div className="p-2">
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            <span className="font-medium">Entrega #{delivery.id}</span>
          </div>
          <p className="text-sm text-gray-600">{delivery.status}</p>
        </div>
      </Popup>
    </Marker>
  );
};

export default DeliveryMarker;