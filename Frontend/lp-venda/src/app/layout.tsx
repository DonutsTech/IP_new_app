import type { Metadata } from "next";
import "./globals.scss";
import { IsMobileProvider } from "@/context/isMobileContext";
import Footer from "@/components/Footer";
import { AccessTypeProvider } from "@/context/AccessTypeContext";

export const metadata: Metadata = {
  title: "InteractiPlay - Edição de Vídeo para Vendas",
  description:
    "InteractiPlay é uma plataforma de edição de vídeo e criaçao de VSL para vendas que oferece recursos avançados para resultados profissionais.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
        <AccessTypeProvider>
          <IsMobileProvider>
            <body>
              {children}
              <Footer />
            </body>
          </IsMobileProvider>
        </AccessTypeProvider>
    </html>
  );
}
