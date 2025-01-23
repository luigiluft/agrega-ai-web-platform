import { useState, useEffect } from "react";
import { Task } from "@/types/calculator-types";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import TaskSelector from "./TaskSelector";
import ExtensionSelector from "./ExtensionSelector";
import { ecommerceExtensions } from "@/data/ecommerceExtensions";
import { motion } from "framer-motion";
import { Plan } from "./PlanSelector";
import ConsoleOutput from "./ConsoleOutput";

interface TaskCategorySectionProps {
  onTasksChange: (tasks: Task[]) => void;
  selectedExtensions: Set<string>;
  onExtensionToggle: (extensionId: string, checked: boolean) => void;
  prices: any;
  selectedPlan: Plan;
}

const TaskCategorySection = ({
  onTasksChange,
  selectedExtensions,
  onExtensionToggle,
  prices,
  selectedPlan
}: TaskCategorySectionProps) => {
  const [activeTab, setActiveTab] = useState("implementation");
  const [selectedImplementationTasks, setSelectedImplementationTasks] = useState<Task[]>([]);
  const [selectedMaintenanceTasks, setSelectedMaintenanceTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Pre-select all sections by triggering their content with delay
    ["implementation", "maintenance", "extensions"].forEach((tab, index) => {
      setTimeout(() => {
        setActiveTab(tab);
      }, index * 500);
    });
  }, []);

  const handleTasksChange = (tasks: Task[], filter: string) => {
    if (filter === "implementation") {
      setSelectedImplementationTasks(tasks.filter(t => t.type !== "recurring"));
    } else if (filter === "maintenance") {
      setSelectedMaintenanceTasks(tasks.filter(t => t.type === "recurring"));
    }
    
    // Combine both implementation and maintenance tasks
    const allTasks = [
      ...selectedImplementationTasks,
      ...selectedMaintenanceTasks
    ];
    
    onTasksChange(allTasks);
  };

  const filteredExtensions = selectedPlan.id === 'express'
    ? ecommerceExtensions.filter(ext => ext.price <= 500)
    : ecommerceExtensions;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="p-6 space-y-6 bg-white shadow-lg rounded-xl border border-gray-100">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Configurar {selectedPlan.name}
          </h2>
          <p className="text-gray-600">
            Selecione as funcionalidades desejadas para seu projeto
          </p>
        </div>

        <Tabs 
          value={activeTab}
          className="w-full"
          onValueChange={(value) => setActiveTab(value)}
        >
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger 
              value="implementation" 
              className="space-x-2 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
            >
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                Implementação
              </Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="maintenance" 
              className="space-x-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
            >
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                Sustentação
              </Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="extensions" 
              className="space-x-2 data-[state=active]:bg-green-100 data-[state=active]:text-green-700"
            >
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Extensões
              </Badge>
            </TabsTrigger>
          </TabsList>
          
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TabsContent value="implementation">
              <TaskSelector 
                onTasksChange={(tasks) => handleTasksChange(tasks, "implementation")}
                filter="implementation"
                selectedPlan={selectedPlan}
              />
            </TabsContent>
            
            <TabsContent value="maintenance">
              <TaskSelector 
                onTasksChange={(tasks) => handleTasksChange(tasks, "maintenance")}
                filter="maintenance"
                selectedPlan={selectedPlan}
              />
            </TabsContent>
            
            <TabsContent value="extensions">
              <ExtensionSelector
                extensions={filteredExtensions}
                selectedExtensions={selectedExtensions}
                onExtensionToggle={onExtensionToggle}
              />
            </TabsContent>
          </motion.div>
        </Tabs>
      </Card>

      <div className="lg:sticky lg:top-4">
        <ConsoleOutput
          implementationTasks={prices.implementationTasks}
          maintenanceTasks={prices.maintenanceTasks}
          implementationPrice={prices.implementationPrice}
          maintenancePrice={prices.maintenancePrice}
          revenueShare={prices.revenueShare}
          revenueSharePercent={prices.revenueSharePercent}
          totalHours={prices.totalHours}
        />
      </div>
    </div>
  );
};

export default TaskCategorySection;