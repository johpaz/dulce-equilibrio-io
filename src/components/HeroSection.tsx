
import { useState, useEffect } from "react";
import { ArrowRight, Mic } from "lucide-react";
import AudioPlayer from "./AudioPlayer";

type HeroSectionProps = {
  videoUrl?: string;
};

const HeroSection = ({ videoUrl }: HeroSectionProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Default video URL if none is provided from Supabase
  const defaultVideoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ";
  const videoToPlay = videoUrl || defaultVideoUrl;

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <section className="min-h-[90vh] relative overflow-hidden flex items-center">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dulce-beige-light to-white"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-24 h-24 rounded-full bg-dulce-green/5 animate-float"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-dulce-gold/5 animate-float delay-500"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div className={`transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0 translate-y-10"}`}>
            <div className="badge mb-4 animate-fade-in">Repostería Saludable</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dulce-green mb-6 leading-tight animate-fade-in delay-100">
              Imagina despertar con energía, disfrutando postres <span className="text-dulce-gold">sin culpa</span>
            </h1>
            <p className="text-lg md:text-xl text-dulce-green-dark/80 mb-8 animate-fade-in delay-200">
              En Dulce Equilibrio te enseñamos cómo crear postres deliciosos que nutren tu cuerpo y alimentan tu alma, sin sacrificar el sabor.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in delay-300">
              <button className="btn-primary flex items-center gap-2">
                Empieza Ahora
                <ArrowRight className="w-5 h-5" />
              </button>
              <AudioPlayer 
                audioKey="intro" 
                label="Escucha nuestra misión"
              />
            </div>
            
            {/* Floating audio preview */}
            <div className="mt-10 animate-fade-in delay-400">
              <div className="relative inline-block">
                <AudioPlayer 
                  audioKey="recipe" 
                  label="¡Escucha una muestra de receta!"
                  className="animate-pulse-subtle"
                  buttonClassName="bg-white shadow-md"
                />
                <div className="absolute -top-2 -right-2 bg-dulce-gold text-white text-xs font-bold px-2 py-1 rounded-full">
                  GRATIS
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Image or Video */}
          <div className={`transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0 translate-x-10"}`}>
            <div className="relative">
              {isPlaying ? (
                <div className="rounded-2xl overflow-hidden shadow-xl animate-fade-in">
                  <iframe
                    width="100%"
                    height="100%"
                    src={videoToPlay}
                    title="Receta de Dulce Equilibrio"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="aspect-[4/5]"
                  ></iframe>
                </div>
              ) : (
                <>
                  {/* Main image with play button */}
                  <div className="rounded-2xl overflow-hidden shadow-xl animate-fade-in delay-200 relative group">
                    <img
                      src="https://images.unsplash.com/photo-1622484212385-1d239eda711b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
                      alt="Brownie de batata saludable"
                      className="w-full h-auto object-cover aspect-[4/5]"
                    />
                    <button
                      onClick={handlePlayClick}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-dulce-green/90 hover:bg-dulce-green text-white p-5 rounded-full shadow-lg transition-all group-hover:scale-110"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 12L10 8V16L16 12Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                  
                  {/* Floating elements */}
                  <div className="absolute -bottom-5 -left-5 bg-white rounded-lg p-4 shadow-lg animate-fade-in delay-300">
                    <div className="flex items-center gap-3">
                      <div className="bg-dulce-green-light/20 rounded-full p-2">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#3D8168" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M16 12L10 8V16L16 12Z" fill="#3D8168" stroke="#3D8168" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-dulce-green">Curso en video</p>
                        <p className="text-xs text-dulce-green-dark/70">+50 recetas en HD</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute -top-6 -right-6 bg-white rounded-full p-4 shadow-lg animate-fade-in delay-400">
                    <img 
                      src="https://images2.imgbox.com/5c/d1/7JHIYoSq_o.png" 
                      alt="Logo Dulce Equilibrio" 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
