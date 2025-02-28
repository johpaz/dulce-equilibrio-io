
import { useState } from "react";

interface Testimonial {
  id: string;
  name: string;
  image: string;
  role: string;
  quote: string;
  videoUrl?: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Laura Martínez",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29tYW4lMjBwb3J0cmFpdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    role: "Madre y empresaria",
    quote: "Nunca pensé que podría disfrutar de postres deliciosos mientras cuidaba mi salud. Gracias a Dulce Equilibrio, he perdido 8 kilos en 3 meses sin sentirme restringida.",
    videoUrl: "#"
  },
  {
    id: "2",
    name: "Carlos Sánchez",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1hbiUyMHBvcnRyYWl0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    role: "Entrenador personal",
    quote: "Recomiendo Dulce Equilibrio a todos mis clientes. Las recetas son perfectas para incluir en un plan de alimentación balanceado y mis clientes están encantados.",
    videoUrl: "#"
  },
  {
    id: "3",
    name: "María González",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d29tYW4lMjBwb3J0cmFpdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    role: "Estudiante de nutrición",
    quote: "El enfoque de Dulce Equilibrio está fundamentado en principios nutricionales sólidos. Como estudiante de nutrición, valoro muchísimo la información de calidad.",
    videoUrl: "#"
  }
];

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 card-hover">
      <div className="flex items-center gap-4 mb-4">
        <img 
          src={testimonial.image} 
          alt={testimonial.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h4 className="font-bold text-dulce-green">{testimonial.name}</h4>
          <p className="text-sm text-dulce-green-dark/70">{testimonial.role}</p>
        </div>
      </div>
      
      <blockquote className="text-dulce-green-dark/80 italic mb-4">
        "{testimonial.quote}"
      </blockquote>
      
      {testimonial.videoUrl && (
        <div className="bg-dulce-beige rounded-lg p-3 flex items-center justify-between">
          <span className="text-sm font-medium text-dulce-green-dark">Ver testimonio completo</span>
          <button className="bg-dulce-green text-white p-2 rounded-full">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 3L19 12L5 21V3Z" fill="currentColor" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

const SocialProof = () => {
  return (
    <section className="section-padding bg-dulce-beige-light">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge mb-4 animate-fade-in">Testimonios</div>
          <h2 className="section-title animate-fade-in delay-100">Historias de éxito</h2>
          <p className="section-subtitle animate-fade-in delay-200">
            Descubre cómo Dulce Equilibrio ha transformado la vida de nuestros estudiantes.
          </p>
        </div>
        
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className={`animate-fade-in-up delay-${index * 100}`}
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
        
        {/* Stats and Badges */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          <div className="flex flex-col items-center animate-fade-in delay-200">
            <div className="text-4xl font-bold text-dulce-green mb-2">1,200+</div>
            <p className="text-dulce-green-dark/80">Alumnos Satisfechos</p>
          </div>
          
          <div className="flex flex-col items-center animate-fade-in delay-300">
            <div className="text-4xl font-bold text-dulce-green mb-2">50+</div>
            <p className="text-dulce-green-dark/80">Recetas Exclusivas</p>
          </div>
          
          <div className="flex flex-col items-center animate-fade-in delay-400">
            <div className="text-4xl font-bold text-dulce-green mb-2">100%</div>
            <p className="text-dulce-green-dark/80">Garantía de Satisfacción</p>
          </div>
          
          <div className="flex flex-col items-center animate-fade-in delay-500">
            <div className="bg-dulce-green-light/20 rounded-full p-3 mb-2">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15L8.5 8L15.5 9.5L12 15Z" fill="#3D8168" stroke="#3D8168" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#3D8168" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-dulce-green-dark/80">Chef Certificados en Nutrición</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
