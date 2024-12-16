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

interface TaskSelectorProps {
  onTasksChange: (selectedTasks: Task[]) => void;
}

const TaskSelector = ({ onTasksChange }: TaskSelectorProps) => {
  const [selectedTaskIds, setSelectedTaskIds] = useState<Set<string>>(new Set());
  
  const allTasks = [
    ...calculatorTasks
      .filter(category => category.id !== "sustentation")
      .flatMap(category => category.tasks),
    ...ecommerceTasks.flatMap(category => category.tasks)
  ];
  
  const getTaskById = (id: string) => allTasks.find(task => task.id === id);
  
  const getDependentTasks = (taskId: string): {
    essential: Task[];
    recurring: Task[];
  } => {
    const task = getTaskById(taskId);
    if (!task?.dependencies) return { essential: [], recurring: [] };
    
    return {
      essential: task.dependencies.essential.map(id => getTaskById(id)).filter(Boolean) as Task[],
      recurring: task.dependencies.recurring.map(id => getTaskById(id)).filter(Boolean) as Task[]
    };
  };

  const calculatePoints = (task: Task): number => {
    const basePoints = Math.floor(task.hours / 4);
    const deps = getDependentTasks(task.id);
    const depPoints = [...deps.essential, ...deps.recurring]
      .reduce((sum, dep) => sum + Math.floor(dep.hours / 8), 0);
    return basePoints + depPoints;
  };

  const handleTaskSelection = (taskId: string, checked: boolean) => {
    const newSelectedIds = new Set(selectedTaskIds);
    
    if (checked) {
      newSelectedIds.add(taskId);
      const deps = getDependentTasks(taskId);
      deps.essential.forEach(task => newSelectedIds.add(task.id));
      deps.recurring.forEach(task => newSelectedIds.add(task.id));
    } else {
      newSelectedIds.delete(taskId);
      const deps = getDependentTasks(taskId);
      [...deps.essential, ...deps.recurring].forEach(depTask => {
        const isRequiredByOther = Array.from(newSelectedIds).some(selectedId => {
          if (selectedId === taskId) return false;
          const otherDeps = getDependentTasks(selectedId);
          return [...otherDeps.essential, ...otherDeps.recurring].some(d => d.id === depTask.id);
        });
        if (!isRequiredByOther) {
          newSelectedIds.delete(depTask.id);
        }
      });
    }
    
    setSelectedTaskIds(newSelectedIds);
  };

  useEffect(() => {
    const selectedTasks = allTasks.filter(task => selectedTaskIds.has(task.id));
    onTasksChange(selectedTasks);
  }, [selectedTaskIds]);

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
                points={calculatePoints(task)}
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
    </div>
  );
};

export default TaskSelector;