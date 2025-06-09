"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Camera,
  Edit3,
  Save,
  X,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Heart,
  Clock,
  Target,
  AlertTriangle,
} from "lucide-react"

interface PatientProfile {
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
  fotoPerfil: string
  banner: string
}

export default function PerfilPaciente() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<PatientProfile>({
    nome: "Ana Costa",
    email: "ana.costa@email.com",
    telefone: "(11) 98888-8888",
    dataNascimento: "1990-07-20",
    endereco: "São Paulo, SP",
    profissao: "Designer Gráfica",
    estadoCivil: "Solteira",
    objetivosTerapeuticos: ["Ansiedade", "Autoestima", "Relacionamentos"],
    preferenciasHorario: ["Manhã", "Tarde"],
    historicoMedico: "Histórico de ansiedade. Sem outras condições médicas relevantes.",
    medicamentosAtuais: "Nenhum medicamento em uso atualmente",
    contatoEmergencia: {
      nome: "Carlos Costa",
      telefone: "(11) 97777-7777",
      parentesco: "Irmão",
    },
    preferenciasConsulta: "Prefere consultas por videoconferência, ambiente calmo",
    observacoes:
      "Primeira experiência com terapia online. Busca desenvolver técnicas para lidar com ansiedade no trabalho.",
    fotoPerfil: "/placeholder.svg?height=150&width=150",
    banner: "/placeholder.svg?height=200&width=800",
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
  ]

  const horariosDisponiveis = ["Manhã (08:00-12:00)", "Tarde (12:00-18:00)", "Noite (18:00-22:00)"]

  const handleInputChange = (field: keyof PatientProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const handleContactChange = (field: keyof PatientProfile["contatoEmergencia"], value: string) => {
    setProfile((prev) => ({
      ...prev,
      contatoEmergencia: { ...prev.contatoEmergencia, [field]: value },
    }))
  }

  const handleObjectiveToggle = (objetivo: string) => {
    setProfile((prev) => ({
      ...prev,
      objetivosTerapeuticos: prev.objetivosTerapeuticos.includes(objetivo)
        ? prev.objetivosTerapeuticos.filter((o) => o !== objetivo)
        : [...prev.objetivosTerapeuticos, objetivo],
    }))
  }

  const handleScheduleToggle = (horario: string) => {
    setProfile((prev) => ({
      ...prev,
      preferenciasHorario: prev.preferenciasHorario.includes(horario)
        ? prev.preferenciasHorario.filter((h) => h !== horario)
        : [...prev.preferenciasHorario, horario],
    }))
  }

  const handleSave = () => {
    setIsEditing(false)
    console.log("Perfil do paciente salvo:", profile)
  }

  const handleImageUpload = (type: "fotoPerfil" | "banner") => {
    console.log(`Upload de ${type}`)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Banner Section */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-primary to-primary/80 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${profile.banner})` }} />
        <div className="absolute inset-0 bg-black/20" />

        <Button
          variant="secondary"
          size="sm"
          className="absolute top-4 right-4 bg-white/90 hover:bg-white text-black"
          onClick={() => handleImageUpload("banner")}
        >
          <Camera className="w-4 h-4 mr-2" />
          Alterar Banner
        </Button>

        <div className="absolute -bottom-16 left-6 md:left-8">
          <div className="relative">
            <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
              <AvatarImage src={profile.fotoPerfil || "/placeholder.svg"} alt={profile.nome} />
              <AvatarFallback className="text-2xl bg-primary text-white">
                {profile.nome
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <Button
              size="sm"
              className="absolute -bottom-2 -right-2 rounded-full w-10 h-10 p-0 bg-primary hover:bg-primary/90"
              onClick={() => handleImageUpload("fotoPerfil")}
            >
              <Camera className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pt-20 pb-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Main Info */}
          <div className="flex-1 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-black">{profile.nome}</h1>
                <p className="text-gray-600 flex items-center gap-2 mt-1">
                  <Heart className="w-4 h-4" />
                  Paciente
                </p>
              </div>
              <Button
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                {isEditing ? (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Salvar
                  </>
                ) : (
                  <>
                    <Edit3 className="w-4 h-4 mr-2" />
                    Editar Perfil
                  </>
                )}
              </Button>
            </div>

            {/* Objetivos Terapêuticos */}
            <div className="flex flex-wrap gap-2">
              {profile.objetivosTerapeuticos.map((objetivo, index) => (
                <Badge key={index} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  <Target className="w-3 h-3 mr-1" />
                  {objetivo}
                </Badge>
              ))}
            </div>

            {/* Informações Pessoais */}
            <Card>
              <CardHeader>
                <CardTitle className="text-black">Informações Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nome" className="text-black">
                      Nome Completo
                    </Label>
                    {isEditing ? (
                      <Input
                        id="nome"
                        value={profile.nome}
                        onChange={(e) => handleInputChange("nome", e.target.value)}
                        className="border-gray-300 focus:border-primary"
                      />
                    ) : (
                      <p className="text-gray-700 mt-1">{profile.nome}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="profissao" className="text-black">
                      Profissão
                    </Label>
                    {isEditing ? (
                      <Input
                        id="profissao"
                        value={profile.profissao}
                        onChange={(e) => handleInputChange("profissao", e.target.value)}
                        className="border-gray-300 focus:border-primary"
                      />
                    ) : (
                      <p className="text-gray-700 mt-1">{profile.profissao}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-black flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="border-gray-300 focus:border-primary"
                      />
                    ) : (
                      <p className="text-gray-700 mt-1">{profile.email}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="telefone" className="text-black flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Telefone
                    </Label>
                    {isEditing ? (
                      <Input
                        id="telefone"
                        value={profile.telefone}
                        onChange={(e) => handleInputChange("telefone", e.target.value)}
                        className="border-gray-300 focus:border-primary"
                      />
                    ) : (
                      <p className="text-gray-700 mt-1">{profile.telefone}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="endereco" className="text-black flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Localização
                    </Label>
                    {isEditing ? (
                      <Input
                        id="endereco"
                        value={profile.endereco}
                        onChange={(e) => handleInputChange("endereco", e.target.value)}
                        className="border-gray-300 focus:border-primary"
                      />
                    ) : (
                      <p className="text-gray-700 mt-1">{profile.endereco}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="dataNascimento" className="text-black flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Data de Nascimento
                    </Label>
                    {isEditing ? (
                      <Input
                        id="dataNascimento"
                        type="date"
                        value={profile.dataNascimento}
                        onChange={(e) => handleInputChange("dataNascimento", e.target.value)}
                        className="border-gray-300 focus:border-primary"
                      />
                    ) : (
                      <p className="text-gray-700 mt-1">
                        {new Date(profile.dataNascimento).toLocaleDateString("pt-BR")}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="estadoCivil" className="text-black">
                      Estado Civil
                    </Label>
                    {isEditing ? (
                      <Select
                        value={profile.estadoCivil}
                        onValueChange={(value) => handleInputChange("estadoCivil", value)}
                      >
                        <SelectTrigger className="border-gray-300 focus:border-primary">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Solteiro(a)">Solteiro(a)</SelectItem>
                          <SelectItem value="Casado(a)">Casado(a)</SelectItem>
                          <SelectItem value="Divorciado(a)">Divorciado(a)</SelectItem>
                          <SelectItem value="Viúvo(a)">Viúvo(a)</SelectItem>
                          <SelectItem value="União Estável">União Estável</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="text-gray-700 mt-1">{profile.estadoCivil}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Objetivos Terapêuticos */}
            <Card>
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Objetivos Terapêuticos
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {objetivosDisponiveis.map((objetivo) => (
                      <div key={objetivo} className="flex items-center space-x-2">
                        <Checkbox
                          id={objetivo}
                          checked={profile.objetivosTerapeuticos.includes(objetivo)}
                          onCheckedChange={() => handleObjectiveToggle(objetivo)}
                        />
                        <Label htmlFor={objetivo} className="text-sm text-gray-700">
                          {objetivo}
                        </Label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profile.objetivosTerapeuticos.map((objetivo, index) => (
                      <Badge key={index} variant="outline" className="border-primary/30 text-primary">
                        {objetivo}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Observações */}
            <Card>
              <CardHeader>
                <CardTitle className="text-black">Observações e Expectativas</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={profile.observacoes}
                    onChange={(e) => handleInputChange("observacoes", e.target.value)}
                    placeholder="Conte sobre suas expectativas, experiências anteriores com terapia, ou qualquer informação que considere relevante..."
                    className="min-h-[120px] border-gray-300 focus:border-primary"
                  />
                ) : (
                  <p className="text-gray-700 leading-relaxed">{profile.observacoes}</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Medical & Preferences */}
          <div className="lg:w-80 space-y-6">
            {/* Preferências de Horário */}
            <Card>
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Preferências de Horário
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="space-y-3">
                    {horariosDisponiveis.map((horario) => (
                      <div key={horario} className="flex items-center space-x-2">
                        <Checkbox
                          id={horario}
                          checked={profile.preferenciasHorario.includes(horario)}
                          onCheckedChange={() => handleScheduleToggle(horario)}
                        />
                        <Label htmlFor={horario} className="text-sm text-gray-700">
                          {horario}
                        </Label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {profile.preferenciasHorario.map((horario, index) => (
                      <Badge key={index} variant="secondary" className="block w-fit">
                        {horario}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Histórico Médico */}
            <Card>
              <CardHeader>
                <CardTitle className="text-black">Histórico Médico</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={profile.historicoMedico}
                    onChange={(e) => handleInputChange("historicoMedico", e.target.value)}
                    placeholder="Histórico médico relevante..."
                    className="border-gray-300 focus:border-primary"
                  />
                ) : (
                  <p className="text-gray-700 text-sm">{profile.historicoMedico}</p>
                )}
              </CardContent>
            </Card>

            {/* Medicamentos */}
            <Card>
              <CardHeader>
                <CardTitle className="text-black">Medicamentos Atuais</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={profile.medicamentosAtuais}
                    onChange={(e) => handleInputChange("medicamentosAtuais", e.target.value)}
                    placeholder="Medicamentos em uso..."
                    className="border-gray-300 focus:border-primary"
                  />
                ) : (
                  <p className="text-gray-700 text-sm">{profile.medicamentosAtuais}</p>
                )}
              </CardContent>
            </Card>

            {/* Contato de Emergência */}
            <Card>
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Contato de Emergência
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-black text-sm">Nome</Label>
                  {isEditing ? (
                    <Input
                      value={profile.contatoEmergencia.nome}
                      onChange={(e) => handleContactChange("nome", e.target.value)}
                      className="border-gray-300 focus:border-primary"
                    />
                  ) : (
                    <p className="text-gray-700 text-sm">{profile.contatoEmergencia.nome}</p>
                  )}
                </div>
                <div>
                  <Label className="text-black text-sm">Telefone</Label>
                  {isEditing ? (
                    <Input
                      value={profile.contatoEmergencia.telefone}
                      onChange={(e) => handleContactChange("telefone", e.target.value)}
                      className="border-gray-300 focus:border-primary"
                    />
                  ) : (
                    <p className="text-gray-700 text-sm">{profile.contatoEmergencia.telefone}</p>
                  )}
                </div>
                <div>
                  <Label className="text-black text-sm">Parentesco</Label>
                  {isEditing ? (
                    <Input
                      value={profile.contatoEmergencia.parentesco}
                      onChange={(e) => handleContactChange("parentesco", e.target.value)}
                      className="border-gray-300 focus:border-primary"
                    />
                  ) : (
                    <p className="text-gray-700 text-sm">{profile.contatoEmergencia.parentesco}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Ações */}
            {isEditing && (
              <Card className="border-red-200">
                <CardContent className="pt-6">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    className="w-full border-red-300 text-red-600 hover:bg-red-50"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancelar Alterações
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
