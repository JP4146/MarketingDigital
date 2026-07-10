import { Shirt, MapPin, Phone, Mail } from "lucide-react";

interface FooterProps {
  onAdminClick: () => void;
}

export default function Footer({ onAdminClick }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
        
        {/* Columna 1: Marca */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-white">
            <div className="bg-amber-600 p-2 rounded-lg text-white">
              <Shirt className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-wide">Angel Jashiel</span>
          </div>
          <p className="text-sm font-light leading-relaxed max-w-sm">
            Especialistas en alquiler de trajes y vestidos de etiqueta. Elevando tu elegancia para que brilles en cada celebración importante.
          </p>
        </div>

        {/* Columna 2: Contacto */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">Contacto</h4>
          <ul className="space-y-3 text-sm font-light">
            <li className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-amber-500 shrink-0 pt-0.5" />
              <span>Av. Bolognesi #123 (Frente al pasaje comercial), Tacna, Perú</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-amber-500 shrink-0" />
              <span>+51 900 123 456</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-amber-500 shrink-0" />
              <span>contacto@angeljashiel.com</span>
            </li>
          </ul>
        </div>

        {/* Columna 3: Horarios de Atención */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">Horario de Tienda</h4>
          <ul className="space-y-2 text-sm font-light">
            <li className="flex justify-between border-b border-slate-800 pb-1">
              <span>Lunes a Viernes:</span>
              <span className="text-slate-200">09:00 AM - 08:30 PM</span>
            </li>
            <li className="flex justify-between border-b border-slate-800 pb-1">
              <span>Sábados:</span>
              <span className="text-slate-200">09:00 AM - 07:00 PM</span>
            </li>
            <li className="flex justify-between text-amber-400 font-medium">
              <span>Domingos y Feriados:</span>
              <span>Previa Cita</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Línea final de Copyright y Acceso de gestión */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light">
        <div>
          &copy; {currentYear} Angel Jashiel. Todos los derechos reservados.
        </div>
        <div>
          <button
            onClick={onAdminClick}
            className="text-slate-500 hover:text-amber-500 transition-colors underline underline-offset-4 bg-transparent border-none cursor-pointer"
          >
            Acceso del Personal Administrativo
          </button>
        </div>
      </div>
    </footer>
  );
}