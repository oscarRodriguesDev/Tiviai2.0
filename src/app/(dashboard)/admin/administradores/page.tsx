"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Shield,
  Plus,
  Edit,
  Trash2,
  Eye,
  UserPlus,
  Settings,
  Crown,
  CheckCircle,
  AlertTriangle,
  MoreVertical,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Administrator {
  id: string
  nome: string
  email: string
  telefone: string
  cargo: string
  nivel: "super_admin" | "admin" | "moderador"
  status: "ativo" | "inativo" | "suspenso"
  dataCriacao: string
  ultimoAcesso: string
  permissoes: string[]
  fotoPerfil: string
  criadoPor: string
}

interface NewAdminForm {
  nome: string
  email: string
  telefone: string
  cargo: string
  nivel: "super_admin" | "admin" | "moderador"
  permissoes: string[]
  enviarCredenciais: boolean
  crp?: string
  especialidade?: string
  experiencia?: string
  formacao?: string
}

export default function NovosAdministradoresPage() {
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [selectedAdmin, setSelectedAdmin] = useState<Administrator | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [userType, setUserType] = useState<"admin" | "psicologo">("admin")

  const [newAdminForm, setNewAdminForm] = useState<NewAdminForm>({
    nome: "",
    email: "",
    telefone: "",
    cargo: "",
    nivel: "moderador",
    permissoes: [],
    enviarCredenciais: true,
  })

  const administrators: Administrator[] = [
    {
      id: "1",
      nome: "Dr. Roberto Silva",
      email: "roberto.silva@dating.com",
      telefone: "(11) 99999-0001",
      cargo: "Diretor Técnico",
      nivel: "super_admin",
      status: "ativo",
      dataCriacao: "2024-01-01",
      ultimoAcesso: "2024-01-29",
      permissoes: ["all"],
      fotoPerfil: "/placeholder.svg?height=40&width=40",
      criadoPor: "Sistema",
    },
    {
      id: "2",
      nome: "Dra. Maria Santos",
      email: "maria.santos@dating.com",
      telefone: "(11) 99999-0002",
      cargo: "Coordenadora de Psicólogos",
      nivel: "admin",
      status: "ativo",
      dataCriacao: "2024-01-10",
      ultimoAcesso: "2024-01-28",
      permissoes: ["gerenciar_psicologos", "aprovar_cadastros", "visualizar_relatorios"],
      fotoPerfil: "/placeholder.svg?height=40&width=40",
      criadoPor: "Dr. Roberto Silva",
    },
    {
      id: "3",
      nome: "Carlos Oliveira",
      email: "carlos.oliveira@dating.com",
      telefone: "(11) 99999-0003",
      cargo: "Moderador de Conteúdo",
      nivel: "moderador",
      status: "ativo",
      dataCriacao: "2024-01-15",
      ultimoAcesso: "2024-01-27",
      permissoes: ["moderar_conteudo", "gerenciar_denuncias"],
      fotoPerfil: "/placeholder.svg?height=40&width=40",
      criadoPor: "Dra. Maria Santos",
    },
    {
      id: "4",
      nome: "Ana Costa",
      email: "ana.costa@dating.com",
      telefone: "(11) 99999-0004",
      cargo: "Analista de Suporte",
      nivel: "moderador",
      status: "suspenso",
      dataCriacao: "2024-01-20",
      ultimoAcesso: "2024-01-25",
      permissoes: ["suporte_usuarios", "visualizar_tickets"],
      fotoPerfil: "/placeholder.svg?height=40&width=40",
      criadoPor: "Dra. Maria Santos",
    },
  ]

  const availablePermissions = [
    {
      id: "gerenciar_psicologos",
      label: "Gerenciar Psicólogos",
      description: "Aprovar, reprovar e gerenciar psicólogos",
    },
    { id: "aprovar_cadastros", label: "Aprovar Cadastros", description: "Aprovar novos cadastros de profissionais" },
    { id: "gerenciar_usuarios", label: "Gerenciar Usuários", description: "Administrar contas de usuários" },
    { id: "visualizar_relatorios", label: "Visualizar Relatórios", description: "Acesso a relatórios e analytics" },
    { id: "gerenciar_financeiro", label: "Gerenciar Financeiro", description: "Controle financeiro e pagamentos" },
    { id: "moderar_conteudo", label: "Moderar Conteúdo", description: "Moderar posts e conteúdos da plataforma" },
    { id: "gerenciar_denuncias", label: "Gerenciar Denúncias", description: "Processar denúncias e reclamações" },
    { id: "suporte_usuarios", label: "Suporte aos Usuários", description: "Atendimento e suporte técnico" },
    { id: "visualizar_tickets", label: "Visualizar Tickets", description: "Acesso ao sistema de tickets" },
    { id: "configurar_sistema", label: "Configurar Sistema", description: "Configurações gerais da plataforma" },
  ]

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case "super_admin":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "admin":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "moderador":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getNivelIcon = (nivel: string) => {
    switch (nivel) {
      case "super_admin":
        return <Crown className="w-4 h-4" />
      case "admin":
        return <Shield className="w-4 h-4" />
      case "moderador":
        return <Settings className="w-4 h-4" />
      default:
        return <Settings className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo":
        return "bg-green-100 text-green-800"
      case "inativo":
        return "bg-gray-100 text-gray-800"
      case "suspenso":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  const handleInputChange = (field: keyof NewAdminForm, value: string | boolean | string[]) => {
    setNewAdminForm((prev) => ({ ...prev, [field]: value }))
  }

  const handlePermissionToggle = (permissionId: string) => {
    setNewAdminForm((prev) => ({
      ...prev,
      permissoes: prev.permissoes.includes(permissionId)
        ? prev.permissoes.filter((p) => p !== permissionId)
        : [...prev.permissoes, permissionId],
    }))
  }

  const handleCreateAdmin = async () => {
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Novo administrador:", newAdminForm)
      setNewAdminForm({
        nome: "",
        email: "",
        telefone: "",
        cargo: "",
        nivel: "moderador",
        permissoes: [],
        enviarCredenciais: true,
      })
      setShowCreateDialog(false)
    } catch (error) {
      console.error("Erro ao criar administrador:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const filteredAdministrators = administrators.filter((admin) => {
    const matchesSearch =
      admin.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.cargo.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "todos" || admin.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusCount = (status: string) => {
    return administrators.filter((a) => a.status === status).length
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Administradores</h1>
              <p className="text-gray-600 mt-1">Gerencie administradores e suas permissões</p>
            </div>
            <Button className="bg-primary hover:bg-primary/90" onClick={() => setShowCreateDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Administrador
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-primary">{administrators.length}</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Ativos</p>
                  <p className="text-2xl font-bold text-green-600">{getStatusCount("ativo")}</p>
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
                  <p className="text-sm font-medium text-gray-600">Suspensos</p>
                  <p className="text-2xl font-bold text-red-600">{getStatusCount("suspenso")}</p>
                </div>
                <div className="p-3 bg-red-100 rounded-full">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Super Admins</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {administrators.filter((a) => a.nivel === "super_admin").length}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Crown className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Buscar por nome, email ou cargo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-gray-300 focus:border-primary"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Status</SelectItem>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="inativo">Inativo</SelectItem>
                  <SelectItem value="suspenso">Suspenso</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Administrators List */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Lista de Administradores ({filteredAdministrators.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {/* Desktop Table */}
            <div className="hidden lg:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Administrador</TableHead>
                    <TableHead>Cargo</TableHead>
                    <TableHead>Nível</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Último Acesso</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAdministrators.map((admin) => (
                    <TableRow key={admin.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={admin.fotoPerfil || "/placeholder.svg"} alt={admin.nome} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {admin.nome
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900">{admin.nome}</p>
                            <p className="text-sm text-gray-500">{admin.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-gray-700">{admin.cargo}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getNivelColor(admin.nivel)}>
                          {getNivelIcon(admin.nivel)}
                          <span className="ml-1 capitalize">{admin.nivel.replace("_", " ")}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={getStatusColor(admin.status)}>
                          {admin.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(admin.ultimoAcesso)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            Ver
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remover
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden divide-y divide-gray-200">
              {filteredAdministrators.map((admin) => (
                <div key={admin.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={admin.fotoPerfil || "/placeholder.svg"} alt={admin.nome} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {admin.nome
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900 truncate">{admin.nome}</p>
                        <p className="text-sm text-gray-500 truncate">{admin.email}</p>
                        <p className="text-sm text-gray-600 mt-1">{admin.cargo}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant="outline" className={getNivelColor(admin.nivel)}>
                        {getNivelIcon(admin.nivel)}
                        <span className="ml-1">{admin.nivel.replace("_", " ")}</span>
                      </Badge>
                      <Badge variant="secondary" className={getStatusColor(admin.status)}>
                        {admin.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Último acesso: {formatDate(admin.ultimoAcesso)}</span>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          Ver Detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remover
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>

            {filteredAdministrators.length === 0 && (
              <div className="text-center py-12">
                <Shield className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum administrador encontrado</h3>
                <p className="text-gray-500">
                  {searchTerm || statusFilter !== "todos"
                    ? "Tente ajustar os filtros de busca"
                    : "Não há administradores cadastrados"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Create Admin Dialog */}
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Criar Novo Usuário</DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              {/* User Type Selection */}
              <div>
                <Label>Tipo de Usuário *</Label>
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="admin"
                      name="userType"
                      checked={userType === "admin"}
                      onChange={() => setUserType("admin")}
                      className="w-4 h-4 text-primary"
                    />
                    <Label htmlFor="admin" className="cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        <span>Administrador</span>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="psicologo"
                      name="userType"
                      checked={userType === "psicologo"}
                      onChange={() => setUserType("psicologo")}
                      className="w-4 h-4 text-primary"
                    />
                    <Label htmlFor="psicologo" className="cursor-pointer">
                      <div className="flex items-center gap-2">
                        <UserPlus className="w-4 h-4" />
                        <span>Psicólogo (Acesso Direto)</span>
                      </div>
                    </Label>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {userType === "admin"
                    ? "Usuário com permissões administrativas"
                    : "Psicólogo adicionado diretamente, sem processo de aprovação"}
                </p>
              </div>

              <CreateAdminForm
                form={newAdminForm}
                onInputChange={handleInputChange}
                onPermissionToggle={handlePermissionToggle}
                onSubmit={handleCreateAdmin}
                onCancel={() => setShowCreateDialog(false)}
                isSubmitting={isSubmitting}
                availablePermissions={availablePermissions}
                userType={userType}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

function CreateAdminForm({
  form,
  onInputChange,
  onPermissionToggle,
  onSubmit,
  onCancel,
  isSubmitting,
  availablePermissions,
  userType,
}: {
  form: NewAdminForm
  onInputChange: (field: keyof NewAdminForm, value: string | boolean | string[]) => void
  onPermissionToggle: (permissionId: string) => void
  onSubmit: () => void
  onCancel: () => void
  isSubmitting: boolean
  availablePermissions: Array<{ id: string; label: string; description: string }>
  userType: "admin" | "psicologo"
}) {
  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nome">Nome Completo *</Label>
          <Input
            id="nome"
            value={form.nome}
            onChange={(e) => onInputChange("nome", e.target.value)}
            placeholder="Nome do administrador"
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => onInputChange("email", e.target.value)}
            placeholder="email@dating.com"
            required
          />
        </div>
        <div>
          <Label htmlFor="telefone">Telefone</Label>
          <Input
            id="telefone"
            value={form.telefone}
            onChange={(e) => onInputChange("telefone", e.target.value)}
            placeholder="(11) 99999-9999"
          />
        </div>
        <div>
          <Label htmlFor="cargo">Cargo</Label>
          <Input
            id="cargo"
            value={form.cargo}
            onChange={(e) => onInputChange("cargo", e.target.value)}
            placeholder="Ex: Coordenador, Analista, etc."
          />
        </div>
      </div>

      {/* Access Level */}
      <div>
        <Label htmlFor="nivel">Nível de Acesso *</Label>
        <Select value={form.nivel} onValueChange={(value) => onInputChange("nivel", value as any)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="moderador">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <span>Moderador</span>
              </div>
            </SelectItem>
            <SelectItem value="admin">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Administrador</span>
              </div>
            </SelectItem>
            <SelectItem value="super_admin">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4" />
                <span>Super Administrador</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {userType === "psicologo" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="crp">CRP *</Label>
              <Input
                id="crp"
                value={form.crp || ""}
                onChange={(e) => onInputChange("crp", e.target.value)}
                placeholder="Ex: CRP 06/123456"
                required
              />
            </div>
            <div>
              <Label htmlFor="especialidade">Especialidade Principal *</Label>
              <Select value={form.especialidade || ""} onValueChange={(value) => onInputChange("especialidade", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a especialidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ansiedade">Transtornos de Ansiedade</SelectItem>
                  <SelectItem value="depressao">Depressão</SelectItem>
                  <SelectItem value="tcc">Terapia Cognitivo-Comportamental</SelectItem>
                  <SelectItem value="psicanalise">Psicanálise</SelectItem>
                  <SelectItem value="infantil">Psicologia Infantil</SelectItem>
                  <SelectItem value="casal">Terapia de Casal</SelectItem>
                  <SelectItem value="familiar">Terapia Familiar</SelectItem>
                  <SelectItem value="trauma">Trauma e TEPT</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="experiencia">Anos de Experiência</Label>
              <Select value={form.experiencia || ""} onValueChange={(value) => onInputChange("experiencia", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-2">0-2 anos</SelectItem>
                  <SelectItem value="3-5">3-5 anos</SelectItem>
                  <SelectItem value="6-10">6-10 anos</SelectItem>
                  <SelectItem value="11-15">11-15 anos</SelectItem>
                  <SelectItem value="16+">Mais de 16 anos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="formacao">Formação</Label>
              <Input
                id="formacao"
                value={form.formacao || ""}
                onChange={(e) => onInputChange("formacao", e.target.value)}
                placeholder="Ex: Universidade, Pós-graduação..."
              />
            </div>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-900">Acesso Direto</h4>
                <p className="text-sm text-green-700 mt-1">
                  Este psicólogo será adicionado diretamente ao sistema, sem necessidade de pré-cadastro ou aprovação.
                  Ele receberá as credenciais de acesso por email.
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Permissions */}
      <div>
        <Label>Permissões</Label>
        <div className="mt-2 space-y-3 max-h-60 overflow-y-auto border rounded-lg p-4">
          {availablePermissions.map((permission) => (
            <div key={permission.id} className="flex items-start space-x-3">
              <Checkbox
                id={permission.id}
                checked={form.permissoes.includes(permission.id)}
                onCheckedChange={() => onPermissionToggle(permission.id)}
              />
              <div className="flex-1">
                <Label htmlFor={permission.id} className="text-sm font-medium cursor-pointer">
                  {permission.label}
                </Label>
                <p className="text-xs text-gray-500">{permission.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Options */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="enviarCredenciais"
          checked={form.enviarCredenciais}
          onCheckedChange={(checked) => onInputChange("enviarCredenciais", checked as boolean)}
        />
        <Label htmlFor="enviarCredenciais" className="text-sm cursor-pointer">
          Enviar credenciais de acesso por email
        </Label>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
        <Button variant="outline" className="flex-1" onClick={onCancel}>
          Cancelar
        </Button>
        <Button
          className="flex-1 bg-primary hover:bg-primary/90"
          onClick={onSubmit}
          disabled={isSubmitting || !form.nome || !form.email || (userType === "psicologo" && !form.crp)}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Criando...
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4 mr-2" />
              {userType === "admin" ? "Criar Administrador" : "Adicionar Psicólogo"}
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
