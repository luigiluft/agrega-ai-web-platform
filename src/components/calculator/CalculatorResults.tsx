import React from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Mail, PhoneCall } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface CalculatorResultsProps {
  implementationPrice: string;
  maintenancePrice: string;
  revenueShare: string;
  revenueSharePercent: string;
  monthlyRevenue: string;
  setMonthlyRevenue: (value: string) => void;
  onContactClick: () => void;
}

const CalculatorResults = ({
  implementationPrice,
  maintenancePrice,
  revenueShare,
  revenueSharePercent,
  monthlyRevenue,
  setMonthlyRevenue,
  onContactClick
}: CalculatorResultsProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4 p-4 rounded-lg bg-secondary/5 border border-secondary/10">
        <Label className="font-medium">Faturamento Mensal Estimado (R$)</Label>
        <Input
          type="number"
          value={monthlyRevenue}
          onChange={(e) => setMonthlyRevenue(e.target.value)}
          min="0"
          step="1000"
          className="bg-background"
          placeholder="Digite o faturamento mensal estimado"
        />
      </div>

      <Card className="p-6 space-y-6 bg-gradient-to-br from-background to-orange-50">
        <div className="space-y-4">
          <div className="pb-4 border-b">
            <div className="text-sm text-muted-foreground">Implementação</div>
            <div className="flex items-baseline justify-between mt-1">
              <div className="text-2xl font-bold">
                R$ {implementationPrice}
              </div>
              <div className="text-sm text-muted-foreground">
                pagamento único
              </div>
            </div>
          </div>
          
          <div className="pb-4 border-b">
            <div className="text-sm text-muted-foreground">Sustentação Mensal</div>
            <div className="flex items-baseline justify-between mt-1">
              <div className="text-2xl font-bold">
                R$ {maintenancePrice}
              </div>
              <div className="text-sm text-muted-foreground">
                por mês
              </div>
            </div>
          </div>
          
          <div>
            <div className="text-sm text-muted-foreground">
              Fee sobre Faturamento
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <div className="text-2xl font-bold">
                {revenueSharePercent}%
              </div>
              <div className="text-sm text-muted-foreground">
                do faturamento
              </div>
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              Aproximadamente R$ {revenueShare}/mês
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button 
          variant="outline"
          className="w-full space-x-2"
          onClick={onContactClick}
        >
          <PhoneCall className="w-4 h-4" />
          <span>Falar com Consultor</span>
        </Button>
        
        <Button 
          variant="default"
          className="w-full space-x-2 bg-orange-500 hover:bg-orange-600"
          onClick={onContactClick}
        >
          <Mail className="w-4 h-4" />
          <span>Receber por Email</span>
        </Button>
      </div>
    </div>
  );
};

export default CalculatorResults;