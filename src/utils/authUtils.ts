
import { createClient } from '@supabase/supabase-js';

// Crear el cliente de Supabase utilizando las variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Función para iniciar sesión con Google
export const signInWithGoogle = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      console.error('Error al iniciar sesión con Google:', error.message);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error inesperado al iniciar sesión:', error);
    return { success: false, error };
  }
};

// Función para cerrar sesión
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Error al cerrar sesión:', error.message);
      return { success: false, error };
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error inesperado al cerrar sesión:', error);
    return { success: false, error };
  }
};

// Obtener el usuario actual
export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error('Error al obtener usuario:', error.message);
      return null;
    }
    
    return data.user;
  } catch (error) {
    console.error('Error inesperado al obtener usuario:', error);
    return null;
  }
};
