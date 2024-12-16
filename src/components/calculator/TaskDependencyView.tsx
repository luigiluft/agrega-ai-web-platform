import { ArrowRight, Check, Circle, MinusCircle, Folder } from "lucide-react";
import { Task } from "@/types/calculator-types";
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
  return (
    <div className="space-y-2 p-4 rounded-lg border bg-white/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/80">
      <div className="flex items-center gap-2">
        {isSelected ? (
          <Check className="w-5 h-5 text-green-500" />
        ) : (
          <MinusCircle className="w-5 h-5 text-gray-400" />
        )}
        <span className="font-medium">{task.name}</span>
        <Badge variant={task.type === 'optional' ? 'default' : task.type === 'essential' ? 'secondary' : 'outline'}>
          {task.type}
        </Badge>
      </div>
      
      {isSelected && (dependencies.essential.length > 0 || dependencies.recurring.length > 0) && (
        <div className="pl-6 mt-2 space-y-2 border-l-2 border-dashed border-gray-200">
          {dependencies.essential.map((dep) => (
            <div key={dep.id} className="flex items-center gap-2 text-sm">
              <ArrowRight className="w-4 h-4 text-orange-500" />
              <span>{dep.name}</span>
              <Badge variant="secondary" className="text-xs">essencial</Badge>
            </div>
          ))}
          
          {dependencies.recurring.map((dep) => (
            <div key={dep.id} className="flex items-center gap-2 text-sm">
              <ArrowRight className="w-4 h-4 text-green-500" />
              <span>{dep.name}</span>
              <Badge variant="outline" className="text-xs">recorrente</Badge>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskDependencyView;