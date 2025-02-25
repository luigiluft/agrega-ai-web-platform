import { Clock } from "lucide-react";
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
  securityCost?: number;
  marketingCost?: number;
  performanceCost?: number;
  supportCost?: number;
}

const InvestmentSummary = ({
  totalPrice,
  maintenancePrice,
  revenueShare,
  totalHours,
  onPlanSelect,
  selectedPlan,
  securityCost = 0,
  marketingCost = 0,
  performanceCost = 0,
  supportCost = 0
}: InvestmentSummaryProps) => {
  const REVENUE_SHARE_PERCENT = "3";
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const additionalCosts = securityCost + marketingCost + performanceCost;
  const finalImplementationPrice = totalPrice + additionalCosts;
  const finalMonthlyPrice = maintenancePrice + supportCost;

  return (
    <Card className="p-6 space-y-6">
      <h3 className="text-xl font-semibold flex items-center gap-2">
        <Clock className="w-5 h-5 text-primary" />
        Investimento
      </h3>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-medium">Implementação</h4>
          <span className="text-lg font-semibold">{formatCurrency(finalImplementationPrice)}</span>
        </div>

        {finalMonthlyPrice > 0 && (
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Manutenção Mensal</h4>
            <span className="text-lg">{formatCurrency(finalMonthlyPrice)}</span>
          </div>
        )}

        <div className="flex justify-between items-center">
          <h4 className="font-medium">Revenue Share</h4>
          <span className="text-lg">{formatCurrency(revenueShare)}/mês</span>
        </div>

        <Separator />

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

        <div className="grid grid-cols-2 gap-4 mt-4">
          <button
            onClick={() => onPlanSelect({ id: 'monthly', name: 'Mensal' } as Plan)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedPlan?.id === 'monthly'
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 hover:border-primary/50'
            }`}
          >
            <h5 className="font-medium">Plano Mensal</h5>
            <p className="text-sm text-gray-500 mt-1">
              {REVENUE_SHARE_PERCENT}% Revenue Share
            </p>
          </button>

          <button
            onClick={() => onPlanSelect({ id: 'annual', name: 'Anual' } as Plan)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedPlan?.id === 'annual'
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 hover:border-primary/50'
            }`}
          >
            <h5 className="font-medium">Plano Anual</h5>
            <p className="text-sm text-gray-500 mt-1">
              {Number(REVENUE_SHARE_PERCENT) - 1}% Revenue Share
            </p>
            <Badge className="mt-2 bg-green-100 text-green-800">
              Economia de 1%
            </Badge>
          </button>
        </div>
      </div>
    </Card>
  );
};

export default InvestmentSummary;
