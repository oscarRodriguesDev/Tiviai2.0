"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { ThemeToggle } from "@/components/theme-toggle"
import { CheckCircle2, AlertCircle, ArrowLeft, Upload } from "lucide-react"

export default function PreCadastroPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    crp: "",
    especialidade: "",
    abordagem: "",
    formacao: "",
    experiencia: "",
    motivacao: "",
    documentos: [] as File[],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      setFormData((prev) => ({ ...prev, documentos: [...prev.documentos, ...filesArray] }))
    }
  }

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      documentos: prev.documentos.filter((_, i) => i !== index),
    }))
  }

  const nextStep = () => {
    if (step === 1) {
      if (!formData.nome || !formData.email || !formData.telefone || !formData.cpf) {
        setError("Por favor, preencha todos os campos obrigatórios.")
        return
      }
    } else if (step === 2) {
      if (!formData.crp || !formData.especialidade || !formData.abordagem) {
        setError("Por favor, preencha todos os campos obrigatórios.")
        return
      }
    }

    setError(null)
    setStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Simulação de envio para API
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Aqui seria a chamada real para a API
      // const response = await fetch('/api/pre-cadastro', {
      //   method: 'POST',
      //   body: JSON.stringify(formData)
      // });

      // if (!response.ok) throw new Error('Erro ao enviar pré-cadastro');

      setSuccess(true)
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    } catch (err) {
      setError("Ocorreu um erro ao enviar seu pré-cadastro. Por favor, tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const getProgressValue = () => {
    if (step === 1) return 25
    if (step === 2) return 50
    if (step === 3) return 75
    if (step === 4) return 100
    return 0
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => router.push("/login")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-foreground">Pré-cadastro de Psicólogo</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {!success ? (
            <Card className="border-border bg-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl text-foreground">Pré-cadastro Profissional</CardTitle>
                    <CardDescription className="text-muted-foreground mt-1">
                      Preencha os dados para solicitar seu cadastro na plataforma
                    </CardDescription>
                  </div>
                  <div className="w-32">
                    <Progress value={getProgressValue()} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1 text-right">Etapa {step} de 4</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit}>
                  {error && (
                    <Alert variant="destructive" className="mb-6">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {step === 1 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome completo *</Label>
                        <Input
                          id="nome"
                          name="nome"
                          value={formData.nome}
                          onChange={handleChange}
                          placeholder="Digite seu nome completo"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="seu.email@exemplo.com"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="telefone">Telefone *</Label>
                          <Input
                            id="telefone"
                            name="telefone"
                            value={formData.telefone}
                            onChange={handleChange}
                            placeholder="(00) 00000-0000"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cpf">CPF *</Label>
                          <Input
                            id="cpf"
                            name="cpf"
                            value={formData.cpf}
                            onChange={handleChange}
                            placeholder="000.000.000-00"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="crp">Número do CRP *</Label>
                        <Input
                          id="crp"
                          name="crp"
                          value={formData.crp}
                          onChange={handleChange}
                          placeholder="00/00000"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="especialidade">Especialidade principal *</Label>
                        <Select
                          value={formData.especialidade}
                          onValueChange={(value) => handleSelectChange("especialidade", value)}
                        >
                          <SelectTrigger id="especialidade">
                            <SelectValue placeholder="Selecione sua especialidade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="clinica">Psicologia Clínica</SelectItem>
                            <SelectItem value="saude">Psicologia da Saúde</SelectItem>
                            <SelectItem value="organizacional">Psicologia Organizacional</SelectItem>
                            <SelectItem value="escolar">Psicologia Escolar/Educacional</SelectItem>
                            <SelectItem value="social">Psicologia Social</SelectItem>
                            <SelectItem value="esporte">Psicologia do Esporte</SelectItem>
                            <SelectItem value="juridica">Psicologia Jurídica</SelectItem>
                            <SelectItem value="neuropsicologia">Neuropsicologia</SelectItem>
                            <SelectItem value="hospitalar">Psicologia Hospitalar</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="abordagem">Abordagem terapêutica *</Label>
                        <Select
                          value={formData.abordagem}
                          onValueChange={(value) => handleSelectChange("abordagem", value)}
                        >
                          <SelectTrigger id="abordagem">
                            <SelectValue placeholder="Selecione sua abordagem" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tcc">Terapia Cognitivo-Comportamental</SelectItem>
                            <SelectItem value="psicanalise">Psicanálise</SelectItem>
                            <SelectItem value="humanista">Humanista</SelectItem>
                            <SelectItem value="gestalt">Gestalt</SelectItem>
                            <SelectItem value="sistemica">Sistêmica</SelectItem>
                            <SelectItem value="comportamental">Análise do Comportamento</SelectItem>
                            <SelectItem value="integrativa">Integrativa</SelectItem>
                            <SelectItem value="existencial">Existencial</SelectItem>
                            <SelectItem value="esquema">Terapia do Esquema</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="formacao">Formação acadêmica *</Label>
                        <Textarea
                          id="formacao"
                          name="formacao"
                          value={formData.formacao}
                          onChange={handleChange}
                          placeholder="Descreva sua formação acadêmica, incluindo instituição, curso e ano de conclusão"
                          rows={3}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="experiencia">Experiência profissional</Label>
                        <Textarea
                          id="experiencia"
                          name="experiencia"
                          value={formData.experiencia}
                          onChange={handleChange}
                          placeholder="Descreva suas experiências profissionais relevantes"
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="motivacao">Motivação para ingressar na plataforma *</Label>
                        <Textarea
                          id="motivacao"
                          name="motivacao"
                          value={formData.motivacao}
                          onChange={handleChange}
                          placeholder="Conte-nos por que você deseja fazer parte da nossa plataforma"
                          rows={3}
                          required
                        />
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label>Documentos necessários *</Label>
                        <p className="text-sm text-muted-foreground">
                          Faça o upload dos documentos necessários para validação do seu cadastro
                        </p>

                        <div className="mt-3 space-y-4">
                          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                            <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                            <p className="text-sm font-medium mb-1">Arraste e solte seus arquivos aqui</p>
                            <p className="text-xs text-muted-foreground mb-3">Suportamos PDF, JPG e PNG até 5MB cada</p>
                            <div>
                              <Label
                                htmlFor="file-upload"
                                className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium"
                              >
                                Selecionar arquivos
                              </Label>
                              <Input
                                id="file-upload"
                                type="file"
                                multiple
                                onChange={handleFileChange}
                                className="hidden"
                                accept=".pdf,.jpg,.jpeg,.png"
                              />
                            </div>
                          </div>

                          {formData.documentos.length > 0 && (
                            <div className="space-y-2">
                              <Label>Arquivos selecionados ({formData.documentos.length})</Label>
                              <div className="space-y-2">
                                {formData.documentos.map((file, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center justify-between bg-muted p-2 rounded-md"
                                  >
                                    <div className="flex items-center">
                                      <div className="ml-2 text-sm">{file.name}</div>
                                    </div>
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeFile(index)}
                                      className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/30"
                                    >
                                      Remover
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="bg-muted p-4 rounded-lg">
                            <h4 className="font-medium text-sm mb-2">Documentos necessários:</h4>
                            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                              <li>Carteira de identidade profissional (CRP)</li>
                              <li>Diploma de graduação em Psicologia</li>
                              <li>Certificados de especialização (se houver)</li>
                              <li>Comprovante de residência</li>
                              <li>Foto de perfil profissional</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </CardContent>

              <CardFooter className="flex flex-col sm:flex-row gap-3 justify-between border-t border-border pt-6">
                {step > 1 ? (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Voltar
                  </Button>
                ) : (
                  <Button type="button" variant="outline" onClick={() => router.push("/login")}>
                    Cancelar
                  </Button>
                )}

                {step < 4 ? (
                  <Button type="button" onClick={nextStep}>
                    Próximo
                  </Button>
                ) : (
                  <Button type="button" onClick={handleSubmit} disabled={loading}>
                    {loading ? "Enviando..." : "Enviar pré-cadastro"}
                  </Button>
                )}
              </CardFooter>
            </Card>
          ) : (
            <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                  <CardTitle className="text-2xl text-green-800 dark:text-green-400">Pré-cadastro enviado!</CardTitle>
                </div>
                <CardDescription className="text-green-700 dark:text-green-300">
                  Seu pré-cadastro foi enviado com sucesso e está em análise.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-green-700 dark:text-green-300">
                <p>
                  Agradecemos seu interesse em fazer parte da nossa plataforma. Nossa equipe irá analisar suas
                  informações e entraremos em contato através do e-mail fornecido.
                </p>
                <p className="mt-2">
                  O processo de aprovação geralmente leva até 3 dias úteis. Você receberá um e-mail com as instruções
                  para acessar sua conta quando seu cadastro for aprovado.
                </p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => router.push("/login")}>Voltar para o login</Button>
              </CardFooter>
            </Card>
          )}

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Já possui uma conta?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-6">
        <div className="container mx-auto px-4">
          <p className="text-sm text-center text-muted-foreground">
            &copy; {new Date().getFullYear()} Plataforma de Psicologia. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
