import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export default function Hero() {
  const scrollToCatalog = () => {
    const element = document.getElementById("catalogo");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="relative bg-gradient-to-br from-slate-900 via-amber-950 to-slate-950 text-white py-24 px-4 overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,119,6,0.15),transparent_45%)]" />
      
      <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
        {/* Etiqueta flotante */}
        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-4 py-1.5 rounded-full text-amber-400 text-sm font-medium backdrop-blur-sm animate-pulse">
          <Sparkles className="h-4 w-4" />
          <span>Alquiler de Ropa Exclusiva en Andahuaylas   </span>
        </div>

        {/* Título Principal */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto">
          Luce Espectacular en tus Momentos <span className="text-amber-500 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">Inolvidables</span>
        </h1>

        {/* Subtítulo */}
        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
          Trajes, ternos y vestidos de alta costura para matrimonios, galas y aniversarios. Estilo impecable sin necesidad de comprar.
        </p>

        {/* Botón de Acción Directo */}
        <div className="pt-4">
          <Button 
            size="lg" 
            className="bg-amber-600 hover:bg-amber-700 text-white text-md px-8 py-6 rounded-xl shadow-lg shadow-amber-950/50 transition-all hover:scale-105 gap-2"
            onClick={scrollToCatalog}
          >
            Explorar Catálogo
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}