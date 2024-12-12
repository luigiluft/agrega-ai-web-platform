import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Delivery, DeliveryStatus } from '../types';
import DeliveryPopup from '../DeliveryPopup';
import { statusConfig } from '../config/mapConfig';

interface DeliveryMarkerProps {
  delivery: Delivery;
}

const createMarkerIcon = (status: DeliveryStatus): L.DivIcon => {
  return L.divIcon({
    className: `delivery-marker-${status}`,
    html: `<div class="marker-icon ${statusConfig[status].markerColor}"></div>`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
};

const DeliveryMarker = ({ delivery }: DeliveryMarkerProps) => {
  const position: [number, number] = [delivery.currentLocation.lat, delivery.currentLocation.lng];
  const markerIcon = createMarkerIcon(delivery.status);
  
  return (
    <Marker
      position={position}
      icon={markerIcon}
    >
      <Popup>
        <DeliveryPopup delivery={delivery} statusConfig={statusConfig} />
      </Popup>
    </Marker>
  );
};

export default DeliveryMarker;