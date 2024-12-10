import { Button } from "../ui/button";
import { Card } from "../ui/card";

type CalculatorResultsProps = {
  prices: {
    implementationPrice: string;
    maintenancePrice: string;
    revenueShare: string;
    baseImplementationCost: string;
    baseMaintenanceCost: string;
    revenueSharePercent: string;
  };
  onContactClick: () => void;
};

const CalculatorResults = ({ prices, onContactClick }: CalculatorResultsProps) => {
  return (
    <div className="space-y-4 mt-8">
      <Card className="p-6 space-y-6 bg-gradient-to-br from-background to-secondary/5">
        <div className="space-y-4">
          <div className="pb-4 border-b">
            <div className="text-sm text-muted-foreground">Implementação</div>
            <div className="flex items-baseline justify-between mt-1">
              <div className="text-2xl font-bold">
                R$ {prices.implementationPrice}
              </div>
              <div className="text-sm text-muted-foreground">
                pagamento único
              </div>
            </div>
          </div>
          
          <div className="pb-4 border-b">
            <div className="text-sm text-muted-foreground">Manutenção Mensal</div>
            <div className="flex items-baseline justify-between mt-1">
              <div className="text-2xl font-bold">
                R$ {prices.maintenancePrice}
              </div>
              <div className="text-sm text-muted-foreground">
                por mês
              </div>
            </div>
          </div>
          
          <div>
            <div className="text-sm text-muted-foreground">
              Comissão sobre Vendas
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <div className="text-2xl font-bold">
                {prices.revenueSharePercent}%
              </div>
              <div className="text-sm text-muted-foreground">
                do faturamento
              </div>
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              Aproximadamente R$ {prices.revenueShare}/mês
            </div>
          </div>
        </div>
      </Card>

      <Button 
        className="w-full bg-primary hover:bg-primary/90 text-white"
        size="lg"
        onClick={onContactClick}
      >
        Solicitar Orçamento
      </Button>
    </div>
  );
};

export default CalculatorResults;