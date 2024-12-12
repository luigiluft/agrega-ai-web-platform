import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Delivery, StatusConfig } from './types';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Package, Phone, MapPin, Calendar, Clock, DollarSign, AlertTriangle } from 'lucide-react';

interface DeliveryPopupProps {
  delivery: Delivery;
  statusConfig: StatusConfig;
}

const DeliveryPopup = ({ delivery, statusConfig }: DeliveryPopupProps) => {
  const config = statusConfig[delivery.status];
  
  return (
    <Card className="p-4 min-w-[300px] shadow-lg animate-scale-up">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-primary" />
            <h3 className="font-semibold">{delivery.trackingNumber}</h3>
          </div>
          <Badge className={config.color + " text-white"}>
            {config.label}
          </Badge>
        </div>

        <Separator />

        <div className="text-sm space-y-3">
          <div className="flex items-start gap-2">
            <Package className="h-4 w-4 text-gray-400 mt-1" />
            <div>
              <span className="font-medium block">Cliente</span>
              <p className="text-gray-600">{delivery.customer}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <Phone className="h-4 w-4 text-gray-400 mt-1" />
            <div>
              <span className="font-medium block">Contato</span>
              <p className="text-gray-600">{delivery.contact}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-gray-400 mt-1" />
            <div>
              <span className="font-medium block">Destino</span>
              <p className="text-gray-600">{delivery.destination}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <DollarSign className="h-4 w-4 text-gray-400 mt-1" />
            <div>
              <span className="font-medium block">Valor</span>
              <p className="text-gray-600">
                R$ {delivery.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <Calendar className="h-4 w-4 text-gray-400 mt-1" />
            <div>
              <span className="font-medium block">Previsão</span>
              <p className="text-gray-600">
                {new Date(delivery.estimatedDelivery).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <Clock className="h-4 w-4 text-gray-400 mt-1" />
            <div>
              <span className="font-medium block">Última Atualização</span>
              <p className="text-gray-600">{delivery.lastUpdate}</p>
            </div>
          </div>
          
          {delivery.notes && (
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500 mt-1" />
              <div>
                <span className="font-medium block">Observações</span>
                <p className="text-yellow-600">{delivery.notes}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default DeliveryPopup;