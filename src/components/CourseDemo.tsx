
import { useState } from "react";
import AudioPlayer from "./AudioPlayer";

interface TabProps {
  id: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const Tab = ({ id, label, isActive, onClick }: TabProps) => (
  <button
    id={id}
    onClick={onClick}
    className={`px-6 py-3 font-medium rounded-t-lg transition-all duration-300 ${
      isActive
        ? "bg-white text-dulce-green shadow-sm"
        : "bg-dulce-beige-light text-dulce-green-dark/70 hover:bg-dulce-beige"
    }`}
    aria-selected={isActive}
    role="tab"
    aria-controls={`${id}-panel`}
  >
    {label}
  </button>
);

interface Recipe {
  title: string;
  image: string;
  time: string;
  difficulty: "Fácil" | "Media" | "Avanzada";
  description: string;
  audioKey: string;
}

const courseSections = [
  {
    id: "desayunos",
    label: "Desayunos",
    recipes: [
      {
        title: "Pancakes de Avena y Plátano",
        image: "https://images.unsplash.com/photo-1575853121743-60c24f0a7502?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhbHRoeSUyMHBhbmNha2VzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        time: "15 min",
        difficulty: "Fácil" as const,
        description: "Deliciosos pancakes sin gluten ni azúcar refinada, perfectos para empezar el día con energía.",
        audioKey: "desayuno1"
      },
      {
        title: "Bowl de Açaí con Granola Casera",
        image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWNhaSUyMGJvd2x8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        time: "10 min",
        difficulty: "Fácil" as const,
        description: "Un desayuno refrescante, lleno de antioxidantes y con granola baja en azúcar.",
        audioKey: "desayuno2"
      }
    ]
  },
  {
    id: "snacks",
    label: "Snacks",
    recipes: [
      {
        title: "Barritas Energéticas de Frutos Secos",
        image: "https://images.unsplash.com/photo-1622484212385-1d239eda711b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
        time: "20 min",
        difficulty: "Media" as const,
        description: "Snacks perfectos para llevar, llenos de proteínas y grasas saludables.",
        audioKey: "snack1"
      },
      {
        title: "Hummus de Remolacha con Crudités",
        image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWNhaSUyMGJvd2x8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        time: "15 min",
        difficulty: "Fácil" as const,
        description: "Un dip colorido y nutritivo, perfecto para un aperitivo saludable.",
        audioKey: "snack2"
      }
    ]
  },
  {
    id: "postres",
    label: "Postres",
    recipes: [
      {
        title: "Brownie de Batata y Chocolate",
        image: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YnJvd25pZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        time: "40 min",
        difficulty: "Media" as const,
        description: "Nuestro postre estrella: un brownie húmedo con un toque de batata que le da cremosidad sin azúcares añadidos.",
        audioKey: "postre1"
      },
      {
        title: "Cheesecake de Limón sin Hornear",
        image: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hlZXNlY2FrZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        time: "30 min + 4h refrigeración",
        difficulty: "Avanzada" as const,
        description: "Un postre refrescante con base de frutos secos y relleno cremoso de anacardos.",
        audioKey: "postre2"
      }
    ]
  }
];

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg animate-fade-in">
      <div className="relative">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-full text-xs font-medium text-dulce-green">
          {recipe.time}
        </div>
        <div className={`absolute bottom-3 left-3 px-2 py-1 rounded-full text-xs font-medium text-white ${
          recipe.difficulty === "Fácil" 
            ? "bg-dulce-green" 
            : recipe.difficulty === "Media"
            ? "bg-dulce-gold"
            : "bg-dulce-gold-dark"
        }`}>
          {recipe.difficulty}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-bold text-dulce-green mb-2">{recipe.title}</h3>
        <p className="text-dulce-green-dark/80 text-sm mb-4">{recipe.description}</p>
        
        <AudioPlayer 
          audioKey={recipe.audioKey} 
          label="Escucha este paso clave" 
          small={true}
        />
      </div>
    </div>
  );
};

const CourseDemo = () => {
  const [activeTab, setActiveTab] = useState("desayunos");
  
  const activeSection = courseSections.find(section => section.id === activeTab) || courseSections[0];
  
  return (
    <section className="section-padding bg-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge mb-4 animate-fade-in">Vista Previa</div>
          <h2 className="section-title animate-fade-in delay-100">Descubre nuestras recetas</h2>
          <p className="section-subtitle animate-fade-in delay-200">
            Te mostramos algunas de las creaciones que aprenderás a preparar en nuestro curso.
          </p>
        </div>
        
        {/* Tabs */}
        <div className="flex justify-center mb-8 border-b border-dulce-beige">
          <div className="flex" role="tablist">
            {courseSections.map(section => (
              <Tab
                key={section.id}
                id={section.id}
                label={section.label}
                isActive={activeTab === section.id}
                onClick={() => setActiveTab(section.id)}
              />
            ))}
          </div>
        </div>
        
        {/* Tab panels */}
        <div className="mt-8">
          <div 
            id={`${activeTab}-panel`}
            role="tabpanel"
            aria-labelledby={activeTab}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {activeSection.recipes.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} />
              ))}
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <button className="btn-primary animate-pulse-subtle">
            Ver todas las recetas
          </button>
        </div>
      </div>
    </section>
  );
};

export default CourseDemo;
