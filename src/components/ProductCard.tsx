"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Zap,
  FileText,
  Video,
  ShieldCheck,
  CheckCircle2,
  ShoppingCart,
  ArrowRight,
} from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { formatCurrency, calculateInstallment } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const installment = calculateInstallment(product.price);

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, false);
    router.push("/checkout");
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <div className="group bg-white rounded-xl border border-slate-200 hover:border-navy-400/80 hover:shadow-hover transition-all duration-200 flex flex-col overflow-hidden">
      {/* Imagem / Capa com Badges */}
      <Link
        href={`/produto/${product.slug}`}
        className="relative aspect-4/3 bg-slate-100 overflow-hidden block border-b border-slate-100"
      >
        <img
          src={product.images.cover}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          loading="lazy"
        />

        {/* Formato de Entrega Badge */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold shadow-xs ${
              product.formatShort === "PDF"
                ? "bg-navy-900/90 text-tealbrand-300 backdrop-blur-xs"
                : "bg-tealbrand-800/90 text-white backdrop-blur-xs"
            }`}
          >
            {product.formatShort === "PDF" ? (
              <FileText className="w-3.5 h-3.5" />
            ) : (
              <Video className="w-3.5 h-3.5" />
            )}
            <span>{product.format}</span>
          </span>

          {product.bestseller && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-amberbrand-500 text-navy-950 shadow-xs">
              MAIS VENDIDO
            </span>
          )}
        </div>

        {/* Páginas ou Duração */}
        <div className="absolute bottom-2.5 right-2.5 bg-navy-950/80 text-white text-[11px] font-medium px-2 py-0.5 rounded backdrop-blur-xs">
          {product.pagesOrDuration}
        </div>
      </Link>

      {/* Conteúdo Informativo */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold text-tealbrand-700 uppercase text-[10px] tracking-wider">
              {product.category}
            </span>
            <span className="text-[11px]">Edição: {product.updatedAt}</span>
          </div>

          <Link href={`/produto/${product.slug}`} className="block group-hover:text-navy-700">
            <h3 className="font-bold text-navy-950 text-sm sm:text-base leading-snug line-clamp-2">
              {product.title}
            </h3>
          </Link>

          <p className="text-xs text-navy-600 line-clamp-2 leading-relaxed">
            {product.subtitle}
          </p>
        </div>

        {/* Tópicos Rápidos (O que vem dentro) */}
        <div className="pt-2 border-t border-slate-100 space-y-1.5">
          {product.whatYouWillLearn.slice(0, 2).map((item, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-600">
              <CheckCircle2 className="w-3.5 h-3.5 text-tealbrand-600 flex-shrink-0 mt-0.5" />
              <span className="line-clamp-1">{item}</span>
            </div>
          ))}
        </div>

        {/* Bloco de Preço Transparente & Ações */}
        <div className="pt-3 border-t border-slate-100 space-y-3">
          <div>
            {product.originalPrice && (
              <div className="text-xs text-slate-400 line-through">
                De {formatCurrency(product.originalPrice)} por:
              </div>
            )}
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-navy-950 tracking-tight">
                {formatCurrency(product.price)}
              </span>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                à vista no Pix
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              ou {installment.formatted}
            </p>
          </div>

          {/* Botões de Conversão sem Estresse */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={handleAddToCart}
              className="py-2.5 px-3 rounded-lg border border-slate-300 hover:border-navy-700 hover:bg-slate-50 text-navy-900 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
              title="Adicionar ao Carrinho"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-navy-700" />
              <span>Carrinho</span>
            </button>

            <button
              onClick={handleBuyNow}
              className="py-2.5 px-3 rounded-lg bg-amberbrand-500 hover:bg-amberbrand-600 active:bg-amberbrand-700 text-navy-950 font-bold text-xs flex items-center justify-center gap-1 shadow-cta hover:shadow-md transition-all"
              title="Comprar via Pix ou Cartão"
            >
              <span>Comprar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
