import React from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Mail, PhoneCall, DollarSign, Clock, Percent } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { motion } from 'framer-motion';

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
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4 p-6 rounded-xl bg-white/50 border border-orange-100 shadow-sm backdrop-blur-sm"
      >
        <Label className="text-lg font-semibold text-gray-800">Faturamento Mensal Estimado</Label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="number"
            value={monthlyRevenue}
            onChange={(e) => setMonthlyRevenue(e.target.value)}
            min="0"
            step="1000"
            className="pl-10 bg-white border-orange-200 focus:border-orange-500 focus:ring-orange-500"
            placeholder="Digite o faturamento mensal estimado"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="overflow-hidden">
          <div className="p-6 space-y-6 bg-gradient-to-br from-white to-orange-50">
            <div className="space-y-6">
              <div className="pb-6 border-b border-orange-100">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Clock className="h-4 w-4 text-orange-500" />
                  <span>Implementação (pagamento único)</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <div className="text-3xl font-bold text-gray-900">
                    R$ {implementationPrice}
                  </div>
                </div>
              </div>
              
              <div className="pb-6 border-b border-orange-100">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <DollarSign className="h-4 w-4 text-orange-500" />
                  <span>Sustentação Mensal</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <div className="text-3xl font-bold text-gray-900">
                    R$ {maintenancePrice}
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Percent className="h-4 w-4 text-orange-500" />
                  <span>Fee sobre Faturamento</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <div className="text-3xl font-bold text-gray-900">
                    {revenueSharePercent}%
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  Aproximadamente R$ {revenueShare}/mês
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Button 
          variant="outline"
          className="w-full space-x-2 border-orange-200 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300"
          onClick={onContactClick}
        >
          <PhoneCall className="w-4 h-4" />
          <span>Falar com Consultor</span>
        </Button>
        
        <Button 
          variant="default"
          className="w-full space-x-2 bg-orange-500 hover:bg-orange-600 transition-all duration-300"
          onClick={onContactClick}
        >
          <Mail className="w-4 h-4" />
          <span>Receber por Email</span>
        </Button>
      </motion.div>
    </div>
  );
};

export default CalculatorResults;