"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Wallet,
  Plus,
  CreditCard,
  History,
  Gift,
  Zap,
  CheckCircle,
  Clock,
  Calendar,
  TrendingUp,
  Star,
  Crown,
  Sparkles,
} from "lucide-react"

interface CreditTransaction {
  id: string
  type: "compra" | "uso" | "bonus" | "reembolso"
  description: string
  amount: number
  date: string
  status: "concluido" | "pendente" | "cancelado"
  paymentMethod?: string
}

interface CreditPackage {
  id: string
  name: string
  credits: number
  price: number
  bonus: number
  popular: boolean
  description: string
  features: string[]
}

export default function CreditosPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false)

  // Dados do usuário
  const userCredits = {
    current: 150,
    used: 45,
    purchased: 200,
    bonus: 25,
    expiring: 10, // créditos que expiram em breve
    expiryDate: "2024-03-15",
  }

  // Histórico de transações
  const transactions: CreditTransaction[] = [
    {
      id: "1",
      type: "uso",
      description: "Consulta - Ana Costa Silva",
      amount: -2,
      date: "2024-01-29",
      status: "concluido",
    },
    {
      id: "2",
      type: "uso",
      description: "Consulta - Carlos Mendes",
      amount: -2,
      date: "2024-01-29",
      status: "concluido",
    },
    {
      id: "3",
      type: "compra",
      description: "Pacote Premium - 100 créditos",
      amount: 100,
      date: "2024-01-25",
      status: "concluido",
      paymentMethod: "Cartão de Crédito",
    },
    {
      id: "4",
      type: "bonus",
      description: "Bônus de boas-vindas",
      amount: 25,
      date: "2024-01-20",
      status: "concluido",
    },
    {
      id: "5",
      type: "compra",
      description: "Pacote Básico - 50 créditos",
      amount: 50,
      date: "2024-01-15",
      status: "concluido",
      paymentMethod: "PIX",
    },
  ]

  // Pacotes de créditos disponíveis
  const creditPackages: CreditPackage[] = [
    {
      id: "basic",
      name: "Básico",
      credits: 25,
      price: 49.9,
      bonus: 0,
      popular: false,
      description: "Ideal para começar",
      features: ["25 créditos", "Válido por 6 meses", "Suporte básico"],
    },
    {
      id: "standard",
      name: "Padrão",
      credits: 50,
      price: 89.9,
      bonus: 5,
      popular: true,
      description: "Melhor custo-benefício",
      features: ["50 créditos", "+5 créditos bônus", "Válido por 6 meses", "Suporte prioritário"],
    },
    {
      id: "premium",
      name: "Premium",
      credits: 100,
      price: 159.9,
      bonus: 15,
      popular: false,
      description: "Para uso intensivo",
      features: ["100 créditos", "+15 créditos bônus", "Válido por 12 meses", "Suporte VIP", "Relatórios avançados"],
    },
    {
      id: "enterprise",
      name: "Empresarial",
      credits: 250,
      price: 349.9,
      bonus: 50,
      popular: false,
      description: "Para clínicas e grupos",
      features: [
        "250 créditos",
        "+50 créditos bônus",
        "Válido por 12 meses",
        "Suporte dedicado",
        "Relatórios personalizados",
        "API de integração",
      ],
    },
  ]

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "compra":
        return "text-green-600"
      case "bonus":
        return "text-blue-600"
      case "uso":
        return "text-red-600"
      case "reembolso":
        return "text-purple-600"
      default:
        return "text-gray-600"
    }
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "compra":
        return <Plus className="w-4 h-4" />
      case "bonus":
        return <Gift className="w-4 h-4" />
      case "uso":
        return <Zap className="w-4 h-4" />
      case "reembolso":
        return <TrendingUp className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "concluido":
        return "bg-green-100 text-green-800"
      case "pendente":
        return "bg-yellow-100 text-yellow-800"
      case "cancelado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const handlePurchase = async () => {
    if (!selectedPackage || !paymentMethod) return

    setIsLoading(true)
    try {
      // Simular processamento da compra
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setShowPurchaseDialog(false)
      setSelectedPackage(null)
      setPaymentMethod("")
      // Aqui você implementaria a lógica real de compra
    } catch (error) {
      console.error("Erro na compra:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="px-4 py-4 sm:px-6 sm:py-6 lg:px-8 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-black">Meus Créditos</h1>
        <p className="text-gray-600 mt-1 text-sm sm:text-base">Gerencie seus créditos e adquira novos pacotes</p>
      </div>

      {/* Credit Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Créditos Disponíveis</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">{userCredits.current}</p>
                <p className="text-xs text-gray-500 mt-1 hidden sm:block">
                  Suficiente para {Math.floor(userCredits.current / 2)} consultas
                </p>
              </div>
              <div className="p-2 sm:p-3 bg-primary/10 rounded-full flex-shrink-0">
                <Wallet className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Créditos Utilizados</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600">{userCredits.used}</p>
                <p className="text-xs text-gray-500 mt-1">Este mês</p>
              </div>
              <div className="p-2 sm:p-3 bg-blue-100 rounded-full flex-shrink-0">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Créditos Bônus</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600">{userCredits.bonus}</p>
                <p className="text-xs text-gray-500 mt-1 hidden sm:block">Ganhos em promoções</p>
              </div>
              <div className="p-2 sm:p-3 bg-green-100 rounded-full flex-shrink-0">
                <Gift className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Expirando em Breve</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-600">{userCredits.expiring}</p>
                <p className="text-xs text-gray-500 mt-1">Até {formatDate(userCredits.expiryDate)}</p>
              </div>
              <div className="p-2 sm:p-3 bg-orange-100 rounded-full flex-shrink-0">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="space-y-6 xl:grid xl:grid-cols-4 xl:gap-6 xl:space-y-0">
        {/* Credit Packages */}
        <div className="xl:col-span-3">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <CreditCard className="w-5 h-5" />
                Pacotes de Créditos
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6">
                {creditPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`relative p-4 sm:p-6 border rounded-lg transition-all hover:shadow-md cursor-pointer ${
                      pkg.popular ? "border-primary bg-primary/5" : "border-gray-200"
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-primary text-white text-xs">
                          <Star className="w-3 h-3 mr-1" />
                          Mais Popular
                        </Badge>
                      </div>
                    )}

                    <div className="text-center mb-4">
                      <div className="flex items-center justify-center mb-2">
                        {pkg.id === "enterprise" ? (
                          <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />
                        ) : pkg.popular ? (
                          <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                        ) : (
                          <Wallet className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                        )}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-black">{pkg.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">{pkg.description}</p>
                    </div>

                    <div className="text-center mb-4">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-2xl sm:text-3xl font-bold text-black">{pkg.credits}</span>
                        <span className="text-sm text-gray-600">créditos</span>
                      </div>
                      {pkg.bonus > 0 && (
                        <div className="flex items-center justify-center gap-1 mt-1">
                          <Gift className="w-4 h-4 text-green-500" />
                          <span className="text-xs sm:text-sm text-green-600">+{pkg.bonus} bônus</span>
                        </div>
                      )}
                      <div className="mt-2">
                        <span className="text-xl sm:text-2xl font-bold text-primary">{formatCurrency(pkg.price)}</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4 sm:mb-6">
                      {pkg.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Dialog open={showPurchaseDialog} onOpenChange={setShowPurchaseDialog}>
                      <DialogTrigger asChild>
                        <Button
                          className={`w-full text-sm ${
                            pkg.popular ? "bg-primary hover:bg-primary/90" : "bg-gray-900 hover:bg-gray-800"
                          }`}
                          onClick={() => setSelectedPackage(pkg.id)}
                        >
                          <CreditCard className="w-4 h-4 mr-2" />
                          Comprar Agora
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md mx-4">
                        <DialogHeader>
                          <DialogTitle>Finalizar Compra</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          {selectedPackage && (
                            <div className="p-4 bg-gray-50 rounded-lg">
                              <h4 className="font-medium">
                                {creditPackages.find((p) => p.id === selectedPackage)?.name}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {creditPackages.find((p) => p.id === selectedPackage)?.credits} créditos
                                {creditPackages.find((p) => p.id === selectedPackage)?.bonus! > 0 &&
                                  ` + ${creditPackages.find((p) => p.id === selectedPackage)?.bonus} bônus`}
                              </p>
                              <p className="text-lg font-bold text-primary">
                                {formatCurrency(creditPackages.find((p) => p.id === selectedPackage)?.price || 0)}
                              </p>
                            </div>
                          )}

                          <div>
                            <Label htmlFor="payment">Forma de Pagamento</Label>
                            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione a forma de pagamento" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pix">PIX</SelectItem>
                                <SelectItem value="credit">Cartão de Crédito</SelectItem>
                                <SelectItem value="debit">Cartão de Débito</SelectItem>
                                <SelectItem value="boleto">Boleto Bancário</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-2">
                            <Button variant="outline" className="flex-1" onClick={() => setShowPurchaseDialog(false)}>
                              Cancelar
                            </Button>
                            <Button
                              className="flex-1 bg-primary hover:bg-primary/90"
                              onClick={handlePurchase}
                              disabled={!paymentMethod || isLoading}
                            >
                              {isLoading ? (
                                <>
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                  Processando...
                                </>
                              ) : (
                                <>
                                  <CreditCard className="w-4 h-4 mr-2" />
                                  Confirmar Compra
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Usage Info */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg">Como Usar os Créditos</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0 space-y-3 sm:space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-full flex-shrink-0">
                  <Zap className="w-4 h-4 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-sm">Consultas Online</p>
                  <p className="text-xs text-gray-600">2 créditos por consulta de 50 minutos</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-full flex-shrink-0">
                  <Calendar className="w-4 h-4 text-green-600" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-sm">Agendamentos</p>
                  <p className="text-xs text-gray-600">Gratuito para todos os planos</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-100 rounded-full flex-shrink-0">
                  <History className="w-4 h-4 text-purple-600" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-sm">Relatórios</p>
                  <p className="text-xs text-gray-600">1 crédito por relatório detalhado</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Promotions */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <Gift className="w-5 h-5" />
                Promoções Ativas
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0 space-y-3 sm:space-y-4">
              <div className="p-3 sm:p-4 bg-gradient-to-r from-primary/10 to-blue-100 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="font-medium text-sm">Bônus de Primeira Compra</span>
                </div>
                <p className="text-xs text-gray-600 mb-2">Ganhe 20% de créditos extras na sua primeira compra</p>
                <Badge variant="secondary" className="bg-primary/20 text-primary text-xs">
                  Válido até 31/03
                </Badge>
              </div>

              <div className="p-3 sm:p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-sm">Programa de Fidelidade</span>
                </div>
                <p className="text-xs text-gray-600 mb-2">A cada 10 consultas, ganhe 5 créditos bônus</p>
                <Badge variant="secondary" className="bg-green-200 text-green-800 text-xs">
                  Permanente
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Transaction History */}
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <History className="w-5 h-5" />
            Histórico de Transações
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Créditos</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`p-1 rounded ${getTransactionColor(transaction.type)}`}>
                          {getTransactionIcon(transaction.type)}
                        </div>
                        <span className="capitalize text-sm">{transaction.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{transaction.description}</p>
                        {transaction.paymentMethod && (
                          <p className="text-xs text-gray-500">{transaction.paymentMethod}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(transaction.date)}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={`font-medium ${getTransactionColor(transaction.type)}`}>
                        {transaction.amount > 0 ? "+" : ""}
                        {transaction.amount}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="p-4 border rounded-lg bg-white">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-1 rounded ${getTransactionColor(transaction.type)}`}>
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <span className="capitalize text-sm font-medium">{transaction.type}</span>
                  </div>
                  <span className={`font-medium text-sm ${getTransactionColor(transaction.type)}`}>
                    {transaction.amount > 0 ? "+" : ""}
                    {transaction.amount}
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="font-medium text-sm">{transaction.description}</p>
                  {transaction.paymentMethod && <p className="text-xs text-gray-500">{transaction.paymentMethod}</p>}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-gray-500">{formatDate(transaction.date)}</span>
                    <Badge variant="secondary" className={`${getStatusColor(transaction.status)} text-xs`}>
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
