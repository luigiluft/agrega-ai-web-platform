
import { useState, useEffect } from "react";
import { Task, TaskSelectorProps } from "@/types/calculator-types";
import { Card } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Info } from "lucide-react";
import { calculatorTasks } from "@/data/calculatorTasks";

const TaskSelector = ({
  onTasksChange,
  filter = "implementation",
  selectedPlan,
  selectedTasks
}: TaskSelectorProps) => {
  const [selectedTaskIds, setSelectedTaskIds] = useState<Set<string>>(new Set());

  // Filter tasks based on the filter prop
  const filteredTasks = calculatorTasks
    .flatMap(category => category.tasks)
    .filter(task => {
      if (filter === "implementation") {
        return task.type !== "recurring";
      } else if (filter === "maintenance") {
        return task.type === "recurring";
      }
      return true;
    });

  useEffect(() => {
    // Update selectedTaskIds when selectedTasks prop changes
    const newSelectedIds = new Set(selectedTasks.map(task => task.id));
    setSelectedTaskIds(newSelectedIds);
  }, [selectedTasks]);

  const handleTaskSelection = (taskId: string, checked: boolean) => {
    const newSelectedIds = new Set(selectedTaskIds);
    
    if (checked) {
      newSelectedIds.add(taskId);
    } else {
      newSelectedIds.delete(taskId);
    }
    
    setSelectedTaskIds(newSelectedIds);
    
    // Convert selected IDs back to tasks
    const selectedTasks = filteredTasks.filter(task => 
      newSelectedIds.has(task.id)
    );
    
    onTasksChange(selectedTasks);
  };

  // Pre-select tasks based on the selected plan
  useEffect(() => {
    const tasksToPreselect = filteredTasks.filter(task => {
      switch (selectedPlan.id) {
        case 'express':
          return task.isBasic;
        case 'standard':
          return task.isBasic || task.isStandard;
        case 'premium':
          return true;
        default:
          return false;
      }
    });

    const preselectedIds = new Set(tasksToPreselect.map(task => task.id));
    setSelectedTaskIds(preselectedIds);
    onTasksChange(tasksToPreselect);
  }, [selectedPlan.id, filter]);

  return (
    <div className="space-y-4">
      {filteredTasks.map((task) => (
        <Card key={task.id} className="p-4">
          <div className="flex items-start gap-4">
            <Checkbox
              id={task.id}
              checked={selectedTaskIds.has(task.id)}
              onCheckedChange={(checked) => 
                handleTaskSelection(task.id, checked as boolean)
              }
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Label htmlFor={task.id} className="font-medium">
                  {task.name}
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{task.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {task.hours}h estimadas
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium">R$ {(task.hours * 185).toFixed(2)}</p>
              {task.type === "recurring" && (
                <p className="text-sm text-gray-500">mensal</p>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TaskSelector;
