import { Info, Star } from "lucide-react";
import { Task } from "@/types/calculator-types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "../ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface TaskDependencyViewProps {
  task: Task;
  dependencies: {
    essential: Task[];
    recurring: Task[];
  };
  isSelected: boolean;
  points?: number;
}

const TaskDependencyView = ({ task, dependencies, isSelected, points = 0 }: TaskDependencyViewProps) => {
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

  const getDependencyReason = (mainTask: Task, dependentTask: Task) => {
    if (dependentTask.type === "essential") {
      return `Esta tarefa é necessária para garantir o funcionamento correto de ${mainTask.name}. Ela fornece a base técnica necessária para a implementação.`;
    }
    return `Esta tarefa de sustentação é necessária para manter ${mainTask.name} funcionando adequadamente ao longo do tempo.`;
  };

  return (
    <div className="flex-1 space-y-2">
      <div className="flex items-start gap-2">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{task.name}</span>
            {points > 0 && (
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm">{points}</span>
              </div>
            )}
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
                  <Popover>
                    <PopoverTrigger>
                      <Info className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Por que esta tarefa é necessária?</p>
                        <p className="text-sm text-muted-foreground">
                          {getDependencyReason(task, dep)}
                        </p>
                        <div className="text-sm">
                          <p className="font-medium">Descrição da tarefa:</p>
                          <p className="text-muted-foreground">{dep.description}</p>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              ))}
            </div>
          )}

          {dependencies.recurring.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="h-5">Sustentação</Badge>
                <p className="text-sm text-muted-foreground">
                  Tarefas mensais necessárias:
                </p>
              </div>
              {dependencies.recurring.map((dep) => (
                <div key={dep.id} className="flex items-center gap-2 bg-background/80 p-2 rounded-sm">
                  <span className="text-sm">{dep.name}</span>
                  <Badge variant={getBadgeVariant(dep.type)}>
                    {dep.hours}h/mês
                  </Badge>
                  <Popover>
                    <PopoverTrigger>
                      <Info className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Por que esta sustentação é necessária?</p>
                        <p className="text-sm text-muted-foreground">
                          {getDependencyReason(task, dep)}
                        </p>
                        <div className="text-sm">
                          <p className="font-medium">Descrição da tarefa:</p>
                          <p className="text-muted-foreground">{dep.description}</p>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
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