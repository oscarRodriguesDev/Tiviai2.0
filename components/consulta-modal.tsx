"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, Check, Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Switch } from "@/components/ui/switch"

interface Paciente {
  id: string
  nome: string
  email: string
  telefone: string
  foto?: string
}

interface ConsultaModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  pacientes?: Paciente[]
  onAgendarConsulta: (dados: ConsultaFormData) => Promise<void>
}

export interface ConsultaFormData {
  pacienteId: string
  data: Date | undefined
  horario: string
  duracao: string
  tipo: string
  modalidade: string
  valor: string
  observacoes: string
  enviarLembrete: boolean
  linkPersonalizado?: string
}

export function ConsultaModal({ open, onOpenChange, pacientes = [], onAgendarConsulta }: ConsultaModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<ConsultaFormData>({
    pacienteId: "",
    data: undefined,
    horario: "",
    duracao: "60",
    tipo: "retorno",
    modalidade: "online",
    valor: "",
    observacoes: "",
    enviarLembrete: true,
    linkPersonalizado: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (field: keyof ConsultaFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Limpa o erro do campo quando o usuário começa a editar
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.pacienteId) {
      newErrors.pacienteId = "Selecione um paciente"
    }

    if (!formData.data) {
      newErrors.data = "Selecione uma data"
    }

    if (!formData.horario) {
      newErrors.horario = "Informe o horário"
    }

    if (
      formData.modalidade === "online" &&
      formData.linkPersonalizado &&
      !formData.linkPersonalizado.startsWith("https://")
    ) {
      newErrors.linkPersonalizado = "O link deve começar com https://"
    }

    if (formData.valor && isNaN(Number.parseFloat(formData.valor.replace(",", ".")))) {
      newErrors.valor = "Informe um valor válido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      await onAgendarConsulta(formData)
      toast({
        title: "Consulta agendada com sucesso!",
        description: `Consulta agendada para ${format(formData.data!, "PPP", { locale: ptBR })} às ${formData.horario}`,
      })
      onOpenChange(false)

      // Reset form
      setFormData({
        pacienteId: "",
        data: undefined,
        horario: "",
        duracao: "60",
        tipo: "retorno",
        modalidade: "online",
        valor: "",
        observacoes: "",
        enviarLembrete: true,
        linkPersonalizado: "",
      })
    } catch (error) {
      console.error("Erro ao agendar consulta:", error)
      toast({
        title: "Erro ao agendar consulta",
        description: "Ocorreu um erro ao tentar agendar a consulta. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Agendar Nova Consulta</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Paciente */}
          <div className="space-y-2">
            <Label htmlFor="paciente" className={cn(errors.pacienteId && "text-destructive")}>
              Paciente <span className="text-destructive">*</span>
            </Label>
            <Select value={formData.pacienteId} onValueChange={(value) => handleChange("pacienteId", value)}>
              <SelectTrigger className={cn(errors.pacienteId && "border-destructive")}>
                <SelectValue placeholder="Selecione o paciente" />
              </SelectTrigger>
              <SelectContent>
                {pacientes.length > 0 ? (
                  pacientes.map((paciente) => (
                    <SelectItem key={paciente.id} value={paciente.id}>
                      {paciente.nome}
                    </SelectItem>
                  ))
                ) : (
                  <>
                    <SelectItem value="1">Ana Costa Silva</SelectItem>
                    <SelectItem value="2">Carlos Mendes</SelectItem>
                    <SelectItem value="3">Mariana Santos</SelectItem>
                    <SelectItem value="4">João Oliveira</SelectItem>
                    <SelectItem value="5">Fernanda Lima</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
            {errors.pacienteId && <p className="text-xs text-destructive">{errors.pacienteId}</p>}
          </div>

          {/* Data e Horário */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className={cn(errors.data && "text-destructive")}>
                Data <span className="text-destructive">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.data && "text-muted-foreground",
                      errors.data && "border-destructive",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.data ? format(formData.data, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.data}
                    onSelect={(date) => handleChange("data", date)}
                    initialFocus
                    locale={ptBR}
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  />
                </PopoverContent>
              </Popover>
              {errors.data && <p className="text-xs text-destructive">{errors.data}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="horario" className={cn(errors.horario && "text-destructive")}>
                Horário <span className="text-destructive">*</span>
              </Label>
              <Input
                id="horario"
                type="time"
                value={formData.horario}
                onChange={(e) => handleChange("horario", e.target.value)}
                className={cn(errors.horario && "border-destructive")}
              />
              {errors.horario && <p className="text-xs text-destructive">{errors.horario}</p>}
            </div>
          </div>

          {/* Duração e Tipo */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duracao">Duração</Label>
              <Select value={formData.duracao} onValueChange={(value) => handleChange("duracao", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutos</SelectItem>
                  <SelectItem value="45">45 minutos</SelectItem>
                  <SelectItem value="60">60 minutos</SelectItem>
                  <SelectItem value="90">90 minutos</SelectItem>
                  <SelectItem value="120">120 minutos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo</Label>
              <Select value={formData.tipo} onValueChange={(value) => handleChange("tipo", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primeira-consulta">Primeira Consulta</SelectItem>
                  <SelectItem value="retorno">Retorno</SelectItem>
                  <SelectItem value="emergencia">Emergência</SelectItem>
                  <SelectItem value="avaliacao">Avaliação</SelectItem>
                  <SelectItem value="grupo">Terapia em Grupo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Modalidade e Valor */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="modalidade">Modalidade</Label>
              <Select value={formData.modalidade} onValueChange={(value) => handleChange("modalidade", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="presencial">Presencial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="valor" className={cn(errors.valor && "text-destructive")}>
                Valor (R$)
              </Label>
              <Input
                id="valor"
                placeholder="0,00"
                value={formData.valor}
                onChange={(e) => handleChange("valor", e.target.value)}
                className={cn(errors.valor && "border-destructive")}
              />
              {errors.valor && <p className="text-xs text-destructive">{errors.valor}</p>}
            </div>
          </div>

          {/* Link personalizado (apenas para consultas online) */}
          {formData.modalidade === "online" && (
            <div className="space-y-2">
              <Label htmlFor="linkPersonalizado" className={cn(errors.linkPersonalizado && "text-destructive")}>
                Link personalizado (opcional)
              </Label>
              <Input
                id="linkPersonalizado"
                placeholder="https://meet.google.com/..."
                value={formData.linkPersonalizado}
                onChange={(e) => handleChange("linkPersonalizado", e.target.value)}
                className={cn(errors.linkPersonalizado && "border-destructive")}
              />
              {errors.linkPersonalizado ? (
                <p className="text-xs text-destructive">{errors.linkPersonalizado}</p>
              ) : (
                <p className="text-xs text-muted-foreground">Deixe em branco para gerar um link automaticamente</p>
              )}
            </div>
          )}

          {/* Observações */}
          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              placeholder="Observações sobre a consulta..."
              value={formData.observacoes}
              onChange={(e) => handleChange("observacoes", e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          {/* Enviar lembrete */}
          <div className="flex items-center space-x-2">
            <Switch
              id="enviarLembrete"
              checked={formData.enviarLembrete}
              onCheckedChange={(checked) => handleChange("enviarLembrete", checked)}
            />
            <Label htmlFor="enviarLembrete">Enviar lembrete para o paciente</Label>
          </div>

          {/* Botões de ação */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button className="flex-1 bg-primary hover:bg-primary/90" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Agendando...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Agendar
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
