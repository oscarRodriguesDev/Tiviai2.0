"use client"

import { useEffect, useState } from "react"
import { Brain, Heart, Users, Sparkles } from "lucide-react"

export default function LoadingPage() {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [progress, setProgress] = useState(0)

  const inspirationalMessages = [
    "Preparando seu espaço de cuidado...",
    "Conectando corações e mentes...",
    "Organizando suas ferramentas terapêuticas...",
    "Criando um ambiente seguro...",
    "Sincronizando dados dos pacientes...",
    "Carregando sua jornada de cuidado...",
  ]

  useEffect(() => {
    // Simular progresso de carregamento
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, 100)

    // Alternar mensagens inspiracionais
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % inspirationalMessages.length)
    }, 2000)

    return () => {
      clearInterval(progressInterval)
      clearInterval(messageInterval)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary/5 flex items-center justify-center relative overflow-hidden">
      {/* Background Animated Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Circles - Representing thoughts/neurons */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-primary/20 rounded-full animate-float-slow"></div>
        <div className="absolute top-40 right-32 w-6 h-6 bg-primary/15 rounded-full animate-float-medium"></div>
        <div className="absolute bottom-32 left-32 w-3 h-3 bg-primary/25 rounded-full animate-float-fast"></div>
        <div className="absolute bottom-20 right-20 w-5 h-5 bg-primary/10 rounded-full animate-float-slow"></div>
        <div className="absolute top-60 left-1/2 w-4 h-4 bg-primary/20 rounded-full animate-float-medium"></div>
        <div className="absolute top-32 left-1/3 w-2 h-2 bg-primary/30 rounded-full animate-float-fast"></div>
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Logo with Breathing Animation */}
        <div className="mb-8">
          <div className="relative inline-block">
            {/* Breathing Circle Background */}
            <div className="absolute inset-0 w-24 h-24 bg-primary/10 rounded-full animate-breathing"></div>
            <div className="absolute inset-2 w-20 h-20 bg-primary/20 rounded-full animate-breathing-delayed"></div>

            {/* Logo */}
            <div className="relative w-24 h-24 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg">
              <Brain className="w-10 h-10 text-white animate-pulse" />
            </div>
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-4xl font-bold text-black mb-2 animate-fade-in">TiviAi</h1>
        <p className="text-gray-600 mb-8 animate-fade-in-delayed">Cuidando de quem cuida</p>

        {/* Inspirational Message */}
        <div className="mb-8 h-6">
          <p className="text-lg text-gray-700 font-medium animate-message-fade">
            {inspirationalMessages[currentMessage]}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">{progress}%</p>
        </div>

        {/* Wellness Icons */}
        <div className="flex justify-center space-x-8 mb-8">
          <div className="flex flex-col items-center animate-bounce-gentle">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <Heart className="w-6 h-6 text-primary animate-heartbeat" />
            </div>
            <span className="text-xs text-gray-600">Cuidado</span>
          </div>

          <div className="flex flex-col items-center animate-bounce-gentle-delayed">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xs text-gray-600">Conexão</span>
          </div>

          <div className="flex flex-col items-center animate-bounce-gentle-delayed-2">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <Sparkles className="w-6 h-6 text-primary animate-sparkle" />
            </div>
            <span className="text-xs text-gray-600">Bem-estar</span>
          </div>
        </div>

        {/* Mindfulness Circles */}
        <div className="flex justify-center items-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-primary/80 rounded-full animate-pulse-delayed"></div>
          <div className="w-4 h-4 bg-primary/60 rounded-full animate-pulse-delayed-2"></div>
          <div className="w-3 h-3 bg-primary/80 rounded-full animate-pulse-delayed-3"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse-delayed-4"></div>
        </div>
      </div>

      {/* Bottom Quote */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-sm text-gray-500 italic max-w-md">"O cuidado é a essência da vida humana" - Jean Watson</p>
      </div>
    </div>
  )
}
