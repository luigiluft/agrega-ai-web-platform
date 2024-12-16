import { Info } from "lucide-react";
import { Task } from "@/types/calculator-types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "../ui/badge";

interface TaskDependencyViewProps {
  task: Task;
  dependencies: {
    essential: Task[];
    recurring: Task[];
  };
  isSelected: boolean;
}

const TaskDependencyView = ({ task, dependencies, isSelected }: TaskDependencyViewProps) => {
  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "optional":
        return "default";
      case "essential":
        return "secondary";
      case "recurring":
        return "outline";
      default:
        return "default";
    }
  };

  return (
    <div className="flex-1 space-y-2">
      <div className="flex items-start gap-2">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{task.name}</span>
            <HoverCard>
              <HoverCardTrigger>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <p className="text-sm">{task.description}</p>
                  <div className="text-sm">
                    <span className="font-medium">Horas estimadas:</span> {task.hours}h
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
            <Badge variant={getBadgeVariant(task.type)} className="ml-2">
              {task.type}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{task.story}</p>
        </div>
      </div>

      {isSelected && (dependencies.essential.length + dependencies.recurring.length > 0) && (
        <div className="pl-4 border-l-2 border-muted space-y-3">
          {dependencies.essential.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Tarefas essenciais incluídas:
              </p>
              {dependencies.essential.map((dep) => (
                <div key={dep.id} className="flex items-center gap-2">
                  <span className="text-sm">{dep.name}</span>
                  <Badge variant={getBadgeVariant(dep.type)} size="sm">
                    {dep.hours}h
                  </Badge>
                </div>
              ))}
            </div>
          )}

          {dependencies.recurring.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Tarefas recorrentes incluídas:
              </p>
              {dependencies.recurring.map((dep) => (
                <div key={dep.id} className="flex items-center gap-2">
                  <span className="text-sm">{dep.name}</span>
                  <Badge variant={getBadgeVariant(dep.type)} size="sm">
                    {dep.hours}h/mês
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskDependencyView;