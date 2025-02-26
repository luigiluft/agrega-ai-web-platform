
import { Package, Calendar, Palette, Database, Shield, Rocket, Gauge, Clock, Check, DollarSign, ListChecks } from "lucide-react";
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
    <div className="space-y-8">
      {/* Card Principal */}
      <Card className="p-6 border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white">
        <div className="space-y-6">
          {/* Cabeçalho */}
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-orange-600">
              Resumo do Projeto
            </h3>
            <p className="text-gray-600">
              Revisão das premissas e escopo selecionados
            </p>
          </div>

          {/* Métricas Principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-100">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-orange-500" />
                <h4 className="font-semibold text-gray-800">Escopo do Projeto</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total de Horas</span>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                    {totalHours}h
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Previsão de Entrega</span>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                    {Math.ceil((totalHours || 0) / 6)} semanas
                  </Badge>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-100">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-orange-500" />
                <h4 className="font-semibold text-gray-800">Suporte Mensal</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Horas P.O.</span>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                    {poHours}h/mês
                  </Badge>
                </div>
                <p className="text-sm text-gray-500">
                  {poHours && getPoFrequencyText(poHours)}
                </p>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Personalizações */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-orange-500" />
              <h4 className="font-semibold text-gray-800">Personalização</h4>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-100">
              <p className="text-gray-600">
                {selectedTheme ? (
                  <div className="flex items-center justify-between">
                    <span>Tema personalizado com sua identidade visual</span>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700">+50h</Badge>
                  </div>
                ) : (
                  "Tema padrão otimizado para conversão"
                )}
              </p>
            </div>
          </div>

          {/* Integrações */}
          {(hasCRM || selectedERP) && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-orange-500" />
                <h4 className="font-semibold text-gray-800">Integrações</h4>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-100 space-y-4">
                {(hasCRM || crmName) && (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">CRM</p>
                      <p className="text-sm text-gray-500">
                        Integração com {crmName || "CRM personalizado"}
                      </p>
                    </div>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700">+8h</Badge>
                  </div>
                )}
                {selectedERP && (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">ERP</p>
                      <p className="text-sm text-gray-500">
                        Integração com {selectedERP.charAt(0).toUpperCase() + selectedERP.slice(1)}
                      </p>
                    </div>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700">+16h</Badge>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Recursos Adicionais */}
          {(security.length > 0 || marketing.length > 0 || performance.length > 0) && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ListChecks className="w-5 h-5 text-orange-500" />
                <h4 className="font-semibold text-gray-800">Recursos Adicionais</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Segurança */}
                {security.length > 0 && (
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-100">
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="w-4 h-4 text-orange-500" />
                      <p className="font-medium text-gray-700">Segurança e Compliance</p>
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
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-100">
                    <div className="flex items-center gap-2 mb-3">
                      <Rocket className="w-4 h-4 text-orange-500" />
                      <p className="font-medium text-gray-700">Marketing Digital</p>
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
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-100">
                    <div className="flex items-center gap-2 mb-3">
                      <Gauge className="w-4 h-4 text-orange-500" />
                      <p className="font-medium text-gray-700">Performance e Acessibilidade</p>
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
    </div>
  );
};

export default ProjectConfiguration;
