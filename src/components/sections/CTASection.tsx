const CTASection = () => {
  return (
    <section className="relative bg-secondary overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <div className="container mx-auto px-4 py-24 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-fade-down">
            Pronto para transformar seu e-commerce?
          </h2>
          <p className="text-xl text-white/90 mb-8 animate-fade-up [animation-delay:200ms]">
            Converse com nossos <span className="text-primary-light font-semibold">especialistas</span> e descubra como a{" "}
            <span className="text-2xl font-bold text-primary">
              Agrega AI
            </span>{" "}
            pode impulsionar seu negócio.
          </p>
          <button className="bg-primary text-white px-8 py-4 rounded-lg font-medium hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 animate-fade-up [animation-delay:400ms]">
            Agende uma Demonstração
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;