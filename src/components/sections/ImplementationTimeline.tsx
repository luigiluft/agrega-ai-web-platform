const ImplementationTimeline = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Processo de Implementação
        </h2>
        
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary to-primary/20"></div>

            <div className="space-y-12 relative">
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
              ].map((item, index) => (
                <div key={item.step} className={`flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
                      {/* Mobile step indicator */}
                      <div className="md:hidden absolute -left-3 top-6 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {item.step}
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h3>
                      <p className="text-gray-600 mb-3">{item.description}</p>
                      <div className="inline-flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        <span className="text-sm font-medium text-primary">{item.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Desktop step indicator */}
                  <div className="hidden md:flex w-20 items-center justify-center relative">
                    <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                      {item.step}
                    </div>
                  </div>

                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImplementationTimeline;