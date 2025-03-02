import { Check, X, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const ComparisonSection = () => {
  const navigate = useNavigate();

  const handlePlanSelect = (planId: string) => {
    navigate(`/calculadora?plan=${planId}`);
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Escolha a solução ideal para seu negócio
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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

            {/* Setor de Moda */}
            <div className="bg-primary/5 p-6 rounded-lg border border-primary/10">
              <h4 className="text-lg font-semibold mb-3">Setor: Moda e Vestuário</h4>
              <p className="text-gray-600 text-sm mb-4">
                "Com o E-commerce Express, conseguimos iniciar nossas vendas online em apenas 10 dias. 
                A solução simplificada e eficiente nos permitiu focar no crescimento do negócio."
              </p>
              <div className="text-sm text-primary font-medium">
                Implementação em 2 semanas | ROI positivo no 1º mês
              </div>
            </div>
            <Button
              onClick={() => handlePlanSelect('express')}
              className="w-full mt-6 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              Montar proposta
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* E-commerce Pro */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-6">E-commerce Pro</h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Check className="text-primary" />
                  <span>Personalização moderada</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="text-primary" />
                  <span>Integrações avançadas</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="text-primary" />
                  <span>Suporte prioritário</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="text-primary" />
                  <span>Gestão de marketplaces</span>
                </div>
              </div>
              <div className="text-sm font-medium text-primary bg-primary/5 p-4 rounded-lg mb-6">
                Para empresas em crescimento que precisam de mais recursos e personalização
              </div>
            </div>

            {/* Setor de Cosméticos */}
            <div className="bg-primary/5 p-6 rounded-lg border border-primary/10">
              <h4 className="text-lg font-semibold mb-3">Setor: Cosméticos</h4>
              <p className="text-gray-600 text-sm mb-4">
                "O E-commerce Pro nos permitiu expandir nossa presença online com recursos avançados 
                e integrações que impulsionaram nossas vendas."
              </p>
              <div className="text-sm text-primary font-medium">
                Crescimento de 150% em 6 meses | Integração com 3+ marketplaces
              </div>
            </div>
            <Button
              onClick={() => handlePlanSelect('standard')}
              className="w-full mt-6 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              Montar proposta
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* FullCommerce */}
          <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-primary">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-6">FullCommerce</h3>
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

            {/* Setor de Varejo */}
            <div className="bg-primary/5 p-6 rounded-lg border border-primary/10">
              <h4 className="text-lg font-semibold mb-3">Setor: Varejo Multicanal</h4>
              <p className="text-gray-600 text-sm mb-4">
                "O FullCommerce nos permitiu escalar nossa operação com segurança. 
                A personalização completa e o suporte dedicado foram fundamentais."
              </p>
              <div className="text-sm text-primary font-medium">
                Crescimento de 300% em vendas | Integração com 5+ marketplaces
              </div>
            </div>
            <Button
              onClick={() => handlePlanSelect('enterprise')}
              className="w-full mt-6 bg-primary text-white hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              Montar proposta
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;