"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Mail, Lock, Heart, Users, Shield, Star, CheckCircle, Clock, Award } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { signIn } from "next-auth/react"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { redirect } from "next/navigation"
import { showErrorMessage, showSuccessMessage } from "../../util/messages"

export default function LoginPage() {

  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const session = useSession()

const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  setIsLoading(true);
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // evita redirecionamento automático
    });

    if (result?.error) {
      showErrorMessage("Email ou senha inválidos. Tente novamente.");
      setPassword("");
      setEmail("");
    } else if (result?.ok) {
      showSuccessMessage(`Seja bem-vindo(a)!`);
      setEmail("");
      setPassword("");
      setIsLoading(false);
      redirect("/feed"); // redirecionamento manual
    }
  } catch (error) {
    console.error("Erro na página de login: ", error);
    setPassword("");
  } finally {
    setIsLoading(false);
  }
};


    useEffect(() => {
    if (session.status === 'unauthenticated') {
      return
    } else {
      redirect('/feed')
    }
  }, [session]);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-emerald-600/90 to-teal-600/90" />
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=600')] bg-cover bg-center opacity-10" />

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-20 h-20 bg-white/10 rounded-full animate-float-slow" />
        <div className="absolute top-40 right-32 w-16 h-16 bg-white/10 rounded-full animate-float-medium" />
        <div className="absolute bottom-40 left-16 w-12 h-12 bg-white/10 rounded-full animate-float-fast" />
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-full animate-float-slow" />

        <div className="relative z-10 flex flex-col justify-center px-12 py-16 text-white w-full">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Heart className="w-6 h-6 text-white animate-heartbeat" />
              </div>
              <h1 className="text-3xl font-bold">TiviAi</h1>
            </div>
            <h2 className="text-4xl font-bold mb-4 leading-tight">
              Conectando Mentes,
              <br />
              <span className="text-emerald-200">Transformando Vidas</span>
            </h2>
            <p className="text-xl text-emerald-100 leading-relaxed">
             A plataforma inteligente que transforma suas consultas em resultados.
            </p>
          </div>

          {/* Stats */}
        {/*   <div className="grid grid-cols-2 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-6 h-6 text-emerald-200" />
                <span className="text-2xl font-bold">2.5K+</span>
              </div>
              <p className="text-emerald-100">Psicólogos Ativos</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <Heart className="w-6 h-6 text-emerald-200" />
                <span className="text-2xl font-bold">15K+</span>
              </div>
              <p className="text-emerald-100">Vidas Transformadas</p>
            </div>
          </div>
 */}
          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-200" />
              <span className="text-emerald-100">Consultas 100% seguras e privadas</span>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-emerald-200" />
              <span className="text-emerald-100">Conformidade total com LGPD</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-emerald-200" />
              <span className="text-emerald-100">Disponível 24/7 para emergências</span>
            </div>
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-emerald-200" />
              <span className="text-emerald-100">Certificado pelo CFP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:w-1/2">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary animate-heartbeat" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">MindCare</h1>
          </div>

          <Card className="bg-primary/5 dark:bg-primary/10 border-primary/20 shadow-xl backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold text-center text-gray-900 dark:text-white">
                Bem-vindo de volta
              </CardTitle>
              <CardDescription className="text-center text-gray-600 dark:text-gray-300">
                Entre na sua conta para continuar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 dark:text-gray-200">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-white/50 dark:bg-gray-800/50 border-primary/30 focus:border-primary"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 dark:text-gray-200">
                    Senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 bg-white/50 dark:bg-gray-800/50 border-primary/30 focus:border-primary"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-primary/30" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Lembrar-me</span>
                  </label>
                  <a href="/recuperar-senha" className="text-sm text-primary hover:text-primary/80 font-medium">
                    Esqueceu a senha?
                  </a>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 transition-all duration-200 transform hover:scale-[1.02]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Entrando...
                    </div>
                  ) : (
                    "Entrar"
                  )}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full bg-primary/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
                    Novo por aqui?
                  </span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full border-primary/30 text-primary hover:bg-primary/10 font-medium py-3 transition-all duration-200"
                onClick={() => (window.location.href = "/pre-cadastro")}
              >
                Criar conta gratuita
              </Button>
            </CardContent>
          </Card>

          {/* Trust Indicators */}
          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Shield className="w-3 h-3" />
              <span>Seguro</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3" />
              <span>Confiável</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              <span>Certificado</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
