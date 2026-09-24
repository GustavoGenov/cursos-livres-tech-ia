"use client";
import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { Product } from "@/data/products";
import { useProducts } from "@/context/ProductsContext";
import { useCart } from "@/context/CartContext";
import { GuaranteeBadge } from "@/components/GuaranteeBadge";
import { formatCurrency, calculateInstallment } from "@/lib/utils";
import {
  FileText,
  Video,
  CheckCircle2,
  ShieldCheck,
  Zap,
  ShoppingCart,
  ArrowRight,
  Sparkles,
  Layers,
  Clock,
  BookOpen,
  ChevronRight,
  Eye,
  Info,
} from "lucide-react";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { addToCart } = useCart();
  const { getProductBySlug, isLoaded } = useProducts();

  const [product, setProduct] = useState<Product | undefined>(() =>
    getProductBySlug(resolvedParams.slug)
  );
  const [checking, setChecking] = useState(true);

  // Galeria de 3 amostras reais
  const [selectedImageTab, setSelectedImageTab] = useState<"cover" | "summary" | "sample">("cover");

  useEffect(() => {
    const found = getProductBySlug(resolvedParams.slug);
    if (found) {
      setProduct(found);
      setChecking(false);
    } else if (isLoaded) {
      setChecking(false);
    }
  }, [resolvedParams.slug, getProductBySlug, isLoaded]);

  // Se ainda estiver verificando ou carregando o catálogo, exibe tela de carregamento elegante
  if (checking && !product) {
    return (
      <div className="max-w-5xl mx-auto py-16 px-4 space-y-6 animate-pulse">
        <div className="h-4 bg-slate-200 rounded w-1/3"></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 bg-slate-100 rounded-2xl h-96"></div>
          <div className="lg:col-span-5 space-y-4">
            <div className="h-8 bg-slate-200 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 rounded w-full"></div>
            <div className="h-24 bg-slate-100 rounded-xl"></div>
            <div className="h-12 bg-amberbrand-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  // Se o catálogo terminou de carregar e o produto realmente não existe
  if (!product) {
    notFound();
  }

  const imageTabs = [
    { id: "cover" as const, label: "1. Capa Oficial", src: product.images?.cover || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80" },
    { id: "summary" as const, label: "2. Sumário / Índice", src: product.images?.summary || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80" },
    { id: "sample" as const, label: "3. Amostra Interna", src: product.images?.sample || "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80" },
  ];

  const currentImage = product.images?.[selectedImageTab] || imageTabs.find((t) => t.id === selectedImageTab)?.src || imageTabs[0].src;
  const installment = calculateInstallment(product.price);

  const handleBuyNow = () => {
    addToCart(product, false);
    router.push("/checkout");
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="space-y-8">
      {/* Breadcrumb Limpo */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500">
        <Link href="/" className="hover:text-navy-900 transition-colors">
          Início
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link
          href={`/?categoria=${encodeURIComponent(product.category || "Todas")}`}
          className="hover:text-navy-900 transition-colors"
        >
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-navy-900 font-medium truncate max-w-xs sm:max-w-md">
          {product.title}
        </span>
      </nav>

      {/* Seção Principal: Galeria com 3 Amostras + Bloco de Compra */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Coluna da Galeria Interativa (7 colunas) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 space-y-4 shadow-xs">
          {/* Seletor das 3 Amostras Transparentes */}
          <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-xl">
            {imageTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedImageTab(tab.id)}
                className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  selectedImageTab === tab.id
                    ? "bg-white text-navy-950 shadow-xs"
                    : "text-slate-600 hover:text-navy-900 hover:bg-slate-200/60"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Visualizador da Amostra Selecionada */}
          <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 flex items-center justify-center group">
            <img
              src={currentImage}
              alt={`${product.title} - ${selectedImageTab}`}
              className="w-full h-full object-contain"
            />

            <div className="absolute bottom-3 left-3 bg-navy-950/85 backdrop-blur-xs text-white text-[11px] px-3 py-1 rounded-md font-medium">
              {selectedImageTab === "cover" && "Capa Oficial em Alta Resolução"}
              {selectedImageTab === "summary" && "Sumário e Roteiro de Tópicos Detalhado"}
              {selectedImageTab === "sample" && "Amostra Real de Conteúdo (Sem Surpresas)"}
            </div>
          </div>

          {/* Miniaturas das 3 Amostras */}
          <div className="grid grid-cols-3 gap-3 pt-1">
            {imageTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedImageTab(tab.id)}
                className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImageTab === tab.id
                    ? "border-amberbrand-500 ring-2 ring-amberbrand-200"
                    : "border-slate-200 opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={tab.src}
                  alt={tab.label}
                  className="w-full h-full object-cover"
                />
                <span className="absolute inset-x-0 bottom-0 bg-navy-950/80 text-[10px] text-white py-0.5 text-center font-medium">
                  {tab.id === "cover" ? "Capa" : tab.id === "summary" ? "Sumário" : "Amostra"}
                </span>
              </button>
            ))}
          </div>

          {/* Aviso de Transparência Visual */}
          <div className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200 flex items-center gap-2">
            <Info className="w-4 h-4 text-tealbrand-600 flex-shrink-0" />
            <span>
              Você pode ver o sumário e páginas reais antes de adquirir. Não vendemos materiais às cegas.
            </span>
          </div>
        </div>

        {/* Coluna de Conversão Direta (5 colunas) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 space-y-6 shadow-xs sticky top-24">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-tealbrand-100 text-tealbrand-800">
                {product.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 flex items-center gap-1">
                {product.formatShort === "PDF" ? (
                  <FileText className="w-3 h-3" />
                ) : (
                  <Video className="w-3 h-3" />
                )}
                {product.format}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-navy-950 leading-tight">
              {product.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {product.subtitle}
            </p>
          </div>

          {/* Bloco de Preço Transparente */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            {product.originalPrice && (
              <div className="text-xs text-slate-400 line-through">
                Valor original: {formatCurrency(product.originalPrice)}
              </div>
            )}

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-navy-950 tracking-tight">
                {formatCurrency(product.price)}
              </span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">
                à vista via Pix
              </span>
            </div>

            <p className="text-xs text-slate-600 font-medium pt-1">
              ou em {installment.formatted}
            </p>
          </div>

          {/* Botões de Ação Imediata */}
          <div className="space-y-3">
            <button
              onClick={handleBuyNow}
              className="w-full py-3.5 px-4 rounded-xl bg-amberbrand-500 hover:bg-amberbrand-600 active:bg-amberbrand-700 text-navy-950 font-black text-base flex items-center justify-center gap-2 shadow-cta hover:shadow-lg transition-all"
            >
              <span>Comprar via Pix ou Cartão</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={handleAddToCart}
              className="w-full py-3 px-4 rounded-xl border border-slate-300 hover:border-navy-700 hover:bg-slate-50 text-navy-900 font-bold text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <ShoppingCart className="w-4 h-4 text-navy-800" />
              <span>Adicionar ao Carrinho</span>
            </button>
          </div>

          {/* Selo de Garantia 7 Dias CDC */}
          <GuaranteeBadge variant="compact" className="w-full justify-center" />

          {/* Benefícios Rápidos de Entrega */}
          <div className="border-t border-slate-200 pt-4 space-y-2 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amberbrand-500 flex-shrink-0" />
              <span>Liberação imediata assim que o Pix é gerado e pago</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-tealbrand-600 flex-shrink-0" />
              <span>Acesso vitalício e sem mensalidades surpresa</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-navy-600 flex-shrink-0" />
              <span>Certificado de Curso Livre incluso (Lei 9.394/96)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Descrição Objetiva em Tópicos */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-8 shadow-xs">
        {/* Seção 1: O que você vai aprender */}
        {product.whatYouWillLearn && product.whatYouWillLearn.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-tealbrand-100 text-tealbrand-800 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-navy-950">
                O que você vai aprender na prática
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {product.whatYouWillLearn.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-tealbrand-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <span className="text-xs sm:text-sm text-navy-800 leading-relaxed font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Seção 2: O que está incluso no seu acesso */}
        {product.whatIsIncluded && product.whatIsIncluded.length > 0 && (
          <div className="space-y-4 pt-6 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-navy-100 text-navy-900 flex items-center justify-center font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-navy-950">
                O que está incluso no seu download ou acesso
              </h2>
            </div>
            <ul className="space-y-2.5 pt-2">
              {product.whatIsIncluded.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Seção 3: Se houver módulos de vídeo (para cursos) */}
        {product.videoModules && (
          <div className="space-y-4 pt-6 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amberbrand-100 text-amberbrand-900 flex items-center justify-center font-bold">
                  <Video className="w-5 h-5" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-navy-950">
                  Grade de Aulas e Módulos
                </h2>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {product.pagesOrDuration}
              </span>
            </div>

            <div className="space-y-3 pt-2">
              {product.videoModules.map((mod, mIdx) => (
                <div
                  key={mIdx}
                  className="rounded-xl border border-slate-200 bg-slate-50 overflow-hidden"
                >
                  <div className="p-3.5 bg-slate-100/70 border-b border-slate-200 font-bold text-xs sm:text-sm text-navy-900 flex items-center justify-between">
                    <span>{mod.title}</span>
                    <span className="text-xs text-slate-500 font-normal">
                      {mod.lessons.length} aulas
                    </span>
                  </div>
                  <div className="divide-y divide-slate-200/60">
                    {mod.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="p-3 flex items-center justify-between text-xs text-navy-800"
                      >
                        <div className="flex items-center gap-2">
                          <Video className="w-3.5 h-3.5 text-tealbrand-600" />
                          <span className="font-medium">{lesson.title}</span>
                        </div>
                        <span className="text-slate-400 text-[11px]">
                          {lesson.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Seção 4: Requisitos e Formato de Entrega */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-200">
          <div className="space-y-2">
            <h3 className="font-bold text-sm text-navy-950 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amberbrand-500" />
              Formato de Entrega & Acesso
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {product.deliveryDetails?.formatDescription || product.format} ({product.deliveryDetails?.fileSizeOrAccess || product.pagesOrDuration}).
            </p>
            <p className="text-xs text-emerald-700 font-medium">
              ✓ Entrega imediata automática na sua Área do Aluno e por e-mail após a confirmação.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-sm text-navy-950 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-navy-600" />
              Requisitos do Material
            </h3>
            <ul className="space-y-1 text-xs text-slate-600">
              {product.requirements && product.requirements.length > 0 ? (
                product.requirements.map((req, rIdx) => (
                  <li key={rIdx}>• {req}</li>
                ))
              ) : (
                <li>• Qualquer aparelho com acesso à internet ou leitor de PDF</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
