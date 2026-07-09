import { Shirt } from "lucide-react";

interface NavbarProps {
  onLoginClick: () => void;
}

export default function Navbar({ onLoginClick }: NavbarProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo de la Marca */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="bg-amber-600 p-2.5 rounded-xl text-white shadow-md shadow-amber-600/20">
              <Shirt className="h-5 w-5" />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-950">
              Angel Jashiel
            </span>
          </div>

          {/* Menú de Navegación del Cliente Limpio */}
          <div className="flex items-center gap-8 text-sm font-medium text-slate-600">
            <button 
              onClick={() => scrollToSection("catalogo")} 
              className="hover:text-amber-600 transition-colors bg-transparent border-none cursor-pointer"
            >
              Catálogo
            </button>
            <button 
              onClick={() => scrollToSection("como-funciona")} 
              className="hover:text-amber-600 transition-colors bg-transparent border-none cursor-pointer hidden sm:inline-block"
            >
              ¿Cómo funciona?
            </button>
            <button 
              onClick={() => scrollToSection("opiniones")} 
              className="hover:text-amber-600 transition-colors bg-transparent border-none cursor-pointer hidden sm:inline-block"
            >
              Opiniones
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}