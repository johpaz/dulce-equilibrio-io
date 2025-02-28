
import { useState } from "react";
import AudioPlayer from "./AudioPlayer";

const BenefitCard = ({ 
  title, 
  description, 
  icon, 
  audioKey,
  delay = "0" 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
  audioKey: string;
  delay?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`bg-white rounded-xl p-6 shadow-md card-hover ${isHovered ? 'scale-[1.02]' : ''} animate-fade-in-up delay-${delay}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-dulce-green/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-dulce-green mb-3">{title}</h3>
      <p className="text-dulce-green-dark/80 mb-5">{description}</p>
      
      <AudioPlayer 
        audioKey={audioKey} 
        label="Escuchar beneficio"
        small={true}
      />
    </div>
  );
};

const BenefitsSection = () => {
  return (
    <section className="py-20 bg-dulce-beige-light relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-white clip-path-wave"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge mb-4 animate-fade-in">Método Probado</div>
          <h2 className="section-title animate-fade-in delay-100">Transforma tu relación con la comida</h2>
          <p className="section-subtitle animate-fade-in delay-200">
            Nuestro enfoque único combina sabor, nutrición y técnicas profesionales para resultados duraderos.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <BenefitCard 
            title="Pierde peso sin dietas extremas" 
            description="Aprende a crear alternativas saludables de tus postres favoritos manteniendo el sabor que amas."
            audioKey="benefit1"
            delay="100"
            icon={
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 6L18 8L22 4M8.5 12L14.5 6.5M7.5 6.5C7.5 8.433 5.933 10 4 10C2.067 10 0.5 8.433 0.5 6.5C0.5 4.567 2.067 3 4 3C5.933 3 7.5 4.567 7.5 6.5ZM17.5 15.5C17.5 17.433 15.933 19 14 19C12.067 19 10.5 17.433 10.5 15.5C10.5 13.567 12.067 12 14 12C15.933 12 17.5 13.567 17.5 15.5Z" stroke="#3D8168" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
          />
          
          <BenefitCard 
            title="Domina técnicas en 7 días" 
            description="Aprende las bases de la repostería fit y empieza a crear tus propias recetas con confianza."
            audioKey="benefit2"
            delay="200"
            icon={
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6.5V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#3D8168" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
          />
          
          <BenefitCard 
            title="Acceso vitalicio a actualizaciones" 
            description="Nuestro contenido se renueva constantemente con las últimas tendencias y descubrimientos nutricionales."
            audioKey="benefit3"
            delay="300"
            icon={
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.5 14C21.9853 14 24 16.0147 24 18.5C24 20.9853 21.9853 23 19.5 23C17.0147 23 15 20.9853 15 18.5C15 16.0147 17.0147 14 19.5 14Z" fill="#3D8168" fillOpacity="0.2"/>
                <path d="M4 18V15M4 15V5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5V19.5M4 15H11.5M14 15H20" stroke="#3D8168" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
