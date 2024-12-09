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
            ].map((item) => (
              <div key={item.step} className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-2">{item.description}</p>
                  <span className="text-sm text-primary font-medium">{item.duration}</span>
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