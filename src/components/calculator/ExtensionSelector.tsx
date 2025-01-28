import { Extension } from "@/types/calculator-types";
import { Card } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Info, Check, Plus } from "lucide-react";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";

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
  // Group extensions by category
  const groupedExtensions = extensions.reduce((acc, extension) => {
    const category = extension.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(extension);
    return acc;
  }, {} as Record<string, Extension[]>);

  return (
    <div className="space-y-8">
      {Object.entries(groupedExtensions).map(([category, categoryExtensions]) => (
        <div key={category} className="space-y-4">
          <h3 className="text-lg font-semibold text-primary">{category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryExtensions.map((extension) => (
              <motion.div
                key={extension.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${
                    selectedExtensions.has(extension.id)
                      ? "border-primary bg-primary/5"
                      : "border-transparent hover:border-primary/20"
                  }`}
                  onClick={() => onExtensionToggle(extension.id, !selectedExtensions.has(extension.id))}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div 
                        className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                          selectedExtensions.has(extension.id)
                            ? "bg-primary border-primary text-white"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedExtensions.has(extension.id) ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Plus className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{extension.name}</h4>
                          <HoverCard>
                            <HoverCardTrigger>
                              <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                            </HoverCardTrigger>
                            <HoverCardContent className="w-80">
                              <div className="space-y-2">
                                <p className="text-sm">{extension.description}</p>
                                <div className="flex flex-wrap gap-2">
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
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {extension.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge 
                          variant="secondary" 
                          className="bg-primary/10 text-primary font-semibold"
                        >
                          R$ {extension.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </Badge>
                        <span className="text-sm text-primary font-medium">
                          {selectedExtensions.has(extension.id) ? 'Remover' : 'Adicionar'}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExtensionSelector;