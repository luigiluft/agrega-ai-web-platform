
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
      <Card className="bg-white rounded-xl overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <Card className="p-6 bg-orange-50/50 border-orange-100">
              <div className="flex items-center gap-2 mb-6">
                <ListChecks className="w-7 h-7 text-orange-500" />
                <div>
                  <h4 className="text-lg font-medium text-gray-800">Suporte Mensal</h4>
                  <p className="text-sm text-gray-600">Acompanhamento e melhorias contínuas</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-orange-500" />
                    <p className="text-sm font-medium text-gray-700">Horas mensais</p>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold text-gray-900">{poHours}</p>
                    <p className="text-base text-gray-600">horas/mês</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm font-medium text-gray-700 mb-2">Inclui:</p>
                  <div className="space-y-2">
                    {poHours && getPoFrequencyText(poHours).split('+').map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-600 leading-tight">{item.trim()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-orange-50/50 border-orange-100">
              <div className="flex items-center gap-2 mb-6">
                <Database className="w-7 h-7 text-orange-500" />
                <div>
                  <h4 className="text-lg font-medium text-gray-800">Integrações</h4>
                  <p className="text-sm text-gray-600">Sistemas integrados ao seu e-commerce</p>
                </div>
              </div>
              <div className="grid gap-4">
                {(hasCRM || crmName) && (
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-sm p-2 flex-shrink-0">
                        {crmName === "hubspot" && (
                          <img
                            src="/lovable-uploads/b1910f66-63c7-4505-a6fd-295bb3b1d219.png"
                            alt="HubSpot"
                            className="w-full h-full object-contain"
                          />
                        )}
                        {crmName === "rdstation" && (
                          <img
                            src="/lovable-uploads/ac5f6e35-0177-479e-a49d-edec43580ebe.png"
                            alt="RD Station"
                            className="w-full h-full object-contain"
                          />
                        )}
                        {crmName === "pipedrive" && (
                          <img
                            src="/lovable-uploads/53cf28a0-7d18-4838-8723-92f2ed91b3ad.png"
                            alt="Pipedrive"
                            className="w-full h-full object-contain"
                          />
                        )}
                        {!crmName && <Database className="w-8 h-8 text-orange-500" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className="font-medium text-gray-800">{crmName ? crmName.charAt(0).toUpperCase() + crmName.slice(1) : "CRM Personalizado"}</h5>
                          <Badge variant="secondary" className="bg-blue-50 text-blue-600 text-xs">CRM</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Gestão de leads e clientes</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>24h de implementação</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {selectedERP && (
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-sm p-2 flex-shrink-0">
                        <img
                          src={`/lovable-uploads/${selectedERP === 'bling' ? '127f1152-e8da-4bef-b098-3d5a01fc61a5.png' : 'bf82d247-a2d9-41cc-af14-4a13c149bec2.png'}`}
                          alt={`Logo ${selectedERP}`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className="font-medium text-gray-800">{selectedERP.charAt(0).toUpperCase() + selectedERP.slice(1)}</h5>
                          <Badge variant="secondary" className="bg-green-50 text-green-600 text-xs">ERP</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Gestão empresarial e estoque</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>24h de implementação</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {!hasCRM && !crmName && !selectedERP && (
                  <div className="flex items-center justify-center h-24 bg-white rounded-lg">
                    <p className="text-sm text-gray-500">Nenhuma integração selecionada</p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-orange-500" />
              <h4 className="text-sm font-medium text-gray-600">Tema e Layout</h4>
            </div>
            <Card className="p-4 bg-orange-50/50 border-orange-100">
              {selectedTheme ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium text-gray-800">Tema personalizado</h5>
                      <p className="text-sm text-gray-600">Design exclusivo com sua identidade visual</p>
                    </div>
                    <Badge className="bg-orange-100 text-orange-600">+50h designer</Badge>
                  </div>
                  <div className="relative">
                    <img
                      src="/lovable-uploads/fe383840-7b19-41ef-bbe3-76a09f04228b.png"
                      alt="Demonstração do tema"
                      className="w-full rounded-lg"
                    />
                    <a 
                      href={`/lovable-uploads/${selectedTheme}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-2 px-3 py-2 bg-orange-50 border border-orange-100 rounded-md text-sm text-orange-600 hover:bg-orange-100 transition-colors text-center font-medium"
                    >
                      Visualizar tema completo
                    </a>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-medium text-gray-800">Tema padrão</h5>
                    <p className="text-sm text-gray-600">Layout otimizado para conversão</p>
                  </div>
                  <Badge className="bg-orange-100 text-orange-600">Incluído</Badge>
                </div>
              )}
            </Card>
          </div>

          {(security.length > 0 || marketing.length > 0 || performance.length > 0) && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-orange-500" />
                <h4 className="text-sm font-medium text-gray-600">Recursos Adicionais</h4>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {security.length > 0 && (
                  <Card className="p-4 bg-orange-50/50 border-orange-100">
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="w-5 h-5 text-orange-500" />
                      <h5 className="text-sm font-medium text-gray-600">Segurança</h5>
                    </div>
                    <div className="space-y-2">
                      {security.map(id => {
                        const option = securityOptions.find(opt => opt.id === id);
                        return option && (
                          <p key={id} className="text-sm text-gray-700">{option.name}</p>
                        );
                      })}
                    </div>
                  </Card>
                )}

                {marketing.length > 0 && (
                  <Card className="p-4 bg-orange-50/50 border-orange-100">
                    <div className="flex items-center gap-2 mb-3">
                      <Rocket className="w-5 h-5 text-orange-500" />
                      <h5 className="text-sm font-medium text-gray-600">Marketing</h5>
                    </div>
                    <div className="space-y-2">
                      {marketing.map(id => {
                        const option = marketingOptions.find(opt => opt.id === id);
                        return option && (
                          <p key={id} className="text-sm text-gray-700">{option.name}</p>
                        );
                      })}
                    </div>
                  </Card>
                )}

                {performance.length > 0 && (
                  <Card className="p-4 bg-orange-50/50 border-orange-100">
                    <div className="flex items-center gap-2 mb-3">
                      <Gauge className="w-5 h-5 text-orange-500" />
                      <h5 className="text-sm font-medium text-gray-600">Performance</h5>
                    </div>
                    <div className="space-y-2">
                      {performance.map(id => {
                        const option = performanceOptions.find(opt => opt.id === id);
                        return option && (
                          <p key={id} className="text-sm text-gray-700">{option.name}</p>
                        );
                      })}
                    </div>
                  </Card>
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
