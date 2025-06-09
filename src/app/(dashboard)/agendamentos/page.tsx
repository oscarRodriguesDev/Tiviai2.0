"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  Video,
  Clock,
  User,
  Search,
  Filter,
  MoreHorizontal,
  Copy,
  Edit,
  Trash2,
  Phone,
  MessageSquare,
  ExternalLink,
  Dot,
} from "lucide-react"
import { ConsultaModal, type ConsultaFormData } from "@/components/consulta-modal"
import { useToast } from "@/components/ui/use-toast"

interface Appointment {
  id: string
  patientName: string
  patientAvatar: string
  date: string
  startTime: string
  endTime: string
  duration: number
  status: "agendada" | "em-andamento" | "concluida" | "cancelada"
  meetingLink: string
  notes: string
  type: "primeira-consulta" | "retorno" | "emergencia"
}

type ViewMode = "day" | "week" | "month"

const getStatusColor = (status: string) => {
  switch (status) {
    case "agendada":
      return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800"
    case "em-andamento":
      return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800"
    case "concluida":
      return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
    case "cancelada":
      return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "primeira-consulta":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
    case "retorno":
      return "bg-primary/10 text-primary dark:bg-primary/20"
    case "emergencia":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
  }
}

export default function AgendamentosPage() {
  const { toast } = useToast()
  const [viewMode, setViewMode] = useState<ViewMode>("month")
  const [currentDate, setCurrentDate] = useState(new Date())
  const [searchTerm, setSearchTerm] = useState("")
  const [showNewConsultaModal, setShowNewConsultaModal] = useState(false)

  const appointments: Appointment[] = [
    {
      id: "1",
      patientName: "Ana Costa Silva",
      patientAvatar: "/placeholder.svg?height=40&width=40",
      date: "2024-01-29",
      startTime: "09:00",
      endTime: "10:00",
      duration: 60,
      status: "agendada",
      meetingLink: "https://meet.google.com/abc-defg-hij",
      notes: "Primeira consulta - ansiedade",
      type: "primeira-consulta",
    },
    {
      id: "2",
      patientName: "Carlos Mendes",
      patientAvatar: "/placeholder.svg?height=40&width=40",
      date: "2024-01-29",
      startTime: "10:30",
      endTime: "11:30",
      duration: 60,
      status: "em-andamento",
      meetingLink: "https://meet.google.com/xyz-uvwx-yz",
      notes: "Sessão de acompanhamento",
      type: "retorno",
    },
    {
      id: "3",
      patientName: "Mariana Santos",
      patientAvatar: "/placeholder.svg?height=40&width=40",
      date: "2024-01-15",
      startTime: "14:00",
      endTime: "15:00",
      duration: 60,
      status: "agendada",
      meetingLink: "https://meet.google.com/def-ghij-klm",
      notes: "Terapia cognitivo-comportamental",
      type: "retorno",
    },
    {
      id: "4",
      patientName: "João Oliveira",
      patientAvatar: "/placeholder.svg?height=40&width=40",
      date: "2024-01-22",
      startTime: "09:30",
      endTime: "10:30",
      duration: 60,
      status: "agendada",
      meetingLink: "https://meet.google.com/nop-qrst-uvw",
      notes: "Sessão de trauma",
      type: "retorno",
    },
    {
      id: "5",
      patientName: "Fernanda Lima",
      patientAvatar: "/placeholder.svg?height=40&width=40",
      date: "2024-01-31",
      startTime: "16:00",
      endTime: "17:00",
      duration: 60,
      status: "agendada",
      meetingLink: "https://meet.google.com/ghi-jklm-nop",
      notes: "Terapia de ansiedade",
      type: "primeira-consulta",
    },
  ]

  const copyMeetingLink = (link: string) => {
    navigator.clipboard.writeText(link)
    toast({
      title: "Link copiado!",
      description: "O link da reunião foi copiado para a área de transferência.",
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (viewMode === "day") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1))
    } else if (viewMode === "week") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7))
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1))
    }
    setCurrentDate(newDate)
  }

  const selectDate = (date: Date) => {
    setCurrentDate(date)
    setViewMode("day")
  }

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getAppointmentsForDate = (date: string) => {
    return filteredAppointments.filter((apt) => apt.date === date)
  }

  const selectedDateAppointments = getAppointmentsForDate(currentDate.toISOString().split("T")[0])

  // Generate calendar days for month view
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = []
    const current = new Date(startDate)

    for (let i = 0; i < 42; i++) {
      const dateStr = current.toISOString().split("T")[0]
      const appointmentsCount = getAppointmentsForDate(dateStr).length
      const isCurrentMonth = current.getMonth() === month
      const isToday = current.toDateString() === new Date().toDateString()
      const isSelected = current.toDateString() === currentDate.toDateString()

      days.push({
        date: new Date(current),
        dateStr,
        day: current.getDate(),
        isCurrentMonth,
        isToday,
        isSelected,
        appointmentsCount,
      })

      current.setDate(current.getDate() + 1)
    }

    return days
  }

  // Generate week days for week view
  const generateWeekDays = () => {
    const startOfWeek = new Date(currentDate)
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())

    const days = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      const dateStr = date.toISOString().split("T")[0]
      const dayAppointments = getAppointmentsForDate(dateStr)

      days.push({
        date,
        dateStr,
        dayName: date.toLocaleDateString("pt-BR", { weekday: "short" }),
        dayNumber: date.getDate(),
        appointments: dayAppointments,
        isToday: date.toDateString() === new Date().toDateString(),
      })
    }

    return days
  }

  // Função para salvar a consulta no banco de dados
  const handleAgendarConsulta = async (dados: ConsultaFormData) => {
    // Simulação de chamada à API para salvar no banco de dados
    console.log("Salvando consulta no banco de dados:", dados)

    // Simula um delay de rede
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Aqui seria a chamada real à API
    // const response = await fetch('/api/consultas', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(dados)
    // });

    // if (!response.ok) {
    //   throw new Error('Erro ao salvar consulta');
    // }

    // Atualiza a lista de consultas (em um caso real, recarregaria do banco)
    // const novaConsulta = await response.json();

    // Simula sucesso
    return Promise.resolve()
  }

  return (
    <div className="min-h-screen bg-background p-3 sm:p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Agendamentos</h1>
                <p className="text-muted-foreground mt-1 text-sm sm:text-base">Gerencie suas consultas e reuniões</p>
              </div>
              <Button
                className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto"
                onClick={() => setShowNewConsultaModal(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Nova Consulta
              </Button>
            </div>
          </div>
        </div>

        {/* Modal de Nova Consulta */}
        <ConsultaModal
          open={showNewConsultaModal}
          onOpenChange={setShowNewConsultaModal}
          onAgendarConsulta={handleAgendarConsulta}
        />

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col gap-4">
              {/* View Mode Selector */}
              <div className="flex bg-muted rounded-lg p-1 w-full sm:w-auto">
                {(["day", "week", "month"] as ViewMode[]).map((mode) => (
                  <Button
                    key={mode}
                    variant={viewMode === mode ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode(mode)}
                    className={`
                      flex-1 sm:flex-none
                      ${
                        viewMode === mode
                          ? "bg-background shadow-sm text-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                      }
                    `}
                  >
                    {mode === "day" && "Dia"}
                    {mode === "week" && "Semana"}
                    {mode === "month" && "Mês"}
                  </Button>
                ))}
              </div>

              {/* Date Navigation */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => navigateDate("prev")}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <div className="min-w-0 flex-1 sm:min-w-[200px] text-center">
                    <span className="font-medium text-foreground text-sm sm:text-base">
                      {viewMode === "month"
                        ? currentDate.toLocaleDateString("pt-BR", { year: "numeric", month: "long" })
                        : formatDate(currentDate)}
                    </span>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => navigateDate("next")}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                    Hoje
                  </Button>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto sm:ml-auto">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Buscar paciente..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-full sm:w-48"
                    />
                  </div>
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtros
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calendar View */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main Calendar Area */}
          <div className="xl:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Calendar className="w-5 h-5" />
                  {viewMode === "day" && "Agenda do Dia"}
                  {viewMode === "week" && "Agenda da Semana"}
                  {viewMode === "month" && "Calendário Mensal"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-6">
                {/* Day View */}
                {viewMode === "day" && (
                  <div className="space-y-4">
                    {selectedDateAppointments.length === 0 ? (
                      <div className="text-center py-8 sm:py-12">
                        <Calendar className="w-8 h-8 sm:w-12 sm:h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-base sm:text-lg font-medium text-foreground mb-2">
                          Nenhuma consulta neste dia
                        </h3>
                        <p className="text-muted-foreground text-sm sm:text-base">Que tal aproveitar para descansar?</p>
                      </div>
                    ) : (
                      selectedDateAppointments.map((appointment) => (
                        <AppointmentCard key={appointment.id} appointment={appointment} onCopyLink={copyMeetingLink} />
                      ))
                    )}
                  </div>
                )}

                {/* Week View */}
                {viewMode === "week" && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-4">
                    {generateWeekDays().map((day) => (
                      <div
                        key={day.dateStr}
                        className={`p-2 sm:p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                          day.isToday ? "bg-primary/5 border-primary" : "bg-card border-border hover:border-primary/50"
                        }`}
                        onClick={() => selectDate(day.date)}
                      >
                        <div className="text-center mb-2 sm:mb-3">
                          <div className="text-xs sm:text-sm font-medium text-muted-foreground uppercase">
                            {day.dayName}
                          </div>
                          <div
                            className={`text-lg sm:text-2xl font-bold ${day.isToday ? "text-primary" : "text-foreground"}`}
                          >
                            {day.dayNumber}
                          </div>
                        </div>
                        <div className="space-y-1">
                          {day.appointments.slice(0, 2).map((apt) => (
                            <div
                              key={apt.id}
                              className="text-xs p-1 sm:p-2 bg-primary/10 text-primary rounded truncate"
                            >
                              <span className="hidden sm:inline">{apt.startTime} - </span>
                              {apt.patientName.split(" ")[0]}
                            </div>
                          ))}
                          {day.appointments.length > 2 && (
                            <div className="text-xs text-muted-foreground text-center">
                              +{day.appointments.length - 2} mais
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Month View */}
                {viewMode === "month" && (
                  <div>
                    {/* Week Headers */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
                        <div
                          key={day}
                          className="p-1 sm:p-2 text-center text-xs sm:text-sm font-medium text-muted-foreground"
                        >
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1">
                      {generateCalendarDays().map((day, index) => (
                        <div
                          key={index}
                          className={`
                            min-h-[60px] sm:min-h-[80px] p-1 sm:p-2 border cursor-pointer transition-all hover:shadow-md
                            ${day.isCurrentMonth ? "bg-card" : "bg-muted/50"}
                            ${day.isToday ? "border-primary bg-primary/5" : "border-border"}
                            ${day.isSelected ? "ring-2 ring-primary" : ""}
                            ${day.appointmentsCount > 0 ? "hover:border-primary/50" : "hover:border-muted-foreground"}
                          `}
                          onClick={() => selectDate(day.date)}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span
                              className={`
                                text-xs sm:text-sm font-medium
                                ${day.isCurrentMonth ? "text-foreground" : "text-muted-foreground"}
                                ${day.isToday ? "text-primary font-bold" : ""}
                              `}
                            >
                              {day.day}
                            </span>
                            {day.appointmentsCount > 0 && (
                              <div className="flex items-center">
                                <Dot className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                                <span className="text-xs text-primary font-medium">{day.appointmentsCount}</span>
                              </div>
                            )}
                          </div>
                          {day.appointmentsCount > 0 && (
                            <div className="space-y-1">
                              {getAppointmentsForDate(day.dateStr)
                                .slice(0, 1)
                                .map((apt) => (
                                  <div key={apt.id} className="text-xs p-1 bg-primary/10 text-primary rounded truncate">
                                    <span className="hidden sm:inline">{apt.startTime} </span>
                                    {apt.patientName.split(" ")[0]}
                                  </div>
                                ))}
                              {day.appointmentsCount > 1 && (
                                <div className="text-xs text-muted-foreground">+{day.appointmentsCount - 1}</div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">
                  {viewMode === "day" ? "Resumo do Dia" : "Resumo Geral"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm sm:text-base">Total de consultas</span>
                  <span className="font-semibold">
                    {viewMode === "day" ? selectedDateAppointments.length : filteredAppointments.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm sm:text-base">Em andamento</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    {
                      (viewMode === "day" ? selectedDateAppointments : filteredAppointments).filter(
                        (apt) => apt.status === "em-andamento",
                      ).length
                    }
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm sm:text-base">Agendadas</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {
                      (viewMode === "day" ? selectedDateAppointments : filteredAppointments).filter(
                        (apt) => apt.status === "agendada",
                      ).length
                    }
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start text-sm sm:text-base"
                  onClick={() => setShowNewConsultaModal(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Consulta
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm sm:text-base">
                  <Video className="w-4 h-4 mr-2" />
                  Iniciar Reunião
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm sm:text-base">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Enviar Lembrete
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function AppointmentCard({
  appointment,
  onCopyLink,
}: {
  appointment: Appointment
  onCopyLink: (link: string) => void
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            <Avatar className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
              <AvatarImage src={appointment.patientAvatar || "/placeholder.svg"} alt={appointment.patientName} />
              <AvatarFallback className="bg-primary/10 text-primary text-sm">
                {appointment.patientName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                <h3 className="font-semibold text-foreground text-sm sm:text-base truncate">
                  {appointment.patientName}
                </h3>
                <Badge variant="outline" className={`${getStatusColor(appointment.status)} text-xs w-fit`}>
                  {appointment.status}
                </Badge>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-2">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span>
                    {appointment.startTime} - {appointment.endTime}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <Badge variant="secondary" className={`${getTypeColor(appointment.type)} text-xs`}>
                    {appointment.type === "primeira-consulta" && "1ª Consulta"}
                    {appointment.type === "retorno" && "Retorno"}
                    {appointment.type === "emergencia" && "Emergência"}
                  </Badge>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground mb-3 line-clamp-2">{appointment.notes}</p>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm"
                  onClick={() => window.open(`/consulta/psicologo/${appointment.id}`, "_blank")}
                >
                  <Video className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Iniciar Reunião
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onCopyLink(appointment.meetingLink)}
                  className="text-xs sm:text-sm"
                >
                  <Copy className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  <span className="hidden sm:inline">Copiar Link</span>
                  <span className="sm:hidden">Link</span>
                </Button>
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 flex-shrink-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Phone className="w-4 h-4 mr-2" />
                Ligar
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageSquare className="w-4 h-4 mr-2" />
                Mensagem
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ExternalLink className="w-4 h-4 mr-2" />
                Ver Perfil
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600 dark:text-red-400">
                <Trash2 className="w-4 h-4 mr-2" />
                Cancelar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}
