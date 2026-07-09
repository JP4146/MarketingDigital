import { LayoutDashboard, Shirt, Users, LogOut, ShieldAlert } from "lucide-react";
import { Button } from "../ui/button";

interface AdminNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

export default function AdminNav({ activeTab, setActiveTab, onLogout }: AdminNavProps) {
  const menuItems = [
    { id: "dashboard", name: "Panel General", icon: LayoutDashboard },
    { id: "inventario", name: "Inventario de Ropa", icon: Shirt },
    { id: "leads", name: "Solicitudes Web", icon: Users },
  ];

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Indicador de Modo Administrador */}
          <div className="flex items-center gap-2">
            <div className="bg-amber-500 p-1.5 rounded-md text-slate-950">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-wide leading-none text-amber-400">
                SISTEMA INTERNO
              </span>
              <span className="text-xs text-slate-400 font-light">
                Angel Jashiel S.A.C
              </span>
            </div>
          </div>

          {/* Pestañas de Navegación del Panel */}
          <div className="hidden md:flex items-center gap-2 h-full">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-4 h-12 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-amber-600 text-white shadow-md shadow-amber-950"
                      : "text-slate-300 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </button>
              );
            })}
          </div>

          {/* Botón de Salida Segura */}
          <div>
            <Button
              variant="ghost"
              className="text-slate-300 hover:text-red-400 hover:bg-red-950/30 gap-2 rounded-xl transition-colors border border-transparent hover:border-red-900/50"
              onClick={onLogout}
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Salir</span>
            </Button>
          </div>
        </div>

        {/* Menú de pestañas adaptado para Móviles (Abajo del nav) */}
        <div className="flex md:hidden border-t border-slate-800 py-2 justify-around gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center flex-1 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  isActive ? "text-amber-400 bg-slate-800/60" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Icon className="h-4 w-4 mb-1" />
                {item.name.split(" ")[0]} {/* Muestra solo la primera palabra en móvil */}
              </button>
            );
          })}
        </div>

      </div>
    </nav>
  );
}