
import { Package, Calendar, Palette, Database, Shield, Rocket, Gauge } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  SecurityFeature, 
  MarketingFeature, 
  PerformanceFeature 
} from "@/types/calculator-new-features";
import { 
  securityOptions, 
  marketingOptions, 
  performanceOptions 
} from "@/data/additionalFeatures";

interface ProjectConfigurationProps {
  poFrequency?: string;
  selectedTheme?: string;
  hasCRM?: boolean;
  crmName?: string;
  selectedERP?: string | null;
  security?: SecurityFeature[];
  marketing?: MarketingFeature[];
  performance?: PerformanceFeature[];
}

const ProjectConfiguration = ({
  poFrequency,
  selectedTheme,
  hasCRM,
  crmName,
  selectedERP,
  security = [],
  marketing = [],
  performance = []
}: ProjectConfigurationProps) => {
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

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

        <Separator />

        {/* Segurança */}
        {security.length > 0 && (
          <div className="flex items-start gap-4">
            <Shield className="w-5 h-5 text-gray-500 mt-1" />
            <div className="space-y-2">
              <h4 className="font-medium">Segurança e Compliance</h4>
              <div className="space-y-1">
                {security.map(id => {
                  const option = securityOptions.find(opt => opt.id === id);
                  return option ? (
                    <div key={id} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{option.name}</span>
                      <Badge variant="outline">{formatCurrency(option.price)}</Badge>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          </div>
        )}

        {/* Marketing */}
        {marketing.length > 0 && (
          <div className="flex items-start gap-4">
            <Rocket className="w-5 h-5 text-gray-500 mt-1" />
            <div className="space-y-2">
              <h4 className="font-medium">Marketing Digital</h4>
              <div className="space-y-1">
                {marketing.map(id => {
                  const option = marketingOptions.find(opt => opt.id === id);
                  return option ? (
                    <div key={id} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{option.name}</span>
                      <Badge variant="outline">{formatCurrency(option.price)}</Badge>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          </div>
        )}

        {/* Performance */}
        {performance.length > 0 && (
          <div className="flex items-start gap-4">
            <Gauge className="w-5 h-5 text-gray-500 mt-1" />
            <div className="space-y-2">
              <h4 className="font-medium">Performance e Acessibilidade</h4>
              <div className="space-y-1">
                {performance.map(id => {
                  const option = performanceOptions.find(opt => opt.id === id);
                  return option ? (
                    <div key={id} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{option.name}</span>
                      <Badge variant="outline">{formatCurrency(option.price)}</Badge>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProjectConfiguration;
