import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { getCurrentUser, processOAuthRedirect, supabase } from "./utils/authUtils";
import Dashboard from "@/components/Dashboard";
import LoadingScreen from "./components/LoadingScreen";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      
      // First, check if we're in an OAuth redirect flow
      try {
        const redirectUser = await processOAuthRedirect();
        if (redirectUser) {
          console.log("OAuth redirect processed with user:", redirectUser);
          setUser(redirectUser);
          setIsAuthenticated(true);
          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.error("Error processing OAuth redirect:", error);
      }
      
      // Otherwise, check for existing session
      try {
        const currentUser = await getCurrentUser();
        console.log("Current user from session:", currentUser);
        setUser(currentUser);
        setIsAuthenticated(!!currentUser);
      } catch (error) {
        console.error("Error getting current user:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    initAuth();
    
    // Subscribe to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        // Update user state when auth state changes
        if (event === 'SIGNED_IN') {
          const currentUser = session?.user || null;
          setUser(currentUser);
          setIsAuthenticated(!!currentUser);
          
          // Clear URL hash if it exists
          if (window.location.hash) {
            window.history.replaceState({}, document.title, window.location.pathname);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setIsAuthenticated(false);
        }
      }
    );
    
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // Crear un componente protegido para rutas que requieren autenticación
  const ProtectedRoute = ({ children }) => {
    if (isLoading) {
      return <LoadingScreen />;
    }
    
    if (!isAuthenticated) {
      // Redirigir a inicio si no está autenticado
      return <Navigate to="/" />;
    }
    
    return children;
  };

  // Mostrar la pantalla de carga durante la inicialización
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={isAuthenticated ? <Navigate to="/dashboard" /> : <Index />} 
            />
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
