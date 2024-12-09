const CTASection = () => {
  return (
    <section className="relative bg-primary overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <div className="container mx-auto px-4 py-24 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para transformar seu e-commerce?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Converse com nossos especialistas e descubra como a Agrega AI pode impulsionar seu negócio.
          </p>
          <button className="bg-white text-primary px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Agende uma Demonstração
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;