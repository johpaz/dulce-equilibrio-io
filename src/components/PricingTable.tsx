
import { useState } from "react";
import { Check } from "lucide-react";
import CountdownTimer from "./CountdownTimer";

interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  price: {
    original: number;
    discounted?: number;
  };
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
}

const pricingPlans: PricingPlan[] = [
  {
    id: "bronce",
    name: "Plan Bronce",
    price: {
      original: 97,
      discounted: 67
    },
    description: "Perfecto para principiantes que quieren probar nuestro método.",
    features: [
      "30 recetas básicas en video",
      "Guía de sustituciones saludables",
      "Acceso por 6 meses",
      "Soporte por email"
    ],
    buttonText: "Empezar ahora"
  },
  {
    id: "plata",
    name: "Plan Plata",
    price: {
      original: 197,
      discounted: 137
    },
    description: "Nuestra opción más popular para quienes buscan resultados completos.",
    features: [
      "50 recetas en video HD",
      "Guía de sustituciones saludables",
      "Calculadora de macronutrientes",
      "1 consulta con nutricionista",
      "Acceso por 12 meses",
      "Soporte prioritario"
    ],
    isPopular: true,
    buttonText: "Elegir este plan"
  },
  {
    id: "oro",
    name: "Plan Oro",
    badge: "Mejor valor",
    price: {
      original: 297,
      discounted: 207
    },
    description: "La experiencia completa para quienes no quieren comprometer resultados.",
    features: [
      "Todas las recetas (70+) en video HD",
      "eBook exclusivo de repostería avanzada",
      "3 consultas mensuales con nutricionistas",
      "Comunidad privada de apoyo",
      "Acceso vitalicio con actualizaciones",
      "Soporte VIP 24/7"
    ],
    buttonText: "Obtener acceso completo"
  }
];

const PricingTable = () => {
  return (
    <section className="section-padding bg-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="badge mb-4 animate-fade-in">Inversión</div>
          <h2 className="section-title animate-fade-in delay-100">Elige tu plan ideal</h2>
          <p className="section-subtitle animate-fade-in delay-200">
            Selecciona la opción que mejor se adapte a tus objetivos y comienza tu viaje hacia una alimentación más saludable.
          </p>
        </div>
        
        <div className="text-center mb-12 animate-fade-in delay-300">
          <div className="inline-block bg-dulce-beige-dark/30 rounded-lg p-4">
            <p className="font-medium text-dulce-green mb-2">
              La oferta termina pronto
            </p>
            <CountdownTimer />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div 
              key={plan.id} 
              className={`
                relative rounded-xl overflow-hidden transition-all duration-500 animate-fade-in delay-${index * 200}
                ${plan.isPopular ? 'border-2 border-dulce-green shadow-xl' : 'border border-dulce-beige shadow-md'}
              `}
            >
              {plan.badge && (
                <div className="absolute top-0 right-0 bg-dulce-gold text-white px-4 py-1 text-sm font-medium">
                  {plan.badge}
                </div>
              )}
              
              <div className="p-6 bg-white">
                <h3 className="text-xl font-bold text-dulce-green mb-2">{plan.name}</h3>
                <p className="text-dulce-green-dark/80 text-sm mb-4">{plan.description}</p>
                
                <div className="mb-6">
                  {plan.price.discounted ? (
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold text-dulce-green">${plan.price.discounted}</span>
                      <span className="text-dulce-green-dark/60 line-through">${plan.price.original}</span>
                      <span className="bg-dulce-green-light/20 text-dulce-green-dark text-xs px-2 py-1 rounded-full">
                        30% OFF
                      </span>
                    </div>
                  ) : (
                    <span className="text-3xl font-bold text-dulce-green">${plan.price.original}</span>
                  )}
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-dulce-green shrink-0 mt-0.5" />
                      <span className="text-dulce-green-dark/80 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 
                    ${plan.isPopular 
                      ? 'bg-dulce-green text-white hover:bg-dulce-green-dark' 
                      : 'bg-dulce-beige text-dulce-green hover:bg-dulce-beige-dark'}`}
                >
                  {plan.buttonText}
                </button>
              </div>
              
              {plan.isPopular && (
                <div className="bg-dulce-green text-white text-center py-2 text-sm font-medium">
                  Recomendado por nutricionistas
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center animate-fade-in delay-500">
          <p className="text-dulce-green-dark/80 mb-4">
            ¿Tienes preguntas antes de decidir? Estamos aquí para ayudarte.
          </p>
          <button className="btn-secondary">
            Programar una llamada gratuita
          </button>
        </div>
      </div>
    </section>
  );
};

export default PricingTable;
