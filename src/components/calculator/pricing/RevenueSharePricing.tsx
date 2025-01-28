interface RevenueSharePricingProps {
  monthlyRevenue: string;
  percentage?: string;
}

export const calculateRevenueShare = (revenue: string, percentage: string = "3"): string => {
  return ((Number(revenue) * Number(percentage)) / 100).toString();
};

const RevenueSharePricing = ({ monthlyRevenue, percentage = "3" }: RevenueSharePricingProps) => {
  const revenueShare = calculateRevenueShare(monthlyRevenue, percentage);
  
  return (
    <div className="p-4 rounded-lg bg-white/5">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm text-gray-300">Comissão sobre Faturamento</span>
      </div>
      <p className="text-2xl font-bold">{percentage}%</p>
      <p className="text-sm text-gray-400">
        {new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(Number(revenueShare))}/mês
      </p>
    </div>
  );
};

export default RevenueSharePricing;