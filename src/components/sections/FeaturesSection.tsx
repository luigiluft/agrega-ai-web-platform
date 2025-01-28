import { Settings, Zap, BarChart3, Scale, Network, HeadsetIcon, ArrowRight } from "lucide-react";

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Saiba como a gente <span className="text-primary">agregaí</span> na sua empresa
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group text-center">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors mx-auto">
              <Settings className="w-7 h-7 text-primary transition-transform duration-700 group-hover:rotate-180" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-secondary">Personalização Total</h3>
            <p className="text-gray-600 leading-relaxed">
              Mais de 3.500 extensões disponíveis e 30 temas prontos para uso. 
              Adapte sua loja virtual exatamente como você precisa, com flexibilidade total.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group text-center">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors mx-auto">
              <Zap className="w-7 h-7 text-primary transition-all duration-500 group-hover:scale-125 group-hover:opacity-0 group-hover:animate-pulse" />
            </div>
            <h3 className="text-xl font-bold mb-4">Agilidade na Implementação</h3>
            <p className="text-gray-600 leading-relaxed">
              Comece a vender online em semanas, não meses. 
              Processos otimizados e equipe especializada para uma implementação rápida e eficiente.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group text-center">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors mx-auto">
              <BarChart3 className="w-7 h-7 text-primary transition-transform duration-500 group-hover:translate-y-[-4px]" />
            </div>
            <h3 className="text-xl font-bold mb-4">Escalabilidade com Economia</h3>
            <p className="text-gray-600 leading-relaxed">
              Infraestrutura que cresce com seu negócio, com custos variáveis que diminuem conforme seu volume aumenta. 
              De 100 a 100.000 pedidos por mês, sua operação sempre otimizada.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group text-center">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors mx-auto">
              <Scale className="w-7 h-7 text-primary transition-transform duration-500 group-hover:rotate-12" />
            </div>
            <h3 className="text-xl font-bold mb-4">Custos Transparentes</h3>
            <p className="text-gray-600 leading-relaxed">
              Sem surpresas nas faturas. Planos flexíveis que se adaptam ao seu momento, 
              com previsibilidade de custos para crescer com segurança.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group text-center">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors mx-auto">
              <Network className="w-7 h-7 text-primary transition-all duration-500 group-hover:scale-110" />
            </div>
            <h3 className="text-xl font-bold mb-4">Integrações Nativas</h3>
            <p className="text-gray-600 leading-relaxed">
              Conecte-se facilmente com ERPs, marketplaces e sistemas de gestão. 
              Automatize processos e centralize suas operações em um só lugar.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group text-center">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors mx-auto">
              <HeadsetIcon className="w-7 h-7 text-primary transition-transform duration-500 group-hover:scale-x-[-1]" />
            </div>
            <h3 className="text-xl font-bold mb-4">Suporte Especializado</h3>
            <p className="text-gray-600 leading-relaxed">
              Time dedicado ao seu sucesso, com experiência em seu segmento. 
              Suporte técnico e consultoria de negócios sempre disponíveis.
            </p>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <button className="group bg-primary text-white px-8 py-4 rounded-xl font-medium hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 animate-fade-up flex items-center gap-2 mx-auto">
            <span>Fale com um Especialista</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;