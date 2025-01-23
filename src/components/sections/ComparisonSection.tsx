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
            <div className="mb-8">
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
              <div className="text-sm font-medium text-primary bg-primary/5 p-4 rounded-lg mb-6">
                Ideal para pequenas e médias empresas que precisam começar a vender online rapidamente
              </div>
            </div>

            {/* Case Moda */}
            <div className="bg-primary/5 p-6 rounded-lg border border-primary/10">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8" 
                alt="Setor de Moda" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="text-lg font-semibold mb-3">Case: Setor de Moda</h4>
              <p className="text-gray-600 text-sm mb-4">
                "Com o E-commerce Express, conseguimos iniciar nossas vendas online em apenas 10 dias. 
                A solução simplificada e eficiente nos permitiu focar no crescimento do negócio sem 
                preocupações técnicas."
              </p>
              <div className="text-sm text-primary font-medium">
                Implementação em 2 semanas | ROI positivo no 1º mês
              </div>
            </div>
          </div>

          {/* Full-commerce Enterprise */}
          <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-primary">
            <div className="mb-8">
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
              <div className="text-sm font-medium text-primary bg-primary/5 p-4 rounded-lg mb-6">
                Para empresas que necessitam de uma solução completa e personalizada
              </div>
            </div>

            {/* Case Varejo */}
            <div className="bg-primary/5 p-6 rounded-lg border border-primary/10">
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c" 
                alt="Setor de Varejo" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="text-lg font-semibold mb-3">Case: Setor de Varejo</h4>
              <p className="text-gray-600 text-sm mb-4">
                "O Full-commerce nos permitiu escalar nossa operação com segurança. 
                A personalização completa e o suporte dedicado foram fundamentais para 
                atingirmos nossos objetivos de crescimento."
              </p>
              <div className="text-sm text-primary font-medium">
                Crescimento de 300% em vendas | Integração com 5+ marketplaces
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
