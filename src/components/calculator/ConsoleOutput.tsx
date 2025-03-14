import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Info } from 'lucide-react';
import { Plan } from '@/types/calculator-types';
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
  selectedPlan?: Plan | null;
  onPlanSelect?: (plan: Plan) => void;
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
    const planId = isAnnual ? 'annual' : 'monthly';
    const isSelected = selectedPlan?.id === planId;
    const installments = isAnnual ? 12 : 3;
    const installmentValue = (Number(implementationPrice) / installments).toFixed(2);
    const currentRevenueShare = isAnnual ? annualRevenueShare : revenueShare;
    const currentRevenuePercent = isAnnual ? annualRevenueSharePercent : revenueSharePercent;

    const handlePlanSelect = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (onPlanSelect) {
        onPlanSelect({
          id: planId,
          name: isAnnual ? 'Anual' : 'Mensal',
          description: '',
          features: [],
          baseImplementationPrice: 0,
          baseMaintenancePrice: 0,
          basePOHours: 0,
          maxIntegrations: 0,
          supportLevel: 'basic',
          layout: 'standard'
        });
      }
    };

    return (
      <Card 
        className={`
          p-6 transition-all duration-300 cursor-pointer
          ${isSelected 
            ? 'border-2 border-primary bg-primary/5 shadow-xl ring-2 ring-primary/20' 
            : 'hover:border-primary/50 hover:shadow-md hover:scale-[1.01]'
          }
          ${isSelected ? 'scale-[1.02]' : 'scale-100'}
        `}
        onClick={handlePlanSelect}
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
          {isSelected && (
            <div className="bg-primary/10 p-1.5 rounded-full">
              <Check className="text-primary h-5 w-5" />
            </div>
          )}
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

          <Button 
            variant={isSelected ? "default" : "outline"}
            className={`
              w-full transition-all duration-300
              ${isSelected 
                ? 'bg-primary text-white shadow-md transform scale-[1.02] hover:bg-primary/90' 
                : 'hover:bg-primary/10'
              }
            `}
            onClick={handlePlanSelect}
          >
            {isSelected ? 'Plano Selecionado' : `Selecionar Plano ${isAnnual ? 'Anual' : 'Mensal'}`}
          </Button>
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderPlanOption(false)}
        {renderPlanOption(true)}
      </div>

      {selectedPlan && (
        <Card className="p-4 bg-gray-50 animate-fade-up">
          <div className="text-sm text-gray-600">
            Total de horas estimadas: <span className="font-semibold">{totalHours}h</span>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ConsoleOutput;
