import { Marker, Popup } from 'react-leaflet';
import { DivIcon } from 'leaflet';
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
  const position: [number, number] = [delivery.currentLocation.lat, delivery.currentLocation.lng];
  
  const customIcon = new DivIcon({
    className: `w-8 h-8 ${isSelected ? 'bg-primary' : 'bg-secondary'} rounded-full flex items-center justify-center text-white`,
    html: '📍',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  return (
    <Marker 
      position={position} 
      eventHandlers={{ click: onClick }}
      icon={customIcon}
    >
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