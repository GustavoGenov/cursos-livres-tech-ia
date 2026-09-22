"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, X, Check, ArrowDownUp, SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";
import { CATEGORIES, DELIVERY_FORMATS } from "@/data/products";

interface ProductFiltersProps {
  totalResults: number;
}

export function ProductFilters({ totalResults }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  const currentCategory = searchParams.get("categoria") || "Todas";
  const currentFormat = searchParams.get("formato") || "Todos";
  const currentPriceRange = searchParams.get("preco") || "todos";
  const currentSort = searchParams.get("ordem") || "relevancia";
  const searchQuery = searchParams.get("q") || "";

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "Todas" && value !== "Todos" && value !== "todos") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push("/");
  };

  const hasActiveFilters =
    currentCategory !== "Todas" ||
    currentFormat !== "Todos" ||
    currentPriceRange !== "todos" ||
    searchQuery !== "";

  const activeFiltersCount =
    (currentCategory !== "Todas" ? 1 : 0) +
    (currentFormat !== "Todos" ? 1 : 0) +
    (currentPriceRange !== "todos" ? 1 : 0) +
    (searchQuery ? 1 : 0);

  return (
    <aside className="space-y-4 lg:space-y-6">
      {/* Cabeçalho dos Filtros com Toggle Mobile */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <button
          type="button"
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          className="flex items-center gap-2 font-bold text-navy-900 text-sm text-left lg:pointer-events-none group"
        >
          <SlidersHorizontal className="w-4 h-4 text-tealbrand-600 flex-shrink-0" />
          <span>Filtros & Ordenação</span>
          {activeFiltersCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-black bg-amberbrand-500 text-navy-950 shadow-xs">
              {activeFiltersCount}
            </span>
          )}
        </button>

        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-navy-600 hover:text-red-600 flex items-center gap-1 font-medium transition-colors"
            >
              <X className="w-3 h-3" />
              Limpar
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsOpenMobile(!isOpenMobile)}
            className="lg:hidden p-1 rounded-md text-navy-700 hover:bg-slate-100 transition-colors flex items-center gap-1 text-xs font-semibold"
            aria-label={isOpenMobile ? "Recolher filtros" : "Expandir filtros"}
          >
            <span className="text-[11px] text-slate-500">
              {isOpenMobile ? "Ocultar" : "Mostrar"}
            </span>
            {isOpenMobile ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Conteúdo dos Filtros (Sempre visível em desktop, expansível no mobile) */}
      <div className={`${isOpenMobile ? "block" : "hidden lg:block"} space-y-6 pt-1`}>

      {/* Resultado da Busca Ativa (se houver) */}
      {searchQuery && (
        <div className="p-2.5 rounded-lg bg-tealbrand-50 border border-tealbrand-200 text-xs text-tealbrand-900">
          <span className="text-[11px] block text-tealbrand-700">Buscando por:</span>
          <div className="font-bold flex items-center justify-between mt-0.5">
            <span>&ldquo;{searchQuery}&rdquo;</span>
            <button
              onClick={() => updateParam("q", "")}
              className="hover:text-red-700 p-0.5"
              title="Remover termo de busca"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Filtro 1: Categorias */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-navy-800">
            Categorias ({CATEGORIES.length - 1})
          </h4>
        </div>
        <div className="space-y-1 max-h-64 overflow-y-auto pr-1">
          {CATEGORIES.map((cat) => {
            const isSelected = currentCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => updateParam("categoria", cat)}
                className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs font-medium flex items-center justify-between transition-colors ${
                  isSelected
                    ? "bg-navy-900 text-white font-bold"
                    : "hover:bg-slate-100 text-navy-700"
                }`}
              >
                <span>{cat}</span>
                {isSelected && <Check className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filtro 2: Formato de Entrega */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-navy-800">
          Formato de Entrega
        </h4>
        <div className="space-y-1">
          {DELIVERY_FORMATS.map((fmt) => {
            const isSelected = currentFormat === fmt;
            return (
              <button
                key={fmt}
                onClick={() => updateParam("formato", fmt)}
                className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs font-medium flex items-center justify-between transition-colors ${
                  isSelected
                    ? "bg-tealbrand-800 text-white font-bold"
                    : "hover:bg-slate-100 text-navy-700"
                }`}
              >
                <span>{fmt}</span>
                {isSelected && <Check className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filtro 3: Faixa de Preço Real */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-navy-800">
          Faixa de Preço
        </h4>
        <div className="space-y-1">
          {[
            { id: "todos", label: "Todos os valores" },
            { id: "ate-35", label: "Até R$ 35,00" },
            { id: "35-50", label: "R$ 35,00 a R$ 50,00" },
            { id: "50-100", label: "R$ 50,00 a R$ 100,00" },
            { id: "acima-100", label: "Acima de R$ 100,00" },
          ].map((tier) => {
            const isSelected = currentPriceRange === tier.id;
            return (
              <button
                key={tier.id}
                onClick={() => updateParam("preco", tier.id)}
                className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs font-medium flex items-center justify-between transition-colors ${
                  isSelected
                    ? "bg-slate-200 text-navy-950 font-bold"
                    : "hover:bg-slate-100 text-navy-700"
                }`}
              >
                <span>{tier.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-navy-900" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filtro 4: Ordenação */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-navy-800 flex items-center gap-1">
          <ArrowDownUp className="w-3 h-3 text-slate-500" />
          <span>Ordenar Por</span>
        </h4>
        <select
          value={currentSort}
          onChange={(e) => updateParam("ordem", e.target.value)}
          className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg text-navy-800 focus:outline-none focus:ring-1 focus:ring-navy-600 font-medium"
        >
          <option value="relevancia">Mais Relevantes</option>
          <option value="menor-preco">Menor Preço</option>
          <option value="maior-preco">Maior Preço</option>
          <option value="mais-vendidos">Mais Vendidos</option>
        </select>
      </div>

        {/* Totalizador & Compromisso de Honestidade */}
        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 text-[11px] text-slate-600 space-y-1">
          <div className="font-semibold text-navy-900">
            {totalResults} {totalResults === 1 ? "produto encontrado" : "produtos encontrados"}
          </div>
          <p className="text-[10px] text-slate-500 leading-tight">
            Nenhum anúncio patrocinado ou produto descontextualizado é injetado nesta listagem.
          </p>
        </div>
      </div>
    </aside>
  );
}
