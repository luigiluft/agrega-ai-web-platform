import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Check, Info } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface ConsoleOutputProps {
  implementationTasks: any[];
  maintenanceTasks: any[];
  implementationPrice: string;
  maintenancePrice: string;
  revenueShare: string;
  revenueSharePercent: string;
  totalHours: number;
  selectedPlan?: 'monthly' | 'annual';
  onPlanSelect?: (plan: 'monthly' | 'annual') => void;
}

const ConsoleOutput = ({
  implementationTasks,
  maintenanceTasks,
  implementationPrice,
  maintenancePrice,
  revenueShare,
  revenueSharePercent,
  totalHours,
  selectedPlan,
  onPlanSelect,
}: ConsoleOutputProps) => {
  const formatCurrency = (value: string | number) => {
    return Number(value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const annualRevenueSharePercent = Number(revenueSharePercent) - 1;
  const annualRevenueShare = (Number(revenueShare) * annualRevenueSharePercent / Number(revenueSharePercent)).toFixed(2);

  const renderPlanOption = (isAnnual: boolean) => {
    const isSelected = isAnnual ? selectedPlan === 'annual' : selectedPlan === 'monthly';
    const installments = isAnnual ? 12 : 3;
    const installmentValue = (Number(implementationPrice) / installments).toFixed(2);
    const currentRevenueShare = isAnnual ? annualRevenueShare : revenueShare;
    const currentRevenuePercent = isAnnual ? annualRevenueSharePercent : revenueSharePercent;

    return (
      <Card 
        className={`p-6 transition-all duration-300 cursor-pointer hover:shadow-lg ${
          isSelected 
            ? 'border-2 border-primary bg-primary/5' 
            : 'hover:border-primary/50'
        }`}
        onClick={() => onPlanSelect?.(isAnnual ? 'annual' : 'monthly')}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold">
              Plano {isAnnual ? 'Anual' : 'Mensal'}
            </h3>
            {isAnnual && (
              <span className="text-sm text-green-600 font-medium">
                Economia de 1% no Revenue Share
              </span>
            )}
          </div>
          {isSelected && <Check className="text-primary h-5 w-5" />}
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Implementação</span>
              <div className="text-right">
                <div className="font-semibold">{formatCurrency(implementationPrice)}</div>
                <div className="text-sm text-gray-600">
                  {installments}x de {formatCurrency(installmentValue)}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Manutenção Mensal</span>
              <div className="font-semibold">{formatCurrency(maintenancePrice)}</div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Revenue Share</span>
                <HoverCard>
                  <HoverCardTrigger>
                    <Info className="h-4 w-4 text-gray-400" />
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <p className="text-sm">
                      {currentRevenuePercent}% sobre o faturamento mensal
                    </p>
                  </HoverCardContent>
                </HoverCard>
              </div>
              <div className="font-semibold">{formatCurrency(currentRevenueShare)}/mês</div>
            </div>
          </div>

          {!selectedPlan && (
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => onPlanSelect?.(isAnnual ? 'annual' : 'monthly')}
            >
              Selecionar {isAnnual ? 'Plano Anual' : 'Plano Mensal'}
            </Button>
          )}
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderPlanOption(false)} {/* Monthly Plan */}
        {renderPlanOption(true)}  {/* Annual Plan */}
      </div>

      {selectedPlan && (
        <Card className="p-4 bg-gray-50">
          <div className="text-sm text-gray-600">
            Total de horas estimadas: <span className="font-semibold">{totalHours}h</span>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ConsoleOutput;