
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { getCurrentUser } from "./utils/authUtils";
import Dashboard from "@/components/Dashboard";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setIsAuthenticated(!!currentUser);
    };
    
    checkAuth();
  }, []);

  // Crear un componente protegido para rutas que requieren autenticación
  const ProtectedRoute = ({ children }) => {
    if (isAuthenticated === null) {
      // Aún cargando, podríamos mostrar un spinner aquí
      return <div className="flex items-center justify-center min-h-screen">Cargando...</div>;
    }
    
    if (!isAuthenticated) {
      // Redirigir a inicio si no está autenticado
      return <Navigate to="/" />;
    }
    
    return children;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  {user && <Dashboard user={user} onLogout={() => setIsAuthenticated(false)} />}
                </ProtectedRoute>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
