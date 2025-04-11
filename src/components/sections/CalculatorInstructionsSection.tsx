
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
    <section className="py-20 bg-gradient-to-b from-white to-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent mb-4"
          >
            Como Usar a Calculadora Agrega Aí
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Siga os passos abaixo para configurar seu projeto e receber um orçamento personalizado
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Steps Column */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6 group hover:bg-white hover:shadow-lg rounded-xl p-6 transition-all duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-calculator rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-4 text-center md:text-left"
            >
              <Button 
                onClick={handleCalculatorClick}
                className="bg-gradient-calculator hover:opacity-90 transition-opacity text-lg py-6 px-8 gap-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
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
            className="flex justify-center"
          >
            <div className="bg-gradient-to-br from-orange-100 to-orange-50 rounded-3xl p-8 shadow-xl max-w-lg w-full">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/lovable-uploads/VideoDev.gif"
                  alt="Calculadora Agrega Aí em um laptop"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                  <Monitor className="w-6 h-6 text-white" />
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="mt-6 flex justify-between items-center px-2">
                <div className="w-16 h-1 bg-orange-300/50 rounded-full"></div>
                <div className="w-24 h-1 bg-orange-400/50 rounded-full"></div>
                <div className="w-16 h-1 bg-orange-300/50 rounded-full"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorInstructionsSection;
