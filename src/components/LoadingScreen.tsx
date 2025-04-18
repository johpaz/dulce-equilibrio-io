
const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dulce-beige-light/30">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-dulce-green border-r-transparent mb-4"></div>
        <p className="text-dulce-green-dark">Verificando autenticación...</p>
        <p className="text-dulce-green-dark/70 text-sm mt-2">Serás redirigido automáticamente.</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
