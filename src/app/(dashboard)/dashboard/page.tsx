"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { ConsultaModal, type ConsultaFormData } from "@/components/consulta-modal"
import {
  Calendar,
  Clock,
  Users,
  CreditCard,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  Plus,
  ArrowUpRight,
  Bell,
  MessageSquare,
  Video,
  ExternalLink,
  BookOpen,
} from "lucide-react"

export default function DashboardPage() {
  const [showNewConsultaModal, setShowNewConsultaModal] = useState(false)

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

    // Simula sucesso
    return Promise.resolve()
  }

  return (
    <div className="p-3 sm:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 sm:mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Bem-vindo de volta, Dr. Ricardo Silva</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="gap-2 w-full sm:w-auto">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notificações</span>
            <Badge className="ml-1 bg-primary text-white">3</Badge>
          </Button>
          <Button className="gap-2 w-full sm:w-auto" onClick={() => setShowNewConsultaModal(true)}>
            <Plus className="h-4 w-4" />
            <span>Nova Consulta</span>
          </Button>
        </div>
      </div>

      {/* Modal de Nova Consulta */}
      <ConsultaModal
        open={showNewConsultaModal}
        onOpenChange={setShowNewConsultaModal}
        onAgendarConsulta={handleAgendarConsulta}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Consultas Hoje</p>
                <h3 className="text-2xl font-bold">5</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-500 font-medium">+2</span> em relação a ontem
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Horas Atendidas</p>
                <h3 className="text-2xl font-bold">32h</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-500 font-medium">+5h</span> em relação à semana passada
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Pacientes Ativos</p>
                <h3 className="text-2xl font-bold">28</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-500 font-medium">+3</span> novos este mês
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Receita Mensal</p>
                <h3 className="text-2xl font-bold">R$ 5.280</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-500 font-medium">+12%</span> em relação ao mês anterior
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2 sm:pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Próximas Consultas</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/agendamentos">
                  Ver todos
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-3 sm:p-4">
            <div className="space-y-3">
              {[
                {
                  id: 1,
                  patient: "Ana Silva",
                  avatar: "/placeholder.svg?height=32&width=32",
                  time: "10:00 - 11:00",
                  date: "Hoje",
                  status: "confirmada",
                },
                {
                  id: 2,
                  patient: "Carlos Mendes",
                  avatar: "/placeholder.svg?height=32&width=32",
                  time: "14:30 - 15:30",
                  date: "Hoje",
                  status: "pendente",
                },
                {
                  id: 3,
                  patient: "Mariana Santos",
                  avatar: "/placeholder.svg?height=32&width=32",
                  time: "09:00 - 10:00",
                  date: "Amanhã",
                  status: "confirmada",
                },
                {
                  id: 4,
                  patient: "João Oliveira",
                  avatar: "/placeholder.svg?height=32&width=32",
                  time: "16:00 - 17:00",
                  date: "Amanhã",
                  status: "confirmada",
                },
              ].map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-2 sm:p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                      <AvatarImage src={appointment.avatar || "/placeholder.svg"} alt={appointment.patient} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {appointment.patient
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground text-sm sm:text-base">{appointment.patient}</p>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {appointment.date}, {appointment.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    <Badge
                      variant="outline"
                      className={
                        appointment.status === "confirmada"
                          ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800"
                          : "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800"
                      }
                    >
                      {appointment.status === "confirmada" ? (
                        <>
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Confirmada
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Pendente
                        </>
                      )}
                    </Badge>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => setShowNewConsultaModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Nova Consulta
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Desempenho</CardTitle>
            <CardDescription>Visão geral do seu desempenho este mês</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Taxa de Comparecimento</p>
                <span className="text-sm font-bold">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Satisfação dos Pacientes</p>
                <span className="text-sm font-bold">4.8/5</span>
              </div>
              <Progress value={96} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Ocupação da Agenda</p>
                <span className="text-sm font-bold">85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Retorno de Pacientes</p>
                <span className="text-sm font-bold">78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/meus-atendimentos">
                <BarChart3 className="h-4 w-4 mr-2" />
                Ver relatório completo
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pacientes Recentes</CardTitle>
            <CardDescription>Novos pacientes nos últimos 30 dias</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {[
              {
                id: 1,
                name: "Ana Silva",
                avatar: "/placeholder.svg?height=32&width=32",
                date: "20/01/2024",
              },
              {
                id: 2,
                name: "Carlos Mendes",
                avatar: "/placeholder.svg?height=32&width=32",
                date: "15/01/2024",
              },
              {
                id: 3,
                name: "Mariana Santos",
                avatar: "/placeholder.svg?height=32&width=32",
                date: "10/01/2024",
              },
            ].map((patient) => (
              <div key={patient.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={patient.avatar || "/placeholder.svg"} alt={patient.name} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {patient.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{patient.name}</p>
                    <p className="text-xs text-muted-foreground">Cadastrado em {patient.date}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximos Webinars</CardTitle>
            <CardDescription>Webinars e eventos da comunidade</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              {
                id: 1,
                title: "Mindfulness na Prática Clínica",
                date: "25/01/2024",
                time: "19:00",
              },
              {
                id: 2,
                title: "Terapia Cognitivo-Comportamental para Ansiedade",
                date: "01/02/2024",
                time: "20:00",
              },
            ].map((webinar) => (
              <div key={webinar.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{webinar.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {webinar.date} às {webinar.time}
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Artigos Recentes</CardTitle>
            <CardDescription>Artigos científicos e novidades da área</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              {
                id: 1,
                title: "O Impacto da Pandemia na Saúde Mental",
                date: "15/01/2024",
              },
              {
                id: 2,
                title: "Novas Abordagens na Terapia de Casal",
                date: "10/01/2024",
              },
            ].map((article) => (
              <div key={article.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{article.title}</p>
                  <p className="text-xs text-muted-foreground">Publicado em {article.date}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <BookOpen className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
