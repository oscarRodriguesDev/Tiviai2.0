"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Search,
  Download,
  MoreHorizontal,
  Eye,
  CalendarIcon,
  Clock,
  DollarSign,
  Users,
  TrendingUp,
  Video,
  MapPin,
  FileText,
} from "lucide-react"

interface Atendimento {
  id: string
  pacienteId: string
  pacienteNome: string
  pacienteFoto: string
  dataHora: Date
  duracao: number // em minutos
  modalidade: "Online" | "Presencial"
  status: "Concluído" | "Cancelado" | "Reagendado" | "Faltou"
  valor: number
  observacoes: string
  tipoConsulta: "Primeira Consulta" | "Retorno" | "Avaliação" | "Terapia"
}

const mockAtendimentos: Atendimento[] = [
  {
    id: "1",
    pacienteId: "1",
    pacienteNome: "Ana Costa Silva",
    pacienteFoto: "/placeholder.svg?height=40&width=40",
    dataHora: new Date("2024-01-20T14:00:00"),
    duracao: 50,
    modalidade: "Online",
    status: "Concluído",
    valor: 150,
    observacoes: "Sessão produtiva, paciente demonstrou progresso significativo.",
    tipoConsulta: "Retorno",
  },
  {
    id: "2",
    pacienteId: "2",
    pacienteNome: "Carlos Mendes",
    pacienteFoto: "/placeholder.svg?height=40&width=40",
    dataHora: new Date("2024-01-19T16:30:00"),
    duracao: 60,
    modalidade: "Presencial",
    status: "Concluído",
    valor: 180,
    observacoes: "Primeira consulta, estabelecimento de rapport e anamnese.",
    tipoConsulta: "Primeira Consulta",
  },
  {
    id: "3",
    pacienteId: "3",
    pacienteNome: "Mariana Santos",
    pacienteFoto: "/placeholder.svg?height=40&width=40",
    dataHora: new Date("2024-01-18T10:00:00"),
    duracao: 50,
    modalidade: "Online",
    status: "Cancelado",
    valor: 150,
    observacoes: "Cancelado pelo paciente com 24h de antecedência.",
    tipoConsulta: "Retorno",
  },
  {
    id: "4",
    pacienteId: "1",
    pacienteNome: "Ana Costa Silva",
    pacienteFoto: "/placeholder.svg?height=40&width=40",
    dataHora: new Date("2024-01-17T15:00:00"),
    duracao: 50,
    modalidade: "Online",
    status: "Concluído",
    valor: 150,
    observacoes: "Trabalhamos técnicas de respiração para ansiedade.",
    tipoConsulta: "Terapia",
  },
  {
    id: "5",
    pacienteId: "4",
    pacienteNome: "João Oliveira",
    pacienteFoto: "/placeholder.svg?height=40&width=40",
    dataHora: new Date("2024-01-16T09:00:00"),
    duracao: 90,
    modalidade: "Presencial",
    status: "Concluído",
    valor: 250,
    observacoes: "Avaliação psicológica completa realizada.",
    tipoConsulta: "Avaliação",
  },
]

export default function MeusAtendimentos() {
  const [atendimentos] = useState<Atendimento[]>(mockAtendimentos)
  const [busca, setBusca] = useState("")
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [filtroModalidade, setFiltroModalidade] = useState("todas")
  const [filtroTipo, setFiltroTipo] = useState("todos")
  const [dataInicio, setDataInicio] = useState<Date>()
  const [dataFim, setDataFim] = useState<Date>()
  const [ordenacao, setOrdenacao] = useState("data-desc")

  // Filtrar atendimentos
  const atendimentosFiltrados = atendimentos.filter((atendimento) => {
    const matchBusca = atendimento.pacienteNome.toLowerCase().includes(busca.toLowerCase())
    const matchStatus = filtroStatus === "todos" || atendimento.status.toLowerCase() === filtroStatus
    const matchModalidade = filtroModalidade === "todas" || atendimento.modalidade.toLowerCase() === filtroModalidade
    const matchTipo = filtroTipo === "todos" || atendimento.tipoConsulta.toLowerCase().includes(filtroTipo)

    let matchData = true
    if (dataInicio && dataFim) {
      const dataAtendimento = atendimento.dataHora
      matchData = dataAtendimento >= dataInicio && dataAtendimento <= dataFim
    }

    return matchBusca && matchStatus && matchModalidade && matchTipo && matchData
  })

  // Ordenar atendimentos
  const atendimentosOrdenados = [...atendimentosFiltrados].sort((a, b) => {
    switch (ordenacao) {
      case "data-asc":
        return a.dataHora.getTime() - b.dataHora.getTime()
      case "data-desc":
        return b.dataHora.getTime() - a.dataHora.getTime()
      case "paciente":
        return a.pacienteNome.localeCompare(b.pacienteNome)
      case "valor-asc":
        return a.valor - b.valor
      case "valor-desc":
        return b.valor - a.valor
      case "duracao":
        return b.duracao - a.duracao
      default:
        return 0
    }
  })

  // Calcular estatísticas
  const totalAtendimentos = atendimentosFiltrados.length
  const atendimentosConcluidos = atendimentosFiltrados.filter((a) => a.status === "Concluído").length
  const totalHoras =
    atendimentosFiltrados.filter((a) => a.status === "Concluído").reduce((acc, a) => acc + a.duracao, 0) / 60
  const receitaTotal = atendimentosFiltrados
    .filter((a) => a.status === "Concluído")
    .reduce((acc, a) => acc + a.valor, 0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Concluído":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Cancelado":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "Reagendado":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Faltou":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "Primeira Consulta":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "Retorno":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "Avaliação":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      case "Terapia":
        return "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const formatarData = (data: Date) => {
    return format(data, "dd/MM/yyyy", { locale: ptBR })
  }

  const formatarHora = (data: Date) => {
    return format(data, "HH:mm", { locale: ptBR })
  }

  const formatarDuracao = (minutos: number) => {
    const horas = Math.floor(minutos / 60)
    const mins = minutos % 60
    if (horas > 0) {
      return `${horas}h${mins > 0 ? ` ${mins}min` : ""}`
    }
    return `${mins}min`
  }

  const exportarDados = () => {
    console.log("Exportando dados dos atendimentos...")
    // Implementar exportação
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Meus Atendimentos</h1>
          <p className="text-muted-foreground">Histórico completo de todas as suas consultas</p>
        </div>
        <Button onClick={exportarDados}>
          <Download className="h-4 w-4 mr-2" />
          Exportar Dados
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Atendimentos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAtendimentos}</div>
            <p className="text-xs text-muted-foreground">{atendimentosConcluidos} concluídos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Horas Trabalhadas</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHoras.toFixed(1)}h</div>
            <p className="text-xs text-muted-foreground">Apenas consultas concluídas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(receitaTotal)}
            </div>
            <p className="text-xs text-muted-foreground">Apenas consultas concluídas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conclusão</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalAtendimentos > 0 ? Math.round((atendimentosConcluidos / totalAtendimentos) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">Consultas realizadas vs agendadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            {/* Primeira linha de filtros */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por paciente..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Status</SelectItem>
                  <SelectItem value="concluído">Concluído</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                  <SelectItem value="reagendado">Reagendado</SelectItem>
                  <SelectItem value="faltou">Faltou</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filtroModalidade} onValueChange={setFiltroModalidade}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="presencial">Presencial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Segunda linha de filtros */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Tipos</SelectItem>
                  <SelectItem value="primeira">Primeira Consulta</SelectItem>
                  <SelectItem value="retorno">Retorno</SelectItem>
                  <SelectItem value="avaliação">Avaliação</SelectItem>
                  <SelectItem value="terapia">Terapia</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-40 justify-start text-left font-normal", !dataInicio && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dataInicio ? formatarData(dataInicio) : "Data início"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={dataInicio} onSelect={setDataInicio} initialFocus />
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-40 justify-start text-left font-normal", !dataFim && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dataFim ? formatarData(dataFim) : "Data fim"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={dataFim} onSelect={setDataFim} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <Select value={ordenacao} onValueChange={setOrdenacao}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="data-desc">Data (mais recente)</SelectItem>
                  <SelectItem value="data-asc">Data (mais antiga)</SelectItem>
                  <SelectItem value="paciente">Paciente (A-Z)</SelectItem>
                  <SelectItem value="valor-desc">Valor (maior)</SelectItem>
                  <SelectItem value="valor-asc">Valor (menor)</SelectItem>
                  <SelectItem value="duracao">Duração</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Atendimentos */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Atendimentos ({atendimentosOrdenados.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Paciente</TableHead>
                  <TableHead>Data/Hora</TableHead>
                  <TableHead>Duração</TableHead>
                  <TableHead>Modalidade</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {atendimentosOrdenados.map((atendimento) => (
                  <TableRow key={atendimento.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={atendimento.pacienteFoto || "/placeholder.svg"}
                            alt={atendimento.pacienteNome}
                          />
                          <AvatarFallback>
                            {atendimento.pacienteNome
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{atendimento.pacienteNome}</p>
                          <p className="text-sm text-muted-foreground">ID: {atendimento.pacienteId}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{formatarData(atendimento.dataHora)}</p>
                        <p className="text-sm text-muted-foreground">{formatarHora(atendimento.dataHora)}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{formatarDuracao(atendimento.duracao)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {atendimento.modalidade === "Online" ? (
                          <Video className="h-4 w-4 text-blue-500" />
                        ) : (
                          <MapPin className="h-4 w-4 text-green-500" />
                        )}
                        <span>{atendimento.modalidade}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getTipoColor(atendimento.tipoConsulta)}>
                        {atendimento.tipoConsulta}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(atendimento.status)}>
                        {atendimento.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(atendimento.valor)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            Ver Detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="w-4 h-4 mr-2" />
                            Gerar Relatório
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            Reagendar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {atendimentosOrdenados.length === 0 && (
            <div className="text-center py-12">
              <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhum atendimento encontrado</h3>
              <p className="text-muted-foreground">
                {busca || filtroStatus !== "todos" || filtroModalidade !== "todas" || filtroTipo !== "todos"
                  ? "Tente ajustar os filtros de busca"
                  : "Seus atendimentos aparecerão aqui conforme forem realizados"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
