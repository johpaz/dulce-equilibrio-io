
const LeadMagnet = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-dulce-beige z-40 py-3 px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <p className="font-medium text-dulce-green">¿Quieres probar antes de decidir?</p>
          <p className="text-sm text-dulce-green-dark/80">Descarga gratis 3 recetas exclusivas</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <input
            type="email"
            placeholder="Tu email"
            className="px-4 py-2 border border-dulce-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-dulce-green"
          />
          <button className="btn-primary whitespace-nowrap">
            Descargar Ahora
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadMagnet;
