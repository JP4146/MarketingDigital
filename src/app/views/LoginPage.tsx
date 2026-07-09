import { useState } from "react";
import { ShieldCheck, ArrowLeft, Lock, Mail, RefreshCw } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

interface LoginPageProps {
  onLoginSuccess: () => void;
  onCancel: () => void;
}

export default function LoginPage({ onLoginSuccess, onCancel }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      setLoading(true);
      setErrorMsg("");

      // Autenticación con Supabase Auth nativo
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) throw error;

      // Si todo sale bien, ejecutamos la función de éxito para pasar al panel admin
      onLoginSuccess();
    } catch (err: any) {
      console.error("Error de inicio de sesión:", err);
      setErrorMsg(err.message || "Credenciales incorrectas. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative antialiased">
      {/* Botón flotante para regresar a la Web Pública */}
      <button
        onClick={onCancel}
        className="absolute top-6 left-6 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a la tienda
      </button>

      <div className="sm:mx-auto w-full sm:max-w-md">
        {/* Encabezado e Icono */}
        <div className="text-center space-y-3">
          <div className="inline-flex bg-amber-600 p-3 rounded-2xl text-white shadow-md shadow-amber-900/20">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900">
            Acceso Administrativo
          </h2>
          <p className="text-sm text-slate-500 font-light">
            Inicia sesión para gestionar el inventario y controlar los alquileres de Angel Jashiel.
          </p>
        </div>

        {/* Tarjeta del Formulario */}
        <div className="mt-8 sm:mx-auto w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100 space-y-6">
            
            {/* Mensaje de Error Amigable */}
            {errorMsg && (
              <div className="bg-red-50 border border-red-100 text-red-700 text-xs font-medium p-3 rounded-xl">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSignIn} className="space-y-4">
              {/* Campo Correo */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5" /> Correo Electrónico
                </label>
                <Input
                  required
                  type="email"
                  placeholder="admin@angeljashiel.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="focus-visible:ring-amber-500"
                  disabled={loading}
                />
              </div>

              {/* Campo Contraseña */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-1">
                  <Lock className="h-3.5 w-3.5" /> Contraseña
                </label>
                <Input
                  required
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="focus-visible:ring-amber-500"
                  disabled={loading}
                />
              </div>

              {/* Botón de envío */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-6 mt-2 font-semibold shadow-md gap-2"
              >
                {loading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Validando...
                  </>
                ) : (
                  "Ingresar al Panel"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}