import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { getCurrentUser, processOAuthRedirect } from "./utils/authUtils";
import Dashboard from "@/components/Dashboard";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      
      // First, check if we're in an OAuth redirect flow
      if (window.location.hash && window.location.hash.includes('access_token')) {
        const redirectUser = await processOAuthRedirect();
        if (redirectUser) {
          setUser(redirectUser);
          setIsAuthenticated(true);
          setIsLoading(false);
          return;
        }
      }
      
      // Otherwise, check for existing session
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setIsAuthenticated(!!currentUser);
      setIsLoading(false);
    };
    
    initAuth();
  }, []);

  // Crear un componente protegido para rutas que requieren autenticación
  const ProtectedRoute = ({ children }) => {
    if (isLoading) {
      // Mostrar un spinner mientras carga
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-dulce-green border-r-transparent"></div>
          <span className="ml-2">Cargando...</span>
        </div>
      );
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
