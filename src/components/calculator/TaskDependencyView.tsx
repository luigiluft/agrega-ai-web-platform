import { Info } from "lucide-react";
import { Task } from "@/types/calculator-types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "../ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

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

  const getTypeDescription = (type: string) => {
    switch (type) {
      case "optional":
        return "Tarefa opcional que pode ser incluída conforme necessidade";
      case "essential":
        return "Tarefa essencial incluída automaticamente";
      case "recurring":
        return "Tarefa recorrente que será executada mensalmente";
      default:
        return "";
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
            <Tooltip>
              <TooltipTrigger>
                <Badge variant={getBadgeVariant(task.type)} className="ml-2">
                  {task.type}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>{getTypeDescription(task.type)}</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{task.story}</p>
        </div>
      </div>

      {isSelected && (dependencies.essential.length + dependencies.recurring.length > 0) && (
        <div className="pl-4 border-l-2 border-primary/20 space-y-3 rounded-sm bg-primary/5 p-3">
          {dependencies.essential.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="h-5">Essencial</Badge>
                <p className="text-sm text-muted-foreground">
                  Tarefas necessárias para implementação:
                </p>
              </div>
              {dependencies.essential.map((dep) => (
                <div key={dep.id} className="flex items-center gap-2 bg-background/80 p-2 rounded-sm">
                  <span className="text-sm">{dep.name}</span>
                  <Badge variant={getBadgeVariant(dep.type)}>
                    {dep.hours}h
                  </Badge>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{dep.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              ))}
            </div>
          )}

          {dependencies.recurring.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="h-5">Recorrente</Badge>
                <p className="text-sm text-muted-foreground">
                  Tarefas mensais incluídas:
                </p>
              </div>
              {dependencies.recurring.map((dep) => (
                <div key={dep.id} className="flex items-center gap-2 bg-background/80 p-2 rounded-sm">
                  <span className="text-sm">{dep.name}</span>
                  <Badge variant={getBadgeVariant(dep.type)}>
                    {dep.hours}h/mês
                  </Badge>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{dep.description}</p>
                    </TooltipContent>
                  </Tooltip>
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