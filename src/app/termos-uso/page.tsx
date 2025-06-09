import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FileText, ArrowLeft, Scale, Shield, AlertTriangle, Users } from "lucide-react"
import Link from "next/link"

export default function TermosUsoPage() {
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
                <FileText className="h-6 w-6 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Termos de Uso e Privacidade</h1>
            <p className="text-muted-foreground text-lg">Condições gerais de uso da plataforma Dating</p>
            <p className="text-sm text-muted-foreground mt-2">Última atualização: 15 de janeiro de 2024</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Aceitação dos Termos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5" />
                1. Aceitação dos Termos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Ao acessar e utilizar a plataforma <strong>Dating - Plataforma Psicológica</strong>, você concorda em
                cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos,
                não deve utilizar nossos serviços.
              </p>
              <p>
                Estes termos constituem um acordo legal entre você e a Dating, estabelecendo os direitos e obrigações de
                ambas as partes.
              </p>
            </CardContent>
          </Card>

          {/* Definições */}
          <Card>
            <CardHeader>
              <CardTitle>2. Definições</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold">Plataforma:</h4>
                  <p className="text-muted-foreground">
                    O sistema online Dating que conecta psicólogos e pacientes para consultas psicológicas.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold">Usuário:</h4>
                  <p className="text-muted-foreground">
                    Qualquer pessoa que acesse ou utilize a plataforma, incluindo psicólogos e pacientes.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold">Psicólogo:</h4>
                  <p className="text-muted-foreground">
                    Profissional registrado no Conselho Regional de Psicologia (CRP) que oferece serviços através da
                    plataforma.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold">Paciente:</h4>
                  <p className="text-muted-foreground">
                    Pessoa que busca ou recebe serviços psicológicos através da plataforma.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold">Serviços:</h4>
                  <p className="text-muted-foreground">
                    Consultas psicológicas, agendamentos, comunicação e demais funcionalidades oferecidas pela
                    plataforma.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Elegibilidade */}
          <Card>
            <CardHeader>
              <CardTitle>3. Elegibilidade e Cadastro</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">3.1 Requisitos Gerais</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Ser maior de 18 anos ou ter autorização dos responsáveis legais</li>
                  <li>Fornecer informações verdadeiras e atualizadas</li>
                  <li>Manter a confidencialidade de suas credenciais de acesso</li>
                  <li>Utilizar a plataforma de forma ética e legal</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">3.2 Requisitos para Psicólogos</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Possuir registro ativo no Conselho Regional de Psicologia (CRP)</li>
                  <li>Comprovar formação em Psicologia por instituição reconhecida</li>
                  <li>Apresentar documentação válida e atualizada</li>
                  <li>Cumprir o Código de Ética Profissional do Psicólogo</li>
                  <li>Manter seguro profissional de responsabilidade civil</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Responsabilidades dos Usuários */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                4. Responsabilidades dos Usuários
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">4.1 Responsabilidades Gerais</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Utilizar a plataforma apenas para fins legítimos</li>
                  <li>Respeitar os direitos de outros usuários</li>
                  <li>Não compartilhar conteúdo ofensivo, ilegal ou inadequado</li>
                  <li>Manter a confidencialidade das informações acessadas</li>
                  <li>Reportar qualquer uso inadequado da plataforma</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">4.2 Responsabilidades dos Psicólogos</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Prestar serviços com qualidade e ética profissional</li>
                  <li>Manter sigilo profissional conforme legislação</li>
                  <li>Cumprir horários agendados ou comunicar alterações</li>
                  <li>Manter registro adequado dos atendimentos</li>
                  <li>Seguir as diretrizes do Conselho Federal de Psicologia</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">4.3 Responsabilidades dos Pacientes</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Fornecer informações verdadeiras sobre sua condição</li>
                  <li>Comparecer aos horários agendados</li>
                  <li>Comunicar cancelamentos com antecedência</li>
                  <li>Respeitar as orientações profissionais</li>
                  <li>Efetuar pagamentos conforme acordado</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Uso da Plataforma */}
          <Card>
            <CardHeader>
              <CardTitle>5. Uso da Plataforma</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">5.1 Licença de Uso</h4>
                <p className="text-muted-foreground">
                  Concedemos a você uma licença limitada, não exclusiva e revogável para usar a plataforma conforme
                  estes termos.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">5.2 Restrições de Uso</h4>
                <p className="text-muted-foreground mb-2">É expressamente proibido:</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Usar a plataforma para atividades ilegais</li>
                  <li>Tentar acessar áreas restritas do sistema</li>
                  <li>Interferir no funcionamento da plataforma</li>
                  <li>Copiar, modificar ou distribuir o conteúdo sem autorização</li>
                  <li>Criar contas falsas ou usar identidades fictícias</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Pagamentos */}
          <Card>
            <CardHeader>
              <CardTitle>6. Pagamentos e Cancelamentos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">6.1 Valores e Pagamentos</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Os valores são definidos pelos psicólogos individualmente</li>
                  <li>Pagamentos devem ser efetuados conforme acordado</li>
                  <li>A plataforma pode cobrar taxas de serviço</li>
                  <li>Todos os valores incluem impostos aplicáveis</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">6.2 Política de Cancelamento</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Cancelamentos com 24h de antecedência: reembolso integral</li>
                  <li>Cancelamentos com menos de 24h: sujeito a cobrança</li>
                  <li>Não comparecimento: cobrança integral da consulta</li>
                  <li>Emergências médicas: análise caso a caso</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Privacidade */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                7. Privacidade e Confidencialidade
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">7.1 Sigilo Profissional</h4>
                <p className="text-muted-foreground">
                  Todas as informações compartilhadas durante as consultas estão protegidas pelo sigilo profissional,
                  conforme o Código de Ética do Psicólogo e legislação aplicável.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">7.2 Proteção de Dados</h4>
                <p className="text-muted-foreground">
                  Seus dados pessoais são protegidos conforme nossa Política de Proteção de Dados e a Lei Geral de
                  Proteção de Dados (LGPD).
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">7.3 Gravação de Sessões</h4>
                <p className="text-muted-foreground">
                  Sessões podem ser gravadas apenas com consentimento expresso de ambas as partes, para fins de
                  documentação ou supervisão profissional.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Limitações */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                8. Limitações de Responsabilidade
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">8.1 Limitações da Plataforma</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>A plataforma é um meio de conexão, não prestadora de serviços psicológicos</li>
                  <li>Não garantimos disponibilidade 100% do tempo</li>
                  <li>Não somos responsáveis por falhas técnicas de terceiros</li>
                  <li>Não validamos a qualidade dos serviços prestados</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">8.2 Emergências</h4>
                <p className="text-muted-foreground">
                  A plataforma não deve ser utilizada para situações de emergência. Em casos de crise, procure
                  imediatamente o serviço de emergência local (SAMU 192, Bombeiros 193) ou o Centro de Valorização da
                  Vida (CVV 188).
                </p>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <p className="text-sm font-semibold text-red-800 dark:text-red-200">
                  IMPORTANTE: Esta plataforma não substitui atendimento presencial em situações de emergência
                  psiquiátrica ou risco de vida.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Propriedade Intelectual */}
          <Card>
            <CardHeader>
              <CardTitle>9. Propriedade Intelectual</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Todo o conteúdo da plataforma, incluindo textos, gráficos, logos, ícones, imagens, clipes de áudio,
                downloads digitais e software, é propriedade da Dating ou de seus fornecedores de conteúdo e está
                protegido por leis de direitos autorais.
              </p>

              <div>
                <h4 className="font-semibold mb-2">9.1 Conteúdo do Usuário</h4>
                <p className="text-muted-foreground">
                  Você mantém os direitos sobre o conteúdo que criar ou compartilhar na plataforma, mas nos concede
                  licença para usar, modificar e exibir esse conteúdo conforme necessário para operar o serviço.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Modificações */}
          <Card>
            <CardHeader>
              <CardTitle>10. Modificações dos Termos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. As alterações entrarão em
                vigor imediatamente após a publicação na plataforma.
              </p>

              <div>
                <h4 className="font-semibold mb-2">10.1 Notificação de Alterações</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Notificação por e-mail para usuários registrados</li>
                  <li>Aviso na plataforma por 30 dias</li>
                  <li>Publicação da data da última atualização</li>
                </ul>
              </div>

              <p className="text-muted-foreground">
                O uso continuado da plataforma após as modificações constitui aceitação dos novos termos.
              </p>
            </CardContent>
          </Card>

          {/* Rescisão */}
          <Card>
            <CardHeader>
              <CardTitle>11. Rescisão</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">11.1 Rescisão pelo Usuário</h4>
                <p className="text-muted-foreground">
                  Você pode encerrar sua conta a qualquer momento, entrando em contato conosco ou através das
                  configurações da plataforma.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">11.2 Rescisão pela Dating</h4>
                <p className="text-muted-foreground">
                  Podemos suspender ou encerrar sua conta em caso de violação destes termos, atividade fraudulenta ou
                  por outros motivos justificados.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">11.3 Efeitos da Rescisão</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Perda de acesso à plataforma</li>
                  <li>Cancelamento de consultas agendadas</li>
                  <li>Retenção de dados conforme política de privacidade</li>
                  <li>Cumprimento de obrigações pendentes</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Lei Aplicável */}
          <Card>
            <CardHeader>
              <CardTitle>12. Lei Aplicável e Foro</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Qualquer disputa
                decorrente destes termos será submetida ao foro da comarca de São Paulo, Estado de São Paulo.
              </p>

              <div>
                <h4 className="font-semibold mb-2">12.1 Resolução de Conflitos</h4>
                <p className="text-muted-foreground">
                  Encorajamos a resolução amigável de conflitos através de nossos canais de atendimento antes de
                  recorrer a medidas judiciais.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contato */}
          <Card>
            <CardHeader>
              <CardTitle>13. Contato</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Para dúvidas sobre estes Termos de Uso, entre em contato:</p>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold">E-mail:</h4>
                  <p className="text-muted-foreground">juridico@dating.com.br</p>
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
                  <h4 className="font-semibold">Horário de Atendimento:</h4>
                  <p className="text-muted-foreground">
                    Segunda a Sexta: 9h às 18h
                    <br />
                    Sábado: 9h às 12h
                  </p>
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
