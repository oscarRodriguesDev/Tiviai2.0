"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import {
  MessageSquare,
  Heart,
  Share2,
  Plus,
  Filter,
  Search,
  Pin,
  AlertCircle,
  Users,
  HelpCircle,
  Lightbulb,
  Clock,
  BookOpen,
  Calendar,
  Award,
  FileText,
  Bookmark,
} from "lucide-react"

// Mock data for posts
const mockPosts = [
  {
    id: "1",
    autorId: "admin",
    autorNome: "Administração",
    autorCRP: "Sistema",
    tipo: "aviso",
    titulo: "Manutenção programada do sistema",
    conteudo:
      "Informamos que haverá uma manutenção programada no sistema no dia 15/01 das 02:00 às 04:00. Durante este período, a plataforma ficará temporariamente indisponível. Recomendamos que finalizem suas atividades antes deste horário para evitar perda de dados. A equipe técnica estará disponível para suporte após a manutenção.",
    dataPublicacao: new Date("2024-01-10T10:00:00"),
    curtidas: 12,
    comentarios: 3,
    isAdmin: true,
    isPinned: true,
  },
  {
    id: "2",
    autorId: "psi_001",
    autorNome: "Dr. João Silva",
    autorCRP: "CRP 06/123456",
    tipo: "discussao",
    titulo: "Técnicas de relaxamento para ansiedade",
    conteudo:
      "Gostaria de compartilhar algumas técnicas que tenho usado com sucesso em pacientes com transtornos de ansiedade. A respiração diafragmática tem se mostrado muito eficaz, especialmente quando combinada com mindfulness. Tenho notado que pacientes que praticam estas técnicas por pelo menos 10 minutos diários apresentam redução significativa nos sintomas após 3-4 semanas. Alguém mais tem experiências semelhantes ou outras técnicas para compartilhar?",
    dataPublicacao: new Date("2024-01-09T14:30:00"),
    curtidas: 28,
    comentarios: 8,
    isAdmin: false,
    isPinned: false,
  },
  {
    id: "3",
    autorId: "psi_002",
    autorNome: "Dra. Maria Santos",
    autorCRP: "CRP 06/789012",
    tipo: "duvida",
    titulo: "Dúvida sobre relatórios de avaliação",
    conteudo:
      "Colegas, tenho uma dúvida sobre a estrutura dos relatórios de avaliação psicológica. Vocês seguem algum modelo específico? Estou em dúvida sobre como organizar os resultados dos testes e as conclusões de forma mais clara e objetiva, especialmente para avaliações que serão enviadas para escolas ou empresas. Agradeço qualquer orientação ou modelo que possam compartilhar!",
    dataPublicacao: new Date("2024-01-08T16:45:00"),
    curtidas: 15,
    comentarios: 12,
    isAdmin: false,
    isPinned: false,
  },
  {
    id: "4",
    autorId: "admin",
    autorNome: "Administração",
    autorCRP: "Sistema",
    tipo: "aviso",
    titulo: "Nova funcionalidade: Gravação de sessões",
    conteudo:
      "Estamos felizes em anunciar que a funcionalidade de gravação de sessões já está disponível! Agora vocês podem gravar suas consultas com o consentimento do paciente. As gravações são criptografadas e armazenadas com segurança, seguindo todas as normas da LGPD. Para utilizar esta função, acesse as configurações da videochamada e ative a opção 'Gravar sessão'. Um termo de consentimento será enviado automaticamente ao paciente.",
    dataPublicacao: new Date("2024-01-07T09:00:00"),
    curtidas: 45,
    comentarios: 18,
    isAdmin: true,
    isPinned: false,
  },
  {
    id: "5",
    autorId: "psi_003",
    autorNome: "Dr. Carlos Mendes",
    autorCRP: "CRP 08/456789",
    tipo: "experiencia",
    titulo: "Relato de caso: TEPT em profissionais de saúde pós-pandemia",
    conteudo:
      "Venho acompanhando diversos profissionais de saúde que desenvolveram TEPT após atuarem na linha de frente durante a pandemia. Tenho observado padrões interessantes na manifestação dos sintomas e na resposta ao tratamento. A abordagem que tem funcionado melhor combina TCC com técnicas de EMDR adaptadas. Estou documentando estes casos para um possível estudo. Alguém mais está trabalhando com esta população específica?",
    dataPublicacao: new Date("2024-01-06T11:20:00"),
    curtidas: 32,
    comentarios: 14,
    isAdmin: false,
    isPinned: false,
  },
  {
    id: "6",
    autorId: "psi_004",
    autorNome: "Dra. Ana Oliveira",
    autorCRP: "CRP 05/234567",
    tipo: "discussao",
    titulo: "Psicoterapia online vs. presencial: vantagens e desvantagens",
    conteudo:
      "Após quase 3 anos realizando atendimentos online, estou voltando gradualmente ao formato presencial. Tenho notado diferenças significativas na dinâmica terapêutica. Alguns pacientes se beneficiam mais do formato presencial, enquanto outros preferem continuar online. Estou compilando minhas observações sobre as vantagens e desvantagens de cada modalidade. Quais têm sido suas experiências? Vocês notaram diferenças na eficácia terapêutica entre os formatos?",
    dataPublicacao: new Date("2024-01-05T15:10:00"),
    curtidas: 41,
    comentarios: 23,
    isAdmin: false,
    isPinned: false,
  },
  {
    id: "7",
    autorId: "psi_005",
    autorNome: "Dr. Roberto Almeida",
    autorCRP: "CRP 07/345678",
    tipo: "duvida",
    titulo: "Recomendações de testes para avaliação de TDAH em adultos",
    conteudo:
      "Estou montando um protocolo de avaliação para TDAH em adultos e gostaria de saber quais instrumentos vocês têm utilizado com bons resultados. Atualmente uso o ASRS, BDI e BAI para triagem inicial, mas estou em busca de instrumentos mais específicos para atenção e funções executivas. Alguma recomendação de bateria neuropsicológica que seja prática para o contexto clínico?",
    dataPublicacao: new Date("2024-01-04T09:30:00"),
    curtidas: 19,
    comentarios: 11,
    isAdmin: false,
    isPinned: false,
  },
  {
    id: "8",
    autorId: "psi_006",
    autorNome: "Dra. Juliana Costa",
    autorCRP: "CRP 04/567890",
    tipo: "experiencia",
    titulo: "Grupo terapêutico para adolescentes com ansiedade social",
    conteudo:
      "Gostaria de compartilhar os resultados de um grupo terapêutico que conduzi para adolescentes com ansiedade social. O grupo teve duração de 12 semanas, com encontros semanais de 90 minutos. Utilizei uma abordagem que combina TCC com elementos de terapia de aceitação e compromisso. Os resultados foram muito positivos, com redução significativa nos escores de ansiedade social e melhora no funcionamento escolar. Estou disponível para compartilhar o protocolo com interessados.",
    dataPublicacao: new Date("2024-01-03T14:00:00"),
    curtidas: 37,
    comentarios: 16,
    isAdmin: false,
    isPinned: false,
  },
  {
    id: "9",
    autorId: "admin",
    autorNome: "Administração",
    autorCRP: "Sistema",
    tipo: "aviso",
    titulo: "Webinar: Atualizações no Código de Ética Profissional",
    conteudo:
      "Convidamos todos os psicólogos para participar do webinar sobre as recentes atualizações no Código de Ética Profissional. O evento acontecerá no dia 20/01 às 19h e contará com a participação de representantes do Conselho Federal de Psicologia. Serão discutidas as principais mudanças e suas implicações práticas. Para participar, inscreva-se através do link disponível na área de eventos da plataforma.",
    dataPublicacao: new Date("2024-01-02T10:15:00"),
    curtidas: 28,
    comentarios: 7,
    isAdmin: true,
    isPinned: false,
  },
  {
    id: "10",
    autorId: "psi_007",
    autorNome: "Dr. Fernando Gomes",
    autorCRP: "CRP 01/678901",
    tipo: "discussao",
    titulo: "Intervenções baseadas em evidências para transtornos alimentares",
    conteudo:
      "Tenho trabalhado com pacientes com transtornos alimentares e gostaria de discutir quais abordagens vocês têm encontrado mais eficácia. A literatura aponta para TCC e terapia familiar como as mais eficazes, mas tenho visto bons resultados com abordagens integrativas. Recentemente, incorporei elementos de terapia focada na compaixão e tenho observado melhorias na autoestima e na relação com o corpo. Quais têm sido suas experiências?",
    dataPublicacao: new Date("2024-01-01T16:40:00"),
    curtidas: 23,
    comentarios: 15,
    isAdmin: false,
    isPinned: false,
  },
  {
    id: "11",
    autorId: "psi_008",
    autorNome: "Dra. Patrícia Lima",
    autorCRP: "CRP 03/789012",
    tipo: "experiencia",
    titulo: "Uso de metáforas na terapia com crianças",
    conteudo:
      "Quero compartilhar como o uso de metáforas tem enriquecido meu trabalho com crianças. Criei um 'kit de metáforas' com objetos, histórias e desenhos que representam conceitos como ansiedade, raiva, autocontrole, etc. As crianças conseguem se conectar facilmente com estas representações concretas e isso facilita muito o processo terapêutico. Por exemplo, uso um balão para representar emoções que 'inflam' e podem 'estourar' se não forem reguladas. Alguém mais utiliza recursos semelhantes?",
    dataPublicacao: new Date("2023-12-30T13:25:00"),
    curtidas: 42,
    comentarios: 19,
    isAdmin: false,
    isPinned: false,
  },
  {
    id: "12",
    autorId: "psi_009",
    autorNome: "Dr. Marcelo Souza",
    autorCRP: "CRP 02/890123",
    tipo: "duvida",
    titulo: "Documentação em psicoterapia: melhores práticas",
    conteudo:
      "Estou revisando meu sistema de documentação clínica e gostaria de saber quais são as melhores práticas que vocês adotam. Que tipo de informações vocês registram após cada sessão? Utilizam algum sistema específico ou software para organizar os registros? Como equilibram a necessidade de documentação detalhada com a praticidade e o tempo disponível entre sessões? Agradeço qualquer orientação!",
    dataPublicacao: new Date("2023-12-29T10:50:00"),
    curtidas: 16,
    comentarios: 13,
    isAdmin: false,
    isPinned: false,
  },
]

const tipoIcons = {
  aviso: AlertCircle,
  discussao: Users,
  duvida: HelpCircle,
  experiencia: Lightbulb,
  artigo: BookOpen,
  evento: Calendar,
  recurso: FileText,
  pesquisa: Award,
}

const tipoCores = {
  aviso: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200",
  discussao: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200",
  duvida: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200",
  experiencia: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200",
  artigo: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200",
  evento: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200",
  recurso: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200",
  pesquisa: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-200",
}

export default function FeedPage() {
  const [posts, setPosts] = useState(mockPosts)
  const [filtroTipo, setFiltroTipo] = useState("todos")
  const [busca, setBusca] = useState("")
  const [novoPost, setNovoPost] = useState({
    tipo: "",
    titulo: "",
    conteudo: "",
  })
  const [modalAberto, setModalAberto] = useState(false)

  const postsFiltrados = posts.filter((post) => {
    const matchTipo = filtroTipo === "todos" || post.tipo === filtroTipo
    const matchBusca =
      post.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      post.conteudo.toLowerCase().includes(busca.toLowerCase()) ||
      post.autorNome.toLowerCase().includes(busca.toLowerCase())
    return matchTipo && matchBusca
  })

  const handleCurtir = (postId: string) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, curtidas: post.curtidas + 1 } : post)))
  }

  const handleNovoPost = () => {
    if (novoPost.tipo && novoPost.titulo && novoPost.conteudo) {
      const post = {
        id: Date.now().toString(),
        autorId: "current_user",
        autorNome: "Dra. Maria Silva",
        autorCRP: "CRP 06/123456",
        tipo: novoPost.tipo as any,
        titulo: novoPost.titulo,
        conteudo: novoPost.conteudo,
        dataPublicacao: new Date(),
        curtidas: 0,
        comentarios: 0,
        isAdmin: false,
        isPinned: false,
      }

      setPosts([post, ...posts])
      setNovoPost({ tipo: "", titulo: "", conteudo: "" })
      setModalAberto(false)
    }
  }

  const formatarData = (data: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(data)
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Feed da Comunidade</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Compartilhe conhecimento e mantenha-se atualizado com a comunidade
          </p>
        </div>

        <Dialog open={modalAberto} onOpenChange={setModalAberto}>
          <DialogTrigger asChild>
            <Button onClick={() => setModalAberto(true)} className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Nova Postagem
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-2xl w-[calc(100%-2rem)]">
            <DialogHeader>
              <DialogTitle>Nova Postagem</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="tipo">Tipo de Postagem</Label>
                <Select value={novoPost.tipo} onValueChange={(value) => setNovoPost({ ...novoPost, tipo: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="discussao">Discussão</SelectItem>
                    <SelectItem value="duvida">Dúvida</SelectItem>
                    <SelectItem value="experiencia">Experiência</SelectItem>
                    <SelectItem value="artigo">Artigo</SelectItem>
                    <SelectItem value="recurso">Recurso</SelectItem>
                    <SelectItem value="evento">Evento</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="titulo">Título</Label>
                <Input
                  id="titulo"
                  value={novoPost.titulo}
                  onChange={(e) => setNovoPost({ ...novoPost, titulo: e.target.value })}
                  placeholder="Digite o título da sua postagem"
                />
              </div>

              <div>
                <Label htmlFor="conteudo">Conteúdo</Label>
                <Textarea
                  id="conteudo"
                  value={novoPost.conteudo}
                  onChange={(e) => setNovoPost({ ...novoPost, conteudo: e.target.value })}
                  placeholder="Compartilhe seu conhecimento, experiência ou dúvida..."
                  rows={6}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setModalAberto(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleNovoPost} disabled={!novoPost.tipo || !novoPost.titulo || !novoPost.conteudo}>
                  Publicar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtros e Busca */}
      <Card>
        <CardContent className="p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar postagens..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                <SelectTrigger className="w-full sm:w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Todos os tipos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="aviso">Avisos</SelectItem>
                  <SelectItem value="discussao">Discussões</SelectItem>
                  <SelectItem value="duvida">Dúvidas</SelectItem>
                  <SelectItem value="experiencia">Experiências</SelectItem>
                  <SelectItem value="artigo">Artigos</SelectItem>
                  <SelectItem value="evento">Eventos</SelectItem>
                  <SelectItem value="recurso">Recursos</SelectItem>
                  <SelectItem value="pesquisa">Pesquisas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts */}
      <div className="space-y-4">
        {postsFiltrados.map((post) => {
          const TipoIcon = tipoIcons[post.tipo as keyof typeof tipoIcons] || Users

          return (
            <Card key={post.id} className={post.isPinned ? "border-primary" : ""}>
              <CardHeader className="p-3 sm:p-4 pb-2 sm:pb-3">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-0">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border-2 border-primary">
                      <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                      <AvatarFallback className={post.isAdmin ? "bg-red-100 text-red-800" : "bg-primary text-white"}>
                        {post.autorNome
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-sm sm:text-base">{post.autorNome}</h3>
                        {post.isAdmin && (
                          <Badge variant="destructive" className="text-xs">
                            Admin
                          </Badge>
                        )}
                        {post.isPinned && <Pin className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />}
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground">{post.autorCRP}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-1 sm:mt-0">
                    <Badge
                      className={
                        tipoCores[post.tipo as keyof typeof tipoCores] ||
                        "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                      }
                    >
                      <TipoIcon className="h-3 w-3 mr-1" />
                      <span className="text-xs">{post.tipo.charAt(0).toUpperCase() + post.tipo.slice(1)}</span>
                    </Badge>
                    <div className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatarData(post.dataPublicacao)}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-3 sm:p-4 pt-0 sm:pt-0">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">{post.titulo}</h4>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed line-clamp-4 sm:line-clamp-none">
                      {post.conteudo}
                    </p>
                  </div>

                  <Separator />

                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 sm:gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCurtir(post.id)}
                        className="text-muted-foreground hover:text-red-500 h-8 px-2 sm:px-3"
                      >
                        <Heart className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        <span className="text-xs sm:text-sm">{post.curtidas}</span>
                      </Button>

                      <Button variant="ghost" size="sm" className="text-muted-foreground h-8 px-2 sm:px-3">
                        <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        <span className="text-xs sm:text-sm">{post.comentarios}</span>
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground h-8 px-2 sm:px-3 hidden sm:flex"
                      >
                        <Bookmark className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        <span className="text-xs sm:text-sm">Salvar</span>
                      </Button>
                    </div>

                    <Button variant="ghost" size="sm" className="text-muted-foreground h-8 px-2 sm:px-3">
                      <Share2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      <span className="text-xs sm:text-sm">Compartilhar</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {postsFiltrados.length === 0 && (
        <Card>
          <CardContent className="p-6 sm:p-8 text-center">
            <MessageSquare className="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-muted-foreground mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">Nenhuma postagem encontrada</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Tente ajustar os filtros ou seja o primeiro a compartilhar algo!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
