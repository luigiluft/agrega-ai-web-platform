
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
      <Card className="overflow-hidden bg-gradient-to-br from-orange-50 to-white">
        <div className="p-8 space-y-8">
          {/* Métricas principais em grid largo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md border-2 border-orange-100 hover:border-orange-200 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800">Escopo do Projeto</h4>
              </div>
              <div className="space-y-4">
                <div className="p-3 bg-orange-50/70 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Total de Horas</span>
                    <Badge variant="secondary" className="text-base bg-white text-orange-700 font-semibold px-4 py-1">
                      {totalHours}h
                    </Badge>
                  </div>
                </div>
                <div className="p-3 bg-orange-50/70 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Previsão de Entrega</span>
                    <Badge variant="secondary" className="text-base bg-white text-orange-700 font-semibold px-4 py-1">
                      {Math.ceil((totalHours || 0) / 6)} semanas
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border-2 border-orange-100 hover:border-orange-200 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <ListChecks className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800">Suporte Mensal</h4>
              </div>
              <div className="space-y-4">
                <div className="p-3 bg-orange-50/70 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Horas P.O.</span>
                    <Badge variant="secondary" className="text-base bg-white text-orange-700 font-semibold px-4 py-1">
                      {poHours}h/mês
                    </Badge>
                  </div>
                </div>
                <div className="p-3 bg-orange-50/70 rounded-lg">
                  <p className="text-gray-700">
                    {poHours && getPoFrequencyText(poHours)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Integrações */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Database className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800">Integrações</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* CRM Card */}
              {(hasCRM || crmName) && (
                <div className="bg-white p-6 rounded-xl shadow-md border-2 border-orange-100 hover:border-orange-200 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-orange-50 rounded-xl flex items-center justify-center">
                      <Database className="w-8 h-8 text-orange-500" />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-lg font-medium text-gray-800">CRM</h5>
                      <p className="text-gray-600 mt-2">
                        Integração com {crmName || "CRM personalizado"}
                      </p>
                      <Badge className="mt-3 bg-orange-100 text-orange-700 px-4 py-1">
                        Sustentação mensal
                      </Badge>
                    </div>
                  </div>
                </div>
              )}

              {/* ERP Card */}
              {selectedERP && (
                <div className="bg-white p-6 rounded-xl shadow-md border-2 border-orange-100 hover:border-orange-200 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-white border border-orange-100 p-2">
                      <img
                        src={`/lovable-uploads/${selectedERP === 'bling' ? '127f1152-e8da-4bef-b098-3d5a01fc61a5.png' : 'bf82d247-a2d9-41cc-af14-4a13c149bec2.png'}`}
                        alt={`Logo ${selectedERP}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-lg font-medium text-gray-800">
                        {selectedERP.charAt(0).toUpperCase() + selectedERP.slice(1)}
                      </h5>
                      <p className="text-gray-600 mt-2">
                        Integração completa
                      </p>
                      <Badge className="mt-3 bg-orange-100 text-orange-700 px-4 py-1">
                        Sustentação mensal
                      </Badge>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tema com preview */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Palette className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800">Tema e Layout</h4>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border-2 border-orange-100 hover:border-orange-200 transition-all">
              {selectedTheme ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-lg font-medium text-gray-800">Tema personalizado</h5>
                      <p className="text-gray-600 mt-2">
                        Design exclusivo com sua identidade visual
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-base bg-orange-100 text-orange-700 px-4 py-1">
                      +50h designer
                    </Badge>
                  </div>
                  <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-orange-100">
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
                    <h5 className="text-lg font-medium text-gray-800">Tema padrão</h5>
                    <p className="text-gray-600 mt-2">
                      Layout otimizado para conversão
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-base bg-orange-100 text-orange-700 px-4 py-1">
                    Incluído
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* Recursos Adicionais */}
          {(security.length > 0 || marketing.length > 0 || performance.length > 0) && (
            <>
              <Separator className="my-8" />
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Package className="w-6 h-6 text-orange-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800">Recursos Adicionais</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Segurança */}
                  {security.length > 0 && (
                    <div className="bg-white p-6 rounded-xl shadow-md border-2 border-orange-100 hover:border-orange-200 transition-all">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-orange-100 rounded-lg">
                          <Shield className="w-6 h-6 text-orange-600" />
                        </div>
                        <h5 className="text-lg font-medium text-gray-800">Segurança e Compliance</h5>
                      </div>
                      <div className="space-y-3">
                        {security.map(id => {
                          const option = securityOptions.find(opt => opt.id === id);
                          return option && (
                            <div key={id} className="p-3 bg-orange-50/70 rounded-lg text-gray-700">
                              {option.name}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Marketing */}
                  {marketing.length > 0 && (
                    <div className="bg-white p-6 rounded-xl shadow-md border-2 border-orange-100 hover:border-orange-200 transition-all">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-orange-100 rounded-lg">
                          <Rocket className="w-6 h-6 text-orange-600" />
                        </div>
                        <h5 className="text-lg font-medium text-gray-800">Marketing Digital</h5>
                      </div>
                      <div className="space-y-3">
                        {marketing.map(id => {
                          const option = marketingOptions.find(opt => opt.id === id);
                          return option && (
                            <div key={id} className="p-3 bg-orange-50/70 rounded-lg text-gray-700">
                              {option.name}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Performance */}
                  {performance.length > 0 && (
                    <div className="bg-white p-6 rounded-xl shadow-md border-2 border-orange-100 hover:border-orange-200 transition-all">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-orange-100 rounded-lg">
                          <Gauge className="w-6 h-6 text-orange-600" />
                        </div>
                        <h5 className="text-lg font-medium text-gray-800">Performance e Acessibilidade</h5>
                      </div>
                      <div className="space-y-3">
                        {performance.map(id => {
                          const option = performanceOptions.find(opt => opt.id === id);
                          return option && (
                            <div key={id} className="p-3 bg-orange-50/70 rounded-lg text-gray-700">
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
