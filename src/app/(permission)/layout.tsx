// src/app/layout.tsx
import type { Metadata } from "next";
import '../../app/globals.css'
import { ToastContainer } from 'react-toastify';

// ⚠️ NÃO use useSession nem outros hooks aqui
import AuthProvider from "../context/AuthProvider";
import { ThemeProvider } from "@/components/theme-provider";


export const metadata: Metadata = {
  title: "Tivi AI - Consultas Inteligentes",
  description:
    "Tivi AI é um sistema inteligente que transforma suas consultas online com transcrição, trazendo insights com inteligência artificial",
  keywords:
    "inteligência artificial, reuniões, transcrição automática, agendamento inteligente, produtividade, assistente virtual",
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
< div suppressHydrationWarning>

    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <ToastContainer/>
        {children}
      </ThemeProvider>
    </AuthProvider>
</div>

  );
}

