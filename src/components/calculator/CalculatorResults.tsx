import { Button } from "../ui/button";

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
    <div className="space-y-4">
      <div className="rounded-lg border p-4 space-y-4">
        <div>
          <div className="text-sm text-muted-foreground">Custo Base de Implementação</div>
          <div className="text-lg font-medium">R$ {prices.baseImplementationCost}</div>
          <div className="text-sm text-muted-foreground mt-2">Preço Final de Implementação (único)</div>
          <div className="text-2xl font-bold">R$ {prices.implementationPrice}</div>
        </div>
        
        <div>
          <div className="text-sm text-muted-foreground">Custo Base de Manutenção</div>
          <div className="text-lg font-medium">R$ {prices.baseMaintenanceCost}</div>
          <div className="text-sm text-muted-foreground mt-2">Preço Final de Manutenção Mensal</div>
          <div className="text-2xl font-bold">R$ {prices.maintenancePrice}</div>
        </div>
        
        <div>
          <div className="text-sm text-muted-foreground">
            Taxa sobre Receita ({prices.revenueSharePercent}%)
          </div>
          <div className="text-2xl font-bold">R$ {prices.revenueShare}/mês</div>
        </div>
      </div>

      <Button className="w-full" onClick={onContactClick}>
        Solicitar Orçamento
      </Button>
    </div>
  );
};

export default CalculatorResults;