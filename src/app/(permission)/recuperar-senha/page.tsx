"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Brain, Mail, ArrowLeft, CheckCircle, AlertCircle, Shield, Clock, Key, Send } from "lucide-react"
import Link from "next/link"
import { showErrorMessage, showInfoMessage, showSuccessMessage } from "../../util/messages"
import { ThemeToggle } from "@/components/theme-toggle"
import Image  from "next/image"
import logo from "../../../../public/marca/logo.png"

//função que faz a solicitação de recuparação
export const solicitarAcesso =async (email: string)=> {
  try {
    // Verificar se o e-mail não está vazio
    if (!email) {
      showErrorMessage("Por favor, forneça um e-mail válido.");
      return;
    }

    // Fazer a requisição para a rota de recuperação de senha
    const response = await fetch('/api/recupera-senha', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    // Verificar se a resposta foi bem-sucedida
    if (response.ok) {
      // Sucesso: exibir uma mensagem ao usuário
      showInfoMessage('Se o e-mail for válido, você receberá uma nova senha em breve.');
    } else {
      // Se o email não for encontrado, nada será mostrado
      // Então não informamos nada ao usuário (comportamento esperado)
    }
  } catch (error) {

    showErrorMessage("Ocorreu um erro ao tentar recuperar sua senha. Tente novamente mais tarde.");
  }
}



//page de reucperação de senha
export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")


/*   export const solicitarAcesso =async (email: string)=> {
    try {
      // Verificar se o e-mail não está vazio
      if (!email) {
        showErrorMessage("Por favor, forneça um e-mail válido.");
        return;
      }

      // Fazer a requisição para a rota de recuperação de senha
      const response = await fetch('/api/recupera-senha', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      // Verificar se a resposta foi bem-sucedida
      if (response.ok) {
        // Sucesso: exibir uma mensagem ao usuário
        showInfoMessage('Se o e-mail for válido, você receberá uma nova senha em breve.');
      } else {
        // Se o email não for encontrado, nada será mostrado
        // Então não informamos nada ao usuário (comportamento esperado)
      }
    } catch (error) {

      showErrorMessage("Ocorreu um erro ao tentar recuperar sua senha. Tente novamente mais tarde.");
    }
  } */

  // Validação de email
  const validarEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email) {
      setError("Por favor, informe seu email de contato.")
      return
    }

    if (!validarEmail(email)) {
      setError("Por favor, informe um email válido.")
      return
    }

    setIsSubmitting(true)
    try {
      // Simular verificação do email e envio
      await new Promise((resolve) => setTimeout(resolve, 2000))
      await solicitarAcesso(email)
      setIsSuccess(true)
    } catch (err) {
      setError("Erro interno. Tente novamente em alguns minutos.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
   
    return (
    <>
    <SuccessPage email={email} />
    </>
  )
  }

  return (
    <>
    
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary/5 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-300">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl">
                <Image
                src={logo}
                className="w-9 h-9 text-white"
                alt='logomarca tiviai'
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">TiviAi</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Recuperação de Senha</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Recuperar Senha</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            Informe o seu email para recuperação de acesso a TiviAi
          </p>
        </div>

        <Card className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 transition-colors">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <Alert variant="destructive" className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-700">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Info Alert */}
              <Alert className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
                <Mail className="h-4 w-4" />
                <AlertDescription>
                  <strong>Email de Contato:</strong> Informe o email de recuperação de senha, esse email foi o mesmo utilizado quando você fez o pré cadastro
                </AlertDescription>
              </Alert>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-medium">
                  Email TiviAI
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu.email@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl transition-all duration-200"
                    disabled={isSubmitting}
                    required
                  />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Enviaremos sua nova senha de acesso para esse e-mail</p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 h-12 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    Enviando...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" />
                    <span>Recuperar</span>
                  </div>
                )}
              </Button>
            </form>

            {/* Additional Info */}
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary mt-0.5" />  
                </div>

              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support Links */}
        <div className="mt-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-4 text-sm">
            <Link
              href="/login"
              className="text-primary hover:text-primary/80 font-medium transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao Login
            </Link>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <Link href="/pre-cadastro" className="text-primary hover:text-primary/80 font-medium transition-colors">
              Fazer Pré-cadastro
            </Link>
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Problemas para recuperar sua senha?{" "}
              <a href="mailto:admin@tiviai.com.br" className="text-primary hover:text-primary/80 font-medium">
                Entre em contato conosco
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-400 dark:text-gray-500">
          <p>© 2025 TiviAI. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
    </>


  )
}


//page de sucesso na recuperação
function SuccessPage({ email }: { email: string }) {
  const [isResending, setIsResending] = useState(false)

  const handleResend = async () => {
    setIsResending(true)
    try {
      // Simular reenvio
       await solicitarAcesso(email)
      // Aqui você implementaria o reenvio real
      showSuccessMessage("Email de recuperação reenviado com sucesso!")
    } catch (error) {
   showErrorMessage(`Ocorreu um erro ao reenviar o email de recuperação: ${error}`)
    } finally {
      setIsResending(false)
    }
  }

  return (
    <>
    
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary/5 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">

      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-300">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary rounded-xl">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">TiviAi</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Recuperação de Senha</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <CardContent className="p-12 text-center">

            {/* Success Icon & Message */}
            <div className="mb-8">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Email Enviado com Sucesso!
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                Enviamos as instruções de recuperação de senha para o email:
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mt-4 mb-6 border border-gray-200 dark:border-gray-700">
                <p className="font-semibold text-primary text-lg break-all">{email}</p>
              </div>
            </div>

         

            {/* Important Alerts */}
            <div className="space-y-4 mb-8">
              
              <Alert className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                <Mail className="h-4 w-4" />
                <AlertDescription>
                  <strong className="font-semibold">Não recebeu o email?</strong> Verifique sua caixa de spam ou lixo eletrônico. Emails podem levar até 5 minutos para chegar.
                </AlertDescription>
              </Alert>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleResend}
                  disabled={isResending}
                  variant="outline"
                  className="min-w-[160px] border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {isResending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2"></div>
                      Reenviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Reenviar Email
                    </>
                  )}
                </Button>

                <Button asChild className="bg-primary hover:bg-primary/90 min-w-[160px]">
                  <Link href="/login" className="flex items-center justify-center">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar ao Login
                  </Link>
                </Button>
              </div>

              <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Ainda com problemas?{" "}
                  <a
                    href="mailto:suporte@dating.com"
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    Entre em contato com nosso suporte
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </>

  )
}
