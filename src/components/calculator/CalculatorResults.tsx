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
    totalHours: number;
  };
  onContactClick: () => void;
  layoutHours: number;
  maintenanceHours: number;
  meetingHours: number;
  campaignHours: number;
  functionalityHours: number;
};

const MAX_HOURS = {
  layout: 100,
  maintenance: 30,
  meeting: 50,
  campaign: 30,
  functionality: 200
};

const CalculatorResults = ({ 
  prices, 
  onContactClick,
  layoutHours,
  maintenanceHours,
  meetingHours,
  campaignHours,
  functionalityHours
}: CalculatorResultsProps) => {
  const isExceedingLimits = 
    layoutHours > MAX_HOURS.layout ||
    maintenanceHours > MAX_HOURS.maintenance ||
    meetingHours > MAX_HOURS.meeting ||
    campaignHours > MAX_HOURS.campaign ||
    functionalityHours > MAX_HOURS.functionality;

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
        {isExceedingLimits ? "Solicitar Orçamento" : "Contratar"}
      </Button>
    </div>
  );
};

export default CalculatorResults;