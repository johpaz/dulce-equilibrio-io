
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { signInWithGoogle, signOut, getCurrentUser, supabase, processOAuthRedirect } from "@/utils/authUtils";
import { useToast } from "@/hooks/use-toast";
import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import CourseDemo from "@/components/CourseDemo";
import SocialProof from "@/components/SocialProof";
import PricingTable from "@/components/PricingTable";
import FAQ from "@/components/FAQ";
import Dashboard from "@/components/Dashboard";
import Navbar from "@/components/Navbar";
import ElevenLabsWidget from "@/components/ElevenLabsWidget";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import LeadMagnet from "@/components/LeadMagnet";
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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

  // Process OAuth redirect and check if user is authenticated
  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      try {
        // Handle hash fragment (OAuth redirect) first
        if (window.location.hash && window.location.hash.includes('access_token')) {
          console.log('Found access token in URL, processing OAuth redirect...');
          const user = await processOAuthRedirect();
          
          if (user) {
            console.log('Successfully authenticated user from redirect', user);
            setUser(user);
            toast({
              title: "Inicio de sesión exitoso",
              description: "¡Bienvenido de nuevo!",
            });
            setLoading(false);
            return;
          }
        }
        
        // If we're not in a redirect flow, check for existing session
        console.log('Checking for existing session...');
        const currentUser = await getCurrentUser();
        console.log('Current user:', currentUser);
        setUser(currentUser);
      } catch (error) {
        console.error("Error during authentication:", error);
      } finally {
        setLoading(false);
      }
    };
    
    initAuth();
    
    // Subscribe to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        const currentUser = session?.user || null;
        setUser(currentUser);
        
        if (event === 'SIGNED_IN' && currentUser) {
          // Clear URL hash if it exists
          if (window.location.hash) {
            window.history.replaceState({}, document.title, window.location.pathname);
          }
          
          toast({
            title: "Inicio de sesión exitoso",
            description: "¡Bienvenido de nuevo!",
          });
        } else if (event === 'SIGNED_OUT') {
          toast({
            title: "Sesión cerrada",
            description: "Has cerrado sesión correctamente.",
          });
        }
      }
    );
    
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [toast]);

  const handleLogin = async () => {
    if (user) {
      // If user is already authenticated, sign out
      setLoading(true);
      const { success, error } = await signOut();
      setLoading(false);
      
      if (!success) {
        toast({
          title: "Error",
          description: error.message || "Error al cerrar sesión",
          variant: "destructive",
        });
      }
    } else {
      // Sign in with Google
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
      // No need for success toast here as the redirect will happen
    }
  };

  // If user is authenticated, show the dashboard
  if (user) {
    return (
      <>
        <Navbar user={user} loading={loading} handleLogin={handleLogin} />
        <Dashboard user={user} onLogout={() => setUser(null)} />
      </>
    );
  }

  // Initial loading state
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="bg-white">
      <Navbar user={user} loading={loading} handleLogin={handleLogin} />

      <main className="pt-16">
        {/* Hero Section */}
        <HeroSection videoUrl={videoUrl} />
        
        {/* ElevenLabs Widget */}
        <ElevenLabsWidget />
        
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
        <CTASection />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Scroll to top button */}
      <ScrollToTop showScrollToTop={showScrollToTop} scrollToTop={scrollToTop} />
      
      {/* Email lead magnet */}
      <LeadMagnet />
    </div>
  );
};

export default Index;
