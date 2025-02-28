
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { LogOut, Settings, BookOpen, Calendar, Heart, List, Home } from "lucide-react";
import { signOut } from "@/utils/authUtils";
import { useToast } from "@/hooks/use-toast";

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard = ({ user, onLogout }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState("inicio");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleLogout = async () => {
    setLoading(true);
    const { success, error } = await signOut();
    setLoading(false);
    
    if (success) {
      onLogout();
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente.",
      });
    } else {
      toast({
        title: "Error",
        description: error.message || "Error al cerrar sesión",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-dulce-beige-light/30 pt-20">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Dashboard header */}
          <div className="bg-dulce-green text-white p-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">Bienvenido/a, {user.email?.split('@')[0]}</h1>
                <p className="text-white/80">¿Qué vas a cocinar hoy?</p>
              </div>
              <button
                onClick={handleLogout}
                disabled={loading}
                className="flex items-center gap-2 bg-white text-dulce-green px-4 py-2 rounded-lg text-sm font-medium hover:bg-dulce-beige transition-all"
              >
                {loading ? (
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></span>
                ) : (
                  <>
                    <LogOut className="w-4 h-4" />
                    <span>Cerrar Sesión</span>
                  </>
                )}
              </button>
            </div>
          </div>
          
          {/* Dashboard navigation */}
          <div className="flex border-b border-dulce-beige">
            <nav className="flex overflow-x-auto py-4 px-6 gap-4">
              <button 
                onClick={() => setActiveTab("inicio")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
                  ${activeTab === "inicio" ? 'bg-dulce-green text-white' : 'text-dulce-green-dark hover:bg-dulce-beige/50'}
                `}
              >
                <Home className="w-4 h-4" />
                <span>Inicio</span>
              </button>
              
              <button 
                onClick={() => setActiveTab("recetas")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
                  ${activeTab === "recetas" ? 'bg-dulce-green text-white' : 'text-dulce-green-dark hover:bg-dulce-beige/50'}
                `}
              >
                <BookOpen className="w-4 h-4" />
                <span>Mis Recetas</span>
              </button>
              
              <button 
                onClick={() => setActiveTab("favoritos")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
                  ${activeTab === "favoritos" ? 'bg-dulce-green text-white' : 'text-dulce-green-dark hover:bg-dulce-beige/50'}
                `}
              >
                <Heart className="w-4 h-4" />
                <span>Favoritos</span>
              </button>
              
              <button 
                onClick={() => setActiveTab("planificador")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
                  ${activeTab === "planificador" ? 'bg-dulce-green text-white' : 'text-dulce-green-dark hover:bg-dulce-beige/50'}
                `}
              >
                <Calendar className="w-4 h-4" />
                <span>Planificador</span>
              </button>
              
              <button 
                onClick={() => setActiveTab("compras")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
                  ${activeTab === "compras" ? 'bg-dulce-green text-white' : 'text-dulce-green-dark hover:bg-dulce-beige/50'}
                `}
              >
                <List className="w-4 h-4" />
                <span>Lista de Compras</span>
              </button>
              
              <button 
                onClick={() => setActiveTab("perfil")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
                  ${activeTab === "perfil" ? 'bg-dulce-green text-white' : 'text-dulce-green-dark hover:bg-dulce-beige/50'}
                `}
              >
                <Settings className="w-4 h-4" />
                <span>Perfil</span>
              </button>
            </nav>
          </div>
          
          {/* Dashboard content */}
          <div className="p-6">
            {activeTab === "inicio" && (
              <div className="space-y-8">
                <section>
                  <h2 className="text-xl font-bold text-dulce-green mb-4">Recetas destacadas</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="bg-dulce-beige-light rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="aspect-video bg-dulce-beige/50 flex items-center justify-center">
                          <span className="text-dulce-green-dark/70">Imagen de receta</span>
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium text-dulce-green">Postre Saludable #{item}</h3>
                          <p className="text-sm text-dulce-green-dark/70 mt-1">Descubre cómo preparar este delicioso postre sin azúcares añadidos.</p>
                          <button className="mt-3 text-sm text-dulce-green font-medium">Ver receta →</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
                
                <section>
                  <h2 className="text-xl font-bold text-dulce-green mb-4">Tu progreso</h2>
                  <div className="bg-white border border-dulce-beige rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-dulce-beige-light rounded-lg p-4 text-center">
                        <p className="text-sm text-dulce-green-dark/70">Recetas completadas</p>
                        <p className="text-3xl font-bold text-dulce-green">0</p>
                      </div>
                      <div className="bg-dulce-beige-light rounded-lg p-4 text-center">
                        <p className="text-sm text-dulce-green-dark/70">Recetas guardadas</p>
                        <p className="text-3xl font-bold text-dulce-green">0</p>
                      </div>
                      <div className="bg-dulce-beige-light rounded-lg p-4 text-center">
                        <p className="text-sm text-dulce-green-dark/70">Días consecutivos</p>
                        <p className="text-3xl font-bold text-dulce-green">1</p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}
            
            {activeTab !== "inicio" && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="text-dulce-green-dark/50 mb-4">
                  <Settings className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-medium text-dulce-green">Contenido en desarrollo</h3>
                <p className="text-dulce-green-dark/70 max-w-md mt-2">
                  Esta funcionalidad estará disponible muy pronto. ¡Estamos trabajando para ofrecerte la mejor experiencia!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
