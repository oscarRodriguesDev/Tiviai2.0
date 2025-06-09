export default function AvaliacaoLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 relative overflow-hidden flex items-center justify-center">
      {/* Background com nome da aplicação */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-[20vw] md:text-[15vw] font-bold text-blue-100/30 select-none">MindCare</h1>
      </div>

      {/* Loading spinner */}
      <div className="relative z-10 text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Carregando avaliação...</p>
      </div>
    </div>
  )
}
