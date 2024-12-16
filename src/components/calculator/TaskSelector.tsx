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
        task.dependencies.essential?.forEach(id => newSelectedIds.add(id));
        task.dependencies.recurring?.forEach(id => newSelectedIds.add(id));
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
        return "bg-primary/10 text-primary";
      case "optional":
        return "bg-secondary/10 text-secondary";
      case "recurring":
        return "bg-accent/10 text-accent";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-4">
      {filteredTasks.length === 0 ? (
        <Card className="p-4">
          <p className="text-muted-foreground text-center">
            Nenhuma tarefa disponível para esta categoria.
          </p>
        </Card>
      ) : (
        filteredTasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="p-4 hover:shadow-md transition-all duration-300">
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
                        <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="space-y-2">
                          <p className="text-sm">{task.description}</p>
                          <div className="flex gap-2">
                            <Badge variant="outline">
                              {task.category}
                            </Badge>
                            <Badge variant="outline">
                              {task.story}
                            </Badge>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {task.description}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))
      )}
    </div>
  );
};

export default TaskSelector;