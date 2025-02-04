import { Check, Monitor } from "lucide-react";

const CalculatorInstructionsSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Instructions Column */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Como Usar a Calculadora Agrega Aí
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  title: "Seleção do Plano",
                  description:
                    "Ao acessar a calculadora, escolha o plano que melhor se adapta às necessidades do seu negócio, verificando os detalhes de implementação e manutenção.",
                },
                {
                  title: "Escolha do Tema",
                  description:
                    "Selecione um tema pré-configurado que reflita a identidade visual do seu projeto.",
                },
                {
                  title: "Configuração do Projeto",
                  description:
                    "Personalize as preferências informando a frequência de reuniões, optando entre tema padrão ou personalizado, selecionando integrações necessárias e preenchendo dados de faturamento para calcular o Revenue Share.",
                },
                {
                  title: "Revisão e Finalização",
                  description:
                    "Verifique o resumo com todos os custos e benefícios (inclusive comparando opções mensais e anuais). Em seguida, preencha os dados do contrato, escolha o método de pagamento (Cartão, PIX ou Boleto) e finalize o processo ao enviar o contrato, recebendo uma cópia por e-mail.",
                },
              ].map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Column */}
          <div className="relative">
            <div className="bg-gradient-to-br from-orange-100 to-orange-50 rounded-3xl p-8">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/lovable-uploads/photo-1488590528505-98d2b5aba04b.jpg"
                  alt="Calculadora Agrega Aí em um laptop"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <Monitor className="absolute bottom-4 right-4 w-8 h-8 text-white" />
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -z-10 inset-0 bg-gradient-to-r from-orange-500/5 to-orange-500/10 blur-3xl rounded-full transform translate-x-1/2 translate-y-1/2" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorInstructionsSection;