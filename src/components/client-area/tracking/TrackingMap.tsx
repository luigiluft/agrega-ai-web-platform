import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import DeliveryMarker from "./components/DeliveryMarker";
import DeliveryPopup from "./DeliveryPopup";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Delivery } from "./types";
import { deliveries } from "./config/mockData";
import { statusConfig } from "./config/mapConfig";

interface TrackingMapProps {
  deliveries?: Delivery[];
  selectedDelivery?: Delivery | null;
  setSelectedDelivery?: (delivery: Delivery | null) => void;
}

const TrackingMap = ({
  deliveries: propDeliveries,
  selectedDelivery: propSelectedDelivery,
  setSelectedDelivery: propSetSelectedDelivery,
}: TrackingMapProps) => {
  const navigate = useNavigate();
  const [localSelectedDelivery, setLocalSelectedDelivery] = useState<Delivery | null>(null);
  
  const activeDeliveries = propDeliveries || deliveries;
  const selectedDelivery = propSelectedDelivery ?? localSelectedDelivery;
  const setSelectedDelivery = propSetSelectedDelivery ?? setLocalSelectedDelivery;

  const center: LatLngExpression = [-23.5505, -46.6333];

  return (
    <div className="space-y-6">
      <div className="relative">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 z-[1000] bg-white hover:bg-gray-100 shadow-md"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="h-[600px] w-full rounded-lg border overflow-hidden">
              <MapContainer
                center={center}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
                className="rounded-lg"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {activeDeliveries.map((delivery) => (
                  <DeliveryMarker
                    key={delivery.id}
                    delivery={delivery}
                    isSelected={selectedDelivery?.id === delivery.id}
                    onClick={() => setSelectedDelivery(delivery)}
                  />
                ))}
              </MapContainer>
            </div>
          </div>

          <div className="space-y-4">
            {selectedDelivery ? (
              <DeliveryPopup
                delivery={selectedDelivery}
                statusConfig={statusConfig}
              />
            ) : (
              <div className="p-4 bg-gray-50 rounded-lg border text-center">
                <p className="text-gray-600">
                  Selecione uma entrega no mapa para ver mais detalhes
                </p>
              </div>
            )}

            <div className="bg-white rounded-lg border p-4">
              <h3 className="font-semibold mb-2">Resumo de Entregas</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-600">Em Rota</p>
                  <p className="text-2xl font-bold text-blue-700">
                    {activeDeliveries.filter(d => d.status === "em_rota").length}
                  </p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-600">Pendentes</p>
                  <p className="text-2xl font-bold text-yellow-700">
                    {activeDeliveries.filter(d => d.status === "pendente").length}
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-600">Entregues</p>
                  <p className="text-2xl font-bold text-green-700">
                    {activeDeliveries.filter(d => d.status === "entregue").length}
                  </p>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <p className="text-sm text-red-600">Atrasados</p>
                  <p className="text-2xl font-bold text-red-700">
                    {activeDeliveries.filter(d => d.status === "atrasado").length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingMap;