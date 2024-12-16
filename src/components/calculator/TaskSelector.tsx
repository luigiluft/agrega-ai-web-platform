import { useState, useEffect } from "react";
import { Task, TaskType } from "@/types/calculator-types";
import { Card } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
import { calculatorTasks } from "@/data/calculatorTasks";

interface TaskSelectorProps {
  onTasksChange: (selectedTasks: Task[]) => void;
}

const TaskSelector = ({ onTasksChange }: TaskSelectorProps) => {
  const [selectedTaskIds, setSelectedTaskIds] = useState<Set<string>>(new Set());
  
  const allTasks = calculatorTasks.flatMap(category => category.tasks);
  
  const getTaskById = (id: string) => allTasks.find(task => task.id === id);
  
  const getDependentTasks = (taskId: string): string[] => {
    const task = getTaskById(taskId);
    if (!task?.dependencies) return [];
    
    return [
      ...task.dependencies.essential,
      ...task.dependencies.recurring
    ];
  };

  const handleTaskSelection = (taskId: string, checked: boolean) => {
    const newSelectedIds = new Set(selectedTaskIds);
    
    if (checked) {
      newSelectedIds.add(taskId);
      // Add dependencies
      getDependentTasks(taskId).forEach(depId => newSelectedIds.add(depId));
    } else {
      newSelectedIds.delete(taskId);
      // Remove dependencies if no other task requires them
      getDependentTasks(taskId).forEach(depId => {
        const isRequiredByOther = Array.from(newSelectedIds).some(selectedId => {
          if (selectedId === taskId) return false;
          return getDependentTasks(selectedId).includes(depId);
        });
        if (!isRequiredByOther) {
          newSelectedIds.delete(depId);
        }
      });
    }
    
    setSelectedTaskIds(newSelectedIds);
  };

  useEffect(() => {
    const selectedTasks = allTasks.filter(task => selectedTaskIds.has(task.id));
    onTasksChange(selectedTasks);
  }, [selectedTaskIds]);

  const getTaskTypeColor = (type: TaskType) => {
    switch (type) {
      case 'optional':
        return 'bg-blue-100 text-blue-800';
      case 'essential':
        return 'bg-orange-100 text-orange-800';
      case 'recurring':
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="space-y-6">
      {calculatorTasks.map((category) => (
        <Card key={category.id} className="p-6">
          <h3 className="text-lg font-semibold mb-4">{category.name}</h3>
          <div className="space-y-4">
            {category.tasks.map((task) => (
              <div 
                key={task.id}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {task.type === 'optional' ? (
                  <Checkbox
                    id={task.id}
                    checked={selectedTaskIds.has(task.id)}
                    onCheckedChange={(checked) => 
                      handleTaskSelection(task.id, checked as boolean)
                    }
                  />
                ) : (
                  <div className="w-4 h-4 mt-1 rounded-sm border border-gray-300 bg-gray-100" />
                )}
                <div className="grid gap-1.5 leading-none flex-1">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor={task.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {task.name}
                    </label>
                    <Badge className={getTaskTypeColor(task.type)}>
                      {task.type === 'optional' ? 'Opcional' : 
                       task.type === 'essential' ? 'Essencial' : 'Recorrente'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {task.story} • {task.hours}h
                  </p>
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