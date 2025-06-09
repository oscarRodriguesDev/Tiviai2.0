import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Cookie, ArrowLeft, Settings, Eye, BarChart3, Shield } from "lucide-react"
import Link from "next/link"

export default function PoliticaCookiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </Link>

          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                <Cookie className="h-6 w-6 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Política de Cookies</h1>
            <p className="text-muted-foreground text-lg">Como utilizamos cookies e tecnologias similares</p>
            <p className="text-sm text-muted-foreground mt-2">Última atualização: 15 de janeiro de 2024</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* O que são Cookies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cookie className="h-5 w-5" />
                1. O que são Cookies?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Cookies são pequenos arquivos de texto que são armazenados no seu dispositivo (computador, tablet ou
                celular) quando você visita um site. Eles são amplamente utilizados para fazer os sites funcionarem de
                forma mais eficiente, bem como para fornecer informações aos proprietários do site.
              </p>
              <p>
                Na <strong>Dating - Plataforma Psicológica</strong>, utilizamos cookies para melhorar sua experiência,
                personalizar conteúdo e analisar como nosso site é usado.
              </p>
            </CardContent>
          </Card>

          {/* Tipos de Cookies */}
          <Card>
            <CardHeader>
              <CardTitle>2. Tipos de Cookies que Utilizamos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Cookies Essenciais */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-green-600" />
                  <h4 className="font-semibold">Cookies Essenciais</h4>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Sempre Ativos
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-3">
                  Estes cookies são necessários para o funcionamento básico do site e não podem ser desativados.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">session_id</span>
                    <span className="text-muted-foreground">Gerencia sua sessão de login</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">csrf_token</span>
                    <span className="text-muted-foreground">Proteção contra ataques CSRF</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">cookie_consent</span>
                    <span className="text-muted-foreground">Armazena suas preferências de cookies</span>
                  </div>
                </div>
              </div>

              {/* Cookies Funcionais */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Settings className="h-5 w-5 text-blue-600" />
                  <h4 className="font-semibold">Cookies Funcionais</h4>
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Opcionais</Badge>
                </div>
                <p className="text-muted-foreground mb-3">
                  Permitem que o site lembre de suas escolhas e forneça recursos aprimorados.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">theme_preference</span>
                    <span className="text-muted-foreground">Lembra sua preferência de tema (claro/escuro)</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">language_preference</span>
                    <span className="text-muted-foreground">Armazena sua preferência de idioma</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">notification_settings</span>
                    <span className="text-muted-foreground">Suas configurações de notificação</span>
                  </div>
                </div>
              </div>

              {/* Cookies Analíticos */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                  <h4 className="font-semibold">Cookies Analíticos</h4>
                  <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                    Opcionais
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-3">
                  Nos ajudam a entender como os visitantes interagem com o site, coletando informações de forma anônima.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">_ga</span>
                    <span className="text-muted-foreground">Google Analytics - identifica usuários únicos</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">_ga_*</span>
                    <span className="text-muted-foreground">Google Analytics - coleta dados de uso</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">_gid</span>
                    <span className="text-muted-foreground">Google Analytics - distingue usuários</span>
                  </div>
                </div>
              </div>

              {/* Cookies de Marketing */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="h-5 w-5 text-orange-600" />
                  <h4 className="font-semibold">Cookies de Marketing</h4>
                  <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                    Opcionais
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-3">
                  Utilizados para rastrear visitantes em sites para exibir anúncios relevantes e envolventes.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">_fbp</span>
                    <span className="text-muted-foreground">Facebook Pixel - rastreamento de conversões</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">_gcl_au</span>
                    <span className="text-muted-foreground">Google Ads - medição de conversões</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Duração dos Cookies */}
          <Card>
            <CardHeader>
              <CardTitle>3. Duração dos Cookies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Cookies de Sessão</h4>
                  <p className="text-muted-foreground text-sm">
                    São temporários e são excluídos quando você fecha o navegador. Utilizados para funcionalidades
                    básicas como login e navegação.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Cookies Persistentes</h4>
                  <p className="text-muted-foreground text-sm">
                    Permanecem no seu dispositivo por um período determinado ou até serem excluídos manualmente.
                    Utilizados para lembrar preferências.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Períodos de Retenção:</h4>
                <ul className="text-sm space-y-1">
                  <li>
                    <strong>Cookies Essenciais:</strong> Duração da sessão
                  </li>
                  <li>
                    <strong>Cookies Funcionais:</strong> Até 1 ano
                  </li>
                  <li>
                    <strong>Cookies Analíticos:</strong> Até 2 anos
                  </li>
                  <li>
                    <strong>Cookies de Marketing:</strong> Até 90 dias
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Cookies de Terceiros */}
          <Card>
            <CardHeader>
              <CardTitle>4. Cookies de Terceiros</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Alguns cookies são definidos por serviços de terceiros que aparecem em nossas páginas. Não temos
                controle sobre esses cookies.
              </p>

              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Google Analytics</h4>
                  <p className="text-muted-foreground text-sm mb-2">
                    Utilizamos o Google Analytics para analisar o uso do nosso site.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Política de Privacidade:{" "}
                    <a
                      href="https://policies.google.com/privacy"
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://policies.google.com/privacy
                    </a>
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Facebook Pixel</h4>
                  <p className="text-muted-foreground text-sm mb-2">
                    Utilizado para medir a eficácia da nossa publicidade e criar audiências personalizadas.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Política de Dados:{" "}
                    <a
                      href="https://www.facebook.com/privacy/explanation"
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://www.facebook.com/privacy/explanation
                    </a>
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Serviços de Pagamento</h4>
                  <p className="text-muted-foreground text-sm">
                    Processadores de pagamento podem definir cookies para processar transações de forma segura.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gerenciar Cookies */}
          <Card>
            <CardHeader>
              <CardTitle>5. Como Gerenciar Cookies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">5.1 Configurações da Plataforma</h4>
                <p className="text-muted-foreground mb-3">
                  Você pode gerenciar suas preferências de cookies através das configurações da nossa plataforma.
                </p>
                <Button className="mb-4">
                  <Settings className="h-4 w-4 mr-2" />
                  Gerenciar Preferências de Cookies
                </Button>
              </div>

              <div>
                <h4 className="font-semibold mb-2">5.2 Configurações do Navegador</h4>
                <p className="text-muted-foreground mb-3">
                  Você também pode controlar cookies através das configurações do seu navegador:
                </p>

                <div className="grid gap-3 md:grid-cols-2">
                  <div className="border rounded-lg p-3">
                    <h5 className="font-medium">Google Chrome</h5>
                    <p className="text-xs text-muted-foreground">Configurações → Privacidade e segurança → Cookies</p>
                  </div>

                  <div className="border rounded-lg p-3">
                    <h5 className="font-medium">Mozilla Firefox</h5>
                    <p className="text-xs text-muted-foreground">Opções → Privacidade e Segurança → Cookies</p>
                  </div>

                  <div className="border rounded-lg p-3">
                    <h5 className="font-medium">Safari</h5>
                    <p className="text-xs text-muted-foreground">Preferências → Privacidade → Cookies</p>
                  </div>

                  <div className="border rounded-lg p-3">
                    <h5 className="font-medium">Microsoft Edge</h5>
                    <p className="text-xs text-muted-foreground">Configurações → Privacidade → Cookies</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Atenção:</strong> Desabilitar cookies pode afetar a funcionalidade do site e sua experiência
                  de navegação.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Impacto da Desativação */}
          <Card>
            <CardHeader>
              <CardTitle>6. Impacto da Desativação de Cookies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Se você escolher desabilitar cookies, algumas funcionalidades do site podem não funcionar corretamente:
              </p>

              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-red-600">Cookies Essenciais Desabilitados:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    <li>Impossibilidade de fazer login</li>
                    <li>Perda de itens no carrinho de compras</li>
                    <li>Problemas de segurança</li>
                    <li>Funcionalidades básicas podem não funcionar</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-orange-600">Cookies Funcionais Desabilitados:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    <li>Perda de preferências personalizadas</li>
                    <li>Necessidade de reconfigurar o tema a cada visita</li>
                    <li>Configurações de notificação não salvas</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-600">Cookies Analíticos Desabilitados:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    <li>Não contribuição para melhoria do site</li>
                    <li>Experiência menos personalizada</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Atualizações */}
          <Card>
            <CardHeader>
              <CardTitle>7. Atualizações desta Política</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Esta Política de Cookies pode ser atualizada periodicamente para refletir mudanças em nossas práticas ou
                por outros motivos operacionais, legais ou regulamentares.
              </p>

              <div>
                <h4 className="font-semibold mb-2">Como você será notificado:</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Banner de notificação no site</li>
                  <li>E-mail para usuários registrados</li>
                  <li>Atualização da data no topo desta página</li>
                </ul>
              </div>

              <p className="text-sm text-muted-foreground">
                Recomendamos que revise esta política regularmente para se manter informado sobre como utilizamos
                cookies.
              </p>
            </CardContent>
          </Card>

          {/* Contato */}
          <Card>
            <CardHeader>
              <CardTitle>8. Contato</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Se você tiver dúvidas sobre nossa Política de Cookies, entre em contato conosco:</p>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold">E-mail:</h4>
                  <p className="text-muted-foreground">privacidade@dating.com.br</p>
                </div>

                <div>
                  <h4 className="font-semibold">Telefone:</h4>
                  <p className="text-muted-foreground">(11) 3000-0000</p>
                </div>

                <div>
                  <h4 className="font-semibold">Endereço:</h4>
                  <p className="text-muted-foreground">
                    Rua das Flores, 123
                    <br />
                    São Paulo - SP, 01234-567
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold">Horário:</h4>
                  <p className="text-muted-foreground">Segunda a Sexta: 9h às 18h</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <Separator className="mb-6" />
          <p className="text-sm text-muted-foreground">
            © 2024 Dating - Plataforma Psicológica. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  )
}
