"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, Send, CheckCircle, Heart, MessageSquare, Wifi, User, ArrowLeft } from "lucide-react"

interface AvaliacaoData {
  consultaId: string
  avaliacaoPsicologo: number
  avaliacaoTransmissao: number
  avaliacaoGeral: number
  sugestoesMelhoria: string
}

export default function AvaliacaoPage() {
  const params = useParams()
  const router = useRouter()
  const consultaId = params.id as string

  const [avaliacaoPsicologo, setAvaliacaoPsicologo] = useState(0)
  const [avaliacaoTransmissao, setAvaliacaoTransmissao] = useState(0)
  const [avaliacaoGeral, setAvaliacaoGeral] = useState(0)
  const [sugestoesMelhoria, setSugestoesMelhoria] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Dados simulados da consulta
  const consultaInfo = {
    id: consultaId,
    psicologoNome: "Dra. Maria Silva",
    psicologoAvatar: "/placeholder.svg?height=60&width=60",
    psicologoCrp: "CRP 06/123456",
    data: new Date().toLocaleDateString("pt-BR"),
    horario: "10:00",
    duracao: "50 minutos",
  }

  const StarRating = ({
    rating,
    onRatingChange,
    label,
    icon: Icon,
  }: {
    rating: number
    onRatingChange: (rating: number) => void
    label: string
    icon: any
  }) => {
    const [hoverRating, setHoverRating] = useState(0)

    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-primary" />
          <label className="text-sm font-medium text-gray-700">{label}</label>
        </div>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={`p-1 transition-colors ${
                star <= (hoverRating || rating) ? "text-yellow-400" : "text-gray-300"
              } hover:text-yellow-400`}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => onRatingChange(star)}
            >
              <Star className="w-6 h-6 fill-current" />
            </button>
          ))}
          <span className="ml-2 text-sm text-gray-600">{rating > 0 ? `${rating}/5` : "Não avaliado"}</span>
        </div>
      </div>
    )
  }

  const handleSubmitAvaliacao = async () => {
    if (avaliacaoPsicologo === 0 || avaliacaoTransmissao === 0 || avaliacaoGeral === 0) {
      alert("Por favor, avalie todos os aspectos da consulta.")
      return
    }

    setIsSubmitting(true)

    try {
      const avaliacaoData: AvaliacaoData = {
        consultaId,
        avaliacaoPsicologo,
        avaliacaoTransmissao,
        avaliacaoGeral,
        sugestoesMelhoria,
      }

      // Simular envio para API
      console.log("Enviando avaliação:", avaliacaoData)

      // Simular delay de rede
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Aqui seria a chamada real para a API
      // const response = await fetch('/api/avaliacoes', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(avaliacaoData)
      // })

      setIsSubmitted(true)

      // Redirecionar após 3 segundos
      setTimeout(() => {
        router.push("/")
      }, 3000)
    } catch (error) {
      console.error("Erro ao enviar avaliação:", error)
      alert("Erro ao enviar avaliação. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 relative overflow-hidden flex items-center justify-center">
        {/* Background com nome da aplicação */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h1 className="text-[20vw] md:text-[15vw] font-bold text-blue-100/30 select-none">MindCare</h1>
        </div>

        {/* Card de sucesso com blur */}
        <div className="relative z-10 w-full max-w-md mx-4">
          <Card className="backdrop-blur-md bg-white/80 border-white/20 shadow-2xl">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Obrigado pela sua avaliação!</h2>
              <p className="text-gray-600 mb-4">Seu feedback é muito importante para melhorarmos nossos serviços.</p>
              <div className="text-sm text-gray-500">Redirecionando em alguns segundos...</div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background com nome da aplicação */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-[20vw] md:text-[15vw] font-bold text-blue-100/30 select-none">MindCare</h1>
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Card principal com blur */}
          <Card className="backdrop-blur-md bg-white/80 border-white/20 shadow-2xl">
            <CardHeader className="text-center border-b border-white/20 pb-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-gray-900">Como foi sua consulta?</CardTitle>
                  <p className="text-gray-600 text-sm mt-1">Sua opinião nos ajuda a melhorar</p>
                </div>
              </div>

              {/* Informações da consulta */}
              <div className="flex items-center justify-center gap-4 p-4 bg-white/50 rounded-lg">
                <Avatar className="w-12 h-12 border-2 border-primary/20">
                  <AvatarImage
                    src={consultaInfo.psicologoAvatar || "/placeholder.svg"}
                    alt={consultaInfo.psicologoNome}
                  />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {consultaInfo.psicologoNome
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="font-medium text-gray-900">{consultaInfo.psicologoNome}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Badge variant="secondary" className="text-xs">
                      {consultaInfo.psicologoCrp}
                    </Badge>
                    <span>•</span>
                    <span>
                      {consultaInfo.data} às {consultaInfo.horario}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-8 space-y-8">
              {/* Avaliação do Psicólogo */}
              <StarRating
                rating={avaliacaoPsicologo}
                onRatingChange={setAvaliacaoPsicologo}
                label="Como você avalia o atendimento do psicólogo?"
                icon={User}
              />

              {/* Avaliação da Transmissão */}
              <StarRating
                rating={avaliacaoTransmissao}
                onRatingChange={setAvaliacaoTransmissao}
                label="Como foi a qualidade da videochamada?"
                icon={Wifi}
              />

              {/* Avaliação Geral */}
              <StarRating
                rating={avaliacaoGeral}
                onRatingChange={setAvaliacaoGeral}
                label="Avaliação geral da consulta"
                icon={Heart}
              />

              {/* Sugestões de Melhoria */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <label className="text-sm font-medium text-gray-700">Sugestões de melhoria (opcional)</label>
                </div>
                <Textarea
                  value={sugestoesMelhoria}
                  onChange={(e) => setSugestoesMelhoria(e.target.value)}
                  placeholder="Compartilhe suas sugestões para melhorarmos nossos serviços..."
                  className="min-h-[100px] bg-white/70 border-white/30 focus:bg-white/90"
                  maxLength={500}
                />
                <div className="text-right text-xs text-gray-500">{sugestoesMelhoria.length}/500 caracteres</div>
              </div>

              {/* Botões de ação */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => router.push("/")}
                  className="flex-1 bg-white/70 border-white/30 hover:bg-white/90"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Pular Avaliação
                </Button>
                <Button
                  onClick={handleSubmitAvaliacao}
                  disabled={
                    isSubmitting || avaliacaoPsicologo === 0 || avaliacaoTransmissao === 0 || avaliacaoGeral === 0
                  }
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Enviar Avaliação
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
