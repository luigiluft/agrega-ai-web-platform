import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Delivery, StatusConfig } from '../types';
import { Icon } from 'leaflet';

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
  
  const markerIcon = new Icon({
    iconUrl: '📍',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    className: `w-8 h-8 ${isSelected ? 'bg-primary' : 'bg-secondary'} rounded-full flex items-center justify-center text-white`
  });

  return (
    <Marker 
      position={position} 
      eventHandlers={{ click: onClick }}
      icon={markerIcon}
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