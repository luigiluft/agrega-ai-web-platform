import { Marker, Popup } from 'react-leaflet';
import { divIcon } from 'leaflet';
import DeliveryPopup from '../DeliveryPopup';
import { Delivery, StatusConfig } from '../types';

interface DeliveryMarkerProps {
  delivery: Delivery;
  isSelected: boolean;
  onClick: (delivery: Delivery) => void;
  statusConfig: StatusConfig;
}

const DeliveryMarker = ({ delivery, isSelected, onClick, statusConfig }: DeliveryMarkerProps) => {
  const config = statusConfig[delivery.status];
  
  const customIcon = divIcon({
    className: `custom-div-icon ${isSelected ? 'selected' : ''}`,
    html: `<div class="marker-pin" style="background-color: ${config.markerColor}"></div>`,
    iconSize: [30, 42],
    iconAnchor: [15, 42]
  });

  return (
    <Marker 
      position={[delivery.currentLocation.lat, delivery.currentLocation.lng]}
      eventHandlers={{ click: () => onClick(delivery) }}
      icon={customIcon}
    >
      <Popup>
        <DeliveryPopup delivery={delivery} statusConfig={statusConfig} />
      </Popup>
    </Marker>
  );
};

export default DeliveryMarker;