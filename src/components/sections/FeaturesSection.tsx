import { Settings, Zap, Network, Scale } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Settings,
      title: "Escalabilidade com Economia",
      description: "Cresça seu negócio de forma sustentável com nossa plataforma que se adapta às suas necessidades.",
      animation: "group-hover:animate-[spin_3s_linear_infinite]"
    },
    {
      icon: Zap,
      title: "Suporte Especializado",
      description: "Conte com nossa equipe de especialistas para suporte técnico e estratégico.",
      animation: "group-hover:animate-pulse group-hover:scale-110 transition-transform"
    },
    {
      icon: Network,
      title: "Integrações Nativas",
      description: "Conecte-se facilmente com as principais plataformas e serviços do mercado.",
      animation: "group-hover:scale-125 transition-transform duration-300"
    },
    {
      icon: Scale,
      title: "Custos Transparentes",
      description: "Preços claros e sem surpresas, pague apenas pelo que usar.",
      animation: "group-hover:[animation:balance_1s_ease-in-out_infinite]"
    },
  ];

  // Add this CSS animation to your global styles or index.css
  const style = document.createElement('style');
  style.textContent = `
  @keyframes balance {
    0%, 100% { transform: rotate(-12deg); }
    50% { transform: rotate(12deg); }
  }
  `;
  document.head.appendChild(style);

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Nossas Funcionalidades
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className={`p-6 rounded-lg shadow-lg transition-transform duration-300 ${feature.animation}`}>
                <feature.icon className="h-12 w-12 text-primary mb-4" />
              </div>
              <h3 className="text-lg font-semibold mt-4">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
