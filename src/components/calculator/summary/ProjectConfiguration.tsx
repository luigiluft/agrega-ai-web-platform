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
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4">
          <h3 className="text-2xl font-bold text-white text-center">
            Resumo do Projeto
          </h3>
          <p className="text-orange-100 text-center text-sm mt-1">
            Revisão das premissas e escopo selecionados
          </p>
        </div>

        <div className="p-6 border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-100">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-orange-500" />
                <h4 className="font-semibold text-gray-800">Escopo do Projeto</h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-orange-50/50 p-2 rounded">
                  <span className="text-gray-700">Total de Horas</span>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700 font-semibold">
                    {totalHours}h
                  </Badge>
                </div>
                <div className="flex justify-between items-center bg-orange-50/50 p-2 rounded">
                  <span className="text-gray-700">Previsão de Entrega</span>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700 font-semibold">
                    {Math.ceil((totalHours || 0) / 6)} semanas
                  </Badge>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-100">
              <div className="flex items-center gap-2 mb-3">
                <ListChecks className="w-5 h-5 text-orange-500" />
                <h4 className="font-semibold text-gray-800">Suporte Mensal</h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-orange-50/50 p-2 rounded">
                  <span className="text-gray-700">Horas P.O.</span>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700 font-semibold">
                    {poHours}h/mês
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 bg-orange-50/50 p-2 rounded">
                  {poHours && getPoFrequencyText(poHours)}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-orange-500" />
              <h4 className="font-semibold text-gray-800">Integrações</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(hasCRM || crmName) && (
                <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-100">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                      <Database className="w-6 h-6 text-orange-500" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-800">CRM</h5>
                      <p className="text-sm text-gray-600 mt-1">
                        Integração com {crmName || "CRM personalizado"}
                      </p>
                      <Badge className="mt-2 bg-orange-100 text-orange-700">
                        Sustentação mensal
                      </Badge>
                    </div>
                  </div>
                </div>
              )}

              {selectedERP && (
                <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-100">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden">
                      <img
                        src={`/lovable-uploads/${selectedERP === 'bling' ? '127f1152-e8da-4bef-b098-3d5a01fc61a5.png' : 'bf82d247-a2d9-41cc-af14-4a13c149bec2.png'}`}
                        alt={`Logo ${selectedERP}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-800">
                        {selectedERP.charAt(0).toUpperCase() + selectedERP.slice(1)}
                      </h5>
                      <p className="text-sm text-gray-600 mt-1">
                        Integração completa
                      </p>
                      <Badge className="mt-2 bg-orange-100 text-orange-700">
                        Sustentação mensal
                      </Badge>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-orange-500" />
              <h4 className="font-semibold text-gray-800">Tema e Layout</h4>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-100">
              {selectedTheme ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium text-gray-800">Tema personalizado</h5>
                      <p className="text-sm text-gray-600 mt-1">
                        Design exclusivo com sua identidade visual
                      </p>
                    </div>
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
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-gray-800">Tema padrão</h5>
                    <p className="text-sm text-gray-600 mt-1">
                      Layout otimizado para conversão
                    </p>
                  </div>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                    Incluído
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {(security.length > 0 || marketing.length > 0 || performance.length > 0) && (
            <>
              <Separator className="my-6" />
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                  <Package className="w-5 h-5 text-orange-500" />
                  Recursos Adicionais
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {security.length > 0 && (
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-100">
                      <div className="flex items-center gap-2 mb-3">
                        <Shield className="w-5 h-5 text-orange-500" />
                        <h5 className="font-medium text-gray-800">Segurança e Compliance</h5>
                      </div>
                      <div className="space-y-2">
                        {security.map(id => {
                          const option = securityOptions.find(opt => opt.id === id);
                          return option && (
                            <div key={id} className="text-sm text-gray-600 bg-orange-50/50 p-2 rounded">
                              {option.name}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {marketing.length > 0 && (
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-100">
                      <div className="flex items-center gap-2 mb-3">
                        <Rocket className="w-5 h-5 text-orange-500" />
                        <h5 className="font-medium text-gray-800">Marketing Digital</h5>
                      </div>
                      <div className="space-y-2">
                        {marketing.map(id => {
                          const option = marketingOptions.find(opt => opt.id === id);
                          return option && (
                            <div key={id} className="text-sm text-gray-600 bg-orange-50/50 p-2 rounded">
                              {option.name}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {performance.length > 0 && (
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-100">
                      <div className="flex items-center gap-2 mb-3">
                        <Gauge className="w-5 h-5 text-orange-500" />
                        <h5 className="font-medium text-gray-800">Performance e Acessibilidade</h5>
                      </div>
                      <div className="space-y-2">
                        {performance.map(id => {
                          const option = performanceOptions.find(opt => opt.id === id);
                          return option && (
                            <div key={id} className="text-sm text-gray-600 bg-orange-50/50 p-2 rounded">
                              {option.name}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ProjectConfiguration;
