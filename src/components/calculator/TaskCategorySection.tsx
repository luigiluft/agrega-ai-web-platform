import { useState, useEffect } from "react";
import { Task, TaskCategorySectionProps } from "@/types/calculator-types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import TaskSelector from "./TaskSelector";
import { ecommerceExtensions } from "@/data/ecommerceExtensions";

const TaskCategorySection = ({
  onTasksChange,
  selectedPlan,
  selectedExtensions,
  onExtensionToggle,
  prices
}: TaskCategorySectionProps) => {
  const [activeTab, setActiveTab] = useState("implementation");
  const [implementationTasks, setImplementationTasks] = useState<Task[]>([]);
  const [maintenanceTasks, setMaintenanceTasks] = useState<Task[]>([]);
  const [extensionTasks, setExtensionTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Pre-select all sections by triggering their content with delay
    const tabs = ["implementation", "maintenance", "extensions"];
    tabs.forEach((tab, index) => {
      setTimeout(() => {
        setActiveTab(tab);
      }, index * 1000);
    });
  }, []);

  const handleTasksChange = (newTasks: Task[], category: string) => {
    switch (category) {
      case "implementation":
        setImplementationTasks(newTasks.filter(t => t.type !== "recurring"));
        break;
      case "maintenance":
        setMaintenanceTasks(newTasks.filter(t => t.type === "recurring"));
        break;
      case "extensions":
        setExtensionTasks(newTasks);
        break;
    }

    // Combine all tasks and notify parent
    const allTasks = [
      ...implementationTasks,
      ...maintenanceTasks,
      ...extensionTasks
    ].filter((task, index, self) => 
      index === self.findIndex(t => t.id === task.id)
    );

    onTasksChange(allTasks);
  };

  const filteredExtensions = selectedPlan.id === 'express'
    ? ecommerceExtensions.filter(ext => ext.isBasic)
    : ecommerceExtensions;

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">
            Configuração do Projeto
          </h3>
          <p className="text-sm text-gray-500">
            Selecione as funcionalidades que deseja incluir no seu projeto
          </p>
        </div>

        <Tabs
          defaultValue="implementation"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="w-full justify-start mb-8">
            <TabsTrigger value="implementation">
              Implementação
            </TabsTrigger>
            <TabsTrigger value="maintenance">
              Sustentação
            </TabsTrigger>
            <TabsTrigger value="extensions">
              Extensões
            </TabsTrigger>
          </TabsList>

          <div className="mt-4 space-y-4">
            <TabsContent value="implementation">
              <TaskSelector
                onTasksChange={(tasks) => handleTasksChange(tasks, "implementation")}
                filter="implementation"
                selectedPlan={selectedPlan}
                selectedTasks={implementationTasks}
              />
            </TabsContent>
            
            <TabsContent value="maintenance">
              <TaskSelector
                onTasksChange={(tasks) => handleTasksChange(tasks, "maintenance")}
                filter="maintenance"
                selectedPlan={selectedPlan}
                selectedTasks={maintenanceTasks}
              />
            </TabsContent>
            
            <TabsContent value="extensions">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredExtensions.map((extension) => (
                  <Card
                    key={extension.id}
                    className="p-4 hover:shadow-md transition-shadow"
                  >
                    <h4 className="font-medium mb-2">{extension.name}</h4>
                    <p className="text-sm text-gray-500 mb-4">
                      {extension.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        R$ {extension.price.toFixed(2)}
                      </span>
                      <button 
                        className="text-primary hover:underline text-sm"
                        onClick={() => onExtensionToggle(extension.id, !selectedExtensions.has(extension.id))}
                      >
                        {selectedExtensions.has(extension.id) ? 'Remover' : 'Adicionar'}
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </Card>
  );
};

export default TaskCategorySection;