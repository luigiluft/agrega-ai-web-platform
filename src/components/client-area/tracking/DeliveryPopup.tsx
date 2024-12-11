import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Delivery, StatusConfig } from './types';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface DeliveryPopupProps {
  delivery: Delivery;
  statusConfig: StatusConfig;
}

const DeliveryPopup = ({ delivery, statusConfig }: DeliveryPopupProps) => {
  const config = statusConfig[delivery.status];
  
  return (
    <Card className="p-4 min-w-[300px]">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {React.createElement(config.icon, { className: "h-4 w-4" })}
            <h3 className="font-semibold">{delivery.trackingNumber}</h3>
          </div>
          <Badge className={config.color + " text-white"}>
            {config.label}
          </Badge>
        </div>

        <Separator />

        <div className="text-sm space-y-2">
          <div>
            <span className="font-medium">Cliente:</span>
            <p>{delivery.customer}</p>
          </div>
          <div>
            <span className="font-medium">Contato:</span>
            <p>{delivery.contact}</p>
          </div>
          <div>
            <span className="font-medium">Destino:</span>
            <p className="text-pretty">{delivery.destination}</p>
          </div>
          <div>
            <span className="font-medium">Valor:</span>
            <p>R$ {delivery.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          </div>
          <div>
            <span className="font-medium">Previsão:</span>
            <p>{new Date(delivery.estimatedDelivery).toLocaleDateString('pt-BR')}</p>
          </div>
          <div>
            <span className="font-medium">Última Atualização:</span>
            <p>{delivery.lastUpdate}</p>
          </div>
          {delivery.notes && (
            <div>
              <span className="font-medium">Observações:</span>
              <p className="text-yellow-600">{delivery.notes}</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default DeliveryPopup;