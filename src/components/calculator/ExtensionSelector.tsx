import { Extension } from "@/types/calculator-types";
import { Card } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Info } from "lucide-react";
import { Badge } from "../ui/badge";

interface ExtensionSelectorProps {
  extensions: Extension[];
  selectedExtensions: Set<string>;
  onExtensionToggle: (extensionId: string, checked: boolean) => void;
}

const ExtensionSelector = ({
  extensions,
  selectedExtensions,
  onExtensionToggle,
}: ExtensionSelectorProps) => {
  return (
    <div className="space-y-4">
      {extensions.map((extension) => (
        <Card key={extension.id} className="p-4 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start gap-4">
            <Checkbox
              id={extension.id}
              checked={selectedExtensions.has(extension.id)}
              onCheckedChange={(checked) => 
                onExtensionToggle(extension.id, checked as boolean)
              }
            />
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <label
                  htmlFor={extension.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {extension.name}
                </label>
                <HoverCard>
                  <HoverCardTrigger>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-2">
                      <p className="text-sm">{extension.description}</p>
                      <div className="flex gap-2">
                        <Badge variant="secondary">
                          {extension.implementationHours}h implementação
                        </Badge>
                        <Badge variant="outline">
                          {extension.maintenanceHours}h/mês manutenção
                        </Badge>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
              <p className="text-sm text-muted-foreground">
                {extension.description}
              </p>
              <div className="mt-2">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  R$ {extension.price.toFixed(2)}
                </Badge>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ExtensionSelector;