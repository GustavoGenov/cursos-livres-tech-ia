"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  ShoppingCart,
  UserCheck,
  ShieldCheck,
  BookOpen,
  Sparkles,
  Zap,
  Menu,
  X,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CATEGORIES } from "@/data/products";

export function Navbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { totalItems, openDrawer } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      router.push(`/?q=${encodeURIComponent(query)}`);
    } else {
      router.push("/");
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      {/* Top Banner de Transparência & Confiança */}
      <div className="bg-navy-900 text-white text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-tealbrand-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              Ambiente 100% Seguro & Transparente
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:inline text-slate-300">
              Entrega Imediata no Pix & Cartão • Sem pegadinhas
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] sm:text-xs text-slate-300">
            <Link
              href="/sobre-nos"
              className="hover:text-tealbrand-300 transition-colors"
            >
              Sobre Nós
            </Link>
            <span>•</span>
            <Link
              href="/reembolso-e-garantia"
              className="hover:text-tealbrand-300 transition-colors"
            >
              Garantia 7 Dias
            </Link>
          </div>
        </div>
      </div>

      {/* Barra Principal estilo Mercado Livre Enxuto */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          {/* Logo com Símbolo do Texugo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden border-2 border-amberbrand-400/80 shadow-md group-hover:scale-105 transition-transform flex-shrink-0 bg-navy-950">
              <img
                src="/images/logo-texugo.jpg"
                alt="Símbolo Texugo - Cursos Livres Tech & I.A"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-base sm:text-lg tracking-tight text-navy-950 flex items-center gap-1.5">
                CURSOS LIVRES
                <span className="text-[11px] font-black uppercase tracking-wider bg-amberbrand-500 text-navy-950 px-1.5 py-0.5 rounded shadow-xs">
                  TECH & I.A
                </span>
              </span>
              <span className="text-[11px] text-navy-600 font-semibold -mt-0.5 hidden sm:inline">
                Capacitação Prática • Honesta & Direta
              </span>
            </div>
          </Link>

          {/* Busca Direta e Estrita */}
          <form
            onSubmit={handleSearch}
            className="flex-1 max-w-2xl relative hidden md:block"
          >
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Buscar por apostila, livro ou tema de IA..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-navy-700 rounded-lg text-sm text-navy-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-100 transition-all shadow-inner"
              />
              <button
                type="submit"
                className="absolute right-1 px-3 py-1.5 bg-navy-900 hover:bg-navy-800 text-white rounded-md text-xs font-semibold flex items-center gap-1 transition-colors"
                title="Buscar produtos"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Buscar</span>
              </button>
            </div>
          </form>

          {/* Botões de Ação Direta */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Área do Aluno / Meus Pedidos */}
            <Link
              href="/area-do-aluno"
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 hover:border-navy-400 hover:bg-slate-50 text-navy-800 text-xs sm:text-sm font-semibold transition-all"
            >
              <UserCheck className="w-4 h-4 text-tealbrand-600" />
              <span className="hidden lg:inline">Área do Aluno</span>
              <span className="lg:hidden">Meus Pedidos</span>
            </Link>

            {/* Carrinho */}
            <button
              onClick={openDrawer}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-lg bg-navy-900 hover:bg-navy-800 text-white text-xs sm:text-sm font-semibold transition-all shadow-sm"
              aria-label="Abrir carrinho de compras"
            >
              <ShoppingCart className="w-4 h-4 text-amberbrand-300" />
              <span className="hidden sm:inline">Carrinho</span>
              {totalItems > 0 && (
                <span className="w-5 h-5 rounded-full bg-amberbrand-500 text-navy-950 font-extrabold text-xs flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Botão Menu Mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg border border-slate-200 text-navy-800"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Busca no Mobile */}
        <div className="mt-3 md:hidden">
          <form onSubmit={handleSearch} className="relative flex items-center">
            <input
              type="text"
              placeholder="Buscar por apostila, livro ou curso..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-3 pr-10 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-100"
            />
            <button
              type="submit"
              className="absolute right-1.5 p-1.5 text-navy-700 hover:text-navy-900"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Menu de Categorias Rápidas */}
      <nav className="bg-slate-50 border-t border-slate-200/80 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto no-scrollbar py-2 text-xs font-medium text-navy-700">
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider mr-2 hidden sm:inline">
              Navegar:
            </span>
            {CATEGORIES.map((cat) => {
              const isActive =
                cat === "Todas"
                  ? !searchParams.get("categoria")
                  : searchParams.get("categoria") === cat;
              return (
                <Link
                  key={cat}
                  href={cat === "Todas" ? "/" : `/?categoria=${encodeURIComponent(cat)}`}
                  className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                    isActive
                      ? "bg-navy-900 text-white font-bold"
                      : "hover:bg-slate-200 text-navy-700"
                  }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-4 text-slate-500 text-[11px]">
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-amberbrand-500" />
              Download Instantâneo
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-tealbrand-600" />
              Garantia 7 Dias CDC
            </span>
          </div>
        </div>
      </nav>

      {/* Menu Mobile gaveta suspensa */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 p-4 space-y-3">
          <div className="font-semibold text-xs text-navy-500 uppercase">
            Links Institucionais
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm text-navy-800">
            <Link
              href="/area-do-aluno"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded bg-slate-50 hover:bg-slate-100 font-medium"
            >
              🎓 Área do Aluno
            </Link>
            <Link
              href="/sobre-nos"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded bg-slate-50 hover:bg-slate-100 font-medium"
            >
              📰 Sobre Nós
            </Link>
            <Link
              href="/termos-de-uso"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded bg-slate-50 hover:bg-slate-100 font-medium"
            >
              ⚖️ Termos de Uso
            </Link>
            <Link
              href="/politica-de-privacidade"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded bg-slate-50 hover:bg-slate-100 font-medium"
            >
              🔒 Privacidade LGPD
            </Link>
            <Link
              href="/reembolso-e-garantia"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded bg-slate-50 hover:bg-slate-100 font-medium"
            >
              🛡️ Reembolso & Garantia
            </Link>
            <Link
              href="/fale-conosco"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded bg-slate-50 hover:bg-slate-100 font-medium"
            >
              💬 Fale Conosco
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
