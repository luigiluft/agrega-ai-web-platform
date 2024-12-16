import { Task } from "@/types/calculator-types";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import TaskSelector from "./TaskSelector";
import { Extension } from "@/types/calculator-types";
import ExtensionSelector from "./ExtensionSelector";

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
  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Configurar Projeto</h2>
        <p className="text-muted-foreground">
          Selecione as funcionalidades desejadas para seu projeto
        </p>
      </div>

      <Tabs defaultValue="implementation" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="implementation" className="space-x-2">
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              Implementação
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="space-x-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              Sustentação
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="extensions" className="space-x-2">
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              Extensões
            </Badge>
          </TabsTrigger>
        </TabsList>
        
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
      </Tabs>
    </Card>
  );
};

export default TaskCategorySection;