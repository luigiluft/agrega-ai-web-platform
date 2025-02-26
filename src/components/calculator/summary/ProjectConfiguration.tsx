
import { Package, Calendar, Palette, Database, Shield, Rocket, Gauge, Clock, Check } from "lucide-react";
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
  poHours?: number;
  totalHours?: number;
}

const ProjectConfiguration = ({
  poFrequency,
  selectedTheme,
  hasCRM,
  crmName,
  selectedERP,
  security = [],
  marketing = [],
  performance = [],
  poHours,
  totalHours
}: ProjectConfigurationProps) => {
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const getPoFrequencyText = (hours: number) => {
    switch (hours) {
      case 4:
        return "1 reunião mensal de alinhamento + pequenas alterações";
      case 8:
        return "2 reuniões mensais + implementação de melhorias";
      case 16:
        return "Reuniões semanais + desenvolvimento contínuo";
      case 32:
        return "Dedicação parcial + desenvolvimento avançado";
      default:
        return `${hours} horas/mês`;
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Cabeçalho do Projeto */}
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <Package className="w-5 h-5 text-primary" />
            Resumo do Projeto
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm text-gray-600">Total de Horas:</span>
              <Badge variant="secondary">{totalHours}h</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm text-gray-600">Previsão de Entrega:</span>
              <Badge variant="secondary">{Math.ceil((totalHours || 0) / 6)} semanas</Badge>
            </div>
          </div>
        </div>

        <Separator />

        {/* Suporte e Manutenção */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            Suporte e Manutenção
          </h4>
          <div className="bg-accent/20 p-4 rounded-lg">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Suporte do Product Owner</p>
                <Badge>{poHours}h/mês</Badge>
              </div>
              <p className="text-sm text-gray-600">
                {poHours && getPoFrequencyText(poHours)}
              </p>
            </div>
          </div>
        </div>

        {/* Design e Tema */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <Palette className="w-4 h-4 text-primary" />
            Design e Tema
          </h4>
          <div className="bg-accent/20 p-4 rounded-lg">
            {selectedTheme ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Tema Personalizado</p>
                  <Badge variant="secondary">+50h</Badge>
                </div>
                <p className="text-sm text-gray-600">
                  Design customizado com sua identidade visual
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-600">
                Tema padrão otimizado para conversão
              </p>
            )}
          </div>
        </div>

        {/* Integrações */}
        {(hasCRM || selectedERP) && (
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <Database className="w-4 h-4 text-primary" />
              Integrações
            </h4>
            <div className="bg-accent/20 p-4 rounded-lg space-y-4">
              {(hasCRM || crmName) && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">CRM</p>
                    <Badge variant="secondary">+8h</Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Integração com {crmName || "CRM personalizado"}
                  </p>
                </div>
              )}
              {selectedERP && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">ERP</p>
                    <Badge variant="secondary">+16h</Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Integração com {selectedERP.charAt(0).toUpperCase() + selectedERP.slice(1)}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Recursos Adicionais */}
        {(security.length > 0 || marketing.length > 0 || performance.length > 0) && (
          <div className="space-y-3">
            <h4 className="font-medium">Recursos Adicionais</h4>
            <div className="space-y-4">
              {/* Segurança */}
              {security.length > 0 && (
                <div className="bg-accent/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-primary" />
                    <p className="text-sm font-medium">Segurança e Compliance</p>
                  </div>
                  <div className="space-y-2">
                    {security.map(id => {
                      const option = securityOptions.find(opt => opt.id === id);
                      return option && (
                        <div key={id} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-500" />
                          <p className="text-sm text-gray-600">{option.name}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Marketing */}
              {marketing.length > 0 && (
                <div className="bg-accent/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Rocket className="w-4 h-4 text-primary" />
                    <p className="text-sm font-medium">Marketing Digital</p>
                  </div>
                  <div className="space-y-2">
                    {marketing.map(id => {
                      const option = marketingOptions.find(opt => opt.id === id);
                      return option && (
                        <div key={id} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-500" />
                          <p className="text-sm text-gray-600">{option.name}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Performance */}
              {performance.length > 0 && (
                <div className="bg-accent/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Gauge className="w-4 h-4 text-primary" />
                    <p className="text-sm font-medium">Performance e Acessibilidade</p>
                  </div>
                  <div className="space-y-2">
                    {performance.map(id => {
                      const option = performanceOptions.find(opt => opt.id === id);
                      return option && (
                        <div key={id} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-500" />
                          <p className="text-sm text-gray-600">{option.name}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProjectConfiguration;
