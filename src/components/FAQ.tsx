
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import AudioPlayer from "./AudioPlayer";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  audioKey: string;
}

const faqItems: FAQItem[] = [
  {
    id: "faq1",
    question: "¿Necesito tener experiencia en cocina para tomar el curso?",
    answer: "No, nuestro curso está diseñado para todos los niveles. Comenzamos con técnicas básicas y gradualmente avanzamos a recetas más elaboradas. Cada paso está explicado en detalle con videos que puedes revisar tantas veces como necesites.",
    audioKey: "faq1"
  },
  {
    id: "faq2",
    question: "¿Las recetas requieren ingredientes difíciles de conseguir?",
    answer: "Nos enfocamos en utilizar ingredientes que puedas encontrar en cualquier supermercado o tienda de alimentos saludables. Además, proporcionamos una guía completa de sustituciones para adaptarse a diferentes restricciones dietéticas o disponibilidad de ingredientes.",
    audioKey: "faq2"
  },
  {
    id: "faq3",
    question: "¿Puedo seguir el curso si tengo intolerancia al gluten o lactosa?",
    answer: "¡Absolutamente! Nuestras recetas son adaptables y ofrecemos alternativas para dietas sin gluten, sin lácteos, veganas y más. Cada receta incluye notas sobre cómo adaptarla a diferentes necesidades dietéticas.",
    audioKey: "faq3"
  },
  {
    id: "faq4",
    question: "¿Cuánto tiempo tengo acceso al contenido del curso?",
    answer: "Dependiendo del plan que elijas, tendrás acceso por 6 meses, 12 meses o de por vida. El Plan Oro incluye acceso vitalicio con todas las actualizaciones futuras sin costo adicional.",
    audioKey: "faq4"
  }
];

const FAQ = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);
  
  const toggleItem = (id: string) => {
    if (openItems.includes(id)) {
      setOpenItems(openItems.filter(item => item !== id));
    } else {
      setOpenItems([...openItems, id]);
    }
  };
  
  return (
    <section className="section-padding bg-dulce-beige-light">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge mb-4 animate-fade-in">Preguntas Frecuentes</div>
          <h2 className="section-title animate-fade-in delay-100">¿Tienes dudas?</h2>
          <p className="section-subtitle animate-fade-in delay-200">
            Resolvemos las preguntas más comunes sobre nuestro curso de repostería saludable.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => {
            const isOpen = openItems.includes(item.id);
            
            return (
              <div 
                key={item.id} 
                className={`mb-4 bg-white rounded-lg shadow-md overflow-hidden animate-fade-in delay-${index * 100}`}
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                  aria-expanded={isOpen}
                  aria-controls={`${item.id}-answer`}
                >
                  <h3 className="text-lg font-medium text-dulce-green">{item.question}</h3>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-dulce-green flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-dulce-green flex-shrink-0" />
                  )}
                </button>
                
                {isOpen && (
                  <div 
                    id={`${item.id}-answer`}
                    className="p-5 pt-0 border-t border-dulce-beige animate-accordion-down"
                  >
                    <p className="text-dulce-green-dark/80 mb-4">{item.answer}</p>
                    <AudioPlayer 
                      audioKey={item.audioKey} 
                      label="Escuchar respuesta" 
                      small={true}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-12 animate-fade-in delay-500">
          <p className="text-dulce-green-dark/80 mb-6">
            ¿No encuentras la respuesta que buscas? Estamos aquí para ayudarte.
          </p>
          <button className="btn-primary">
            Contactar Soporte
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
