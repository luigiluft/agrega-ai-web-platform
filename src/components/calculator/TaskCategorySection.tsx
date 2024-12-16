import { useState } from "react";
import { Task } from "@/types/calculator-types";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import TaskSelector from "./TaskSelector";
import ExtensionSelector from "./ExtensionSelector";
import { ecommerceExtensions } from "@/data/ecommerceExtensions";
import { motion } from "framer-motion";

interface TaskCategorySectionProps {
  onTasksChange: (tasks: Task[]) => void;
  selectedExtensions: Set<string>;
  onExtensionToggle: (extensionId: string, checked: boolean) => void;
}

const TaskCategorySection = ({
  onTasksChange,
  selectedExtensions,
  onExtensionToggle
}: TaskCategorySectionProps) => {
  const [activeTab, setActiveTab] = useState("implementation");

  return (
    <Card className="p-6 space-y-6 bg-white shadow-lg rounded-xl border border-gray-100">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Configurar Projeto
        </h2>
        <p className="text-gray-600">
          Selecione as funcionalidades desejadas para seu projeto
        </p>
      </div>

      <Tabs 
        defaultValue="implementation" 
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
              onTasksChange={onTasksChange}
              filter="implementation"
            />
          </TabsContent>
          
          <TabsContent value="maintenance">
            <TaskSelector 
              onTasksChange={onTasksChange}
              filter="maintenance"
            />
          </TabsContent>
          
          <TabsContent value="extensions">
            <ExtensionSelector
              extensions={ecommerceExtensions}
              selectedExtensions={selectedExtensions}
              onExtensionToggle={onExtensionToggle}
            />
          </TabsContent>
        </motion.div>
      </Tabs>
    </Card>
  );
};

export default TaskCategorySection;