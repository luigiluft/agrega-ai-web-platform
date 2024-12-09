import { Users, ShoppingBag, Timer, Building2 } from "lucide-react";

const StatsSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Números que Comprovam Nossa Excelência
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Resultados que demonstram nossa capacidade de entregar soluções eficientes e escaláveis
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {
              icon: Users,
              value: "500+",
              label: "Clientes Ativos",
              description: "Empresas confiam em nossas soluções"
            },
            {
              icon: ShoppingBag,
              value: "2M+",
              label: "Pedidos Processados",
              description: "Transações realizadas com sucesso"
            },
            {
              icon: Timer,
              value: "99.9%",
              label: "Uptime Garantido",
              description: "Disponibilidade constante"
            },
            {
              icon: Building2,
              value: "45+",
              label: "Anos de Experiência",
              description: "Do Grupo Luft em logística"
            }
          ].map((stat, index) => (
            <div 
              key={index} 
              className="relative p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <div className="text-4xl font-bold text-primary mb-2 group-hover:scale-105 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;