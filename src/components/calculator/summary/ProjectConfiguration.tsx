
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
          {/* Cards principais em grid */}
          <div className="grid grid-cols-3 gap-4">
            {/* Escopo */}
            <Card className="p-4 bg-orange-50/50 border-orange-100">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-orange-500" />
                <h4 className="text-sm font-medium text-gray-600">Escopo</h4>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{totalHours}</p>
                  <p className="text-sm text-gray-500">horas</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{Math.ceil((totalHours || 0) / 6)}</p>
                  <p className="text-sm text-gray-500">semanas</p>
                </div>
              </div>
            </Card>

            {/* Suporte */}
            <Card className="p-4 bg-orange-50/50 border-orange-100">
              <div className="flex items-center gap-2 mb-3">
                <ListChecks className="w-5 h-5 text-orange-500" />
                <h4 className="text-sm font-medium text-gray-600">Suporte</h4>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{poHours}</p>
                  <p className="text-sm text-gray-500">h/mês</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Frequência</p>
                  <p className="text-sm font-medium text-gray-700">{poHours && getPoFrequencyText(poHours)}</p>
                </div>
              </div>
            </Card>

            {/* Integrações */}
            <Card className="p-4 bg-orange-50/50 border-orange-100">
              <div className="flex items-center gap-2 mb-3">
                <Database className="w-5 h-5 text-orange-500" />
                <h4 className="text-sm font-medium text-gray-600">Integrações</h4>
              </div>
              <div className="space-y-3">
                {(hasCRM || crmName) && (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <Database className="w-4 h-4 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">CRM</p>
                      <p className="text-xs text-gray-500">{crmName || "CRM personalizado"}</p>
                    </div>
                  </div>
                )}
                {selectedERP && (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm p-1.5">
                      <img
                        src={`/lovable-uploads/${selectedERP === 'bling' ? '127f1152-e8da-4bef-b098-3d5a01fc61a5.png' : 'bf82d247-a2d9-41cc-af14-4a13c149bec2.png'}`}
                        alt={`Logo ${selectedERP}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">{selectedERP.charAt(0).toUpperCase() + selectedERP.slice(1)}</p>
                      <p className="text-xs text-gray-500">Integração completa</p>
                    </div>
                  </div>
                )}
                {!hasCRM && !crmName && !selectedERP && (
                  <p className="text-sm text-gray-500">Nenhuma integração selecionada</p>
                )}
              </div>
            </Card>
          </div>

          {/* Tema */}
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
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <img
                      src={`/lovable-uploads/${selectedTheme}`}
                      alt="Preview do tema"
                      className="w-full h-full object-cover"
                    />
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

          {/* Recursos Adicionais */}
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
