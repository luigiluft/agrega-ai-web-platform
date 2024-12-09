const ImplementationTimeline = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Processo de Implementação
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {[
              {
                step: 1,
                title: "Diagnóstico Inicial",
                description: "Análise completa das necessidades do seu negócio",
                duration: "2-3 dias"
              },
              {
                step: 2,
                title: "Configuração da Plataforma",
                description: "Setup inicial e integrações básicas",
                duration: "3-5 dias"
              },
              {
                step: 3,
                title: "Personalização",
                description: "Ajustes de layout e funcionalidades específicas",
                duration: "4-7 dias"
              },
              {
                step: 4,
                title: "Testes e Validação",
                description: "Garantia de qualidade e performance",
                duration: "2-3 dias"
              },
              {
                step: 5,
                title: "Go Live",
                description: "Lançamento e monitoramento inicial",
                duration: "1-2 dias"
              }
            ].map((item, index, array) => (
              <div key={item.step} className="relative">
                {/* Timeline line */}
                {index !== array.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-24 bg-primary/20"></div>
                )}
                
                {/* Timeline item */}
                <div className="flex gap-8 items-start group">
                  {/* Circle with number */}
                  <div className="relative flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
                    {item.step}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 bg-white rounded-xl p-6 shadow-lg shadow-gray-100/50 hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h3>
                    <p className="text-gray-600 mb-3">{item.description}</p>
                    <div className="inline-flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span className="text-sm font-medium text-primary">{item.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImplementationTimeline;