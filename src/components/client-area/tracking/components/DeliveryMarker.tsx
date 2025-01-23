import { Marker, Popup } from 'react-leaflet';
import { DivIcon, LatLngExpression } from 'leaflet';
import { Delivery, StatusConfig } from '../types';

interface DeliveryMarkerProps {
  delivery: Delivery;
  isSelected: boolean;
  onClick: () => void;
  statusConfig: StatusConfig;
}

const DeliveryMarker = ({
  delivery,
  isSelected,
  onClick,
  statusConfig
}: DeliveryMarkerProps) => {
  const position: LatLngExpression = [delivery.currentLocation.lat, delivery.currentLocation.lng];
  const status = statusConfig[delivery.status];

  return (
    <Marker 
      position={position}
      eventHandlers={{
        click: onClick
      }}
    >
      <div 
        className="w-8 h-8 rounded-full flex items-center justify-center text-white"
        style={{ backgroundColor: status.markerColor }}
      >
        📍
      </div>
      <Popup>
        <div className="p-2">
          <h3 className="font-semibold">{delivery.customer}</h3>
          <p className="text-sm text-gray-600">{delivery.destination}</p>
        </div>
      </Popup>
    </Marker>
  );
};

export default DeliveryMarker;