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
import { showErrorMessage, showInfoMessage } from "../../util/messages"

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")


  //solicitar recuperação de senha
  async function solicitarAcesso(email: string) {
  try {
    // Verificar se o e-mail não está vazio
    if (!email) {
      alert("Por favor, forneça um e-mail válido.");
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
    return <SuccessPage email={email} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary/5">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-gray-600 hover:text-gray-800 transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary rounded-xl">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-black">TiviAi</h1>
                <p className="text-sm text-gray-600">Recuperação de Senha</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Key className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-black mb-4">Recuperar Senha</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Informe seu email de acesso ao Tiviai, e enviaremos as instruções para recuperar sua senha no seu email de contato.
          </p>
        </div>

        <Card className="shadow-lg">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Info Alert */}
              <Alert>
                <Mail className="h-4 w-4" />
                <AlertDescription>
                  <strong>Email de Contato:</strong> Informe o seu email de acesso ao TiviAi.
                   As instruções de recuperação serão enviadas para o email de contato informado no seu cadastro.
                </AlertDescription>
              </Alert>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email TiviAI
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu.email@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl transition-all duration-200"
                    disabled={isSubmitting}
                    required
                  />
                </div>
                <p className="text-sm text-gray-500">Este deve sero o seu email de acesso ao TiviAi</p>
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
                    <span>Enviar Instruções</span>
                  </div>
                )}
              </Button>
            </form>

            {/* Additional Info */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium text-black">Segurança</h4>
                    <p className="text-sm text-gray-600">
                     Os dados de acesso foram enviados para o email de contato informado no pré-cadastro.
                     Nunca compartilhe sua senha com ninguém.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium text-black">Tempo de Entrega</h4>
                    <p className="text-sm text-gray-600">
                      O email pode levar até 5 minutos para chegar. Verifique também sua caixa de spam.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium text-black">Email Correto</h4>
                    <p className="text-sm text-gray-600">
                      Certifique-se de usar o email de acesso na plataforma TiviAi, os dados serão enviados no seu 
                      email informado no cadastro plataforma.
                    </p>
                  </div>
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
            <span className="text-gray-300">|</span>
            <Link href="/pre-cadastro" className="text-primary hover:text-primary/80 font-medium transition-colors">
              Fazer Pré-cadastro
            </Link>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              Problemas para recuperar sua senha?{" "}
              <a href="mailto:admin@tiviai.com.br" className="text-primary hover:text-primary/80 font-medium">
                Entre em contato conosco
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-400">
          <p>© 2025 TiviAI. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  )
}

function SuccessPage({ email }: { email: string }) {
  const [isResending, setIsResending] = useState(false)

  const handleResend = async () => {
    setIsResending(true)
    try {
      // Simular reenvio
      await new Promise((resolve) => setTimeout(resolve, 1500))
      // Aqui você implementaria o reenvio real
      console.log("Reenviando para:", email)
    } catch (error) {
      console.error("Erro no reenvio:", error)
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary/5">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-gray-600 hover:text-gray-800 transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary rounded-xl">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-black">TiviAi</h1>
                <p className="text-sm text-gray-600">Recuperação de Senha</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="shadow-lg">
          <CardContent className="p-12 text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-black mb-4">Email Enviado com Sucesso!</h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                Enviamos as instruções de recuperação de senha para o email:
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mt-4 mb-6">
                <p className="font-semibold text-primary text-lg">{email}</p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-blue-900 mb-3">Próximos Passos:</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                    1
                  </div>
                  <p className="text-blue-800">Verifique sua caixa de entrada (e spam) no email informado</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                    2
                  </div>
                  <p className="text-blue-800">Clique no link de recuperação recebido por email</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                    3
                  </div>
                  <p className="text-blue-800">Defina sua nova senha seguindo as instruções</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                    4
                  </div>
                  <p className="text-blue-800">Faça login com sua nova senha</p>
                </div>
              </div>
            </div>

            {/* Important Alerts */}
            <div className="space-y-4 mb-8">
              <Alert>
                <Clock className="h-4 w-4" />
                <AlertDescription>
                  <strong>Atenção:</strong> O link de recuperação expira em 1 hora por motivos de segurança.
                </AlertDescription>
              </Alert>

              <Alert>
                <Mail className="h-4 w-4" />
                <AlertDescription>
                  <strong>Não recebeu o email?</strong> Verifique sua caixa de spam ou lixo eletrônico. Emails podem
                  levar até 5 minutos para chegar.
                </AlertDescription>
              </Alert>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={handleResend} disabled={isResending} variant="outline" className="min-w-[160px]">
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
                  <Link href="/login">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar ao Login
                  </Link>
                </Button>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-600">
                  Ainda com problemas?{" "}
                  <a href="mailto:suporte@dating.com" className="text-primary hover:text-primary/80 font-medium">
                    Entre em contato com nosso suporte
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
