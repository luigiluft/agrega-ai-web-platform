
import { Package, Calendar, Palette, Database } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ProjectConfigurationProps {
  poFrequency?: string;
  selectedTheme?: string;
  hasCRM?: boolean;
  crmName?: string;
  selectedERP?: string | null;
}

const ProjectConfiguration = ({
  poFrequency,
  selectedTheme,
  hasCRM,
  crmName,
  selectedERP
}: ProjectConfigurationProps) => {
  return (
    <Card className="p-6 space-y-6">
      <h3 className="text-xl font-semibold flex items-center gap-2">
        <Package className="w-5 h-5 text-primary" />
        Configurações do Projeto
      </h3>
      <div className="space-y-4">
        {/* Frequência de PO */}
        <div className="flex items-start gap-4">
          <Calendar className="w-5 h-5 text-gray-500 mt-1" />
          <div>
            <h4 className="font-medium">Frequência de Reuniões</h4>
            <p className="text-sm text-gray-600">{poFrequency || "Quinzenal"}</p>
          </div>
        </div>

        {/* Tema */}
        <div className="flex items-start gap-4">
          <Palette className="w-5 h-5 text-gray-500 mt-1" />
          <div>
            <h4 className="font-medium">Tema</h4>
            <p className="text-sm text-gray-600">
              {selectedTheme === 'custom' ? 'Tema Personalizado (50h)' : 'Tema Padrão (2h)'}
            </p>
          </div>
        </div>

        {/* Integrações */}
        <div className="flex items-start gap-4">
          <Database className="w-5 h-5 text-gray-500 mt-1" />
          <div className="space-y-2">
            <h4 className="font-medium">Integrações</h4>
            {hasCRM && (
              <p className="text-sm text-gray-600">
                CRM: {crmName || "Integração personalizada"}
              </p>
            )}
            {selectedERP && (
              <p className="text-sm text-gray-600">
                ERP: {selectedERP.charAt(0).toUpperCase() + selectedERP.slice(1)}
              </p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProjectConfiguration;
