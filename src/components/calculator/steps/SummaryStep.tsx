
import { motion } from "framer-motion";
import { SummaryStepProps } from "@/types/calculator-steps";
import { ecommerceExtensions } from "@/data/ecommerceExtensions";
import { Plan } from "../PlanSelector";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, Clock, Package, Calendar, Palette, Database } from "lucide-react";

const SummaryStep = ({ 
  selectedTasks, 
  selectedExtensions, 
  totalPrice,
  monthlyRevenue = "0",
  onPlanSelect,
  selectedPlan,
  selectedTheme,
  poFrequency,
  hasCRM,
  crmName,
  selectedERP
}: SummaryStepProps & { 
  onPlanSelect: (plan: Plan) => void;
  selectedPlan: Plan | null;
  selectedTheme?: string;
  poFrequency?: string;
  hasCRM?: boolean;
  crmName?: string;
  selectedERP?: string | null;
}) => {
  const { toast } = useToast();
  const maintenanceTasks = selectedTasks.filter(task => task.type === "recurring");
  const implementationTasks = selectedTasks.filter(task => task.type !== "recurring");
  
  const HOUR_RATE = 185;
  const maintenancePrice = maintenanceTasks.reduce((acc, task) => acc + task.hours * HOUR_RATE, 0);
  const REVENUE_SHARE_PERCENT = "3";
  const revenueShare = (Number(monthlyRevenue) * Number(REVENUE_SHARE_PERCENT)) / 100;

  const selectedExtensionDetails = Array.from(selectedExtensions).map(id => 
    ecommerceExtensions.find(ext => ext.id === id)
  ).filter(Boolean);

  const totalHours = selectedTasks.reduce((acc, task) => acc + task.hours, 0) +
    selectedExtensionDetails.reduce((acc, ext) => acc + (ext?.implementationHours || 0), 0);

  const handlePlanSelect = (plan: Plan) => {
    onPlanSelect(plan);
    toast({
      title: "Plano selecionado",
      description: `Você selecionou o plano ${plan.name}`,
    });
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
        Resumo do projeto
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 space-y-6">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            Configurações do Projeto
          </h3>
          <div className="space-y-4">
            {/* Frequência de PO */}
            <div className="flex items-start gap-4">
              <Calendar className="w-5 h-5 text-gray-500 mt-1" />
              <div>
                <h4 className="font-medium">Frequência de Reuniões</h4>
                <p className="text-sm text-gray-600">{poFrequency || "Quinzenal"}</p>
              </div>
            </div>

            {/* Tema */}
            <div className="flex items-start gap-4">
              <Palette className="w-5 h-5 text-gray-500 mt-1" />
              <div>
                <h4 className="font-medium">Tema</h4>
                <p className="text-sm text-gray-600">
                  {selectedTheme === 'custom' ? 'Tema Personalizado (50h)' : 'Tema Padrão (2h)'}
                </p>
              </div>
            </div>

            {/* Integrações */}
            <div className="flex items-start gap-4">
              <Database className="w-5 h-5 text-gray-500 mt-1" />
              <div className="space-y-2">
                <h4 className="font-medium">Integrações</h4>
                {hasCRM && (
                  <p className="text-sm text-gray-600">
                    CRM: {crmName || "Integração personalizada"}
                  </p>
                )}
                {selectedERP && (
                  <p className="text-sm text-gray-600">
                    ERP: {selectedERP.charAt(0).toUpperCase() + selectedERP.slice(1)}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Extensões */}
          <div>
            <h4 className="font-medium mb-3">Extensões Selecionadas</h4>
            <div className="space-y-2">
              {selectedExtensionDetails.map((ext) => (
                <div key={ext?.id} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">{ext?.name}</span>
                  <Badge variant="outline" className="ml-auto">
                    {formatCurrency(ext?.price || 0)}
                  </Badge>
                </div>
              ))}
              {selectedExtensionDetails.length === 0 && (
                <p className="text-sm text-gray-500 italic">Nenhuma extensão selecionada</p>
              )}
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-6">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Investimento
          </h3>

          {/* Monthly Plan */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Implementação</h4>
              <span className="text-lg font-semibold">{formatCurrency(totalPrice)}</span>
            </div>

            {maintenancePrice > 0 && (
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Manutenção Mensal</h4>
                <span className="text-lg">{formatCurrency(maintenancePrice)}</span>
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
                onClick={() => handlePlanSelect({ id: 'monthly', name: 'Mensal' } as Plan)}
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
                onClick={() => handlePlanSelect({ id: 'annual', name: 'Anual' } as Plan)}
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
      </div>
    </div>
  );
};

export default SummaryStep;
