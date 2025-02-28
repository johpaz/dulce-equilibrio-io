
import { useState } from "react";
import { Play, ChevronRight } from "lucide-react";
import CountdownTimer from "./CountdownTimer";

type CourseDemoProps = {
  videoUrl?: string;
};

const CourseDemo = ({ videoUrl }: CourseDemoProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Default video URL if none is provided from Supabase
  const defaultVideoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ";
  const videoToPlay = videoUrl || defaultVideoUrl;
  
  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="badge mb-4">Aprende con Nosotros</div>
          <h2 className="text-3xl md:text-4xl font-bold text-dulce-green mb-6">
            Recetas que transforman vidas
          </h2>
          <p className="text-lg text-dulce-green-dark/80 max-w-3xl mx-auto">
            Descubre cómo preparar postres deliciosos que nutren tu cuerpo sin sacrificar el sabor.
            Nuestros videos paso a paso te guiarán en cada proceso.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
          {isPlaying ? (
            <div className="aspect-video w-full">
              <iframe
                width="100%"
                height="100%"
                src={videoToPlay}
                title="Receta de Dulce Equilibrio"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="aspect-video"
              ></iframe>
            </div>
          ) : (
            <div className="aspect-video bg-dulce-beige-light relative group">
              <img
                src="https://images.unsplash.com/photo-1612809075925-823b28156ec7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
                alt="Preparación de Brownie Saludable"
                className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
              />
              <button
                onClick={handlePlayClick}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-dulce-green/90 hover:bg-dulce-green text-white p-6 rounded-full shadow-lg transition-all group-hover:scale-110"
              >
                <Play className="w-8 h-8" />
              </button>

              {/* Overlay with info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">Brownie de Batata y Cacao Puro</h3>
                <p className="text-white/90 text-sm mb-2">
                  Una explosión de sabor con ingredientes nutritivos
                </p>
                <div className="flex items-center text-xs">
                  <span className="bg-dulce-gold text-white px-2 py-1 rounded-full">Premium</span>
                  <span className="ml-3">15 minutos</span>
                  <span className="mx-2">•</span>
                  <span>Principiante</span>
                </div>
              </div>
            </div>
          )}

          {/* Course preview info */}
          <div className="p-6 border-t border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-lg font-semibold text-dulce-green-dark">
                  Accede a nuestro curso completo
                </h3>
                <p className="text-dulce-green-dark/70 text-sm">
                  50+ recetas en video con todos los detalles paso a paso
                </p>
              </div>

              <div className="flex items-center gap-3">
                <CountdownTimer targetDate={new Date().getTime() + 3 * 24 * 60 * 60 * 1000} />
                <button className="btn-primary whitespace-nowrap flex items-center gap-1">
                  Ver Curso <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Featured recipes preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {["Cookies Avena y Chocolate", "Pancakes de Banana", "Helado de Coco"].map((title, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-video bg-dulce-beige-light">
                <img
                  src={`https://source.unsplash.com/random/300x200?healthy,dessert&sig=${idx}`}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-dulce-green-dark mb-2">{title}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-dulce-green-dark/70">10 min · Fácil</span>
                  <button className="text-dulce-green text-sm font-medium hover:underline flex items-center">
                    Ver Receta <ChevronRight className="w-3 h-3 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseDemo;
