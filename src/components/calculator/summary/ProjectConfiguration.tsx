import { Package, Calendar, Palette, Database, Shield, Rocket, Gauge, Clock, Check, ListChecks } from "lucide-react";
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

          {/* Visualização do Tema */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-orange-500" />
              <h4 className="font-semibold text-gray-800">Tema e Layout</h4>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-100">
              {selectedTheme ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Tema personalizado</span>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                      +50h designer
                    </Badge>
                  </div>
                  <div className="relative aspect-video rounded-lg overflow-hidden border border-orange-100">
                    <img
                      src={`/lovable-uploads/${selectedTheme}`}
                      alt="Preview do tema"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white text-sm">
                        Tema personalizado com sua identidade visual
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600">
                  Tema padrão otimizado para conversão
                </p>
              )}
            </div>
          </div>

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
    </div>
  );
};

export default ProjectConfiguration;
