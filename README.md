# Sistema de Consulta Psicológica com Análise Automatizada

Este projeto é uma plataforma de teleatendimento psicológico que permite a realização de consultas por vídeo entre psicólogos e pacientes, com recursos inovadores de transcrição automática e geração de insights utilizando inteligência artificial.

## 🎯 Objetivo

Facilitar e aprimorar o processo de triagem e acompanhamento psicológico remoto, utilizando tecnologia P2P para videochamadas e IA para análise de transcrições.

## ⚙️ Funcionalidades

### 1. Consulta por Vídeo (P2P)
- Chamadas realizadas diretamente entre navegador do psicólogo e paciente (arquitetura peer-to-peer);
- Suporte atual para até **2 participantes simultâneos**;
- Chamadas com duração de até **1 hora**.

### 2. Transcrição e Geração de Relatório
- Ao final da consulta, o áudio é transcrito automaticamente;
- O sistema utiliza GPT para gerar um relatório estruturado com base nas falas do paciente;
- O relatório segue o modelo de **DPT (Devolutiva de Triagem Psicológica)** com:
  - Identificação do paciente;
  - Resumo da anamnese;
  - Hipóteses diagnósticas;
  - Plano terapêutico inicial;
  - Plano de investimento (valores, frequência, etc);
  - Insights gerados pelo GPT para auxiliar o psicólogo;
  - Conformidade com a LGPD e ética profissional.

### 3. Experiência do Psicólogo
- Psicólogo pode customizar o formato do relatório;
- Recebe sugestões de diagnóstico e hipóteses com base nas falas do paciente;
- Pode gerar documentos a partir da triagem para registro profissional.

### 4. Interface do Paciente
- Ingresso fácil na videochamada via link;
- Fluxo simples e acessível para não gerar fricção.

## 🧠 Inteligência Artificial
- Utiliza o modelo GPT para interpretação semântica da transcrição;
- O prompt foi cuidadosamente estruturado para respeitar padrões éticos e clínicos;
- Insights são sugeridos apenas com base nas **falas do paciente**.

## 🔐 Segurança e LGPD
- Nenhuma transcrição é usada fora do contexto da consulta;
- Somente profissionais com CRP têm acesso aos documentos gerados;
- Transparência e ética são prioridade no manuseio de dados sensíveis.

## 🛠️ Tecnologias Utilizadas
- **Frontend:** React, Typescript, nextJS
- **Backend:** app router
- **Banco de Dados:** PostgreSQL/Supabase
- **Transcrição + IA:** OpenAI GPT + serviços de voz
- **Videochamada:** WebRTC (peer-to-peer)

## 🚀 Futuro
- Suporte a mais participantes (grupo terapêutico);
- Área do paciente com acesso aos documentos e histórico;
- Integração com prontuário eletrônico.
- Integração com api de video conferencia
- Historico de consulta mantendo coerencia e documentação sempre atualizada
- Area de exposição

## 📄 Licença
Projeto desenvolvido por Oscar Rodrigues, Cassio Almeida Jordan e Tatiane de Souza Pontes Correa. Todos os direitos reservados.



**Desenvolvido com carinho, foco em ética e inovação por Oscar Rodrigues 💙**

