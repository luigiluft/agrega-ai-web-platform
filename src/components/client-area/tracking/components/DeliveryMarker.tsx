import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Delivery, DeliveryStatus } from '../types';
import DeliveryPopup from '../DeliveryPopup';
import { statusConfig } from '../config/mapConfig';

interface DeliveryMarkerProps {
  delivery: Delivery;
}

const createMarkerIcon = (status: DeliveryStatus): L.Icon => {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${statusConfig[status].markerColor}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
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