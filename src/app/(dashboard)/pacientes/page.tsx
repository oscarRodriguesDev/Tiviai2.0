"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, Plus, MoreHorizontal, Eye, Calendar, Phone, Mail, Users, Clock } from "lucide-react"

interface Patient {
  id: string
  nome: string
  email: string
  telefone: string
  idade: number
  dataCadastro: string
  ultimaConsulta: string
  proximaConsulta: string
  status: "Ativo" | "Inativo" | "Aguardando"
  objetivos: string[]
  fotoPerfil: string
}

export default function ListagemPacientes() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [patients] = useState<Patient[]>([
    {
      id: "1",
      nome: "Ana Costa Silva",
      email: "ana.costa@email.com",
      telefone: "(11) 98888-8888",
      idade: 34,
      dataCadastro: "2024-01-15",
      ultimaConsulta: "2024-01-20",
      proximaConsulta: "2024-01-27",
      status: "Ativo",
      objetivos: ["Ansiedade", "Autoestima"],
      fotoPerfil: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      nome: "Carlos Mendes",
      email: "carlos.mendes@email.com",
      telefone: "(11) 97777-7777",
      idade: 28,
      dataCadastro: "2024-01-10",
      ultimaConsulta: "2024-01-18",
      proximaConsulta: "2024-01-25",
      status: "Ativo",
      objetivos: ["Depressão", "Relacionamentos"],
      fotoPerfil: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      nome: "Mariana Santos",
      email: "mariana.santos@email.com",
      telefone: "(11) 96666-6666",
      idade: 42,
      dataCadastro: "2024-01-05",
      ultimaConsulta: "2024-01-12",
      proximaConsulta: "",
      status: "Aguardando",
      objetivos: ["Estresse", "Desenvolvimento Pessoal"],
      fotoPerfil: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "4",
      nome: "João Oliveira",
      email: "joao.oliveira@email.com",
      telefone: "(11) 95555-5555",
      idade: 31,
      dataCadastro: "2023-12-20",
      ultimaConsulta: "2023-12-28",
      proximaConsulta: "",
      status: "Inativo",
      objetivos: ["Trauma", "Ansiedade"],
      fotoPerfil: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "5",
      nome: "Fernanda Lima",
      email: "fernanda.lima@email.com",
      telefone: "(11) 94444-4444",
      idade: 26,
      dataCadastro: "2024-01-22",
      ultimaConsulta: "2024-01-22",
      proximaConsulta: "2024-01-29",
      status: "Ativo",
      objetivos: ["Fobias", "Autoestima"],
      fotoPerfil: "/placeholder.svg?height=40&width=40",
    },
  ])

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "todos" || patient.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
      case "Inativo":
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800/20 dark:text-gray-400 dark:border-gray-700"
      case "Aguardando":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800/20 dark:text-gray-400 dark:border-gray-700"
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "-"
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  const getStatusCount = (status: string) => {
    return patients.filter((p) => p.status === status).length
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">Meus Pacientes</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 sm:text-base">
                Gerencie e acompanhe seus pacientes
              </p>
            </div>
            <Button
              className="w-full bg-primary hover:bg-primary/90 text-white sm:w-auto"
              onClick={() => (window.location.href = "/pacientes/cadastro")}
            >
              <Plus className="mr-2 h-4 w-4" />
              Novo Paciente
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400 sm:text-sm">Total</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">{patients.length}</p>
                </div>
                <Users className="h-6 w-6 text-primary sm:h-8 sm:w-8" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400 sm:text-sm">Ativos</p>
                  <p className="text-xl font-bold text-green-600 sm:text-2xl">{getStatusCount("Ativo")}</p>
                </div>
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20 sm:h-8 sm:w-8">
                  <div className="h-2 w-2 rounded-full bg-green-500 sm:h-3 sm:w-3" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400 sm:text-sm">Aguardando</p>
                  <p className="text-xl font-bold text-yellow-600 sm:text-2xl">{getStatusCount("Aguardando")}</p>
                </div>
                <Clock className="h-6 w-6 text-yellow-500 sm:h-8 sm:w-8" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400 sm:text-sm">Inativos</p>
                  <p className="text-xl font-bold text-gray-600 dark:text-gray-400 sm:text-2xl">
                    {getStatusCount("Inativo")}
                  </p>
                </div>
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 sm:h-8 sm:w-8">
                  <div className="h-2 w-2 rounded-full bg-gray-400 sm:h-3 sm:w-3" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6 bg-white dark:bg-gray-800">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Buscar por nome ou email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-full sm:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os Status</SelectItem>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="inativo">Inativo</SelectItem>
                    <SelectItem value="aguardando">Aguardando</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Patients List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Lista de Pacientes ({filteredPatients.length})
            </h2>
          </div>

          {filteredPatients.length === 0 ? (
            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="py-12 text-center">
                <Users className="mx-auto mb-4 h-12 w-12 text-gray-300 dark:text-gray-600" />
                <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">Nenhum paciente encontrado</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {searchTerm || statusFilter !== "todos"
                    ? "Tente ajustar os filtros de busca"
                    : "Comece adicionando seu primeiro paciente"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredPatients.map((patient) => (
                <Card
                  key={patient.id}
                  className="cursor-pointer bg-white transition-shadow hover:shadow-md dark:bg-gray-800"
                  onClick={() => (window.location.href = `/paciente/perfil/${patient.id}`)}
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start space-x-4">
                      {/* Avatar */}
                      <Avatar className="h-12 w-12 flex-shrink-0 sm:h-14 sm:w-14">
                        <AvatarImage src={patient.fotoPerfil || "/placeholder.svg"} alt={patient.nome} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {patient.nome
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <div className="min-w-0 flex-1">
                            <h3 className="truncate text-base font-medium text-gray-900 dark:text-white sm:text-lg">
                              {patient.nome}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {patient.idade} anos • Cadastrado em {formatDate(patient.dataCadastro)}
                            </p>
                          </div>
                          <div className="ml-4 flex items-center space-x-2">
                            <Badge variant="outline" className={`${getStatusColor(patient.status)} text-xs`}>
                              {patient.status}
                            </Badge>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Ver Detalhes
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Calendar className="mr-2 h-4 w-4" />
                                  Agendar Consulta
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Mail className="mr-2 h-4 w-4" />
                                  Enviar Mensagem
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>

                        {/* Contact Info */}
                        <div className="mt-3 space-y-1 sm:flex sm:space-x-6 sm:space-y-0">
                          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                            <Mail className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{patient.email}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                            <Phone className="h-3 w-3 flex-shrink-0" />
                            <span>{patient.telefone}</span>
                          </div>
                        </div>

                        {/* Objectives */}
                        <div className="mt-3">
                          <div className="flex flex-wrap gap-1">
                            {patient.objetivos.slice(0, 3).map((objetivo, index) => (
                              <Badge key={index} variant="secondary" className="bg-primary/10 text-xs text-primary">
                                {objetivo}
                              </Badge>
                            ))}
                            {patient.objetivos.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{patient.objetivos.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Consultation Info */}
                        <div className="mt-4 flex flex-col space-y-2 border-t border-gray-200 pt-3 text-xs text-gray-500 dark:border-gray-700 dark:text-gray-400 sm:flex-row sm:justify-between sm:space-y-0">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>Última: {formatDate(patient.ultimaConsulta)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            {patient.proximaConsulta ? (
                              <span className="font-medium text-primary">
                                Próxima: {formatDate(patient.proximaConsulta)}
                              </span>
                            ) : (
                              <span>Próxima: Não agendada</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
