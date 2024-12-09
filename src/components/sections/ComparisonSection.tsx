import { Check, X } from "lucide-react";

const ComparisonSection = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Escolha a solução ideal para seu negócio
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* E-commerce Express */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-6">E-commerce Express</h3>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <Check className="text-primary" />
                <span>Setup em até 2 semanas</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="text-primary" />
                <span>Templates otimizados</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="text-primary" />
                <span>Integrações essenciais</span>
              </div>
              <div className="flex items-center gap-3">
                <X className="text-gray-400" />
                <span className="text-gray-500">Personalização completa</span>
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-6">
              Ideal para pequenas e médias empresas que precisam começar a vender online rapidamente
            </div>
          </div>

          {/* Full-commerce Enterprise */}
          <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-primary">
            <h3 className="text-2xl font-bold mb-6">Full-commerce Enterprise</h3>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <Check className="text-primary" />
                <span>Personalização total</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="text-primary" />
                <span>Integrações avançadas</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="text-primary" />
                <span>Suporte 24/7</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="text-primary" />
                <span>Gestão operacional completa</span>
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-6">
              Para empresas que necessitam de uma solução completa e personalizada
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;