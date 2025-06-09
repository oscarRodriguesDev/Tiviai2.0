"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  MessageSquare,
  Monitor,
  PhoneOff,
  Brain,
  AlertCircle,
  CheckCircle,
  Info,
  Clock,
} from "lucide-react"

export default function ReuniaoPage() {
  const params = useParams()
  const router = useRouter()
  const meetingId = params.id as string

  const [isLoading, setIsLoading] = useState(true)
  const [isJoining, setIsJoining] = useState(false)
  const [isInMeeting, setIsInMeeting] = useState(false)
  const [isVideoEnabled, setIsVideoEnabled] = useState(true)
  const [isAudioEnabled, setIsAudioEnabled] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [meetingDuration, setMeetingDuration] = useState(0)
  const [patientName, setPatientName] = useState("")
  const [error, setError] = useState("")

  // Simulação de dados da reunião
  const meetingInfo = {
    id: meetingId,
    psychologistName: "Dra. Maria Silva",
    psychologistAvatar: "/placeholder.svg?height=80&width=80",
    date: new Date().toLocaleDateString("pt-BR"),
    time: "10:00",
    duration: "50 minutos",
    status: "ativa", // ativa, aguardando, encerrada
  }

  // Simular múltiplos participantes conectados
  const connectedParticipants = [
    {
      id: "1",
      name: meetingInfo.psychologistName,
      avatar: meetingInfo.psychologistAvatar,
      role: "psicologo" as const,
      audioEnabled: true,
      videoEnabled: true,
    },
    {
      id: "2",
      name: patientName || "Você",
      avatar: "/placeholder.svg",
      role: "paciente" as const,
      audioEnabled: isAudioEnabled,
      videoEnabled: isVideoEnabled,
    },
    // Adicione participantes adicionais se necessário
    ...(meetingDuration > 30
      ? [
          {
            id: "3",
            name: "João Silva (Acompanhante)",
            avatar: "/placeholder.svg",
            role: "acompanhante" as const,
            audioEnabled: true,
            videoEnabled: true,
          },
        ]
      : []),
  ]

  useEffect(() => {
    // Simular carregamento das informações da reunião
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isInMeeting) {
      interval = setInterval(() => {
        setMeetingDuration((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isInMeeting])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleJoinMeeting = () => {
    if (!patientName.trim()) {
      setError("Por favor, informe seu nome para entrar na reunião.")
      return
    }

    setError("")
    setIsJoining(true)

    // Simular processo de entrada na reunião
    setTimeout(() => {
      setIsJoining(false)
      setIsInMeeting(true)
    }, 2000)
  }

  const leaveMeeting = () => {
    setIsInMeeting(false)
    setMeetingDuration(0)

    // Redirecionar para tela de avaliação
    router.push(`/consulta/avaliacao/${meetingId}`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando informações da reunião...</p>
        </div>
      </div>
    )
  }

  if (!isInMeeting) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center border-b pb-6">
            <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Brain className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Consulta Psicológica</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="mb-6">
              <div className="flex items-center justify-center mb-4">
                <Avatar className="w-16 h-16 border-2 border-primary/20">
                  <AvatarImage
                    src={meetingInfo.psychologistAvatar || "/placeholder.svg"}
                    alt={meetingInfo.psychologistName}
                  />
                  <AvatarFallback className="bg-primary/10 text-primary text-xl">
                    {meetingInfo.psychologistName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
              <h3 className="text-center font-medium text-lg mb-1">{meetingInfo.psychologistName}</h3>
              <p className="text-center text-gray-500 text-sm">
                {meetingInfo.date} às {meetingInfo.time} • {meetingInfo.duration}
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-3 bg-blue-50 rounded-lg flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-800">
                    Você está prestes a entrar em uma consulta psicológica online. Por favor, certifique-se de estar em
                    um ambiente tranquilo e privado.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Seu nome completo
                </label>
                <Input
                  id="name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Digite seu nome para entrar na reunião"
                  className="w-full"
                />
                {error && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {error}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Configurações de áudio e vídeo</p>
                <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                  <span className="text-sm">Câmera</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                    className={isVideoEnabled ? "text-green-600" : "text-gray-500"}
                  >
                    {isVideoEnabled ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                  <span className="text-sm">Microfone</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                    className={isAudioEnabled ? "text-green-600" : "text-gray-500"}
                  >
                    {isAudioEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>

            <Button onClick={handleJoinMeeting} className="w-full bg-primary hover:bg-primary/90" disabled={isJoining}>
              {isJoining ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Entrando...
                </>
              ) : (
                <>
                  <Video className="w-4 h-4 mr-2" />
                  Entrar na Consulta
                </>
              )}
            </Button>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Ao entrar, você concorda com os termos de uso e política de privacidade.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 text-primary" />
              <h1 className="text-lg font-semibold">Consulta com {meetingInfo.psychologistName}</h1>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Clock className="w-3 h-3 mr-1" />
              {formatDuration(meetingDuration)}
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Main Video Area */}
        <div className="flex-1 flex flex-col">
          {/* Video Grid */}
          <div className="flex-1 p-4">
            <div
              className={`h-full gap-4 ${connectedParticipants.length <= 2 ? "grid grid-cols-1 md:grid-cols-2" : "grid grid-cols-2"}`}
            >
              {connectedParticipants.map((participant) => (
                <div
                  key={participant.id}
                  className="relative bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center"
                >
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <div className="text-center">
                      <Avatar
                        className={`mx-auto mb-4 ${connectedParticipants.length > 2 ? "w-16 h-16" : "w-24 h-24"}`}
                      >
                        <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                        <AvatarFallback
                          className={`bg-primary text-white ${connectedParticipants.length > 2 ? "text-lg" : "text-2xl"}`}
                        >
                          {participant.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <p
                        className={`text-white font-medium ${connectedParticipants.length > 2 ? "text-sm" : "text-base"}`}
                      >
                        {participant.name}
                      </p>
                      <Badge
                        variant="secondary"
                        className={
                          participant.role === "psicologo"
                            ? "bg-primary/20 text-primary text-xs"
                            : participant.role === "paciente"
                              ? "bg-blue-100 text-blue-800 text-xs"
                              : participant.role === "acompanhante"
                                ? "bg-green-100 text-green-800 text-xs"
                                : "bg-purple-100 text-purple-800 text-xs"
                        }
                      >
                        {participant.role === "psicologo"
                          ? "Psicólogo(a)"
                          : participant.role === "paciente"
                            ? "Paciente"
                            : participant.role === "acompanhante"
                              ? "Acompanhante"
                              : "Familiar"}
                      </Badge>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className={`p-2 rounded-full ${participant.audioEnabled ? "bg-green-600" : "bg-red-600"}`}>
                      {participant.audioEnabled ? (
                        <Mic className="w-3 h-3 text-white" />
                      ) : (
                        <MicOff className="w-3 h-3 text-white" />
                      )}
                    </div>
                  </div>

                  <div className="absolute bottom-4 right-4">
                    <span className="text-sm font-medium text-white bg-black/50 px-2 py-1 rounded">
                      {participant.name.split(" ")[0]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls Bar */}
          <div className="bg-gray-800 border-t border-gray-700 p-4">
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="ghost"
                size="lg"
                onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                className={`rounded-full w-12 h-12 ${
                  isAudioEnabled ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-red-600 hover:bg-red-700 text-white"
                }`}
              >
                {isAudioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </Button>

              <Button
                variant="ghost"
                size="lg"
                onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                className={`rounded-full w-12 h-12 ${
                  isVideoEnabled ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-red-600 hover:bg-red-700 text-white"
                }`}
              >
                {isVideoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </Button>

              <Button
                variant="ghost"
                size="lg"
                onClick={() => setIsScreenSharing(!isScreenSharing)}
                className="rounded-full w-12 h-12 bg-gray-700 hover:bg-gray-600 text-white"
              >
                <Monitor className="w-5 h-5" />
              </Button>

              <Button
                variant="ghost"
                size="lg"
                onClick={() => setShowChat(!showChat)}
                className="rounded-full w-12 h-12 bg-gray-700 hover:bg-gray-600 text-white"
              >
                <MessageSquare className="w-5 h-5" />
              </Button>

              <Button
                onClick={leaveMeeting}
                className="rounded-full w-12 h-12 bg-red-600 hover:bg-red-700 text-white ml-4"
              >
                <PhoneOff className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Chat Sidebar */}
        {showChat && (
          <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
            <div className="p-4 border-b border-gray-700">
              <h3 className="font-semibold text-white">Chat da Consulta</h3>
            </div>
            <div className="flex-1 p-4">
              <div className="text-center text-gray-400 text-sm">
                <p>Chat privado com {meetingInfo.psychologistName}</p>
                <p className="mt-2">Suas mensagens são confidenciais</p>
              </div>
            </div>
            <div className="p-4 border-t border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm"
                />
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  Enviar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Privacy Notice */}
      <div className="fixed bottom-4 left-4 max-w-xs">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-lg">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-gray-300">
                Esta consulta é privada e confidencial. Nenhuma gravação é feita sem seu consentimento.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
