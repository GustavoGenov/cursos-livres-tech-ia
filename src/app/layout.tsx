import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Cursos Livres Tech & I.A • Capacitação Prática, Apostilas e Livros",
  description:
    "Plataforma direta, honesta e sem enrolação de Cursos Livres Tech & I.A. Gustavo de Castro Bernardes Rosa - CNPJ: 26.807.315/0001-39 - Minas Gerais.",
  keywords: [
    "cursos livres tech e ia",
    "inteligência artificial",
    "apostilas de IA",
    "livros de tecnologia",
    "engenharia de prompts",
    "n8n automações",
    "capacitação profissional",
  ],
  authors: [{ name: "Gustavo de Castro Bernardes Rosa" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="flex flex-col min-h-screen bg-ice-50 text-navy-950 selection:bg-tealbrand-200 selection:text-tealbrand-900">
        <CartProvider>
          <Suspense
            fallback={
              <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6">
                <div className="font-bold text-navy-900">CURSOS LIVRES TECH & I.A</div>
              </header>
            }
          >
            <Navbar />
          </Suspense>

          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
            {children}
          </main>

          <CartDrawer />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
