import { Marker, Popup } from 'react-leaflet';
import { divIcon } from 'leaflet';
import DeliveryPopup from '../DeliveryPopup';

interface DeliveryMarkerProps {
  position: [number, number];
  delivery: any; // Replace 'any' with your delivery type
  onSelect: (delivery: any) => void;
}

const DeliveryMarker = ({ position, delivery, onSelect }: DeliveryMarkerProps) => {
  const customIcon = divIcon({
    className: 'custom-div-icon',
    html: `<div class="marker-pin"></div>`,
    iconSize: [30, 42],
    iconAnchor: [15, 42]
  });

  return (
    <Marker 
      position={position} 
      eventHandlers={{ click: () => onSelect(delivery) }}
      icon={customIcon}
    >
      <Popup>
        <DeliveryPopup delivery={delivery} />
      </Popup>
    </Marker>
  );
};

export default DeliveryMarker;