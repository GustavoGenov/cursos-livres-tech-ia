"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { formatCurrency, calculateInstallment } from "@/lib/utils";
import { GuaranteeBadge } from "@/components/GuaranteeBadge";
import {
  Trash2,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Zap,
  Lock,
  ArrowLeft,
} from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const { items, removeFromCart, clearCart, subtotal, totalItems } = useCart();
  const installment = calculateInstallment(subtotal);

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-4">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-black text-navy-950">
          Seu carrinho está vazio
        </h1>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Navegue por nossas apostilas, livros e cursos práticos com entrega imediata e sem pegadinhas.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Ver Catálogo de Materiais</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Cabeçalho do Carrinho */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-navy-950">
            Carrinho de Compras
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Você tem {totalItems} {totalItems === 1 ? "item" : "itens"} selecionados
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-slate-500 hover:text-red-600 flex items-center gap-1 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Esvaziar Carrinho</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Tabela de Produtos (8 colunas) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs space-y-4">
          <div className="divide-y divide-slate-100">
            {items.map(({ product }) => (
              <div
                key={product.id}
                className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-20 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                    <img
                      src={product.images.cover}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-tealbrand-700 uppercase bg-tealbrand-50 px-2 py-0.5 rounded">
                      {product.format}
                    </span>
                    <h3 className="font-bold text-navy-950 text-sm sm:text-base leading-snug">
                      {product.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {product.pagesOrDuration} • Entrega Imediata
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-6 sm:pl-4">
                  <div className="text-right">
                    <div className="font-extrabold text-navy-950 text-base">
                      {formatCurrency(product.price)}
                    </div>
                    <span className="text-[11px] text-emerald-600 font-medium block">
                      Pix instantâneo
                    </span>
                  </div>

                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remover item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-tealbrand-700 hover:text-tealbrand-900 font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Adicionar mais materiais à sacola</span>
            </Link>
          </div>
        </div>

        {/* Resumo do Pedido (4 colunas) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <h3 className="font-bold text-navy-950 text-base border-b border-slate-100 pb-3">
            Resumo da Compra
          </h3>

          <div className="space-y-2.5 text-xs text-slate-600">
            <div className="flex items-center justify-between">
              <span>Subtotal ({totalItems} itens)</span>
              <span className="font-semibold text-navy-900">
                {formatCurrency(subtotal)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Frete / Envio Digital</span>
              <span className="font-bold text-emerald-600 uppercase text-[11px]">
                Grátis (Download Imediato)
              </span>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-4 space-y-1">
            <div className="flex items-baseline justify-between text-navy-950">
              <span className="font-bold text-sm">Valor Total:</span>
              <span className="text-2xl font-black text-emerald-600">
                {formatCurrency(subtotal)}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 text-right">
              ou {installment.formatted}
            </p>
          </div>

          <button
            onClick={() => router.push("/checkout")}
            className="w-full py-3.5 px-4 rounded-xl bg-amberbrand-500 hover:bg-amberbrand-600 active:bg-amberbrand-700 text-navy-950 font-black text-base flex items-center justify-center gap-2 shadow-cta hover:shadow-lg transition-all"
          >
            <span>Prosseguir para Checkout</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <GuaranteeBadge variant="compact" className="w-full justify-center" />

          <div className="text-[11px] text-slate-400 text-center space-y-1 pt-1">
            <p className="flex items-center justify-center gap-1">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              Ambiente criptografado com SSL de 256 bits
            </p>
            <p>Processamento seguro via Mercado Pago</p>
          </div>
        </div>
      </div>
    </div>
  );
}
