
import { LogIn, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  user: any;
  loading: boolean;
  handleLogin: () => Promise<void>;
}

const Navbar = ({ user, loading, handleLogin }: NavbarProps) => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 py-4 px-6 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-dulce-green font-bold text-xl">Dulce Equilibrio</div>
        
        {user ? null : (
          <nav className="hidden md:flex space-x-6">
            <a href="#beneficios" className="text-dulce-green-dark hover:text-dulce-green transition-colors">Beneficios</a>
            <a href="#recetas" className="text-dulce-green-dark hover:text-dulce-green transition-colors">Recetas</a>
            <a href="#testimonios" className="text-dulce-green-dark hover:text-dulce-green transition-colors">Testimonios</a>
            <a href="#precios" className="text-dulce-green-dark hover:text-dulce-green transition-colors">Precios</a>
            <a href="#faq" className="text-dulce-green-dark hover:text-dulce-green transition-colors">FAQ</a>
          </nav>
        )}
        
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
  );
};

export default Navbar;
