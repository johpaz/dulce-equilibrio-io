

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

// Function to sign in with Google
export const signInWithGoogle = async () => {
  try {
    console.log('Iniciando sesión con Google...');

    // Define our auth redirect URL - we'll redirect here after authentication
    const redirectUrl = `${window.location.origin}/dashboard`;
    console.log('Redirect URL:', redirectUrl);

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
        // Important: don't skip the browser redirect to allow Supabase to handle auth properly
        skipBrowserRedirect: false 
      },
    });

    if (error) {
      console.error('Error al iniciar sesión con Google:', error.message);
      return { success: false, error };
    }

    // Note: The actual redirect will be handled by Supabase, not this code
    // as we have set skipBrowserRedirect to false
    console.log('Autenticación iniciada correctamente, esperando redirección de Supabase');
    return { success: true, data };
  } catch (error) {
    console.error('Error inesperado al iniciar sesión:', error);
    return { success: false, error };
  }
};

// Function to sign out
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Error al cerrar sesión:', error.message);
      return { success: false, error };
    }
    
    // Redirigir al inicio después de cerrar sesión
    window.location.href = '/';
    
    return { success: true };
  } catch (error) {
    console.error('Error inesperado al cerrar sesión:', error);
    return { success: false, error };
  }
};

// Function to get the current user
export const getCurrentUser = async () => {
  try {
    // First check if we have a session
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error('Error al obtener sesión:', sessionError.message);
      return null;
    }
    
    // If there's no session or no user in the session, return null
    if (!sessionData.session) {
      return null;
    }
    
    // If we have a session, get the user
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

// Function to handle auth state change manually (if needed)
export const handleAuthStateChange = (callback) => {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });
};

// Process OAuth redirect if needed (call this on initial load)
export const processOAuthRedirect = async () => {
  try {
    // Check if we're processing an OAuth redirect
    if (window.location.hash && window.location.hash.includes('access_token')) {
      console.log('Processing OAuth redirect...');
      
      // Let Supabase handle the OAuth redirect
      const { data, error } = await supabase.auth.getUser();
      
      if (error) {
        console.error('Error processing OAuth redirect:', error.message);
        return null;
      }
      
      // Clear the URL hash to avoid issues with navigation
      window.history.replaceState({}, document.title, window.location.pathname);
      
      console.log('User authenticated:', data.user);
      
      // Redirigir al dashboard después de autenticación exitosa
      console.log('Redirigiendo al dashboard...');
      window.location.href = '/dashboard';
      
      return data.user;
    }
    
    return null;
  } catch (error) {
    console.error('Error processing OAuth redirect:', error);
    return null;
  }
};

