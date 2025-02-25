
import { Extension } from "@/types/calculator-types";
import { Card } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { Info, Check, Plus } from "lucide-react";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

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
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = Array.from(new Set(extensions.map(ext => ext.category)));

  const filteredExtensions = extensions.filter(ext => {
    const matchesPrice = 
      priceFilter === 'all' ? true :
      priceFilter === 'free' ? ext.price === 0 :
      ext.price > 0;
    
    const matchesSearch = ext.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ext.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesPrice && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex gap-2">
          <Badge 
            variant={priceFilter === 'all' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setPriceFilter('all')}
          >
            Todas
          </Badge>
          <Badge 
            variant={priceFilter === 'free' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setPriceFilter('free')}
          >
            Gratuitas
          </Badge>
          <Badge 
            variant={priceFilter === 'paid' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setPriceFilter('paid')}
          >
            Pagas
          </Badge>
        </div>
        <input
          type="text"
          placeholder="Buscar extensões..."
          className="px-4 py-2 border rounded-md w-full md:w-auto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue={categories[0]} className="w-full">
        <TabsList className="w-full flex flex-wrap justify-start">
          {categories.map(category => (
            <TabsTrigger 
              key={category} 
              value={category}
              className="flex-1 md:flex-none"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(category => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredExtensions
                .filter(ext => ext.category === category)
                .map((extension) => (
                <motion.div
                  key={extension.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card 
                    className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-lg border-2 
                      ${selectedExtensions.has(extension.id)
                        ? "border-primary bg-primary/5"
                        : "border-transparent hover:border-primary/20"
                      }`}
                    onClick={() => onExtensionToggle(extension.id, !selectedExtensions.has(extension.id))}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div 
                          className={`w-6 h-6 rounded-full flex items-center justify-center border-2 
                            ${selectedExtensions.has(extension.id)
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
                            className={extension.price === 0 
                              ? "bg-green-100 text-green-800" 
                              : "bg-primary/10 text-primary"}
                          >
                            {extension.price === 0 
                              ? "Gratuito" 
                              : `R$ ${extension.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
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
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ExtensionSelector;
