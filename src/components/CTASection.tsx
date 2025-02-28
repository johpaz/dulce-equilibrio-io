
const CTASection = () => {
  return (
    <section className="py-20 bg-dulce-green text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">¿Listo para transformar tus postres?</h2>
        <p className="text-white/90 max-w-2xl mx-auto mb-8 animate-fade-in delay-100">
          Únete a nuestra comunidad y descubre cómo la repostería saludable puede cambiar tu vida.
        </p>
        <button className="bg-white text-dulce-green px-8 py-4 rounded-full font-medium text-lg shadow-lg transition-all hover:shadow-xl hover:bg-dulce-beige animate-fade-in delay-200">
          Comenzar Mi Transformación
        </button>
      </div>
    </section>
  );
};

export default CTASection;
