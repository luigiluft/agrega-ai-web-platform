import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Delivery, StatusConfig } from './types';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Package, Phone, MapPin, Calendar, Clock, DollarSign, AlertTriangle, User } from 'lucide-react';

interface DeliveryPopupProps {
  delivery: Delivery;
  statusConfig: StatusConfig;
}

const DeliveryPopup = ({ delivery, statusConfig }: DeliveryPopupProps) => {
  const config = statusConfig[delivery.status];
  
  return (
    <Card className="p-4 min-w-[320px] max-w-[400px] shadow-lg animate-scale-up bg-white">
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-primary" />
            <div>
              <p className="text-xs text-gray-500">Código de Rastreio</p>
              <h3 className="font-semibold">{delivery.trackingNumber}</h3>
            </div>
          </div>
          <Badge className={`${config.color} text-white px-3`}>
            {React.createElement(config.icon, { className: "h-3 w-3 mr-1" })}
            {config.label}
          </Badge>
        </div>

        <div className="space-y-4 text-sm">
          <div className="flex items-start gap-3">
            <User className="h-4 w-4 text-gray-400 mt-1 shrink-0" />
            <div className="space-y-0.5">
              <p className="font-medium text-gray-700">Cliente</p>
              <p className="text-gray-600">{delivery.customer}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Phone className="h-4 w-4 text-gray-400 mt-1 shrink-0" />
            <div className="space-y-0.5">
              <p className="font-medium text-gray-700">Contato</p>
              <p className="text-gray-600">{delivery.contact}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <MapPin className="h-4 w-4 text-gray-400 mt-1 shrink-0" />
            <div className="space-y-0.5">
              <p className="font-medium text-gray-700">Destino</p>
              <p className="text-gray-600">{delivery.destination}</p>
            </div>
          </div>

          <Separator className="my-2" />
          
          <div className="flex items-start gap-3">
            <DollarSign className="h-4 w-4 text-gray-400 mt-1 shrink-0" />
            <div className="space-y-0.5">
              <p className="font-medium text-gray-700">Valor</p>
              <p className="text-gray-600">
                R$ {delivery.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Calendar className="h-4 w-4 text-gray-400 mt-1 shrink-0" />
            <div className="space-y-0.5">
              <p className="font-medium text-gray-700">Previsão</p>
              <p className="text-gray-600">
                {new Date(delivery.estimatedDelivery).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Clock className="h-4 w-4 text-gray-400 mt-1 shrink-0" />
            <div className="space-y-0.5">
              <p className="font-medium text-gray-700">Última Atualização</p>
              <p className="text-gray-600">{delivery.lastUpdate}</p>
            </div>
          </div>
          
          {delivery.notes && (
            <div className="flex items-start gap-3 bg-yellow-50 p-3 rounded-lg mt-3">
              <AlertTriangle className="h-4 w-4 text-yellow-500 mt-1 shrink-0" />
              <div className="space-y-0.5">
                <p className="font-medium text-yellow-700">Observações</p>
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