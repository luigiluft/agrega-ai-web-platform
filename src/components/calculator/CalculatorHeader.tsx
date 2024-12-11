import { motion } from "framer-motion";

const CalculatorHeader = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12 mt-8"
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
        Calculadora de Preços
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Selecione as funcionalidades que deseja incluir no seu projeto e descubra o investimento necessário
      </p>
    </motion.div>
  );
};

export default CalculatorHeader;