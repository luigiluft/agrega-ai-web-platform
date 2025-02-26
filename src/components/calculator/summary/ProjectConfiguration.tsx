
import { Package, Calendar, Palette, Database, Shield, Rocket, Gauge, Clock } from "lucide-react";
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
  poHours
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
    <Card className="p-6 space-y-6">
      <h3 className="text-xl font-semibold flex items-center gap-2">
        <Package className="w-5 h-5 text-primary" />
        Configurações do Projeto
      </h3>

      <div className="space-y-6">
        {/* Suporte do PO */}
        <div className="space-y-3">
          <div className="flex items-start gap-4">
            <Clock className="w-5 h-5 text-gray-500 mt-1" />
            <div className="flex-1">
              <h4 className="font-medium">Suporte do Product Owner</h4>
              <p className="text-sm text-gray-600">
                {poHours && getPoFrequencyText(poHours)}
              </p>
            </div>
            <Badge variant="secondary">{poHours}h/mês</Badge>
          </div>
        </div>

        {/* Tema */}
        <div className="space-y-3">
          <div className="flex items-start gap-4">
            <Palette className="w-5 h-5 text-gray-500 mt-1" />
            <div className="flex-1">
              <h4 className="font-medium">Tema</h4>
              {selectedTheme ? (
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-600">Tema personalizado</p>
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20">+50h</Badge>
                </div>
              ) : (
                <p className="text-sm text-gray-600">Tema padrão otimizado</p>
              )}
            </div>
          </div>
        </div>

        <Separator />

        {/* Integrações */}
        <div className="space-y-4">
          <h4 className="font-medium">Integrações</h4>
          
          {/* CRM */}
          {(hasCRM || crmName) && (
            <div className="flex items-start gap-4">
              <Database className="w-5 h-5 text-gray-500 mt-1" />
              <div className="flex-1">
                <p className="text-sm font-medium">CRM</p>
                <p className="text-sm text-gray-600">
                  Integração com {crmName || "CRM personalizado"}
                </p>
                <Badge className="mt-1 bg-primary/10 text-primary hover:bg-primary/20">+8h</Badge>
              </div>
            </div>
          )}

          {/* ERP */}
          {selectedERP && (
            <div className="flex items-start gap-4">
              <Database className="w-5 h-5 text-gray-500 mt-1" />
              <div className="flex-1">
                <p className="text-sm font-medium">ERP</p>
                <p className="text-sm text-gray-600">
                  Integração com {selectedERP.charAt(0).toUpperCase() + selectedERP.slice(1)}
                </p>
                <Badge className="mt-1 bg-primary/10 text-primary hover:bg-primary/20">+16h</Badge>
              </div>
            </div>
          )}
        </div>

        {/* Recursos Adicionais */}
        {(security.length > 0 || marketing.length > 0 || performance.length > 0) && (
          <>
            <Separator />
            <div className="space-y-4">
              <h4 className="font-medium">Recursos Adicionais</h4>

              {/* Segurança */}
              {security.length > 0 && (
                <div className="flex items-start gap-4">
                  <Shield className="w-5 h-5 text-gray-500 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Segurança e Compliance</p>
                    <div className="space-y-1 mt-1">
                      {security.map(id => {
                        const option = securityOptions.find(opt => opt.id === id);
                        return option && (
                          <div key={id} className="flex items-center gap-2">
                            <p className="text-sm text-gray-600">{option.name}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Marketing */}
              {marketing.length > 0 && (
                <div className="flex items-start gap-4">
                  <Rocket className="w-5 h-5 text-gray-500 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Marketing Digital</p>
                    <div className="space-y-1 mt-1">
                      {marketing.map(id => {
                        const option = marketingOptions.find(opt => opt.id === id);
                        return option && (
                          <div key={id} className="flex items-center gap-2">
                            <p className="text-sm text-gray-600">{option.name}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Performance */}
              {performance.length > 0 && (
                <div className="flex items-start gap-4">
                  <Gauge className="w-5 h-5 text-gray-500 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Performance e Acessibilidade</p>
                    <div className="space-y-1 mt-1">
                      {performance.map(id => {
                        const option = performanceOptions.find(opt => opt.id === id);
                        return option && (
                          <div key={id} className="flex items-center gap-2">
                            <p className="text-sm text-gray-600">{option.name}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default ProjectConfiguration;
