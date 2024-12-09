const StatsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-gray-600">Clientes Ativos</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">2M+</div>
            <div className="text-gray-600">Pedidos Processados</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
            <div className="text-gray-600">Uptime Garantido</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">45+</div>
            <div className="text-gray-600">Anos de Experiência</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;