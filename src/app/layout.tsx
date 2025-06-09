import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })


export const metadata: Metadata = {
  title: "Tivi AI - Consultas Inteligentes",
  description:
    "Tivi AI é um sistema inteligente que transforma suas consultas online com transcrição, trazendo insights com inteligência artificial",
  keywords:
    `inteligência artificial, reuniões, transcrição automática,
     agendamento inteligente, produtividade, assistente virtual,psicologia,psicologos,
     nr1,saudeocupacional, saúde emocional,chat gpt, agente de ia `,
  robots: "index, follow",
  openGraph: {
    title: "Tivi AI - Revolucione Suas Reuniões",
    description:
      "Aumente sua produtividade com o Tivi AI, o assistente inteligente para reuniões que transcreve, agenda e fornece insights em tempo real.",
    url: "https://tivi.ai",
    type: "website",
    locale: "PT_BR",
    siteName: "Tivi AI",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
