"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  CheckCircle,
  XCircle,
  Eye,
  Clock,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  FileText,
  Search,
  Download,
  UserCheck,
  UserX,
  MoreVertical,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface PendingPsychologist {
  id: string
  nome: string
  email: string
  telefone: string
  crp: string
  especialidades: string[]
  formacao: string
  experiencia: string
  endereco: string
  dataCadastro: string
  status: "pendente" | "aprovado" | "reprovado"
  documentos: {
    diplomaPsicologia: string
    certificadoCRP: string
    comprovanteEndereco: string
    foto: string
  }
  biografia: string
  motivacao: string
  fotoPerfil: string
}

export default function NovosPsicologosPage() {
  const [selectedPsychologist, setSelectedPsychologist] = useState<PendingPsychologist | null>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [showApprovalDialog, setShowApprovalDialog] = useState(false)
  const [approvalAction, setApprovalAction] = useState<"aprovar" | "reprovar" | null>(null)
  const [approvalMessage, setApprovalMessage] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [statusFilter, setStatusFilter] = useState("pendente")
  const [searchTerm, setSearchTerm] = useState("")

  const pendingPsychologists: PendingPsychologist[] = [
    {
      id: "1",
      nome: "Dr. João Santos",
      email: "joao.santos@email.com",
      telefone: "(11) 98765-4321",
      crp: "CRP 06/789123",
      especialidades: ["Terapia Cognitivo-Comportamental", "Ansiedade", "Depressão"],
      formacao: "Psicologia - UNIFESP, Especialização em TCC - USP",
      experiencia: "8 anos",
      endereco: "São Paulo, SP",
      dataCadastro: "2024-01-25",
      status: "pendente",
      documentos: {
        diplomaPsicologia: "/docs/diploma-joao.pdf",
        certificadoCRP: "/docs/crp-joao.pdf",
        comprovanteEndereco: "/docs/endereco-joao.pdf",
        foto: "/docs/foto-joao.jpg",
      },
      biografia: "Psicólogo clínico especializado em TCC com foco em transtornos de ansiedade e depressão.",
      motivacao: "Desejo expandir meu atendimento para o meio digital e alcançar mais pacientes.",
      fotoPerfil: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "2",
      nome: "Dra. Ana Rodrigues",
      email: "ana.rodrigues@email.com",
      telefone: "(11) 97654-3210",
      crp: "CRP 06/456789",
      especialidades: ["Psicologia Infantil", "Terapia Familiar", "Autismo"],
      formacao: "Psicologia - PUC-SP, Mestrado em Psicologia Infantil - USP",
      experiencia: "12 anos",
      endereco: "São Paulo, SP",
      dataCadastro: "2024-01-24",
      status: "pendente",
      documentos: {
        diplomaPsicologia: "/docs/diploma-ana.pdf",
        certificadoCRP: "/docs/crp-ana.pdf",
        comprovanteEndereco: "/docs/endereco-ana.pdf",
        foto: "/docs/foto-ana.jpg",
      },
      biografia: "Especialista em psicologia infantil e terapia familiar, com experiência em TEA.",
      motivacao: "Quero oferecer suporte psicológico online para famílias que têm dificuldade de acesso presencial.",
      fotoPerfil: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "3",
      nome: "Dr. Carlos Lima",
      email: "carlos.lima@email.com",
      telefone: "(11) 96543-2109",
      crp: "CRP 06/321654",
      especialidades: ["Neuropsicologia", "Reabilitação Cognitiva"],
      formacao: "Psicologia - UNESP, Especialização em Neuropsicologia - HC-FMUSP",
      experiencia: "15 anos",
      endereco: "Campinas, SP",
      dataCadastro: "2024-01-23",
      status: "aprovado",
      documentos: {
        diplomaPsicologia: "/docs/diploma-carlos.pdf",
        certificadoCRP: "/docs/crp-carlos.pdf",
        comprovanteEndereco: "/docs/endereco-carlos.pdf",
        foto: "/docs/foto-carlos.jpg",
      },
      biografia: "Neuropsicólogo com vasta experiência em avaliação e reabilitação cognitiva.",
      motivacao: "Busco ampliar o acesso à neuropsicologia através da telemedicina.",
      fotoPerfil: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "4",
      nome: "Dra. Fernanda Costa",
      email: "fernanda.costa@email.com",
      telefone: "(11) 95432-1098",
      crp: "CRP 06/987654",
      especialidades: ["Psicologia Organizacional", "Coaching"],
      formacao: "Psicologia - Mackenzie, MBA em Gestão de Pessoas - FGV",
      experiencia: "6 anos",
      endereco: "São Paulo, SP",
      dataCadastro: "2024-01-22",
      status: "reprovado",
      documentos: {
        diplomaPsicologia: "/docs/diploma-fernanda.pdf",
        certificadoCRP: "/docs/crp-fernanda.pdf",
        comprovanteEndereco: "/docs/endereco-fernanda.pdf",
        foto: "/docs/foto-fernanda.jpg",
      },
      biografia: "Psicóloga organizacional com foco em desenvolvimento de lideranças.",
      motivacao: "Interesse em atendimento clínico online para complementar minha atuação organizacional.",
      fotoPerfil: "/placeholder.svg?height=80&width=80",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendente":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "aprovado":
        return "bg-green-100 text-green-800 border-green-200"
      case "reprovado":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pendente":
        return <Clock className="w-4 h-4" />
      case "aprovado":
        return <CheckCircle className="w-4 h-4" />
      case "reprovado":
        return <XCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  const filteredPsychologists = pendingPsychologists.filter((psychologist) => {
    const matchesSearch =
      psychologist.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      psychologist.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      psychologist.crp.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "todos" || psychologist.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleApproval = async () => {
    if (!selectedPsychologist || !approvalAction) return

    setIsProcessing(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log(`${approvalAction} psicólogo:`, selectedPsychologist.id, approvalMessage)
      setShowApprovalDialog(false)
      setApprovalAction(null)
      setApprovalMessage("")
      setSelectedPsychologist(null)
    } catch (error) {
      console.error("Erro no processamento:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const getStatusCount = (status: string) => {
    return pendingPsychologists.filter((p) => p.status === status).length
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Novos Psicólogos</h1>
          <p className="text-gray-600 mt-1">Gerencie solicitações de cadastro de novos profissionais</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Aguardando</p>
                  <p className="text-2xl font-bold text-yellow-600">{getStatusCount("pendente")}</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Aprovados</p>
                  <p className="text-2xl font-bold text-green-600">{getStatusCount("aprovado")}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Reprovados</p>
                  <p className="text-2xl font-bold text-red-600">{getStatusCount("reprovado")}</p>
                </div>
                <div className="p-3 bg-red-100 rounded-full">
                  <XCircle className="w-5 h-5 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-primary">{pendingPsychologists.length}</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <User className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar por nome, email ou CRP..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  <option value="todos">Todos os Status</option>
                  <option value="pendente">Pendente</option>
                  <option value="aprovado">Aprovado</option>
                  <option value="reprovado">Reprovado</option>
                </select>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Psychologists List */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Solicitações de Cadastro ({filteredPsychologists.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {/* Desktop Table */}
            <div className="hidden lg:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Psicólogo</TableHead>
                    <TableHead>CRP</TableHead>
                    <TableHead>Especialidades</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPsychologists.map((psychologist) => (
                    <TableRow key={psychologist.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={psychologist.fotoPerfil || "/placeholder.svg"} alt={psychologist.nome} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {psychologist.nome
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900">{psychologist.nome}</p>
                            <p className="text-sm text-gray-500">{psychologist.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-sm">{psychologist.crp}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {psychologist.especialidades.slice(0, 2).map((esp, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {esp}
                            </Badge>
                          ))}
                          {psychologist.especialidades.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{psychologist.especialidades.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(psychologist.dataCadastro)}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(psychologist.status)}>
                          {getStatusIcon(psychologist.status)}
                          <span className="ml-1 capitalize">{psychologist.status}</span>
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedPsychologist(psychologist)}>
                                <Eye className="w-4 h-4 mr-2" />
                                Ver
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Detalhes do Psicólogo</DialogTitle>
                              </DialogHeader>
                              {selectedPsychologist && (
                                <PsychologistDetails
                                  psychologist={selectedPsychologist}
                                  onApprove={() => {
                                    setApprovalAction("aprovar")
                                    setShowApprovalDialog(true)
                                  }}
                                  onReject={() => {
                                    setApprovalAction("reprovar")
                                    setShowApprovalDialog(true)
                                  }}
                                />
                              )}
                            </DialogContent>
                          </Dialog>

                          {psychologist.status === "pendente" && (
                            <>
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => {
                                  setSelectedPsychologist(psychologist)
                                  setApprovalAction("aprovar")
                                  setShowApprovalDialog(true)
                                }}
                              >
                                <UserCheck className="w-4 h-4 mr-2" />
                                Aprovar
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-300 text-red-600 hover:bg-red-50"
                                onClick={() => {
                                  setSelectedPsychologist(psychologist)
                                  setApprovalAction("reprovar")
                                  setShowApprovalDialog(true)
                                }}
                              >
                                <UserX className="w-4 h-4 mr-2" />
                                Reprovar
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden divide-y divide-gray-200">
              {filteredPsychologists.map((psychologist) => (
                <div key={psychologist.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={psychologist.fotoPerfil || "/placeholder.svg"} alt={psychologist.nome} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {psychologist.nome
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900 truncate">{psychologist.nome}</p>
                        <p className="text-sm text-gray-500 truncate">{psychologist.email}</p>
                        <p className="text-sm font-mono text-gray-600 mt-1">{psychologist.crp}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={getStatusColor(psychologist.status)}>
                      {getStatusIcon(psychologist.status)}
                      <span className="ml-1">{psychologist.status}</span>
                    </Badge>
                  </div>

                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {psychologist.especialidades.slice(0, 3).map((esp, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {esp}
                        </Badge>
                      ))}
                      {psychologist.especialidades.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{psychologist.especialidades.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Cadastrado em {formatDate(psychologist.dataCadastro)}</span>

                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedPsychologist(psychologist)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-[95vw] sm:max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Detalhes do Psicólogo</DialogTitle>
                          </DialogHeader>
                          {selectedPsychologist && (
                            <PsychologistDetails
                              psychologist={selectedPsychologist}
                              onApprove={() => {
                                setApprovalAction("aprovar")
                                setShowApprovalDialog(true)
                              }}
                              onReject={() => {
                                setApprovalAction("reprovar")
                                setShowApprovalDialog(true)
                              }}
                            />
                          )}
                        </DialogContent>
                      </Dialog>

                      {psychologist.status === "pendente" && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedPsychologist(psychologist)
                                setApprovalAction("aprovar")
                                setShowApprovalDialog(true)
                              }}
                              className="text-green-600"
                            >
                              <UserCheck className="w-4 h-4 mr-2" />
                              Aprovar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedPsychologist(psychologist)
                                setApprovalAction("reprovar")
                                setShowApprovalDialog(true)
                              }}
                              className="text-red-600"
                            >
                              <UserX className="w-4 h-4 mr-2" />
                              Reprovar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredPsychologists.length === 0 && (
              <div className="text-center py-12">
                <User className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma solicitação encontrada</h3>
                <p className="text-gray-500">
                  {searchTerm || statusFilter !== "todos"
                    ? "Tente ajustar os filtros de busca"
                    : "Não há solicitações de cadastro no momento"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Approval Dialog */}
        <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{approvalAction === "aprovar" ? "Aprovar Psicólogo" : "Reprovar Psicólogo"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {selectedPsychologist && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage
                        src={selectedPsychologist.fotoPerfil || "/placeholder.svg"}
                        alt={selectedPsychologist.nome}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {selectedPsychologist.nome
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{selectedPsychologist.nome}</h4>
                      <p className="text-sm text-gray-600">{selectedPsychologist.crp}</p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="message">
                  {approvalAction === "aprovar" ? "Mensagem de boas-vindas (opcional)" : "Motivo da reprovação"}
                </Label>
                <Textarea
                  id="message"
                  value={approvalMessage}
                  onChange={(e) => setApprovalMessage(e.target.value)}
                  placeholder={
                    approvalAction === "aprovar"
                      ? "Bem-vindo à nossa plataforma!"
                      : "Explique o motivo da reprovação..."
                  }
                  className="mt-2"
                  required={approvalAction === "reprovar"}
                />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setShowApprovalDialog(false)}>
                  Cancelar
                </Button>
                <Button
                  className={`flex-1 ${
                    approvalAction === "aprovar" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                  }`}
                  onClick={handleApproval}
                  disabled={isProcessing || (approvalAction === "reprovar" && !approvalMessage.trim())}
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processando...
                    </>
                  ) : (
                    <>
                      {approvalAction === "aprovar" ? (
                        <CheckCircle className="w-4 h-4 mr-2" />
                      ) : (
                        <XCircle className="w-4 h-4 mr-2" />
                      )}
                      {approvalAction === "aprovar" ? "Aprovar" : "Reprovar"}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

function PsychologistDetails({
  psychologist,
  onApprove,
  onReject,
}: {
  psychologist: PendingPsychologist
  onApprove: () => void
  onReject: () => void
}) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <Avatar className="w-20 h-20 mx-auto sm:mx-0">
          <AvatarImage src={psychologist.fotoPerfil || "/placeholder.svg"} alt={psychologist.nome} />
          <AvatarFallback className="bg-primary/10 text-primary text-xl">
            {psychologist.nome
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-xl font-bold text-gray-900">{psychologist.nome}</h3>
          <p className="text-gray-600">{psychologist.crp}</p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-sm text-gray-500">
            <div className="flex items-center gap-1 justify-center sm:justify-start">
              <Mail className="w-4 h-4" />
              <span>{psychologist.email}</span>
            </div>
            <div className="flex items-center gap-1 justify-center sm:justify-start">
              <Phone className="w-4 h-4" />
              <span>{psychologist.telefone}</span>
            </div>
            <div className="flex items-center gap-1 justify-center sm:justify-start">
              <MapPin className="w-4 h-4" />
              <span>{psychologist.endereco}</span>
            </div>
          </div>
        </div>
        <Badge variant="outline" className={getStatusColor(psychologist.status)}>
          {psychologist.status}
        </Badge>
      </div>

      <Tabs defaultValue="informacoes" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="informacoes">Informações</TabsTrigger>
          <TabsTrigger value="documentos">Documentos</TabsTrigger>
          <TabsTrigger value="motivacao">Motivação</TabsTrigger>
        </TabsList>

        <TabsContent value="informacoes" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Formação
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{psychologist.formacao}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Experiência</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{psychologist.experiencia}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Especialidades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {psychologist.especialidades.map((esp, index) => (
                  <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                    {esp}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Biografia</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{psychologist.biografia}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documentos" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(psychologist.documentos).map(([key, url]) => (
              <Card key={key}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">
                          {key === "diplomaPsicologia" && "Diploma de Psicologia"}
                          {key === "certificadoCRP" && "Certificado CRP"}
                          {key === "comprovanteEndereco" && "Comprovante de Endereço"}
                          {key === "foto" && "Foto 3x4"}
                        </p>
                        <p className="text-xs text-gray-500">Documento anexado</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      Ver
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="motivacao">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Motivação para Ingressar na Plataforma</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{psychologist.motivacao}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {psychologist.status === "pendente" && (
        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
          <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={onApprove}>
            <CheckCircle className="w-4 h-4 mr-2" />
            Aprovar Cadastro
          </Button>
          <Button variant="outline" className="flex-1 border-red-300 text-red-600 hover:bg-red-50" onClick={onReject}>
            <XCircle className="w-4 h-4 mr-2" />
            Reprovar Cadastro
          </Button>
        </div>
      )}
    </div>
  )
}

function getStatusColor(status: string) {
  switch (status) {
    case "pendente":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "aprovado":
      return "bg-green-100 text-green-800 border-green-200"
    case "reprovado":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}
