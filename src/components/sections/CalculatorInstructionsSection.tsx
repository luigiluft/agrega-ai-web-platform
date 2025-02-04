import { Check, Monitor, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { scrollToTop } from "@/utils/scrollUtils";

const CalculatorInstructionsSection = () => {
  const navigate = useNavigate();

  const handleCalculatorClick = () => {
    navigate("/calculadora");
    scrollToTop();
  };

  const steps = [
    {
      title: "Seleção do Plano",
      description:
        "Ao acessar a calculadora, escolha o plano que melhor se adapta às necessidades do seu negócio, verificando os detalhes de implementação e manutenção.",
      icon: <Check className="w-5 h-5 text-white" />,
    },
    {
      title: "Escolha do Tema",
      description:
        "Selecione um tema pré-configurado que reflita a identidade visual do seu projeto. Obrigatório apenas para o plano E-commerce Express, já que os planos E-commerce Pro e FullCommerce incluem personalização completa.",
      icon: <Check className="w-5 h-5 text-white" />,
    },
    {
      title: "Configuração do Projeto",
      description:
        "Personalize as preferências informando a frequência de reuniões, optando entre tema padrão ou personalizado, selecionando integrações necessárias e preenchendo dados de faturamento para calcular o Revenue Share.",
      icon: <Check className="w-5 h-5 text-white" />,
    },
    {
      title: "Revisão e Finalização",
      description:
        "Verifique o resumo com todos os custos e benefícios (inclusive comparando opções mensais e anuais). Em seguida, preencha os dados do contrato, escolha o método de pagamento (Cartão, PIX ou Boleto) e finalize o processo ao enviar o contrato, recebendo uma cópia por e-mail.",
      icon: <Check className="w-5 h-5 text-white" />,
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-orange-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Instructions Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                Como Usar a Calculadora Agrega Aí
              </h2>
              <p className="text-lg text-gray-600">
                Siga os passos abaixo para configurar seu projeto e receber um orçamento personalizado
              </p>
            </div>
            
            <div className="space-y-4">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4 group hover:bg-white hover:shadow-lg rounded-xl p-4 transition-all duration-300"
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-calculator rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                      {step.icon}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-2"
            >
              <Button 
                onClick={handleCalculatorClick}
                className="w-full sm:w-auto bg-gradient-calculator hover:opacity-90 transition-opacity text-lg py-4 px-6 gap-2"
              >
                Calcular meu projeto agora
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative lg:sticky lg:top-[30vh]"
          >
            <div className="bg-gradient-to-br from-orange-100 to-orange-50 rounded-3xl p-6 shadow-lg">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/lovable-uploads/Gen-3 Alpha Turbo 3827173418, An isometric-style i, Cropped - DALL·E 202, M 5.mp4.gif"
                  alt="Calculadora Agrega Aí em um laptop"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <Monitor className="absolute bottom-4 right-4 w-8 h-8 text-white" />
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -z-10 inset-0 bg-gradient-to-r from-orange-500/5 to-orange-500/10 blur-3xl rounded-full transform translate-x-1/2 translate-y-1/2" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorInstructionsSection;