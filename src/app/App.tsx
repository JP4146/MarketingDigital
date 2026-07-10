import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import LandingPage from "./views/LandingPage";
import LoginPage from "./views/LoginPage";
import AdminPanel from "./views/AdminPanel";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<"landing" | "login" | "admin">("landing");
  const [initializing, setInitializing] = useState(true);

  // 1. Escuchar el estado de autenticación al arrancar
  useEffect(() => {
    async function checkUser() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setCurrentScreen("admin");
        }
      } catch (err) {
        console.error("Error validando sesión activa:", err);
      } finally {
        setInitializing(false);
      }
    }
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setCurrentScreen("admin");
      } else {
        setCurrentScreen("landing");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. 🤫 TRUCO SECRETO: Escuchar combinación de teclas (Ctrl + Shift + A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Si presionas Ctrl + Shift + A al mismo tiempo
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        setCurrentScreen("login"); // Te manda directo al login secreto
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setCurrentScreen("landing");
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    }
  };

  if (initializing) {
    return (
      <div className="min-h-screen bg-slate-900 text-amber-500 flex flex-col items-center justify-center gap-2 font-mono text-xs">
        <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        <span>SINCRO: ANGEL JASHIEL...</span>
      </div>
    );
  }

  return (
    <>
      {currentScreen === "landing" && (
        <LandingPage onNavigateToLogin={() => setCurrentScreen("login")} />
      )}

      {currentScreen === "login" && (
        <LoginPage 
          onLoginSuccess={() => setCurrentScreen("admin")} 
          onCancel={() => setCurrentScreen("landing")} 
        />
      )}

      {currentScreen === "admin" && (
        <AdminPanel onLogout={handleLogout} />
      )}
    </>
  );
}