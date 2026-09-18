"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  X,
  Trash2,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Zap,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatCurrency, calculateInstallment } from "@/lib/utils";

export function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    removeFromCart,
    subtotal,
    totalItems,
  } = useCart();

  if (!isDrawerOpen) return null;

  const installment = calculateInstallment(subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy-950/60 backdrop-blur-xs transition-opacity"
        onClick={closeDrawer}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header do Carrinho */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-navy-800" />
              <h2 className="font-bold text-navy-900 text-base">
                Seu Carrinho ({totalItems})
              </h2>
            </div>
            <button
              onClick={closeDrawer}
              className="p-1.5 rounded-lg text-slate-400 hover:text-navy-900 hover:bg-slate-200 transition-colors"
              aria-label="Fechar carrinho"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lista de Itens */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500 space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="font-medium text-navy-900 text-sm">
                  Seu carrinho está vazio
                </p>
                <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                  Conheça nossos materiais práticos de inteligência artificial com entrega imediata e sem pegadinhas.
                </p>
                <button
                  onClick={closeDrawer}
                  className="mt-2 px-4 py-2 bg-navy-900 text-white rounded-lg text-xs font-semibold hover:bg-navy-800 transition-colors"
                >
                  Explorar Materiais
                </button>
              </div>
            ) : (
              items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex gap-3.5 p-3 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all shadow-xs"
                >
                  {/* Miniatura da Capa */}
                  <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                    <img
                      src={product.images.cover}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Informações do Item */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-[10px] font-semibold text-tealbrand-700 uppercase">
                        <Zap className="w-3 h-3" />
                        {product.formatShort === "PDF" ? "Download Imediato" : "Área de Membros"}
                      </div>
                      <h4 className="text-xs font-bold text-navy-950 line-clamp-2 mt-0.5">
                        {product.title}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="font-extrabold text-navy-900 text-sm">
                        {formatCurrency(product.price)}
                      </div>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-slate-400 hover:text-red-600 p-1 transition-colors"
                        title="Remover do carrinho"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Rodapé do Carrinho com Total e CTA */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 space-y-3">
              {/* Aviso de Garantia */}
              <div className="flex items-center gap-2 text-[11px] text-tealbrand-800 bg-tealbrand-50 border border-tealbrand-200/60 px-3 py-1.5 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-tealbrand-600 flex-shrink-0" />
                <span>Garantia de 7 dias com devolução 100% integral</span>
              </div>

              {/* Subtotal */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Subtotal</span>
                  <span className="font-medium text-navy-900">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-base font-extrabold text-navy-950">
                  <span>Total</span>
                  <span className="text-lg text-emerald-600">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 text-right">
                  ou {installment.formatted}
                </p>
              </div>

              {/* Botão de Finalização */}
              <Link
                href="/checkout"
                onClick={closeDrawer}
                className="w-full py-3 px-4 rounded-xl bg-amberbrand-500 hover:bg-amberbrand-600 active:bg-amberbrand-700 text-navy-950 font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-cta hover:shadow-md transition-all"
              >
                <span>Finalizar Compra Segura</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <p className="text-[11px] text-center text-slate-400">
                Pagamento via Pix (instantâneo), Cartão ou Boleto
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
