import { useState } from "react";
import NavigationMenuDemo from "@/components/NavigationMenu";
import { useToast } from "@/components/ui/use-toast";
import { Task } from "@/types/calculator-types";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Mail, PhoneCall } from "lucide-react";
import TaskSelector from "@/components/calculator/TaskSelector";
import ExtensionSelector from "@/components/calculator/ExtensionSelector";
import { ecommerceExtensions } from "@/data/ecommerceExtensions";
import { motion } from "framer-motion";

const DynamicCalculator = () => {
  const { toast } = useToast();
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);
  const [selectedExtensions, setSelectedExtensions] = useState<Set<string>>(new Set());
  const [monthlyRevenue, setMonthlyRevenue] = useState<string>("50000");

  const handleExtensionToggle = (extensionId: string, checked: boolean) => {
    const newSelectedExtensions = new Set(selectedExtensions);
    if (checked) {
      newSelectedExtensions.add(extensionId);
    } else {
      newSelectedExtensions.delete(extensionId);
    }
    setSelectedExtensions(newSelectedExtensions);
  };

  const calculatePrices = () => {
    const implementationTasks = selectedTasks.filter(task => 
      task.type === 'essential' || task.type === 'optional'
    );
    
    const maintenanceTasks = selectedTasks.filter(task => 
      task.type === 'recurring'
    );

    const implementationHours = implementationTasks.reduce(
      (total, task) => total + task.hours, 
      0
    );

    const maintenanceHours = maintenanceTasks.reduce(
      (total, task) => total + task.hours, 
      0
    );

    const rate = 150;
    const monthlyRate = 200;
    
    const implementationPrice = implementationHours * rate;
    const maintenancePrice = maintenanceHours * monthlyRate;
    
    const revenue = parseFloat(monthlyRevenue) || 0;
    const revenueSharePercent = revenue <= 50000 ? 15 
      : revenue <= 100000 ? 12 
      : revenue <= 200000 ? 10 
      : 8;
    const revenueShare = (revenue * revenueSharePercent) / 100;

    return {
      implementationPrice: implementationPrice.toFixed(2),
      maintenancePrice: maintenancePrice.toFixed(2),
      revenueShare: revenueShare.toFixed(2),
      revenueSharePercent: revenueSharePercent.toString(),
      totalHours: implementationHours + maintenanceHours
    };
  };

  const prices = calculatePrices();

  const handleContactClick = () => {
    toast({
      title: "Orçamento solicitado",
      description: "Em breve nossa equipe entrará em contato com você.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <NavigationMenuDemo />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Calculadora de Preços
            </h1>
            <p className="text-lg text-gray-600">
              Configure seu projeto e receba um orçamento personalizado
            </p>
          </div>

          <Card className="p-6">
            <Tabs defaultValue="implementation" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="implementation" className="space-x-2">
                  <Calculator className="w-4 h-4" />
                  <span>Implementação</span>
                </TabsTrigger>
                <TabsTrigger value="maintenance" className="space-x-2">
                  <Badge variant="secondary">Sustentação</Badge>
                </TabsTrigger>
                <TabsTrigger value="extensions" className="space-x-2">
                  <Badge variant="outline">Extensões</Badge>
                </TabsTrigger>
              </TabsList>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value="implementation">
                  <TaskSelector 
                    onTasksChange={setSelectedTasks}
                    filter="implementation"
                  />
                </TabsContent>

                <TabsContent value="maintenance">
                  <TaskSelector 
                    onTasksChange={setSelectedTasks}
                    filter="maintenance"
                  />
                </TabsContent>

                <TabsContent value="extensions">
                  <ExtensionSelector
                    extensions={ecommerceExtensions}
                    selectedExtensions={selectedExtensions}
                    onExtensionToggle={handleExtensionToggle}
                  />
                </TabsContent>
              </motion.div>
            </Tabs>
          </Card>

          <Card className="p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Faturamento Mensal Estimado</h3>
              <div className="space-y-2">
                <Label>Valor Mensal (R$)</Label>
                <Input
                  type="number"
                  value={monthlyRevenue}
                  onChange={(e) => setMonthlyRevenue(e.target.value)}
                  min="0"
                  step="1000"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-primary/5 rounded-lg">
                  <p className="text-sm text-gray-600">Implementação</p>
                  <p className="text-2xl font-bold">R$ {prices.implementationPrice}</p>
                </div>
                <div className="p-4 bg-secondary/5 rounded-lg">
                  <p className="text-sm text-gray-600">Mensalidade</p>
                  <p className="text-2xl font-bold">R$ {prices.maintenancePrice}</p>
                </div>
                <div className="p-4 bg-accent/5 rounded-lg">
                  <p className="text-sm text-gray-600">Revenue Share</p>
                  <p className="text-2xl font-bold">{prices.revenueSharePercent}%</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline"
                className="w-full space-x-2"
                onClick={handleContactClick}
              >
                <Mail className="w-4 h-4" />
                <span>Receber por Email</span>
              </Button>
              
              <Button 
                variant="default"
                className="w-full space-x-2"
                onClick={handleContactClick}
              >
                <PhoneCall className="w-4 h-4" />
                <span>Falar com Consultor</span>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DynamicCalculator;