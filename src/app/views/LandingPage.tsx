import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import CatalogSection from "../components/landing/CatalogSection";
import Footer from "../components/landing/Footer";

interface LandingPageProps {
  onNavigateToLogin: () => void;
}

export default function LandingPage({ onNavigateToLogin }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col antialiased">
      {/* 1. Barra de Navegación Superior */}
      <Navbar onLoginClick={onNavigateToLogin} />

      {/* 2. Sección Principal de Impacto (Portada) */}
      <Hero />

      {/* 3. El Catálogo Interactivo con Conexión a Base de Datos */}
      <main className="flex-grow">
        <CatalogSection />
      </main>

      {/* 4. Pie de Página con Enlace Administrativo Oculto */}
      <Footer onAdminClick={onNavigateToLogin} />
    </div>
  );
}