"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  MessageSquare,
  Monitor,
  PhoneOff,
  Brain,
  CheckCircle,
  Info,
  Clock,
  Users,
  Copy,
  LinkIcon,
  Share,
  Settings,
  Plus,
  Trash2,
  UserPlus,
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
  const [linkCopied, setLinkCopied] = useState(false)
  const [showParticipantManager, setShowParticipantManager] = useState(false)
  const [newParticipantName, setNewParticipantName] = useState("")
  const [newParticipantRole, setNewParticipantRole] = useState<"paciente" | "acompanhante" | "familiar">("acompanhante")
  const [error, setError] = useState("")

  // Dados da reunião do psicólogo
  const meetingInfo = {
    id: meetingId,
    patientName: "Ana Costa Silva",
    psychologistName: "Dr. Maria Silva",
    date: new Date().toLocaleDateString("pt-BR"),
    time: "10:00",
    duration: "50 minutos",
    status: "ativa",
    meetingLink: `${typeof window !== "undefined" ? window.location.origin : ""}/consulta/paciente/${meetingId}`,
  }

  // Participantes da reunião
  const [participants, setParticipants] = useState([
    {
      id: "1",
      name: "Dr. Maria Silva",
      avatar: "/placeholder.svg?height=80&width=80",
      role: "psicologo" as const,
      audioEnabled: true,
      videoEnabled: true,
      isConnected: true,
    },
    {
      id: "2",
      name: "Ana Costa Silva",
      avatar: "/placeholder.svg",
      role: "paciente" as const,
      audioEnabled: false,
      videoEnabled: false,
      isConnected: false,
    },
  ])

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

  const handleStartMeeting = () => {
    setIsJoining(true)

    // Simular processo de início da reunião
    setTimeout(() => {
      setIsJoining(false)
      setIsInMeeting(true)

      // Simular entrada do paciente após alguns segundos
      setTimeout(() => {
        setParticipants((prev) =>
          prev.map((p) =>
            p.role === "paciente" ? { ...p, isConnected: true, audioEnabled: true, videoEnabled: true } : p,
          ),
        )
      }, 3000)
    }, 2000)
  }

  const leaveMeeting = () => {
    setIsInMeeting(false)
    setMeetingDuration(0)
    router.push("/dashboard")
  }

  const copyMeetingLink = () => {
    navigator.clipboard.writeText(meetingInfo.meetingLink)
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 3000)
  }

  const addParticipant = () => {
    if (!newParticipantName.trim() || participants.length >= 4) return

    const newParticipant = {
      id: Date.now().toString(),
      name: newParticipantName,
      avatar: "/placeholder.svg",
      role: newParticipantRole,
      audioEnabled: false,
      videoEnabled: false,
      isConnected: false,
    }

    setParticipants((prev) => [...prev, newParticipant])
    setNewParticipantName("")
    setShowParticipantManager(false)
  }

  const removeParticipant = (id: string) => {
    setParticipants((prev) => prev.filter((p) => p.id !== id && p.role !== "psicologo"))
  }

  const simulateParticipantJoin = (id: string) => {
    setParticipants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isConnected: true, audioEnabled: true, videoEnabled: true } : p)),
    )
  }

  const connectedParticipants = participants.filter((p) => p.isConnected)
  const waitingParticipants = participants.filter((p) => !p.isConnected && p.role !== "psicologo")

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
            <CardTitle className="text-2xl">Sala de Consulta</CardTitle>
            <p className="text-gray-500 mt-2">Psicólogo - Dr. Maria Silva</p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="mb-6">
              <div className="flex items-center justify-center mb-4">
                <Avatar className="w-16 h-16 border-2 border-primary/20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" alt={meetingInfo.patientName} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xl">
                    {meetingInfo.patientName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
              <h3 className="text-center font-medium text-lg mb-1">{meetingInfo.patientName}</h3>
              <p className="text-center text-gray-500 text-sm">
                {meetingInfo.date} às {meetingInfo.time} • {meetingInfo.duration}
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-3 bg-blue-50 rounded-lg flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-800">
                    Você está prestes a iniciar uma consulta psicológica online. O link será enviado automaticamente
                    para o paciente quando você iniciar a sessão.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
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

              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowParticipantManager(true)} className="flex-1">
                  <Users className="w-4 h-4 mr-2" />
                  Participantes ({participants.length})
                </Button>
                <Button variant="outline" size="sm" onClick={copyMeetingLink} className="flex-1">
                  <LinkIcon className="w-4 h-4 mr-2" />
                  {linkCopied ? "Copiado!" : "Link"}
                </Button>
              </div>
            </div>

            <Button onClick={handleStartMeeting} className="w-full bg-primary hover:bg-primary/90" disabled={isJoining}>
              {isJoining ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Iniciando Consulta...
                </>
              ) : (
                <>
                  <Video className="w-4 h-4 mr-2" />
                  Iniciar Consulta
                </>
              )}
            </Button>

            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-800 mb-2">
                <strong>Link para o paciente:</strong>
              </p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-xs bg-white p-2 rounded border text-gray-700 truncate">
                  {meetingInfo.meetingLink}
                </code>
                <Button size="sm" variant="outline" onClick={copyMeetingLink}>
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <p className="text-xs text-green-700 mt-2">
                Este link será enviado automaticamente para o paciente quando você iniciar a consulta.
              </p>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Consulta confidencial e segura • Gravação apenas com consentimento
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
              <h1 className="text-lg font-semibold">Consulta com {meetingInfo.patientName}</h1>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Clock className="w-3 h-3 mr-1" />
              {formatDuration(meetingDuration)}
            </Badge>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowParticipantManager(true)}>
              <Users className="w-4 h-4 mr-2" />
              Participantes ({participants.length})
            </Button>
            <Button variant="outline" size="sm" onClick={copyMeetingLink}>
              <LinkIcon className="w-4 h-4 mr-2" />
              {linkCopied ? "Copiado!" : "Link"}
            </Button>
            <Button variant="outline" size="sm">
              <Share className="w-4 h-4 mr-2" />
              Compartilhar
            </Button>
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

            {/* Waiting participants indicator */}
            {waitingParticipants.length > 0 && (
              <div className="absolute top-4 right-4 bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Aguardando ({waitingParticipants.length})</span>
                </div>
                {waitingParticipants.map((p) => (
                  <div key={p.id} className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                    {p.name}
                  </div>
                ))}
              </div>
            )}
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
                variant="ghost"
                size="lg"
                className="rounded-full w-12 h-12 bg-gray-700 hover:bg-gray-600 text-white"
              >
                <Settings className="w-5 h-5" />
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
                <p>Chat privado com {meetingInfo.patientName}</p>
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

      {/* Participant Manager Modal */}
      <Dialog open={showParticipantManager} onOpenChange={setShowParticipantManager}>
        <DialogContent className="bg-gray-800 border-gray-700 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Gerenciar Participantes</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {participants.map((participant) => (
              <div key={participant.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                    <AvatarFallback className="text-xs">
                      {participant.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-white text-sm font-medium">{participant.name}</p>
                    <p className="text-gray-400 text-xs capitalize">{participant.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${participant.isConnected ? "bg-green-500" : "bg-gray-500"}`}
                  ></div>
                  {participant.role !== "psicologo" && (
                    <>
                      {!participant.isConnected && (
                        <Button size="sm" variant="outline" onClick={() => simulateParticipantJoin(participant.id)}>
                          <UserPlus className="w-3 h-3" />
                        </Button>
                      )}
                      <Button size="sm" variant="ghost" onClick={() => removeParticipant(participant.id)}>
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {participants.length < 4 && (
            <div className="space-y-3 border-t border-gray-700 pt-4">
              <div>
                <Label className="text-gray-300">Nome do Participante</Label>
                <Input
                  value={newParticipantName}
                  onChange={(e) => setNewParticipantName(e.target.value)}
                  placeholder="Digite o nome..."
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Tipo</Label>
                <Select value={newParticipantRole} onValueChange={(value: any) => setNewParticipantRole(value)}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="acompanhante">Acompanhante</SelectItem>
                    <SelectItem value="familiar">Familiar</SelectItem>
                    <SelectItem value="paciente">Paciente Adicional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={addParticipant} className="w-full bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Participante
              </Button>
            </div>
          )}

          {participants.length >= 4 && (
            <div className="text-center text-yellow-400 text-sm">Limite máximo de 4 participantes atingido</div>
          )}
        </DialogContent>
      </Dialog>

      {/* Privacy Notice */}
      <div className="fixed bottom-4 left-4 max-w-xs">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-lg">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-gray-300">
                Esta consulta é privada e confidencial. Você tem controle total sobre gravações e participantes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
