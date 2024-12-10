const ImplementationTimeline = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Processo de Implementação
        </h2>
        
        <div className="max-w-5xl mx-auto">
          {[
            {
              step: 1,
              title: "Diagnóstico Inicial",
              description: "Análise completa das necessidades do seu negócio",
              duration: "2-3 dias",
              icon: "🎯"
            },
            {
              step: 2,
              title: "Configuração da Plataforma",
              description: "Setup inicial e integrações básicas",
              duration: "3-5 dias",
              icon: "⚙️"
            },
            {
              step: 3,
              title: "Personalização",
              description: "Ajustes de layout e funcionalidades específicas",
              duration: "4-7 dias",
              icon: "🎨"
            },
            {
              step: 4,
              title: "Testes e Validação",
              description: "Garantia de qualidade e performance",
              duration: "2-3 dias",
              icon: "✅"
            },
            {
              step: 5,
              title: "Go Live",
              description: "Lançamento e monitoramento inicial",
              duration: "1-2 dias",
              icon: "🚀"
            }
          ].map((item, index) => (
            <div 
              key={item.step}
              className={`relative flex flex-col md:flex-row items-center gap-6 mb-12 last:mb-0 group 
                ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* Step number and icon */}
              <div className="flex-shrink-0 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center 
                             border-2 border-primary group-hover:border-accent transition-colors duration-300
                             relative z-10">
                <span className="text-2xl">{item.icon}</span>
              </div>

              {/* Content card */}
              <div className={`flex-1 bg-white rounded-xl p-6 shadow-lg group-hover:shadow-xl 
                             transition-all duration-300 transform group-hover:-translate-y-1
                             ${index % 2 === 0 ? 'md:ml-6' : 'md:mr-6'}`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                    Etapa {item.step}
                  </span>
                  <span className="text-gray-500 text-sm font-medium">
                    {item.duration}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>

              {/* Connecting line for desktop */}
              {index < 4 && (
                <div className="hidden md:block absolute w-px h-24 bg-gradient-to-b from-primary/20 to-primary/5 
                               left-8 top-16 -z-10"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImplementationTimeline;