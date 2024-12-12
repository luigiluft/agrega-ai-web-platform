import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Delivery } from '../types';
import DeliveryPopup from '../DeliveryPopup';
import { statusConfig } from '../config/mapConfig';

interface DeliveryMarkerProps {
  delivery: Delivery;
}

const createCustomIcon = (status: string) => {
  const markerHtml = `
    <div class="relative">
      <div class="w-6 h-6 rounded-full ${statusConfig[status].markerColor} shadow-lg flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2">
        <div class="w-4 h-4 rounded-full bg-white"></div>
      </div>
      <div class="w-2 h-2 ${statusConfig[status].markerColor} rotate-45 absolute -bottom-1 left-1/2 transform -translate-x-1/2"></div>
    </div>
  `;

  return new L.DivIcon({
    html: markerHtml,
    className: 'custom-marker',
    iconSize: L.point(24, 24),
    iconAnchor: L.point(12, 24),
    popupAnchor: L.point(0, -24),
  });
};

const DeliveryMarker = ({ delivery }: DeliveryMarkerProps) => {
  const position: [number, number] = [delivery.currentLocation.lat, delivery.currentLocation.lng];
  const customIcon = createCustomIcon(delivery.status);
  
  return (
    <Marker
      position={position}
      icon={customIcon}
    >
      <Popup>
        <DeliveryPopup delivery={delivery} statusConfig={statusConfig} />
      </Popup>
    </Marker>
  );
};

export default DeliveryMarker;