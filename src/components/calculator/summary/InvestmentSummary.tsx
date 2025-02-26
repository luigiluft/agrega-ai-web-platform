
import { Clock, Calculator, Package, Calendar, Database, Palette, Code } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plan } from "@/types/calculator-types";

interface InvestmentSummaryProps {
  totalPrice: number;
  maintenancePrice: number;
  revenueShare: number;
  totalHours: number;
  onPlanSelect: (plan: Plan) => void;
  selectedPlan: Plan | null;
  securityCost: number;
  marketingCost: number;
  performanceCost: number;
  supportCost: number;
  integrationsCost: number;
  maintenanceTasksCost: number;
  baseImplementationCost: number;
  extensionsImplementationCost: number;
  themeCustomizationCost: number;
}

const InvestmentSummary = ({
  totalPrice,
  maintenancePrice,
  revenueShare,
  totalHours,
  selectedPlan,
  securityCost,
  marketingCost,
  performanceCost,
  supportCost,
  integrationsCost,
  maintenanceTasksCost,
  baseImplementationCost,
  extensionsImplementationCost,
  themeCustomizationCost
}: InvestmentSummaryProps) => {
  const REVENUE_SHARE_PERCENT = "3";
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const installments = 12; // Plano anual fixo
  const installmentValue = totalPrice / installments;

  return (
    <Card className="p-6 space-y-6 border-2 border-orange-200">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Calculator className="w-5 h-5 text-orange-500" />
          Investimento
        </h3>
        <Badge variant="secondary" className="bg-orange-100 text-orange-600">
          Plano Anual
        </Badge>
      </div>

      <div className="space-y-4">
        <div className="bg-orange-50 p-4 rounded-lg space-y-3">
          <h4 className="font-medium text-gray-700 flex items-center gap-2">
            <Package className="w-4 h-4 text-orange-500" />
            Implementação
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Desenvolvimento base</span>
              <span>{formatCurrency(baseImplementationCost)}</span>
            </div>
            {extensionsImplementationCost > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Extensões</span>
                <span>{formatCurrency(extensionsImplementationCost)}</span>
              </div>
            )}
            {themeCustomizationCost > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Personalização do tema</span>
                <span>{formatCurrency(themeCustomizationCost)}</span>
              </div>
            )}
            {securityCost > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Segurança e Compliance</span>
                <span>{formatCurrency(securityCost)}</span>
              </div>
            )}
            {marketingCost > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Marketing Digital</span>
                <span>{formatCurrency(marketingCost)}</span>
              </div>
            )}
            {performanceCost > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Performance e Acessibilidade</span>
                <span>{formatCurrency(performanceCost)}</span>
              </div>
            )}
            <Separator className="my-2" />
            <div className="flex justify-between items-center font-medium">
              <span>Total da Implementação</span>
              <span className="text-lg">{formatCurrency(totalPrice)}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Parcelamento</span>
              <span>{installments}x de {formatCurrency(installmentValue)}</span>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg space-y-3">
          <h4 className="font-medium text-gray-700 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-orange-500" />
            Sustentação Mensal
          </h4>
          <div className="space-y-2">
            {maintenanceTasksCost > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Manutenção básica</span>
                <span>{formatCurrency(maintenanceTasksCost)}</span>
              </div>
            )}
            {supportCost > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Suporte P.O.</span>
                <span>{formatCurrency(supportCost)}</span>
              </div>
            )}
            {integrationsCost > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Integrações</span>
                <span>{formatCurrency(integrationsCost)}</span>
              </div>
            )}
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Revenue Share ({REVENUE_SHARE_PERCENT}%)</span>
              <span>{formatCurrency(revenueShare)}/mês</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between items-center font-medium">
              <span>Total Mensal</span>
              <span className="text-lg">{formatCurrency(maintenancePrice)}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Total de Horas</span>
            <Badge variant="secondary">{totalHours}h</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Previsão de Entrega</span>
            <Badge variant="secondary">{Math.ceil(totalHours / 6)} semanas</Badge>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default InvestmentSummary;
