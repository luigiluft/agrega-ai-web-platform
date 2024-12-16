import { useState, useEffect } from "react";
import { Task, TaskType } from "@/types/calculator-types";
import { Card } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
import { Folder, Info } from "lucide-react";
import { calculatorTasks } from "@/data/calculatorTasks";
import { ecommerceTasks } from "@/data/ecommerceTasks";
import TaskDependencyView from "./TaskDependencyView";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import ExtensionSelector from "./ExtensionSelector";
import { ecommerceExtensions, getExtensionsByCategory } from "@/data/ecommerceExtensions";

interface TaskSelectorProps {
  onTasksChange: (selectedTasks: Task[]) => void;
}

const TaskSelector = ({ onTasksChange }: TaskSelectorProps) => {
  const [selectedTaskIds, setSelectedTaskIds] = useState<Set<string>>(new Set());
  const [selectedExtensions, setSelectedExtensions] = useState<Set<string>>(new Set());
  
  const allTasks = [
    ...calculatorTasks
      .filter(category => category.id !== "sustentation")
      .flatMap(category => category.tasks),
    ...ecommerceTasks.flatMap(category => category.tasks)
  ];
  
  const getTaskById = (id: string) => allTasks.find(task => task.id === id);

  const getDependentTasks = (taskId: string) => {
    const task = getTaskById(taskId);
    if (!task?.dependencies) {
      return {
        essential: [],
        recurring: []
      };
    }

    const essentialTasks = task.dependencies.essential
      .map(id => getTaskById(id))
      .filter((t): t is Task => t !== undefined);

    const recurringTasks = task.dependencies.recurring
      .map(id => getTaskById(id))
      .filter((t): t is Task => t !== undefined);

    return {
      essential: essentialTasks,
      recurring: recurringTasks
    };
  };
  
  const handleTaskSelection = (taskId: string, checked: boolean) => {
    const newSelectedIds = new Set(selectedTaskIds);
    
    if (checked) {
      newSelectedIds.add(taskId);
      const task = getTaskById(taskId);
      if (task?.dependencies) {
        task.dependencies.essential.forEach(id => newSelectedIds.add(id));
        task.dependencies.recurring.forEach(id => newSelectedIds.add(id));
      }
    } else {
      newSelectedIds.delete(taskId);
      // Remove dependencies if not required by other tasks
      const task = getTaskById(taskId);
      if (task?.dependencies) {
        [...task.dependencies.essential, ...task.dependencies.recurring].forEach(depId => {
          const isRequiredByOther = Array.from(newSelectedIds).some(selectedId => {
            if (selectedId === taskId) return false;
            const otherTask = getTaskById(selectedId);
            if (!otherTask?.dependencies) return false;
            return [...otherTask.dependencies.essential, ...otherTask.dependencies.recurring]
              .includes(depId);
          });
          if (!isRequiredByOther) {
            newSelectedIds.delete(depId);
          }
        });
      }
    }
    
    setSelectedTaskIds(newSelectedIds);
  };

  const handleExtensionToggle = (extensionId: string, checked: boolean) => {
    const newSelectedExtensions = new Set(selectedExtensions);
    if (checked) {
      newSelectedExtensions.add(extensionId);
    } else {
      newSelectedExtensions.delete(extensionId);
    }
    setSelectedExtensions(newSelectedExtensions);
  };

  useEffect(() => {
    const selectedTasks = allTasks.filter(task => selectedTaskIds.has(task.id));
    onTasksChange(selectedTasks);
  }, [selectedTaskIds, selectedExtensions]);

  const renderTaskCategory = (category: typeof calculatorTasks[0] | typeof ecommerceTasks[0]) => (
    <Card key={category.id} className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Folder className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">{category.name}</h3>
        <Tooltip>
          <TooltipTrigger>
            <Info className="w-4 h-4 text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs">
              Selecione as tarefas desejadas. As dependências essenciais e recorrentes 
              serão incluídas automaticamente.
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="space-y-4">
        {category.tasks
          .filter(task => task.type === 'optional')
          .map((task) => (
          <div key={task.id} className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex items-center space-x-3 p-4">
              <Checkbox
                id={task.id}
                checked={selectedTaskIds.has(task.id)}
                onCheckedChange={(checked) => 
                  handleTaskSelection(task.id, checked as boolean)
                }
              />
              <TaskDependencyView
                task={task}
                dependencies={getDependentTasks(task.id)}
                isSelected={selectedTaskIds.has(task.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      {calculatorTasks
        .filter(category => category.id !== "sustentation")
        .map(renderTaskCategory)}
      {ecommerceTasks.map(renderTaskCategory)}
      
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Extensões Disponíveis</h3>
        {Array.from(getExtensionsByCategory().entries()).map(([category, extensions]) => (
          <div key={category} className="mb-6">
            <h4 className="text-lg font-medium mb-3">{category}</h4>
            <ExtensionSelector
              extensions={extensions}
              selectedExtensions={selectedExtensions}
              onExtensionToggle={handleExtensionToggle}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskSelector;