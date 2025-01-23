import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen relative bg-gradient-to-br from-orange-500 via-orange-400 to-yellow-300">
      <div className="absolute inset-0 bg-grid-white/[0.2] bg-grid-16" />
      
      <div className="container mx-auto px-4 pt-32 pb-16 relative">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => navigate("/calculadora")}
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
          >
            Transforme seu negócio digital →
          </motion.button>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-white"
          >
            Soluções Sob Medida
            <br />
            para Seu E-commerce
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl text-white/90 max-w-2xl mx-auto"
          >
            Desenvolvemos, integramos e gerenciamos seu e-commerce.{" "}
            <span className="font-semibold">
              Escolha o que precisa e foque no crescimento do seu negócio.
            </span>
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <PlanCard
              title="E-commerce Express"
              description="Lojas online com desenvolvimento ágil e custo acessível."
              icon="🚀"
              onClick={() => navigate("/calculadora?plan=express")}
            />
            <PlanCard
              title="E-commerce Pro"
              description="Solução intermediária com recursos avançados."
              icon="💼"
              onClick={() => navigate("/calculadora?plan=standard")}
            />
            <PlanCard
              title="Full-commerce Enterprise"
              description="Solução completa com personalização total."
              icon="🌟"
              onClick={() => navigate("/calculadora?plan=premium")}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const PlanCard = ({ 
  title, 
  description, 
  icon, 
  onClick 
}: { 
  title: string;
  description: string;
  icon: string;
  onClick: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="group"
    >
      <Button
        variant="secondary"
        onClick={onClick}
        className="w-full h-full p-6 bg-white/10 hover:bg-white/20 border-2 border-white/20 hover:border-white/40 text-white space-y-4 flex flex-col items-center transition-all duration-300"
      >
        <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
          {icon}
        </span>
        <div className="space-y-2 text-center">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm opacity-90">{description}</p>
        </div>
        <span className="text-sm mt-4 px-4 py-1 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
          Saiba mais →
        </span>
      </Button>
    </motion.div>
  );
};

export default HeroSection;