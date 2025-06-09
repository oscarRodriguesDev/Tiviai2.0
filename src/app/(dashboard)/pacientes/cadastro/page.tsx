"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  Save,
  X,
  UserPlus,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Target,
  AlertTriangle,
  CheckCircle,
  User,
} from "lucide-react"

interface PatientForm {
  psicologoId: string // ID do psicólogo (não editável)
  nome: string
  email: string
  telefone: string
  dataNascimento: string
  endereco: string
  profissao: string
  estadoCivil: string
  objetivosTerapeuticos: string[]
  preferenciasHorario: string[]
  historicoMedico: string
  medicamentosAtuais: string
  contatoEmergencia: {
    nome: string
    telefone: string
    parentesco: string
  }
  preferenciasConsulta: string
  observacoes: string
}

export default function CadastroPacientePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  // Simular dados do psicólogo logado (em produção, viria do contexto/auth)
  const psicologoLogado = {
    id: "PSI_001",
    nome: "Dr. João Silva",
    crp: "CRP 06/123456",
  }

  const [formData, setFormData] = useState<PatientForm>({
    psicologoId: psicologoLogado.id, // ID do psicólogo automaticamente preenchido
    nome: "",
    email: "",
    telefone: "",
    dataNascimento: "",
    endereco: "",
    profissao: "",
    estadoCivil: "",
    objetivosTerapeuticos: [],
    preferenciasHorario: [],
    historicoMedico: "",
    medicamentosAtuais: "",
    contatoEmergencia: {
      nome: "",
      telefone: "",
      parentesco: "",
    },
    preferenciasConsulta: "",
    observacoes: "",
  })

  const objetivosDisponiveis = [
    "Ansiedade",
    "Depressão",
    "Autoestima",
    "Relacionamentos",
    "Estresse",
    "Luto",
    "Trauma",
    "Fobias",
    "Desenvolvimento Pessoal",
    "Questões Familiares",
    "Transtornos Alimentares",
    "Dependência Química",
  ]

  const horariosDisponiveis = ["Manhã (08:00-12:00)", "Tarde (12:00-18:00)", "Noite (18:00-22:00)"]

  const handleInputChange = (field: keyof PatientForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleContactChange = (field: keyof PatientForm["contatoEmergencia"], value: string) => {
    setFormData((prev) => ({
      ...prev,
      contatoEmergencia: { ...prev.contatoEmergencia, [field]: value },
    }))
  }

  const handleObjectiveToggle = (objetivo: string) => {
    setFormData((prev) => ({
      ...prev,
      objetivosTerapeuticos: prev.objetivosTerapeuticos.includes(objetivo)
        ? prev.objetivosTerapeuticos.filter((o) => o !== objetivo)
        : [...prev.objetivosTerapeuticos, objetivo],
    }))
  }

  const handleScheduleToggle = (horario: string) => {
    setFormData((prev) => ({
      ...prev,
      preferenciasHorario: prev.preferenciasHorario.includes(horario)
        ? prev.preferenciasHorario.filter((h) => h !== horario)
        : [...prev.preferenciasHorario, horario],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simular envio dos dados para o banco
      console.log("Dados do paciente para salvar no banco:", {
        ...formData,
        dataHoraCadastro: new Date().toISOString(),
        status: "ativo",
      })

      // Simular delay de rede
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setSuccess(true)
    } catch (error) {
      console.error("Erro ao cadastrar paciente:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      psicologoId: psicologoLogado.id, // Mantém o ID do psicólogo
      nome: "",
      email: "",
      telefone: "",
      dataNascimento: "",
      endereco: "",
      profissao: "",
      estadoCivil: "",
      objetivosTerapeuticos: [],
      preferenciasHorario: [],
      historicoMedico: "",
      medicamentosAtuais: "",
      contatoEmergencia: {
        nome: "",
        telefone: "",
        parentesco: "",
      },
      preferenciasConsulta: "",
      observacoes: "",
    })
    setSuccess(false)
  }

  if (success) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Paciente Cadastrado com Sucesso!</h1>
          <p className="text-muted-foreground">O paciente {formData.nome} foi adicionado à sua lista.</p>
          <p className="text-sm text-muted-foreground mt-2">
            Vinculado ao psicólogo: <strong>{psicologoLogado.nome}</strong> (ID: {psicologoLogado.id})
          </p>
        </div>

        <Card className="max-w-md mx-auto">
          <CardContent className="p-6 text-center space-y-4">
            <Button onClick={resetForm} className="w-full bg-primary hover:bg-primary/90">
              <UserPlus className="w-4 h-4 mr-2" />
              Cadastrar Novo Paciente
            </Button>
            <Button variant="outline" className="w-full" onClick={() => (window.location.href = "/pacientes")}>
              Ver Lista de Pacientes
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Cadastro de Paciente</h1>
        <p className="text-muted-foreground mt-1">Adicione um novo paciente à sua prática</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Informações Pessoais */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informação do Psicólogo Responsável */}
            <Card className="border-primary/20 bg-primary/5 dark:bg-primary/10">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Psicólogo Responsável
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="psicologoId" className="text-foreground">
                      ID do Psicólogo
                    </Label>
                    <Input
                      id="psicologoId"
                      value={formData.psicologoId}
                      disabled
                      className="bg-muted text-muted-foreground cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <Label className="text-foreground">Nome do Psicólogo</Label>
                    <Input
                      value={psicologoLogado.nome}
                      disabled
                      className="bg-muted text-muted-foreground cursor-not-allowed"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground"
                  >
                    {psicologoLogado.crp}
                  </Badge>
                  <span>Este paciente será automaticamente vinculado ao seu perfil</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Informações Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nome" className="text-foreground">
                      Nome Completo *
                    </Label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) => handleInputChange("nome", e.target.value)}
                      className="border-input focus:border-primary"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="profissao" className="text-foreground">
                      Profissão
                    </Label>
                    <Input
                      id="profissao"
                      value={formData.profissao}
                      onChange={(e) => handleInputChange("profissao", e.target.value)}
                      className="border-input focus:border-primary"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-foreground flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="border-input focus:border-primary"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="telefone" className="text-foreground flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Telefone *
                    </Label>
                    <Input
                      id="telefone"
                      value={formData.telefone}
                      onChange={(e) => handleInputChange("telefone", e.target.value)}
                      className="border-input focus:border-primary"
                      placeholder="(11) 99999-9999"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="endereco" className="text-foreground flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Endereço
                    </Label>
                    <Input
                      id="endereco"
                      value={formData.endereco}
                      onChange={(e) => handleInputChange("endereco", e.target.value)}
                      className="border-input focus:border-primary"
                    />
                  </div>

                  <div>
                    <Label htmlFor="dataNascimento" className="text-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Data de Nascimento *
                    </Label>
                    <Input
                      id="dataNascimento"
                      type="date"
                      value={formData.dataNascimento}
                      onChange={(e) => handleInputChange("dataNascimento", e.target.value)}
                      className="border-input focus:border-primary"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="estadoCivil" className="text-foreground">
                      Estado Civil
                    </Label>
                    <Select
                      value={formData.estadoCivil}
                      onValueChange={(value) => handleInputChange("estadoCivil", value)}
                    >
                      <SelectTrigger className="border-input focus:border-primary">
                        <SelectValue placeholder="Selecione o estado civil" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="solteiro">Solteiro(a)</SelectItem>
                        <SelectItem value="casado">Casado(a)</SelectItem>
                        <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                        <SelectItem value="viuvo">Viúvo(a)</SelectItem>
                        <SelectItem value="uniao-estavel">União Estável</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Objetivos Terapêuticos */}
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Objetivos Terapêuticos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                  {objetivosDisponiveis.map((objetivo) => (
                    <div key={objetivo} className="flex items-center space-x-2">
                      <Checkbox
                        id={objetivo}
                        checked={formData.objetivosTerapeuticos.includes(objetivo)}
                        onCheckedChange={() => handleObjectiveToggle(objetivo)}
                      />
                      <Label htmlFor={objetivo} className="text-sm text-foreground">
                        {objetivo}
                      </Label>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">Objetivos selecionados:</p>
                  <div className="flex flex-wrap gap-1 sm:gap-2 mt-2">
                    {formData.objetivosTerapeuticos.map((objetivo) => (
                      <Badge
                        key={objetivo}
                        variant="secondary"
                        className="bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground"
                      >
                        {objetivo}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informações Médicas */}
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Informações Médicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="historicoMedico" className="text-foreground">
                    Histórico Médico Relevante
                  </Label>
                  <Textarea
                    id="historicoMedico"
                    value={formData.historicoMedico}
                    onChange={(e) => handleInputChange("historicoMedico", e.target.value)}
                    placeholder="Descreva condições médicas, tratamentos anteriores, etc."
                    className="border-input focus:border-primary"
                  />
                </div>

                <div>
                  <Label htmlFor="medicamentosAtuais" className="text-foreground">
                    Medicamentos em Uso
                  </Label>
                  <Textarea
                    id="medicamentosAtuais"
                    value={formData.medicamentosAtuais}
                    onChange={(e) => handleInputChange("medicamentosAtuais", e.target.value)}
                    placeholder="Liste os medicamentos atuais e dosagens"
                    className="border-input focus:border-primary"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Observações */}
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Observações Adicionais</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.observacoes}
                  onChange={(e) => handleInputChange("observacoes", e.target.value)}
                  placeholder="Informações adicionais, expectativas, experiências anteriores com terapia..."
                  className="min-h-[120px] border-input focus:border-primary"
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preferências de Horário */}
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Preferências de Horário</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {horariosDisponiveis.map((horario) => (
                    <div key={horario} className="flex items-center space-x-2">
                      <Checkbox
                        id={horario}
                        checked={formData.preferenciasHorario.includes(horario)}
                        onCheckedChange={() => handleScheduleToggle(horario)}
                      />
                      <Label htmlFor={horario} className="text-sm text-foreground">
                        {horario}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contato de Emergência */}
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Contato de Emergência
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3">
                <div>
                  <Label className="text-foreground text-sm">Nome</Label>
                  <Input
                    value={formData.contatoEmergencia.nome}
                    onChange={(e) => handleContactChange("nome", e.target.value)}
                    className="border-input focus:border-primary"
                  />
                </div>
                <div>
                  <Label className="text-foreground text-sm">Telefone</Label>
                  <Input
                    value={formData.contatoEmergencia.telefone}
                    onChange={(e) => handleContactChange("telefone", e.target.value)}
                    className="border-input focus:border-primary"
                  />
                </div>
                <div>
                  <Label className="text-foreground text-sm">Parentesco</Label>
                  <Input
                    value={formData.contatoEmergencia.parentesco}
                    onChange={(e) => handleContactChange("parentesco", e.target.value)}
                    className="border-input focus:border-primary"
                    placeholder="Ex: Mãe, Irmão, Cônjuge"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Preferências de Consulta */}
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Preferências de Consulta</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.preferenciasConsulta}
                  onChange={(e) => handleInputChange("preferenciasConsulta", e.target.value)}
                  placeholder="Modalidade preferida, ambiente, observações especiais..."
                  className="border-input focus:border-primary"
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Actions */}
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center sm:justify-end gap-2 sm:gap-4">
              <Button type="button" variant="outline" onClick={resetForm} className="w-full sm:w-auto">
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90 w-full sm:w-auto" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Cadastrando...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Cadastrar Paciente
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
