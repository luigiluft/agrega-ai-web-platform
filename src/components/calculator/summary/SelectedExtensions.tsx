
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ecommerceExtensions } from "@/data/ecommerceExtensions";

interface SelectedExtensionsProps {
  selectedExtensions: Set<string>;
}

const SelectedExtensions = ({ selectedExtensions }: SelectedExtensionsProps) => {
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const selectedExtensionDetails = Array.from(selectedExtensions).map(id => 
    ecommerceExtensions.find(ext => ext.id === id)
  ).filter(Boolean);

  return (
    <>
      <Separator />
      <div>
        <h4 className="font-medium mb-3">Extensões Selecionadas</h4>
        <div className="space-y-2">
          {selectedExtensionDetails.map((ext) => (
            <div key={ext?.id} className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span className="text-sm">{ext?.name}</span>
              <Badge variant="outline" className="ml-auto">
                {formatCurrency(ext?.price || 0)}
              </Badge>
            </div>
          ))}
          {selectedExtensionDetails.length === 0 && (
            <p className="text-sm text-gray-500 italic">Nenhuma extensão selecionada</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SelectedExtensions;
