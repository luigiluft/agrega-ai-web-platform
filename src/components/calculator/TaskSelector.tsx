import { useState, useEffect } from "react";
import { Task, TaskType } from "@/types/calculator-types";
import { Card } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
import { Folder } from "lucide-react";
import { calculatorTasks } from "@/data/calculatorTasks";
import TaskDependencyView from "./TaskDependencyView";

interface TaskSelectorProps {
  onTasksChange: (selectedTasks: Task[]) => void;
}

const TaskSelector = ({ onTasksChange }: TaskSelectorProps) => {
  const [selectedTaskIds, setSelectedTaskIds] = useState<Set<string>>(new Set());
  
  const allTasks = calculatorTasks.flatMap(category => category.tasks);
  
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

  const handleTaskSelection = (taskId: string, checked: boolean) => {
    const newSelectedIds = new Set(selectedTaskIds);
    
    if (checked) {
      newSelectedIds.add(taskId);
      // Add dependencies
      const deps = getDependentTasks(taskId);
      deps.essential.forEach(task => newSelectedIds.add(task.id));
      deps.recurring.forEach(task => newSelectedIds.add(task.id));
    } else {
      newSelectedIds.delete(taskId);
      // Remove dependencies if no other task requires them
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

  return (
    <div className="space-y-6">
      {calculatorTasks.map((category) => (
        <Card key={category.id} className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Folder className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">{category.name}</h3>
          </div>
          <div className="space-y-4">
            {category.tasks.filter(task => task.type === 'optional').map((task) => (
              <div key={task.id}>
                <div className="flex items-center space-x-3 p-3">
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
      ))}
    </div>
  );
};

export default TaskSelector;