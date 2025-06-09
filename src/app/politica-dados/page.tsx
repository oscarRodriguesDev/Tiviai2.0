import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Shield, Mail, Phone, MapPin, Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PoliticaDadosPage() {
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
                <Shield className="h-6 w-6 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Política de Proteção de Dados</h1>
            <p className="text-muted-foreground text-lg">Como coletamos, usamos e protegemos seus dados pessoais</p>
            <p className="text-sm text-muted-foreground mt-2">Última atualização: 15 de janeiro de 2024</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Introdução */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                1. Introdução
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                A <strong>Dating - Plataforma Psicológica</strong> está comprometida com a proteção da privacidade e dos
                dados pessoais de nossos usuários. Esta Política de Proteção de Dados descreve como coletamos, usamos,
                armazenamos e protegemos suas informações pessoais em conformidade com a Lei Geral de Proteção de Dados
                (LGPD - Lei nº 13.709/2018).
              </p>
              <p>
                Ao utilizar nossa plataforma, você concorda com as práticas descritas nesta política. Recomendamos que
                leia atentamente este documento.
              </p>
            </CardContent>
          </Card>

          {/* Dados Coletados */}
          <Card>
            <CardHeader>
              <CardTitle>2. Dados Pessoais Coletados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">2.1 Dados de Identificação</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Nome completo</li>
                  <li>CPF</li>
                  <li>RG</li>
                  <li>Data de nascimento</li>
                  <li>Endereço completo</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">2.2 Dados de Contato</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Endereço de e-mail</li>
                  <li>Números de telefone (principal e secundário)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">2.3 Dados Profissionais (Psicólogos)</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Número do CRP (Conselho Regional de Psicologia)</li>
                  <li>Especialidades e áreas de atuação</li>
                  <li>Formação acadêmica</li>
                  <li>Documentos profissionais</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">2.4 Dados de Uso da Plataforma</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Logs de acesso e navegação</li>
                  <li>Endereço IP</li>
                  <li>Informações do dispositivo e navegador</li>
                  <li>Dados de sessões e consultas</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Finalidades */}
          <Card>
            <CardHeader>
              <CardTitle>3. Finalidades do Tratamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Utilizamos seus dados pessoais para as seguintes finalidades:</p>

              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold">3.1 Prestação de Serviços</h4>
                  <p className="text-muted-foreground">
                    Facilitar consultas psicológicas online, gerenciar agendamentos e manter registros de atendimento.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold">3.2 Verificação de Identidade</h4>
                  <p className="text-muted-foreground">
                    Validar a identidade de psicólogos junto aos órgãos competentes (CRP) e verificar a autenticidade
                    dos usuários.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold">3.3 Comunicação</h4>
                  <p className="text-muted-foreground">
                    Enviar notificações importantes, lembretes de consultas e comunicados sobre a plataforma.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold">3.4 Melhoria dos Serviços</h4>
                  <p className="text-muted-foreground">
                    Analisar o uso da plataforma para melhorar funcionalidades e experiência do usuário.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold">3.5 Cumprimento Legal</h4>
                  <p className="text-muted-foreground">
                    Atender obrigações legais e regulamentares aplicáveis aos serviços de saúde mental.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Base Legal */}
          <Card>
            <CardHeader>
              <CardTitle>4. Base Legal para o Tratamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>O tratamento de seus dados pessoais é baseado nas seguintes hipóteses legais:</p>

              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>
                  <strong>Consentimento:</strong> Para dados não essenciais ao serviço
                </li>
                <li>
                  <strong>Execução de contrato:</strong> Para prestação dos serviços contratados
                </li>
                <li>
                  <strong>Cumprimento de obrigação legal:</strong> Para atender exigências regulamentares
                </li>
                <li>
                  <strong>Legítimo interesse:</strong> Para melhoria dos serviços e segurança da plataforma
                </li>
                <li>
                  <strong>Proteção da vida:</strong> Em situações de emergência ou risco
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Compartilhamento */}
          <Card>
            <CardHeader>
              <CardTitle>5. Compartilhamento de Dados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Seus dados pessoais podem ser compartilhados nas seguintes situações:</p>

              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold">5.1 Prestadores de Serviços</h4>
                  <p className="text-muted-foreground">
                    Com empresas que nos auxiliam na prestação de serviços (hospedagem, pagamentos, comunicação), sempre
                    sob rigorosos contratos de confidencialidade.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold">5.2 Órgãos Reguladores</h4>
                  <p className="text-muted-foreground">
                    Com o Conselho Regional de Psicologia (CRP) para verificação de registros profissionais.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold">5.3 Autoridades Competentes</h4>
                  <p className="text-muted-foreground">
                    Quando exigido por lei ou ordem judicial, ou para proteger direitos, propriedade ou segurança.
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Importante:</strong> Nunca vendemos, alugamos ou comercializamos seus dados pessoais com
                  terceiros para fins comerciais.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Segurança */}
          <Card>
            <CardHeader>
              <CardTitle>6. Segurança dos Dados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Implementamos medidas técnicas e organizacionais para proteger seus dados:</p>

              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Criptografia de dados em trânsito e em repouso</li>
                <li>Controles de acesso rigorosos</li>
                <li>Monitoramento contínuo de segurança</li>
                <li>Backups regulares e seguros</li>
                <li>Treinamento regular da equipe</li>
                <li>Auditorias de segurança periódicas</li>
              </ul>
            </CardContent>
          </Card>

          {/* Direitos do Titular */}
          <Card>
            <CardHeader>
              <CardTitle>7. Seus Direitos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Conforme a LGPD, você possui os seguintes direitos:</p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-semibold">Confirmação e Acesso</h4>
                  <p className="text-sm text-muted-foreground">
                    Confirmar se tratamos seus dados e acessar suas informações
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Correção</h4>
                  <p className="text-sm text-muted-foreground">
                    Corrigir dados incompletos, inexatos ou desatualizados
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Anonimização ou Eliminação</h4>
                  <p className="text-sm text-muted-foreground">
                    Solicitar anonimização ou eliminação de dados desnecessários
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Portabilidade</h4>
                  <p className="text-sm text-muted-foreground">Receber seus dados em formato estruturado</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Eliminação</h4>
                  <p className="text-sm text-muted-foreground">
                    Solicitar eliminação de dados tratados com base no consentimento
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Informação</h4>
                  <p className="text-sm text-muted-foreground">Obter informações sobre compartilhamento de dados</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Retenção */}
          <Card>
            <CardHeader>
              <CardTitle>8. Retenção de Dados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Mantemos seus dados pessoais pelo tempo necessário para:</p>

              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Cumprir as finalidades para as quais foram coletados</li>
                <li>Atender obrigações legais e regulamentares</li>
                <li>Exercer direitos em processos judiciais</li>
                <li>Garantir a segurança e integridade da plataforma</li>
              </ul>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Período mínimo:</strong> Dados de consultas psicológicas são mantidos por no mínimo 5 anos,
                  conforme exigência do Conselho Federal de Psicologia.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contato */}
          <Card>
            <CardHeader>
              <CardTitle>9. Contato e Exercício de Direitos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato:</p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">E-mail</p>
                    <p className="text-sm text-muted-foreground">privacidade@dating.com.br</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">Telefone</p>
                    <p className="text-sm text-muted-foreground">(11) 3000-0000</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">Endereço</p>
                    <p className="text-sm text-muted-foreground">
                      Rua das Flores, 123
                      <br />
                      São Paulo - SP, 01234-567
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">Prazo de Resposta</p>
                    <p className="text-sm text-muted-foreground">Até 15 dias úteis</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alterações */}
          <Card>
            <CardHeader>
              <CardTitle>10. Alterações nesta Política</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Esta Política de Proteção de Dados pode ser atualizada periodicamente para refletir mudanças em nossas
                práticas ou na legislação aplicável. Notificaremos sobre alterações significativas através de:
              </p>

              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>E-mail para o endereço cadastrado</li>
                <li>Notificação na plataforma</li>
                <li>Publicação da versão atualizada em nosso site</li>
              </ul>

              <p className="text-sm text-muted-foreground">
                Recomendamos que revise esta política regularmente para se manter informado sobre como protegemos seus
                dados.
              </p>
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
