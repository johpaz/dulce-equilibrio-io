
import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import CourseDemo from "@/components/CourseDemo";
import SocialProof from "@/components/SocialProof";
import PricingTable from "@/components/PricingTable";
import FAQ from "@/components/FAQ";
import Dashboard from "@/components/Dashboard";
import { ArrowUp, LogIn, LogOut, User } from "lucide-react";
import { signInWithGoogle, signOut, getCurrentUser, supabase } from "@/utils/authUtils";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const { toast } = useToast();

  const handleScroll = () => {
    if (window.scrollY > 500) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Fetch video URL from Supabase
  useEffect(() => {
    const fetchVideoUrl = async () => {
      try {
        const { data, error } = await supabase
          .from('recetas')
          .select('video')
          .limit(1);
          
        if (error) {
          console.error('Error fetching video URL:', error);
          return;
        }
        
        if (data && data.length > 0 && data[0].video) {
          setVideoUrl(data[0].video);
        }
      } catch (error) {
        console.error('Error fetching video URL:', error);
      }
    };
    
    fetchVideoUrl();
  }, []);

  // Verificar si el usuario está autenticado al cargar la página
  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };
    
    checkUser();
    
    // Suscribirse a los cambios de autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user || null;
        setUser(currentUser);
      }
    );
    
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    if (user) {
      // Si el usuario ya está autenticado, cerrar sesión
      setLoading(true);
      const { success, error } = await signOut();
      setLoading(false);
      
      if (success) {
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
    } else {
      // Iniciar sesión con Google
      setLoading(true);
      const { success, error } = await signInWithGoogle();
      setLoading(false);
      
      if (!success) {
        toast({
          title: "Error",
          description: error.message || "Error al iniciar sesión con Google",
          variant: "destructive",
        });
      }
    }
  };

  // Si el usuario está autenticado, mostrar el dashboard
  if (user) {
    return (
      <>
        {/* Navbar placeholder - to be implemented */}
        <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 py-4 px-6 shadow-sm">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-dulce-green font-bold text-xl">Dulce Equilibrio</div>
            <button 
              onClick={handleLogin}
              disabled={loading}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all
                ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-dulce-green-dark'}
                ${user ? 'bg-dulce-beige text-dulce-green-dark' : 'bg-dulce-green text-white'}
              `}
            >
              {loading ? (
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></span>
              ) : (
                <>
                  <User className="w-4 h-4" />
                  <span className="max-w-[100px] truncate">{user.email?.split('@')[0] || 'Usuario'}</span>
                  <LogOut className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </header>

        <Dashboard user={user} onLogout={() => setUser(null)} />
      </>
    );
  }

  return (
    <div className="bg-white">
      {/* Navbar placeholder - to be implemented */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 py-4 px-6 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-dulce-green font-bold text-xl">Dulce Equilibrio</div>
          <nav className="hidden md:flex space-x-6">
            <a href="#beneficios" className="text-dulce-green-dark hover:text-dulce-green transition-colors">Beneficios</a>
            <a href="#recetas" className="text-dulce-green-dark hover:text-dulce-green transition-colors">Recetas</a>
            <a href="#testimonios" className="text-dulce-green-dark hover:text-dulce-green transition-colors">Testimonios</a>
            <a href="#precios" className="text-dulce-green-dark hover:text-dulce-green transition-colors">Precios</a>
            <a href="#faq" className="text-dulce-green-dark hover:text-dulce-green transition-colors">FAQ</a>
          </nav>
          <button 
            onClick={handleLogin}
            disabled={loading}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all
              ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-dulce-green-dark'}
              ${user ? 'bg-dulce-beige text-dulce-green-dark' : 'bg-dulce-green text-white'}
            `}
          >
            {loading ? (
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></span>
            ) : user ? (
              <>
                <User className="w-4 h-4" />
                <span className="max-w-[100px] truncate">{user.email?.split('@')[0] || 'Usuario'}</span>
                <LogOut className="w-4 h-4" />
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Iniciar Sesión</span>
              </>
            )}
          </button>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero Section */}
        <HeroSection videoUrl={videoUrl} />
        
        {/* ElevenLabs Widget */}
        <section className="py-10 bg-dulce-beige-light">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-dulce-green mb-8">Háblame y Resuelve tus Dudas</h2>
            <div className="flex justify-center">
              {/* Using dangerouslySetInnerHTML to render the custom element */}
              <div dangerouslySetInnerHTML={{ __html: '<elevenlabs-convai agent-id="XdyI8LM6MoIpFM6XbUHV"></elevenlabs-convai>' }} />
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section id="beneficios">
          <BenefitsSection />
        </section>
        
        {/* Course Demo */}
        <section id="recetas">
          <CourseDemo />
        </section>
        
        {/* Social Proof */}
        <section id="testimonios">
          <SocialProof />
        </section>
        
        {/* Pricing Table */}
        <section id="precios">
          <PricingTable />
        </section>
        
        {/* FAQ */}
        <section id="faq">
          <FAQ />
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-dulce-green text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">¿Listo para transformar tus postres?</h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8 animate-fade-in delay-100">
              Únete a nuestra comunidad y descubre cómo la repostería saludable puede cambiar tu vida.
            </p>
            <button className="bg-white text-dulce-green px-8 py-4 rounded-full font-medium text-lg shadow-lg transition-all hover:shadow-xl hover:bg-dulce-beige animate-fade-in delay-200">
              Comenzar Mi Transformación
            </button>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-dulce-green-dark text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4">Dulce Equilibrio</h3>
              <p className="text-white/80 mb-4">
                Transformando la repostería tradicional en experiencias saludables y deliciosas.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-dulce-beige transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-dulce-beige transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-dulce-beige transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2 text-white/80">
                <li><a href="#" className="hover:text-white transition-colors">Inicio</a></li>
                <li><a href="#beneficios" className="hover:text-white transition-colors">Beneficios</a></li>
                <li><a href="#recetas" className="hover:text-white transition-colors">Recetas</a></li>
                <li><a href="#testimonios" className="hover:text-white transition-colors">Testimonios</a></li>
                <li><a href="#precios" className="hover:text-white transition-colors">Precios</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Recursos</h3>
              <ul className="space-y-2 text-white/80">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Recetas Gratuitas</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Guía de Inicio</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Calculadora Nutricional</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contacto</h3>
              <ul className="space-y-2 text-white/80">
                <li>Email: info@dulceequilibrio.com</li>
                <li>Teléfono: +52 123 456 7890</li>
                <li className="pt-4">
                  <button className="bg-white text-dulce-green-dark px-4 py-2 rounded-lg text-sm font-medium hover:bg-dulce-beige transition-all">
                    Contáctanos
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-12 pt-6 text-center text-white/60 text-sm">
            &copy; {new Date().getFullYear()} Dulce Equilibrio. Todos los derechos reservados.
          </div>
        </div>
      </footer>
      
      {/* Scroll to top button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-dulce-green text-white p-3 rounded-full shadow-lg hover:bg-dulce-green-dark transition-all z-50"
          aria-label="Volver arriba"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
      
      {/* Email lead magnet - can be improved with actual form integration */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-dulce-beige z-40 py-3 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="font-medium text-dulce-green">¿Quieres probar antes de decidir?</p>
            <p className="text-sm text-dulce-green-dark/80">Descarga gratis 3 recetas exclusivas</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <input
              type="email"
              placeholder="Tu email"
              className="px-4 py-2 border border-dulce-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-dulce-green"
            />
            <button className="btn-primary whitespace-nowrap">
              Descargar Ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
