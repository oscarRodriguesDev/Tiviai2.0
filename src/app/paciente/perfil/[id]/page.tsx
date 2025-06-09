"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Clock, FileText, Heart, Mail, Phone, User, MapPin, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"

// Mock patient data
const mockPatient = {
  id: "1",
  name: "Ana Silva Santos",
  email: "ana.silva@email.com",
  phone: "(11) 99999-9999",
  avatar: "/placeholder.svg?height=120&width=120",
  birthDate: "15/03/1985",
  age: 38,
  gender: "Feminino",
  address: "Rua das Flores, 123 - São Paulo, SP",
  emergencyContact: "João Silva - (11) 88888-8888",
  status: "Ativo",
  registrationDate: "10/01/2024",
  totalConsultations: 15,
  lastConsultation: "28/11/2024",
  nextAppointment: "05/12/2024 às 14:00",
  specialty: "Terapia Cognitivo-Comportamental",
  notes: "Paciente apresenta boa evolução no tratamento de ansiedade. Demonstra engajamento nas atividades propostas.",
  medicalHistory: ["Transtorno de Ansiedade Generalizada (2023)", "Episódio Depressivo Leve (2022)"],
  consultations: [
    {
      id: 1,
      date: "28/11/2024",
      time: "14:00",
      duration: "50 min",
      type: "Presencial",
      status: "Concluída",
      notes: "Sessão focada em técnicas de respiração e mindfulness.",
    },
    {
      id: 2,
      date: "21/11/2024",
      time: "14:00",
      duration: "50 min",
      type: "Online",
      status: "Concluída",
      notes: "Discussão sobre estratégias de enfrentamento no trabalho.",
    },
    {
      id: 3,
      date: "14/11/2024",
      time: "14:00",
      duration: "50 min",
      type: "Presencial",
      status: "Concluída",
      notes: "Avaliação do progresso e ajuste do plano terapêutico.",
    },
  ],
}

export default function PatientProfilePage() {
  const params = useParams()
  const router = useRouter()
  const [patient, setPatient] = useState(mockPatient)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [params.id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => router.back()} className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Voltar</span>
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Perfil do Paciente</h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Patient Info Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={patient.avatar || "/placeholder.svg"} alt={patient.name} />
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
                    {patient.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{patient.name}</CardTitle>
                <CardDescription className="flex items-center justify-center space-x-2">
                  <Badge variant={patient.status === "Ativo" ? "default" : "secondary"}>{patient.status}</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{patient.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{patient.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">
                    {patient.age} anos • {patient.gender}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{patient.address}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <AlertCircle className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Contato de emergência: {patient.emergencyContact}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Estatísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Total de Consultas</span>
                  <span className="font-semibold">{patient.totalConsultations}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Última Consulta</span>
                  <span className="font-semibold">{patient.lastConsultation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Próximo Agendamento</span>
                  <span className="font-semibold text-blue-600">{patient.nextAppointment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Cadastro</span>
                  <span className="font-semibold">{patient.registrationDate}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                <TabsTrigger value="consultations">Consultas</TabsTrigger>
                <TabsTrigger value="history">Histórico</TabsTrigger>
                <TabsTrigger value="notes">Anotações</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações Gerais</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Data de Nascimento</label>
                        <p className="text-sm font-semibold">{patient.birthDate}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Especialidade</label>
                        <p className="text-sm font-semibold">{patient.specialty}</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Observações Gerais</label>
                      <p className="text-sm mt-1">{patient.notes}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Histórico Médico</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {patient.medicalHistory.map((item, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="consultations" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Histórico de Consultas</CardTitle>
                    <CardDescription>Últimas {patient.consultations.length} consultas realizadas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {patient.consultations.map((consultation) => (
                        <div
                          key={consultation.id}
                          className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <span className="font-medium">{consultation.date}</span>
                              <Clock className="h-4 w-4 text-gray-500 ml-4" />
                              <span className="text-sm text-gray-500">{consultation.time}</span>
                            </div>
                            <Badge variant={consultation.status === "Concluída" ? "default" : "secondary"}>
                              {consultation.status}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                            <span>Duração: {consultation.duration}</span>
                            <span>Modalidade: {consultation.type}</span>
                          </div>
                          <p className="text-sm">{consultation.notes}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Evolução do Tratamento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-l-4 border-blue-600 pl-4">
                        <h4 className="font-medium">Início do Tratamento</h4>
                        <p className="text-sm text-gray-500 mt-1">Janeiro 2024</p>
                        <p className="text-sm mt-2">
                          Paciente iniciou tratamento para transtorno de ansiedade generalizada. Apresentava sintomas de
                          preocupação excessiva e dificuldades de concentração.
                        </p>
                      </div>
                      <div className="border-l-4 border-green-600 pl-4">
                        <h4 className="font-medium">Progresso Significativo</h4>
                        <p className="text-sm text-gray-500 mt-1">Junho 2024</p>
                        <p className="text-sm mt-2">
                          Melhora considerável nos sintomas de ansiedade. Paciente relatou maior capacidade de lidar com
                          situações estressantes.
                        </p>
                      </div>
                      <div className="border-l-4 border-yellow-600 pl-4">
                        <h4 className="font-medium">Ajuste no Tratamento</h4>
                        <p className="text-sm text-gray-500 mt-1">Setembro 2024</p>
                        <p className="text-sm mt-2">
                          Introdução de técnicas de mindfulness e reestruturação cognitiva para fortalecer as
                          estratégias de enfrentamento.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notes" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Anotações Clínicas</CardTitle>
                    <CardDescription>Observações e notas importantes sobre o paciente</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <FileText className="h-4 w-4 text-blue-600" />
                          <span className="font-medium text-blue-900 dark:text-blue-100">
                            Nota Clínica - 28/11/2024
                          </span>
                        </div>
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                          Paciente demonstra excelente progresso na aplicação das técnicas de respiração aprendidas.
                          Relatou redução significativa nos episódios de ansiedade durante a semana.
                        </p>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Heart className="h-4 w-4 text-green-600" />
                          <span className="font-medium text-green-900 dark:text-green-100">
                            Observação Positiva - 21/11/2024
                          </span>
                        </div>
                        <p className="text-sm text-green-800 dark:text-green-200">
                          Engajamento excepcional nas atividades propostas. Paciente tem mostrado iniciativa em aplicar
                          as estratégias no dia a dia.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
