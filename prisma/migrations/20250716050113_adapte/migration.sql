-- DropIndex
DROP INDEX "Consents_Agreements_cpf_consent_key";

-- DropIndex
DROP INDEX "Consents_Agreements_ipNumber_key";

-- DropIndex
DROP INDEX "Paciente_cpf_key";

-- DropIndex
DROP INDEX "cookies_consent_ipNumber_key";

-- AlterTable
ALTER TABLE "Paciente" ADD COLUMN     "result_amnp" TEXT[],
ADD COLUMN     "resumo_anmp" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "pontuacao" INTEGER[];

-- CreateTable
CREATE TABLE "PrePaciente" (
    "id" TEXT NOT NULL,
    "nome" TEXT,
    "email" TEXT,
    "endereco" TEXT,
    "nascimento" TEXT,
    "idade" TEXT,
    "cpf" TEXT,
    "telefone" TEXT,
    "emergencia" TEXT,
    "generoOrientacao" TEXT,
    "estadoCivil" TEXT,
    "origemConhecimento" TEXT,
    "preocupacao" TEXT,
    "motivoAtendimento" TEXT,
    "experienciaAnterior" TEXT,
    "saudeFisica" TEXT,
    "detalhesSaudeFisica" TEXT,
    "medicamentos" TEXT,
    "diagnosticoMental" TEXT,
    "historicoFamiliar" TEXT,
    "rotina" TEXT,
    "sono" TEXT,
    "atividadeFisica" TEXT,
    "estresse" TEXT,
    "convivencia" TEXT,
    "relacaoFamiliar" TEXT,
    "apoioSocial" TEXT,
    "nivelFelicidade" TEXT,
    "ansiedade" TEXT,
    "pensamentosNegativos" TEXT,
    "objetivoTerapia" TEXT,
    "temasDelicados" TEXT,
    "estiloAtendimento" TEXT,
    "observacoesFinais" TEXT,
    "autorizacaoLGPD" BOOLEAN,
    "habilitado" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "psicologoId" TEXT,

    CONSTRAINT "PrePaciente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Avaliacao" (
    "id" TEXT NOT NULL,
    "audio" INTEGER NOT NULL,
    "video" INTEGER NOT NULL,
    "experienciaGeral" INTEGER NOT NULL,
    "avaliacaoProfissional" INTEGER NOT NULL,
    "comentario" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "psicologoId" TEXT NOT NULL,

    CONSTRAINT "Avaliacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcessoAnamneseTemp" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "ip" TEXT,
    "acessado_em" TIMESTAMP(3),
    "psicologoId" TEXT,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AcessoAnamneseTemp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "model_doc" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "psicologoId" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,

    CONSTRAINT "model_doc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base_cientific" (
    "id" TEXT NOT NULL,
    "psicologoId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "url_capa" TEXT,
    "resumo" TEXT NOT NULL,

    CONSTRAINT "base_cientific_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prontuario" (
    "id" TEXT NOT NULL,
    "pacienteId" TEXT NOT NULL,
    "queixaPrincipal" TEXT,
    "historico" TEXT,
    "conduta" TEXT,
    "evolucao" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prontuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Historico" (
    "id" TEXT NOT NULL,
    "psicologoId" TEXT NOT NULL,
    "userName" TEXT,
    "descricao" TEXT,
    "tipo" TEXT DEFAULT 'geral',
    "timestamp" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Historico_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AcessoAnamneseTemp_token_key" ON "AcessoAnamneseTemp"("token");

-- CreateIndex
CREATE UNIQUE INDEX "prontuario_pacienteId_key" ON "prontuario"("pacienteId");

-- AddForeignKey
ALTER TABLE "prontuario" ADD CONSTRAINT "prontuario_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
