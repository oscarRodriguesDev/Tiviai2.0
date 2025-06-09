"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Camera, Edit3, Save, X, MapPin, Calendar, Phone, Mail, GraduationCap, Award } from "lucide-react"

interface UserProfile {
  nome: string
  email: string
  telefone: string
  crp: string
  especialidades: string[]
  biografia: string
  experiencia: string
  formacao: string
  endereco: string
  dataNascimento: string
  fotoPerfil: string
  banner: string
}

export default function PerfilPsicologo() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<UserProfile>({
    nome: "Dr. Maria Silva",
    email: "maria.silva@email.com",
    telefone: "(11) 99999-9999",
    crp: "CRP 06/123456",
    especialidades: ["Terapia Cognitivo-Comportamental", "Ansiedade", "Depressão"],
    biografia:
      "Psicóloga clínica com mais de 10 anos de experiência em atendimento online e presencial. Especializada em terapia cognitivo-comportamental e tratamento de transtornos de ansiedade.",
    experiencia: "10 anos",
    formacao: "Psicologia - USP, Especialização em TCC - PUC-SP",
    endereco: "São Paulo, SP",
    dataNascimento: "1985-03-15",
    fotoPerfil: "/placeholder.svg?height=150&width=150",
    banner: "/placeholder.svg?height=200&width=800",
  })

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    setIsEditing(false)
    // Aqui você implementaria a lógica para salvar no backend
    console.log("Perfil salvo:", profile)
  }

  const handleImageUpload = (type: "fotoPerfil" | "banner") => {
    // Implementar lógica de upload de imagem
    console.log(`Upload de ${type}`)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Banner Section */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-primary to-primary/80 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${profile.banner})` }} />
        <div className="absolute inset-0 bg-black/20" />

        {/* Banner Upload Button */}
        <Button
          variant="secondary"
          size="sm"
          className="absolute top-4 right-4 bg-white/90 hover:bg-white text-black"
          onClick={() => handleImageUpload("banner")}
        >
          <Camera className="w-4 h-4 mr-2" />
          Alterar Banner
        </Button>

        {/* Profile Picture */}
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
            {/* Header with Edit Button */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-black">{profile.nome}</h1>
                <p className="text-gray-600 flex items-center gap-2 mt-1">
                  <Award className="w-4 h-4" />
                  {profile.crp}
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

            {/* Especialidades */}
            <div className="flex flex-wrap gap-2">
              {profile.especialidades.map((esp, index) => (
                <Badge key={index} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  {esp}
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
                    <Label htmlFor="crp" className="text-black">
                      CRP
                    </Label>
                    {isEditing ? (
                      <Input
                        id="crp"
                        value={profile.crp}
                        onChange={(e) => handleInputChange("crp", e.target.value)}
                        className="border-gray-300 focus:border-primary"
                      />
                    ) : (
                      <p className="text-gray-700 mt-1">{profile.crp}</p>
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
                </div>
              </CardContent>
            </Card>

            {/* Biografia */}
            <Card>
              <CardHeader>
                <CardTitle className="text-black">Sobre Mim</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={profile.biografia}
                    onChange={(e) => handleInputChange("biografia", e.target.value)}
                    placeholder="Conte um pouco sobre sua experiência e abordagem terapêutica..."
                    className="min-h-[120px] border-gray-300 focus:border-primary"
                  />
                ) : (
                  <p className="text-gray-700 leading-relaxed">{profile.biografia}</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Professional Info */}
          <div className="lg:w-80 space-y-6">
            {/* Formação */}
            <Card>
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Formação
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={profile.formacao}
                    onChange={(e) => handleInputChange("formacao", e.target.value)}
                    placeholder="Sua formação acadêmica..."
                    className="border-gray-300 focus:border-primary"
                  />
                ) : (
                  <p className="text-gray-700">{profile.formacao}</p>
                )}
              </CardContent>
            </Card>

            {/* Experiência */}
            <Card>
              <CardHeader>
                <CardTitle className="text-black">Experiência</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Input
                    value={profile.experiencia}
                    onChange={(e) => handleInputChange("experiencia", e.target.value)}
                    placeholder="Ex: 10 anos"
                    className="border-gray-300 focus:border-primary"
                  />
                ) : (
                  <p className="text-gray-700">{profile.experiencia}</p>
                )}
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
