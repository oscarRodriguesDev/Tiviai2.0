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
import { showErrorMessage } from "../../util/messages"
import { validarCPF } from "../../util/validarCPF"

export default function PreCadastroPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cpf, setCPF] = useState<string>('')
  const [rg, setRG] = useState<string>('')
  const [nasc, setNasc] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [telefone, setTelefone] = useState<string>('')
  const [celular, setCelular] = useState<string>('')
  const [nome, setNome] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [crp, setCRP] = useState<string>('')
  const [cfp,setCFP] = useState<string>("")
  const [ddi, setDDI] = useState<string>('+55')
  const [ddi2, setDDI2] = useState<string>('+55')
  const [dados, setDados] = useState({})
  const [invalid, setInvalid] = useState<string>('')
  const [consentido,setConsentido] = useState<boolean>(false)
  const router = useRouter()


  
  
  const defIdade = (data: string) => Math.floor((new Date().getTime() - new Date(data).getTime()) / (365.25 * 24 * 60 * 60 * 1000));


  function clearInputs() {
    setCPF('')
    setInvalid('')
    setCFP('')
    setCRP('')
    setRG('')
    setNasc('')
    setEmail('')
    setTelefone('')
    setCelular('')
    setNome('')
    setLastName('')
    setConsentido(false)

}




function validacpf() {
  const cpf_format = (cpf: string) => cpf.replace(/[.-0-9]/g, '');
  // Exemplo de uso:
  setCPF(cpf_format)
  try {
      const cpfLimpo = validarCPF(invalid);
      setCPF(cpfLimpo)
      setInvalid(cpfLimpo)
  } catch (error) {
      if (error) {
          showErrorMessage('Cpf invalido!')
          setCPF('')
      }
  }
}

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      // Simulação de envio para API
      await new Promise((resolve) => setTimeout(resolve, 2000))
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

  return (
    <>
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

        <main className="flex-1 container mx-auto px-4 py-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {!success ? (
              <Card className="border-border bg-card">

                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {error && (
                      <Alert variant="destructive" className="mb-6">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    {/* DADOS PESSOAIS */}
                    <section className="space-y-4">
                      <h2 className="text-lg font-semibold">Dados Pessoais</h2>
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome*</Label>
                        <Input className="w-full border border-gray-600 rounded p-2" id="nome" name="nome" value = {nome} onChange={(e)=>setNome(e.target.value)}required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="Sobrenome">sobrenome*</Label>
                        <Input className="w-full border border-gray-600 rounded p-2" id="sobrenome" name="sobrenome" value={lastName} onChange={(e)=>setLastName(e.target.value)} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dataNasc">Data de Nascimento *</Label>
                        <Input type="date" className="w-full border border-gray-600 rounded p-2" value={nasc} onChange={(e) => setNasc(e.target.value)} onBlur={(e) => {
                                    const valor = e.target.value;
                                    const dataNascimento = new Date(valor);
                                    const hoje = new Date();
                                    const idade = hoje.getFullYear() - dataNascimento.getFullYear();
                                    const mes = hoje.getMonth() - dataNascimento.getMonth();
                                    const dia = hoje.getDate() - dataNascimento.getDate();
                                    const maiorDeIdade = idade > 18 || (idade === 18 && (mes > 0 || (mes === 0 && dia >= 0)));
                                    if (!maiorDeIdade) {
                                        showErrorMessage("Você precisa ser maior de 18 anos.");
                                        setNasc("");
                                    }
                                }} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail *</Label>
                        <Input type="email" className="w-full border border-gray-600 rounded p-2" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={(e) => {
                                    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                    if (!regex.test(e.target.value)) {
                                        showErrorMessage("Email inválido!");
                                        setEmail("");
                                    }
                                }} required />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div className="space-y-2">
                          <Label htmlFor="telefone">Telefone *</Label>
                          <Input className=" w-full border border-gray-600 rounded p-2" id="telefone" name="telefone" value={telefone} onChange={(e)=>setTelefone(e.target.value)} required />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="telefone2">Telefone contato *</Label>
                          <Input className=" w-full border border-gray-600 rounded p-2" id="telefone2" name="telefone2" value={celular} onChange={(e)=>setCelular(e.target.value)} required />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cpf">CPF *</Label>
                          <Input type="text" className="w-full border  border-gray-600 rounded p-2" onChange={(e) => setInvalid(e.target.value)} value={invalid} onBlur={validacpf} required />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cpf">RG *</Label>
                          <Input type="text" className=" w-full border  border-gray-600 rounded p-2" value={rg} onChange={(e) => setRG(e.target.value.replace(/[^\d.-]/g, ''))} required />
                        </div>
                      </div>
                    </section>

                    {/* INFO PROFISSIONAIS */}
                    <section className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="crp">Número do CRP *</Label>
                        <Input type="text" className=" w-full border  border-gray-600 rounded p-2" value={crp} onChange={(e) => {
                                    let valor = e.target.value.replace(/[^\d]/g, '');
                                    if (valor.length > 2) valor = valor.slice(0, 2) + '/' + valor.slice(2, 7);
                                    setCRP(valor); setCFP(valor);
                                }} required />
                      </div>


                    </section>

                    {/* BOTÃO SUBMIT */}
                    <div className="pt-6 w-a  border-t border-border flex flex-row justify-around">
                      <Button disabled={loading} className="w-[25%]">
                        {loading ? "Enviando..." : "Cancelar"}
                      </Button>
                      <Button type="submit" disabled={loading} className="w-[25%]">
                        {loading ? "Enviando..." : "Enviar pré-cadastro"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
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
                  <p>Agradecemos seu interesse em fazer parte da nossa plataforma. Nossa equipe irá analisar suas informações e entraremos em contato através do e-mail fornecido.</p>
                  <p className="mt-2">O processo de aprovação geralmente leva até 3 dias úteis. Você receberá um e-mail com as instruções para acessar sua conta quando seu cadastro for aprovado.</p>
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

    </>
  )
}
