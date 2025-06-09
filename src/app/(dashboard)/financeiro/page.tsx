"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter,
  Plus,
  CreditCard,
  Wallet,
  Receipt,
  BarChart3,
} from "lucide-react"

interface Transaction {
  id: string
  type: "receita" | "despesa"
  description: string
  amount: number
  date: string
  status: "pago" | "pendente" | "atrasado"
  patient?: string
  category: string
}

export default function FinanceiroPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("mes")

  const transactions: Transaction[] = [
    {
      id: "1",
      type: "receita",
      description: "Consulta - Ana Costa Silva",
      amount: 150,
      date: "2024-01-29",
      status: "pago",
      patient: "Ana Costa Silva",
      category: "Consulta Individual",
    },
    {
      id: "2",
      type: "receita",
      description: "Consulta - Carlos Mendes",
      amount: 150,
      date: "2024-01-29",
      status: "pendente",
      patient: "Carlos Mendes",
      category: "Consulta Individual",
    },
    {
      id: "3",
      type: "despesa",
      description: "Assinatura Plataforma",
      amount: 99,
      date: "2024-01-25",
      status: "pago",
      category: "Software",
    },
    {
      id: "4",
      type: "receita",
      description: "Terapia de Casal - Mariana Santos",
      amount: 200,
      date: "2024-01-24",
      status: "pago",
      patient: "Mariana Santos",
      category: "Terapia de Casal",
    },
  ]

  const stats = {
    receitaTotal: 8400,
    receitaMes: 2100,
    despesasMes: 450,
    lucroMes: 1650,
    crescimentoMes: 15.2,
    consultasRealizadas: 28,
    ticketMedio: 165,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pago":
        return "bg-green-100 text-green-800"
      case "pendente":
        return "bg-yellow-100 text-yellow-800"
      case "atrasado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    return type === "receita" ? "text-green-600" : "text-red-600"
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-black">Financeiro</h1>
          <p className="text-gray-600 mt-1">Controle suas receitas, despesas e relatórios financeiros</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Nova Transação
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Receita Total</p>
                <p className="text-2xl font-bold text-black">{formatCurrency(stats.receitaTotal)}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600">+{stats.crescimentoMes}%</span>
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Receita do Mês</p>
                <p className="text-2xl font-bold text-black">{formatCurrency(stats.receitaMes)}</p>
                <p className="text-sm text-gray-500 mt-1">{stats.consultasRealizadas} consultas</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Despesas do Mês</p>
                <p className="text-2xl font-bold text-black">{formatCurrency(stats.despesasMes)}</p>
                <p className="text-sm text-gray-500 mt-1">Custos operacionais</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Lucro Líquido</p>
                <p className="text-2xl font-bold text-black">{formatCurrency(stats.lucroMes)}</p>
                <p className="text-sm text-gray-500 mt-1">Ticket médio: {formatCurrency(stats.ticketMedio)}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <Wallet className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="transacoes" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="transacoes">Transações</TabsTrigger>
              <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
              <TabsTrigger value="impostos">Impostos</TabsTrigger>
            </TabsList>

            <TabsContent value="transacoes">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Transações Recentes</CardTitle>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtros
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Valor</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{transaction.description}</p>
                              {transaction.patient && <p className="text-sm text-gray-500">{transaction.patient}</p>}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{transaction.category}</Badge>
                          </TableCell>
                          <TableCell>{formatDate(transaction.date)}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className={getStatusColor(transaction.status)}>
                              {transaction.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <span className={`font-medium ${getTypeColor(transaction.type)}`}>
                              {transaction.type === "receita" ? "+" : "-"}
                              {formatCurrency(transaction.amount)}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="relatorios">
              <Card>
                <CardContent className="p-12 text-center">
                  <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Relatórios Financeiros</h3>
                  <p className="text-gray-500">Gráficos e análises detalhadas em desenvolvimento</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="impostos">
              <Card>
                <CardContent className="p-12 text-center">
                  <Receipt className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Gestão de Impostos</h3>
                  <p className="text-gray-500">Controle de impostos e declarações em desenvolvimento</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Period Selector */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Período</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { id: "semana", label: "Esta Semana" },
                  { id: "mes", label: "Este Mês" },
                  { id: "trimestre", label: "Trimestre" },
                  { id: "ano", label: "Este Ano" },
                ].map((period) => (
                  <Button
                    key={period.id}
                    variant={selectedPeriod === period.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPeriod(period.id)}
                    className="justify-start"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    {period.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resumo Rápido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Consultas Pagas</span>
                <span className="font-semibold text-green-600">24</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Consultas Pendentes</span>
                <span className="font-semibold text-yellow-600">4</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Consultas Atrasadas</span>
                <span className="font-semibold text-red-600">0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Taxa de Conversão</span>
                <span className="font-semibold text-primary">96%</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="w-4 h-4 mr-2" />
                Nova Receita
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CreditCard className="w-4 h-4 mr-2" />
                Nova Despesa
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Exportar Dados
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Receipt className="w-4 h-4 mr-2" />
                Gerar Relatório
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
