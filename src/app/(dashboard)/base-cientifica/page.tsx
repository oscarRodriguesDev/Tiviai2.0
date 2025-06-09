"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  BookOpen,
  Download,
  ExternalLink,
  Star,
  Clock,
  User,
  Tag,
  TrendingUp,
  Calendar,
  Eye,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Brain, Zap } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Article {
  id: string
  title: string
  authors: string[]
  journal: string
  year: number
  abstract: string
  tags: string[]
  downloadUrl: string
  views: number
  rating: number
  publishedDate: string
  category: string
}

export default function BaseCientificaPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploadType, setUploadType] = useState<"prompt" | "knowledge">("prompt")
  const [uploadForm, setUploadForm] = useState({
    titulo: "",
    descricao: "",
    conteudo: "",
    categoria: "",
    tags: "",
  })

  const articles: Article[] = [
    {
      id: "1",
      title: "Eficácia da Terapia Cognitivo-Comportamental no Tratamento de Transtornos de Ansiedade",
      authors: ["Dr. João Silva", "Dra. Maria Santos"],
      journal: "Revista Brasileira de Psicologia",
      year: 2024,
      abstract:
        "Este estudo examina a eficácia da TCC em pacientes com transtornos de ansiedade, demonstrando resultados significativos na redução dos sintomas após 12 semanas de tratamento.",
      tags: ["TCC", "Ansiedade", "Tratamento", "Eficácia"],
      downloadUrl: "#",
      views: 1250,
      rating: 4.8,
      publishedDate: "2024-01-15",
      category: "Ansiedade",
    },
    {
      id: "2",
      title: "Telepsicologia: Desafios e Oportunidades na Era Digital",
      authors: ["Dra. Ana Costa", "Dr. Pedro Oliveira"],
      journal: "Psicologia: Ciência e Profissão",
      year: 2024,
      abstract:
        "Uma análise abrangente dos benefícios e limitações da telepsicologia, incluindo diretrizes para a prática clínica online e considerações éticas.",
      tags: ["Telepsicologia", "Digital", "Ética", "Prática Clínica"],
      downloadUrl: "#",
      views: 980,
      rating: 4.6,
      publishedDate: "2024-01-10",
      category: "Tecnologia",
    },
    {
      id: "3",
      title: "Mindfulness e Regulação Emocional: Uma Revisão Sistemática",
      authors: ["Dr. Carlos Mendes"],
      journal: "Revista de Psicologia Clínica",
      year: 2023,
      abstract:
        "Revisão sistemática sobre o impacto das práticas de mindfulness na regulação emocional, com meta-análise de 45 estudos controlados randomizados.",
      tags: ["Mindfulness", "Regulação Emocional", "Revisão Sistemática"],
      downloadUrl: "#",
      views: 2100,
      rating: 4.9,
      publishedDate: "2023-12-20",
      category: "Mindfulness",
    },
  ]

  const categories = [
    { id: "todos", name: "Todos", count: articles.length },
    { id: "ansiedade", name: "Ansiedade", count: 1 },
    { id: "depressao", name: "Depressão", count: 0 },
    { id: "tecnologia", name: "Tecnologia", count: 1 },
    { id: "mindfulness", name: "Mindfulness", count: 1 },
    { id: "tcc", name: "TCC", count: 1 },
  ]

  const recentSearches = ["TCC ansiedade", "telepsicologia", "mindfulness depressão", "terapia online"]

  const trendingTopics = [
    { topic: "Inteligência Artificial em Psicologia", growth: "+45%" },
    { topic: "Terapia Online", growth: "+32%" },
    { topic: "Saúde Mental Pós-Pandemia", growth: "+28%" },
    { topic: "Neuropsicologia", growth: "+15%" },
  ]

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.authors.some((author) => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "todos" || article.category.toLowerCase() === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-black">Base Científica</h1>
        <p className="text-gray-600 mt-1">Acesse artigos, pesquisas e recursos científicos atualizados</p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar artigos, autores, palavras-chave..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-primary"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtros Avançados
              </Button>
            </div>
          </div>

          {/* Recent Searches */}
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Buscas recentes:</p>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchTerm(search)}
                  className="text-xs"
                >
                  {search}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="artigos" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="artigos">Artigos</TabsTrigger>
              <TabsTrigger value="livros">Livros</TabsTrigger>
              <TabsTrigger value="videos">Vídeos</TabsTrigger>
              <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
            </TabsList>

            <TabsContent value="artigos" className="space-y-4">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-black mb-2">{article.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{article.authors.join(", ")}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            <span>{article.journal}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{article.year}</span>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-4 line-clamp-3">{article.abstract}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {article.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                              <Tag className="w-3 h-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="ml-4 text-right">
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm font-medium">{article.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Eye className="w-4 h-4" />
                          <span>{article.views}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>Publicado em {new Date(article.publishedDate).toLocaleDateString("pt-BR")}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Ler Artigo
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredArticles.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum artigo encontrado</h3>
                    <p className="text-gray-500">Tente ajustar os termos de busca ou filtros</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="livros">
              <Card>
                <CardContent className="p-12 text-center">
                  <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Biblioteca de Livros</h3>
                  <p className="text-gray-500">Em breve: acesso a livros e manuais especializados</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="videos">
              <Card>
                <CardContent className="p-12 text-center">
                  <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Videoteca</h3>
                  <p className="text-gray-500">Em breve: palestras, webinars e conteúdo audiovisual</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="podcasts">
              <Card>
                <CardContent className="p-12 text-center">
                  <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Podcasts</h3>
                  <p className="text-gray-500">Em breve: podcasts especializados em psicologia</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Categorias</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                      selectedCategory === category.id
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <span className="text-sm">{category.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Trending Topics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Tópicos em Alta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {trendingTopics.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{item.topic}</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                      {item.growth}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Minha Biblioteca</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start" onClick={() => setUploadType("prompt")}>
                    <Zap className="w-4 h-4 mr-2" />
                    Adicionar Prompt
                  </Button>
                </DialogTrigger>
              </Dialog>

              <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start" onClick={() => setUploadType("knowledge")}>
                    <Brain className="w-4 h-4 mr-2" />
                    Base de Conhecimento
                  </Button>
                </DialogTrigger>
              </Dialog>

              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="w-4 h-4 mr-2" />
                Sugerir Artigo
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Meus Downloads
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Star className="w-4 h-4 mr-2" />
                Favoritos
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {uploadType === "prompt" ? (
                <>
                  <Zap className="w-5 h-5" />
                  Adicionar Novo Prompt
                </>
              ) : (
                <>
                  <Brain className="w-5 h-5" />
                  Adicionar Base de Conhecimento
                </>
              )}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="titulo">Título *</Label>
              <Input
                id="titulo"
                value={uploadForm.titulo}
                onChange={(e) => setUploadForm((prev) => ({ ...prev, titulo: e.target.value }))}
                placeholder={uploadType === "prompt" ? "Nome do prompt..." : "Título da base de conhecimento..."}
              />
            </div>

            <div>
              <Label htmlFor="categoria">Categoria</Label>
              <Select
                value={uploadForm.categoria}
                onValueChange={(value) => setUploadForm((prev) => ({ ...prev, categoria: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {uploadType === "prompt" ? (
                    <>
                      <SelectItem value="avaliacao">Avaliação Psicológica</SelectItem>
                      <SelectItem value="terapia">Sessões de Terapia</SelectItem>
                      <SelectItem value="relatorio">Relatórios</SelectItem>
                      <SelectItem value="orientacao">Orientações</SelectItem>
                      <SelectItem value="emergencia">Situações de Emergência</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="tcc">Terapia Cognitivo-Comportamental</SelectItem>
                      <SelectItem value="psicanalise">Psicanálise</SelectItem>
                      <SelectItem value="humanista">Abordagem Humanista</SelectItem>
                      <SelectItem value="sistemica">Terapia Sistêmica</SelectItem>
                      <SelectItem value="gestalt">Gestalt-terapia</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                value={uploadForm.descricao}
                onChange={(e) => setUploadForm((prev) => ({ ...prev, descricao: e.target.value }))}
                placeholder={
                  uploadType === "prompt"
                    ? "Descreva quando e como usar este prompt..."
                    : "Descreva o conteúdo e aplicação desta base..."
                }
                className="min-h-[80px]"
              />
            </div>

            <div>
              <Label htmlFor="conteudo">{uploadType === "prompt" ? "Prompt *" : "Conteúdo da Base *"}</Label>
              <Textarea
                id="conteudo"
                value={uploadForm.conteudo}
                onChange={(e) => setUploadForm((prev) => ({ ...prev, conteudo: e.target.value }))}
                placeholder={
                  uploadType === "prompt"
                    ? "Digite seu prompt aqui. Use variáveis como {nome_paciente}, {sintomas}, etc..."
                    : "Cole aqui textos, artigos, técnicas e conhecimentos que o GPT deve usar..."
                }
                className="min-h-[200px] font-mono text-sm"
              />
            </div>

            <div>
              <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
              <Input
                id="tags"
                value={uploadForm.tags}
                onChange={(e) => setUploadForm((prev) => ({ ...prev, tags: e.target.value }))}
                placeholder="ansiedade, depressão, tcc, avaliação..."
              />
            </div>

            {uploadType === "knowledge" && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <Brain className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">Como funciona a Base de Conhecimento</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      O GPT utilizará este conteúdo para personalizar suas respostas de acordo com sua abordagem
                      terapêutica. Inclua técnicas, teorias e métodos que você utiliza em sua prática.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t">
              <Button variant="outline" className="flex-1" onClick={() => setShowUploadModal(false)}>
                Cancelar
              </Button>
              <Button
                className="flex-1 bg-primary hover:bg-primary/90"
                onClick={() => {
                  console.log("Upload:", uploadType, uploadForm)
                  setShowUploadModal(false)
                  setUploadForm({ titulo: "", descricao: "", conteudo: "", categoria: "", tags: "" })
                }}
                disabled={!uploadForm.titulo || !uploadForm.conteudo}
              >
                <Upload className="w-4 h-4 mr-2" />
                {uploadType === "prompt" ? "Salvar Prompt" : "Salvar Base"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
