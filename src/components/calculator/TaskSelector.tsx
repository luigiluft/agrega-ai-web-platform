import { useState } from "react";
import { Task } from "@/types/calculator-types";
import { Card } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Info } from "lucide-react";
import { Badge } from "../ui/badge";
import { calculatorTasks } from "@/data/calculatorTasks";
import { ecommerceTasks } from "@/data/ecommerceTasks";
import { motion } from "framer-motion";

interface TaskSelectorProps {
  onTasksChange: (tasks: Task[]) => void;
  filter?: "implementation" | "maintenance";
}

const TaskSelector = ({
  onTasksChange,
  filter = "implementation"
}: TaskSelectorProps) => {
  const [selectedTaskIds, setSelectedTaskIds] = useState<Set<string>>(new Set());
  
  const allTasks = [
    ...calculatorTasks
      .filter(category => category.id !== "sustentation")
      .flatMap(category => category.tasks),
    ...ecommerceTasks.flatMap(category => category.tasks)
  ];

  const filteredTasks = allTasks.filter(task => {
    if (filter === "implementation") {
      return task.type === "essential" || task.type === "optional";
    } else {
      return task.type === "recurring";
    }
  });

  const handleTaskSelection = (taskId: string, checked: boolean) => {
    const newSelectedIds = new Set(selectedTaskIds);
    
    if (checked) {
      newSelectedIds.add(taskId);
      const task = allTasks.find(t => t.id === taskId);
      if (task?.dependencies) {
        task.dependencies.essential.forEach(id => newSelectedIds.add(id));
        task.dependencies.recurring.forEach(id => newSelectedIds.add(id));
      }
    } else {
      newSelectedIds.delete(taskId);
    }
    
    setSelectedTaskIds(newSelectedIds);
    const selectedTasks = allTasks.filter(task => newSelectedIds.has(task.id));
    onTasksChange(selectedTasks);
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "essential":
        return "bg-purple-100 text-purple-700";
      case "optional":
        return "bg-blue-100 text-blue-700";
      case "recurring":
        return "bg-green-100 text-green-700";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-4">
      {filteredTasks.map((task, index) => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="p-4 hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-gray-200">
            <div className="flex items-start gap-4">
              <Checkbox
                id={task.id}
                checked={selectedTaskIds.has(task.id)}
                onCheckedChange={(checked) => 
                  handleTaskSelection(task.id, checked as boolean)
                }
              />
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <label
                    htmlFor={task.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {task.name}
                  </label>
                  <Badge variant="secondary" className={getBadgeColor(task.type)}>
                    {task.hours}h
                  </Badge>
                  <HoverCard>
                    <HoverCardTrigger>
                      <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors cursor-help" />
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">{task.description}</p>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="text-xs">
                            {task.category}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {task.story}
                          </Badge>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
                <p className="text-sm text-gray-500">
                  {task.description}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default TaskSelector;