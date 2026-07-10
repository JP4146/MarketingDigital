import { createClient } from '@supabase/supabase-js';

// Obtener las credenciales desde las variables de entorno de Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase: Faltan las variables VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY en el archivo .env'
  );
}

// Inicializar el cliente
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
