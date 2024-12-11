import React from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Mail, PhoneCall, DollarSign, Clock, Percent } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import { CalculatorResultsProps } from '@/types/calculator';

const CalculatorResults = ({
  implementationPrice,
  maintenancePrice,
  revenueShare,
  revenueSharePercent,
  monthlyRevenue,
  setMonthlyRevenue,
  onContactClick,
}: CalculatorResultsProps) => {
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
          <Card className="overflow-hidden transform hover:scale-[1.01] transition-all duration-300 bg-gradient-to-br from-white to-orange-50">
            <div className="p-6 space-y-6">
              <div className="space-y-6">
                <motion.div 
                  className="pb-6 border-b border-orange-100"
                  key={implementationPrice}
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <span>Implementação (pagamento único)</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <div className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                      R$ {implementationPrice}
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="pb-6 border-b border-orange-100"
                  key={maintenancePrice}
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <DollarSign className="h-4 w-4 text-orange-500" />
                    <span>Sustentação Mensal</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <div className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                      R$ {maintenancePrice}
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  key={revenueShare}
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Percent className="h-4 w-4 text-orange-500" />
                    <span>Fee sobre Faturamento</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <div className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                      {revenueSharePercent}%
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    Aproximadamente R$ {revenueShare}/mês
                  </div>
                </motion.div>
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
            onChange={(e) => setMonthlyRevenue(e.target.value)}
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
          className="w-full space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-300 group"
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