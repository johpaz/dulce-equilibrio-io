
import { createClient } from '@supabase/supabase-js';

// Create Supabase client with explicitly provided URL and key
const supabaseUrl = 'https://kzkmokarzzututvgljzm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6a21va2Fyenp1dHV0dmdsanptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3MDQwNzksImV4cCI6MjA1NjI4MDA3OX0.68PwkieZw7upvRlsG0CgloRz0-OwbeAcpAkUDYzFnr4';

// Make sure both values exist before creating the client
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing');
}

// Create the client with proper error handling
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
