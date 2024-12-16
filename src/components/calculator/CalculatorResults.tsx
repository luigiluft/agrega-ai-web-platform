import React from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Mail, PhoneCall, DollarSign, Clock, Percent } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import { CalculatorResultsProps } from '@/types/calculator';
import { Separator } from '../ui/separator';

const CalculatorResults = ({
  implementationPrice,
  maintenancePrice,
  revenueShare,
  revenueSharePercent,
  monthlyRevenue,
  setMonthlyRevenue,
  onContactClick,
  layoutHours,
  maintenanceHours,
  meetingHours,
  campaignHours,
  functionalityHours,
  baseImplementationCost,
  baseMaintenanceCost,
  totalHours,
  rouletteDiscount,
  totalImplementationHours,
}: CalculatorResultsProps) => {
  const formatPrice = (price: string | number) => {
    return Number(price).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const renderPriceContext = () => {
    const features = [];
    if (layoutHours > 0) features.push("Layout personalizado");
    if (functionalityHours > 0) features.push("Funcionalidades avançadas");
    if (maintenanceHours > 0) features.push("Suporte técnico");
    
    return features.length > 0 
      ? `Inclui: ${features.join(", ")}`
      : "Personalize seu projeto selecionando as funcionalidades desejadas";
  };

  return (
    <div className="space-y-6">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="sticky top-4 z-10"
        >
          <Card className="overflow-hidden bg-gradient-calculator text-white">
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="pb-4 border-b border-white/20">
                  <div className="text-sm opacity-90 mb-2">
                    {renderPriceContext()}
                  </div>
                  <div className="flex items-baseline justify-between">
                    <div className="text-3xl font-bold">
                      {formatPrice(implementationPrice)}
                    </div>
                    <div className="text-sm opacity-90">
                      Implementação
                    </div>
                  </div>
                  {rouletteDiscount > 0 && (
                    <div className="mt-2 text-sm text-green-200">
                      Desconto aplicado: {formatPrice(rouletteDiscount)}
                    </div>
                  )}
                </div>
                
                <div className="pb-4 border-b border-white/20">
                  <div className="flex items-baseline justify-between">
                    <div className="text-2xl font-bold">
                      {formatPrice(maintenancePrice)}
                    </div>
                    <div className="text-sm opacity-90">
                      Mensal
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-baseline justify-between">
                    <div className="text-2xl font-bold">
                      {revenueSharePercent}%
                    </div>
                    <div className="text-sm opacity-90">
                      Comissão sobre vendas
                    </div>
                  </div>
                  <div className="mt-1 text-sm opacity-90">
                    Aproximadamente {formatPrice(revenueShare)}/mês
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="mt-4 p-6 bg-white/5 backdrop-blur-sm">
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Resumo do Projeto</Label>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Horas de Implementação:</span>
                  <span>{totalImplementationHours}h</span>
                </div>
                <div className="flex justify-between">
                  <span>Horas de Manutenção Mensal:</span>
                  <span>{maintenanceHours}h</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total de Horas:</span>
                  <span>{totalHours}h</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4 p-6 rounded-xl bg-gradient-to-br from-white to-orange-50 border border-orange-100 shadow-lg backdrop-blur-sm"
      >
        <Label className="text-lg font-semibold text-gray-800">Faturamento Mensal Estimado</Label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 h-4 w-4" />
          <Input
            type="number"
            value={monthlyRevenue}
            onChange={(e) => setMonthlyRevenue?.(e.target.value)}
            min="0"
            step="1000"
            className="pl-10 bg-white/50 border-orange-200 focus:border-orange-500 focus:ring-orange-500 transition-all duration-300"
            placeholder="Digite o faturamento mensal estimado"
          />
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Button 
          variant="outline"
          className="w-full space-x-2 border-orange-200 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300 group"
          onClick={onContactClick}
        >
          <Mail className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
          <span>Receber por Email</span>
        </Button>
        
        <Button 
          variant="default"
          className="w-full space-x-2 bg-gradient-calculator hover:from-orange-600 hover:to-orange-700 transition-all duration-300 group"
          onClick={onContactClick}
        >
          <PhoneCall className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
          <span>Falar com Consultor</span>
        </Button>
      </motion.div>
    </div>
  );
};

export default CalculatorResults;