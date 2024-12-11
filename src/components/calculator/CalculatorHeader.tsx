import React from 'react';

const CalculatorHeader = () => {
  return (
    <div className="text-center max-w-3xl mx-auto mb-16">
      <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
        Calculadora de Preços
      </h1>
      <p className="text-lg text-gray-600">
        Selecione as funcionalidades que deseja incluir no seu projeto e descubra o investimento necessário
      </p>
    </div>
  );
};

export default CalculatorHeader;