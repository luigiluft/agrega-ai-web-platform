import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { Popup } from 'react-leaflet';
import { DeliveryStatus } from '../types';

interface DeliveryMarkerProps {
  position: [number, number];
  status: DeliveryStatus;
  onClick: () => void;
  children: React.ReactNode;
  delivery: any; // Add this to match the parent component's props
  isSelected: boolean;
  statusConfig: any;
}

const DeliveryMarker: React.FC<DeliveryMarkerProps> = ({
  position,
  onClick,
  children,
  delivery,
  isSelected,
  statusConfig
}) => {
  const markerIcon = L.divIcon({
    className: 'custom-marker-icon',
    html: `<div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
      <span>📍</span>
    </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32]
  });

  return (
    <Marker 
      position={position} 
      eventHandlers={{ click: onClick }}
      icon={markerIcon}
    >
      <Popup>
        {children}
      </Popup>
    </Marker>
  );
};

export default DeliveryMarker;