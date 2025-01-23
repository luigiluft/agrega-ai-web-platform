import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative bg-secondary overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <div className="container mx-auto px-4 py-24 relative">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 animate-fade-down">
            <span className="text-white/90">Vamos conversar?</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-fade-down [animation-delay:200ms]">
            Pronto para transformar seu e-commerce?
          </h2>
          
          <p className="text-xl text-white/90 mb-8 animate-fade-up [animation-delay:400ms]">
            Converse com nossos <span className="text-primary-light font-semibold">especialistas</span> e descubra como a{" "}
            <span className="text-2xl font-bold text-primary">
              Agrega AI
            </span>{" "}
            pode impulsionar seu negócio.
          </p>
          
          <button className="group bg-primary text-white px-8 py-4 rounded-xl font-medium hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 animate-fade-up [animation-delay:600ms] flex items-center gap-2 mx-auto">
            <span>Agende uma Demonstração</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;