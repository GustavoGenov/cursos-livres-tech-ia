"use client";
import React, { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useProducts } from "@/context/ProductsContext";
import { ProductCard } from "@/components/ProductCard";
import { ProductFilters } from "@/components/ProductFilters";
import { GuaranteeBadge } from "@/components/GuaranteeBadge";
import { Sparkles, ShieldCheck, Zap, BookOpen, AlertCircle } from "lucide-react";

function ProductCatalog() {
  const searchParams = useSearchParams();
  const { products } = useProducts();

  const searchQuery = searchParams.get("q")?.toLowerCase().trim() || "";
  const categoryFilter = searchParams.get("categoria") || "Todas";
  const formatFilter = searchParams.get("formato") || "Todos";
  const priceFilter = searchParams.get("preco") || "todos";
  const sortFilter = searchParams.get("ordem") || "relevancia";

  // Filtragem estrita e honesta (Regra de Ouro da Busca)
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 1. Busca textual
      if (searchQuery) {
        const matchesTitle = product.title.toLowerCase().includes(searchQuery);
        const matchesSubtitle = product.subtitle.toLowerCase().includes(searchQuery);
        const matchesCategory = product.category.toLowerCase().includes(searchQuery);
        const matchesTopics = product.whatYouWillLearn.some((t) =>
          t.toLowerCase().includes(searchQuery)
        );
        if (!matchesTitle && !matchesSubtitle && !matchesCategory && !matchesTopics) {
          return false;
        }
      }

      // 2. Categoria estrita
      if (categoryFilter !== "Todas" && product.category !== categoryFilter) {
        return false;
      }

      // 3. Formato de entrega
      if (formatFilter !== "Todos" && product.format !== formatFilter) {
        return false;
      }

      // 4. Faixa de preço real
      if (priceFilter === "ate-35" && product.price > 35) return false;
      if (priceFilter === "35-50" && (product.price < 35 || product.price > 50)) return false;
      if (priceFilter === "50-100" && (product.price < 50 || product.price > 100)) return false;
      if (priceFilter === "acima-100" && product.price <= 100) return false;

      return true;
    }).sort((a, b) => {
      if (sortFilter === "menor-preco") return a.price - b.price;
      if (sortFilter === "maior-preco") return b.price - a.price;
      if (sortFilter === "mais-vendidos") {
        return (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0);
      }
      return 0; // relevância padrão
    });
  }, [searchQuery, categoryFilter, formatFilter, priceFilter, sortFilter]);

  return (
    <div className="space-y-6">
      {/* Banner de Autoridade, Foco & Símbolo do Texugo */}
      <section className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white rounded-2xl p-6 sm:p-8 border border-navy-800 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-4xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amberbrand-500/20 border border-amberbrand-500/40 text-amberbrand-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amberbrand-400" />
              <span>Símbolo do Texugo: Resiliência, Foco & Zero Enrolação</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
              Capacitação Prática em Tecnologia & Inteligência Artificial
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Zero pop-ups invasivos. Zero contadores falsos de escassez. Aqui você encontra apostilas, livros digitais e treinamentos desenvolvidos com foco estritamente técnico e prático, com entrega imediata e 7 dias de garantia incondicional pelo Código de Defesa do Consumidor.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 text-tealbrand-300">
                <Zap className="w-4 h-4 text-amberbrand-400" />
                Download instantâneo no Pix
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Devolução 100% integral garantida (Art. 49 CDC)
              </span>
            </div>
          </div>

          {/* Destaque Visual do Símbolo do Texugo */}
          <div className="flex-shrink-0 flex items-center gap-3 bg-navy-900/90 border border-amberbrand-500/30 p-3 rounded-2xl shadow-xl">
            <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-amberbrand-400 shadow-inner flex-shrink-0">
              <img
                src="/images/logo-texugo.jpg"
                alt="Símbolo Oficial da Loja - O Texugo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-xs space-y-0.5">
              <div className="font-extrabold text-white text-xs uppercase tracking-wider">
                O Texugo Tech
              </div>
              <div className="text-[11px] text-amberbrand-300 font-semibold">
                Símbolo Oficial
              </div>
              <div className="text-[10px] text-slate-400 max-w-[140px] leading-tight">
                Imparável contra o hype, focado em conhecimento real.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Principal: Filtros Estritos (Esquerda) + Produtos (Direita) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 items-start">
        {/* Painel de Filtros */}
        <div className="lg:col-span-1 bg-white p-5 rounded-xl border border-slate-200 shadow-xs sticky top-24">
          <ProductFilters totalResults={filteredProducts.length} />
        </div>

        {/* Listagem de Produtos */}
        <div className="lg:col-span-3 space-y-4">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <AlertCircle className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-bold text-navy-950">
                  Nenhum material encontrado com esses filtros
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 leading-relaxed">
                  Não empurramos produtos aleatórios quando a sua busca é específica. Tente alterar os filtros ou clique abaixo para ver o catálogo completo.
                </p>
              </div>
              <a
                href="/"
                className="inline-block px-4 py-2 rounded-lg bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 transition-colors"
              >
                Limpar Todos os Filtros
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Selo de Garantia Global na Base do Catálogo */}
          <div className="pt-6">
            <GuaranteeBadge variant="full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="py-12 text-center text-slate-400 text-sm">
          Carregando catálogo honesto e direto...
        </div>
      }
    >
      <ProductCatalog />
    </Suspense>
  );
}
