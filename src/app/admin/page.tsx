"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useProducts } from "@/context/ProductsContext";
import { Product, CATEGORIES } from "@/data/products";
import { formatCurrency } from "@/lib/utils";
import {
  ShieldCheck,
  Lock,
  Plus,
  Trash2,
  Edit,
  Eye,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  FileText,
  Video,
  LogOut,
  User,
  Phone,
  Mail,
  Search,
  ExternalLink,
  Save,
  X,
} from "lucide-react";

// Credenciais exclusivas da Administradora
const ADMIN_EMAIL = "freireb11@gmail.com";
const ADMIN_PHONE = "11949028721"; // +55 (11) 94902-8721
const ADMIN_NAME = "Beatriz Freire";
const ADMIN_AUTH_KEY = "@cursos-livres-tech-ia/admin-logged-in";

export default function AdminPage() {
  const router = useRouter();
  const { products, addProduct, updateProduct, deleteProduct, resetToDefault } = useProducts();

  // Estado de Autenticação
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Formulário de Login
  const [emailInput, setEmailInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [loginError, setLoginError] = useState("");

  // Gestão de Produtos
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("Todas");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Formulário de Criação/Edição
  const [formTitle, setFormTitle] = useState("");
  const [formSubtitle, setFormSubtitle] = useState("");
  const [formCategory, setFormCategory] = useState<Product["category"]>("Inteligência Artificial");
  const [formFormat, setFormFormat] = useState<Product["format"]>("Download Imediato (PDF)");
  const [formPrice, setFormPrice] = useState<number>(47.0);
  const [formOriginalPrice, setFormOriginalPrice] = useState<number>(97.0);
  const [formPagesOrDuration, setFormPagesOrDuration] = useState("120 páginas");
  const [formCoverImage, setFormCoverImage] = useState("");
  const [formSummaryImage, setFormSummaryImage] = useState("");
  const [formSampleImage, setFormSampleImage] = useState("");
  const [formLearnTopics, setFormLearnTopics] = useState("");
  const [formIncludedItems, setFormIncludedItems] = useState("");
  const [formDownloadUrl, setFormDownloadUrl] = useState("");

  // Verifica login salvo
  useEffect(() => {
    try {
      const auth = localStorage.getItem(ADMIN_AUTH_KEY);
      if (auth === "true") {
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setCheckingAuth(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    const cleanEmail = emailInput.trim().toLowerCase();
    const cleanPhone = phoneInput.replace(/\D/g, "");

    // Verificação estrita para Beatriz Freire
    if (cleanEmail === ADMIN_EMAIL.toLowerCase()) {
      if (cleanPhone.length >= 10 && cleanPhone.includes("949028721")) {
        localStorage.setItem(ADMIN_AUTH_KEY, "true");
        setIsAuthenticated(true);
        setLoginError("");
      } else {
        setLoginError("Número de telefone/WhatsApp não confere com o cadastro administrativo.");
      }
    } else {
      setLoginError("Acesso negado. E-mail não autorizado para administração deste portal.");
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem(ADMIN_AUTH_KEY);
    } catch (e) {
      console.error(e);
    }
    setIsAuthenticated(false);
  };

  const openNewProductModal = () => {
    setEditingProduct(null);
    setFormTitle("");
    setFormSubtitle("");
    setFormCategory("Inteligência Artificial");
    setFormFormat("Download Imediato (PDF)");
    setFormPrice(47.0);
    setFormOriginalPrice(97.0);
    setFormPagesOrDuration("120 páginas");
    setFormCoverImage("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80");
    setFormSummaryImage("https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80");
    setFormSampleImage("https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80");
    setFormLearnTopics("Técnicas aplicadas no mercado\nProjetos reais do início ao fim\nComandos e estratégias validadas");
    setFormIncludedItems("Apostila digital completa em PDF\nMaterial de apoio e códigos\nAcesso vitalício e atualizações");
    setFormDownloadUrl("/samples/amostra-ia.pdf");
    setModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormTitle(p.title);
    setFormSubtitle(p.subtitle);
    setFormCategory(p.category);
    setFormFormat(p.format);
    setFormPrice(p.price);
    setFormOriginalPrice(p.originalPrice || p.price * 2);
    setFormPagesOrDuration(p.pagesOrDuration);
    setFormCoverImage(p.images.cover);
    setFormSummaryImage(p.images.summary);
    setFormSampleImage(p.images.sample);
    setFormLearnTopics(p.whatYouWillLearn.join("\n"));
    setFormIncludedItems(p.whatIsIncluded.join("\n"));
    setFormDownloadUrl(p.samplePdfUrl || "");
    setModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    const slug = formTitle
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const learnTopicsArray = formLearnTopics
      .split("\n")
      .map((t) => t.trim())
      .filter(Boolean);

    const includedItemsArray = formIncludedItems
      .split("\n")
      .map((t) => t.trim())
      .filter(Boolean);

    const formatShort: "PDF" | "Vídeo" = formFormat.includes("Vídeo") ? "Vídeo" : "PDF";

    if (editingProduct) {
      // Atualizar existente
      updateProduct(editingProduct.id, {
        title: formTitle,
        subtitle: formSubtitle,
        category: formCategory,
        format: formFormat,
        formatShort,
        price: Number(formPrice),
        originalPrice: Number(formOriginalPrice),
        pagesOrDuration: formPagesOrDuration,
        images: {
          cover: formCoverImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
          summary: formSummaryImage || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
          sample: formSampleImage || "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80",
        },
        whatYouWillLearn: learnTopicsArray,
        whatIsIncluded: includedItemsArray,
        samplePdfUrl: formDownloadUrl,
        updatedAt: new Date().toLocaleDateString("pt-BR", { month: "long", year: "numeric" }),
      });
      setSuccessMessage(`Material "${formTitle}" atualizado com sucesso na loja!`);
    } else {
      // Criar novo
      addProduct({
        slug: `${slug}-${Date.now().toString().slice(-4)}`,
        title: formTitle,
        subtitle: formSubtitle,
        category: formCategory,
        format: formFormat,
        formatShort,
        price: Number(formPrice),
        originalPrice: Number(formOriginalPrice),
        featured: true,
        bestseller: false,
        pagesOrDuration: formPagesOrDuration,
        updatedAt: new Date().toLocaleDateString("pt-BR", { month: "long", year: "numeric" }),
        images: {
          cover: formCoverImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
          summary: formSummaryImage || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
          sample: formSampleImage || "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80",
        },
        whatYouWillLearn: learnTopicsArray,
        whatIsIncluded: includedItemsArray,
        deliveryDetails: {
          formatDescription: formFormat,
          fileSizeOrAccess: formPagesOrDuration,
          immediateDelivery: true,
        },
        requirements: ["Aparelho com acesso à internet ou leitor de PDF"],
        samplePdfUrl: formDownloadUrl,
      });
      setSuccessMessage(`Novo material "${formTitle}" incluído com sucesso na loja online!`);
    }

    setModalOpen(false);
    setTimeout(() => setSuccessMessage(""), 5000);
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmId) {
      deleteProduct(deleteConfirmId);
      setDeleteConfirmId(null);
      setSuccessMessage("Material excluído com sucesso do catálogo da loja.");
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  };

  // Filtragem dos produtos no painel
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "Todas" || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (checkingAuth) {
    return (
      <div className="py-20 text-center text-xs text-slate-400">
        Verificando credenciais de acesso...
      </div>
    );
  }

  // TELA DE LOGIN ADMINISTRATIVO
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-12 px-4 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-navy-900 text-white shadow-md">
            <Lock className="w-7 h-7 text-amberbrand-400" />
          </div>
          <h1 className="text-2xl font-black text-navy-950">
            Painel de Administração
          </h1>
          <p className="text-xs text-slate-500">
            Acesso exclusivo para gestão de materiais e catálogo da loja online
          </p>
        </div>

        {loginError && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>{loginError}</span>
          </div>
        )}

        <form
          onSubmit={handleLogin}
          className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4"
        >
          <div>
            <label className="block text-xs font-bold text-navy-950 mb-1">
              E-mail de Administrador
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="freireb11@gmail.com"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:border-navy-900 focus:ring-1 focus:ring-navy-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-950 mb-1">
              Telefone / WhatsApp Cadastrado
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                required
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                placeholder="(11) 94902-8721"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:border-navy-900 focus:ring-1 focus:ring-navy-900"
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Informe os dados de Beatriz Freire para validação segura.
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-amberbrand-400" />
            Entrar no Painel Administrativo
          </button>
        </form>

        <div className="text-center text-[11px] text-slate-400">
          Cursos Livres Tech & I.A • Ambiente restrito com auditoria
        </div>
      </div>
    );
  }

  // TELA DO PAINEL LOGADO
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Bar do Painel */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-tealbrand-900 text-tealbrand-200 flex items-center justify-center font-bold text-sm shadow-xs">
            BF
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black text-navy-950">
                Painel Administrativo: {ADMIN_NAME}
              </h1>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Administradora Ativa
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {ADMIN_EMAIL} • +55 (11) 94902-8721 • Permissão Total de Conteúdo
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch md:self-auto">
          <button
            onClick={openNewProductModal}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-amberbrand-500 hover:bg-amberbrand-600 text-navy-950 font-bold text-xs rounded-xl transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            Novo Material
          </button>

          <button
            onClick={handleLogout}
            title="Sair do painel"
            className="p-2 border border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-200 rounded-xl text-xs transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mensagem de Feedback */}
      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
          <button onClick={() => setSuccessMessage("")}>
            <X className="w-4 h-4 text-emerald-600" />
          </button>
        </div>
      )}

      {/* Barra de Filtro e Ações */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Buscar material por título ou tema..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:border-navy-900"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-hidden bg-white"
          >
            <option value="Todas">Todas as Categorias</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              if (
                confirm(
                  "Deseja realmente restaurar os materiais originais do catálogo?"
                )
              ) {
                resetToDefault();
                setSuccessMessage("Catálogo restaurado para a versão padrão!");
              }
            }}
            title="Restaurar catálogo inicial"
            className="text-xs text-slate-500 hover:text-navy-900 px-3 py-1.5 border border-slate-200 rounded-lg flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Restaurar Padrões</span>
          </button>
        </div>
      </div>

      {/* Lista de Materiais */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xs font-bold text-navy-950 uppercase tracking-wider">
            Materiais no Catálogo ({filteredProducts.length})
          </h2>
          <span className="text-[11px] text-slate-400">
            Qualquer alteração entra no ar imediatamente para os clientes
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredProducts.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              Nenhum material encontrado com os filtros selecionados.
            </div>
          ) : (
            filteredProducts.map((p) => (
              <div
                key={p.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-20 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                    <img
                      src={p.images.cover}
                      alt={p.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {p.category}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400">
                        {p.formatShort === "PDF" ? "📄 PDF" : "🎥 Vídeo"} • {p.pagesOrDuration}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-navy-950 line-clamp-1">
                      {p.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {p.subtitle}
                    </p>
                    <div className="text-xs font-black text-tealbrand-800">
                      {formatCurrency(p.price)}
                      {p.originalPrice && (
                        <span className="text-[11px] font-normal text-slate-400 line-through ml-2">
                          {formatCurrency(p.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <Link
                    href={`/produto/${p.slug}`}
                    target="_blank"
                    className="p-2 border border-slate-200 text-slate-600 hover:text-navy-900 rounded-lg text-xs"
                    title="Ver página do produto na loja"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => openEditModal(p)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-navy-900 font-semibold text-xs rounded-lg transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    Editar
                  </button>

                  <button
                    onClick={() => setDeleteConfirmId(p.id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 font-semibold text-xs rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Excluir
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* MODAL DE CRIAÇÃO / EDIÇÃO DE MATERIAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full my-8 p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-navy-950">
                  {editingProduct ? "Editar Material" : "Incluir Novo Material"}
                </h3>
                <p className="text-[11px] text-slate-500">
                  Preencha as informações que serão exibidas na vitrine e na página de compra
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-navy-900 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              {/* Título & Subtítulo */}
              <div>
                <label className="block font-bold text-navy-950 mb-1">
                  Título do Material *
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Ex: Guia Completo de Inteligência Artificial para Pequenos Negócios"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-navy-900"
                />
              </div>

              <div>
                <label className="block font-bold text-navy-950 mb-1">
                  Subtítulo / Descrição Rápida *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formSubtitle}
                  onChange={(e) => setFormSubtitle(e.target.value)}
                  placeholder="Ex: Aprenda passo a passo a automatizar processos sem complicação técnica."
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-navy-900"
                />
              </div>

              {/* Categoria, Formato e Extensão */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-navy-950 mb-1">
                    Categoria
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden bg-white"
                  >
                    {CATEGORIES.filter((c) => c !== "Todas").map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-navy-950 mb-1">
                    Formato de Entrega
                  </label>
                  <select
                    value={formFormat}
                    onChange={(e) => setFormFormat(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden bg-white"
                  >
                    <option value="Download Imediato (PDF)">
                      Download Imediato (PDF)
                    </option>
                    <option value="Acesso à Área de Membros (Vídeo)">
                      Acesso à Área de Membros (Vídeo)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-navy-950 mb-1">
                    Extensão / Duração
                  </label>
                  <input
                    type="text"
                    value={formPagesOrDuration}
                    onChange={(e) => setFormPagesOrDuration(e.target.value)}
                    placeholder="Ex: 140 páginas ou 4h 30min"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-navy-900"
                  />
                </div>
              </div>

              {/* Preço e Promoção */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-navy-950 mb-1">
                    Preço de Venda Real (R$) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-navy-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-navy-950 mb-1">
                    Preço Original / Referência (R$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formOriginalPrice}
                    onChange={(e) => setFormOriginalPrice(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-navy-900"
                  />
                </div>
              </div>

              {/* Links de Imagens (Capa, Sumário, Amostra) */}
              <div className="space-y-2">
                <label className="block font-bold text-navy-950">
                  Fotos / Amostras Transparentes (URLs)
                </label>
                <input
                  type="url"
                  value={formCoverImage}
                  onChange={(e) => setFormCoverImage(e.target.value)}
                  placeholder="URL da Capa Oficial (ou imagem padrão)"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-hidden"
                />
                <input
                  type="url"
                  value={formSummaryImage}
                  onChange={(e) => setFormSummaryImage(e.target.value)}
                  placeholder="URL do Sumário / Índice"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-hidden"
                />
                <input
                  type="url"
                  value={formSampleImage}
                  onChange={(e) => setFormSampleImage(e.target.value)}
                  placeholder="URL da Amostra Interna de Página"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-hidden"
                />
              </div>

              {/* Tópicos de Aprendizado */}
              <div>
                <label className="block font-bold text-navy-950 mb-1">
                  O que o aluno vai aprender (1 tópico por linha)
                </label>
                <textarea
                  rows={3}
                  value={formLearnTopics}
                  onChange={(e) => setFormLearnTopics(e.target.value)}
                  placeholder="Instalação e primeiros passos&#10;Modelos prontos para copiar e colar&#10;Estratégias de monetização"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-navy-900"
                />
              </div>

              {/* O que está incluso */}
              <div>
                <label className="block font-bold text-navy-950 mb-1">
                  O que está incluso no pacote (1 item por linha)
                </label>
                <textarea
                  rows={2}
                  value={formIncludedItems}
                  onChange={(e) => setFormIncludedItems(e.target.value)}
                  placeholder="Material em PDF de alta resolução&#10;Acesso vitalício aos arquivos&#10;Garantia incondicional de 7 dias"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-navy-900"
                />
              </div>

              {/* Link de Download ou Arquivo */}
              <div>
                <label className="block font-bold text-navy-950 mb-1">
                  Link Direto do Arquivo / PDF (Área do Aluno)
                </label>
                <input
                  type="text"
                  value={formDownloadUrl}
                  onChange={(e) => setFormDownloadUrl(e.target.value)}
                  placeholder="Ex: /samples/amostra-ia.pdf ou URL do Google Drive/Dropbox"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-xl font-bold flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  Salvar e Publicar na Loja
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DE CONFIRMAÇÃO DE EXCLUSÃO */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-base font-black text-navy-950">
                Confirmar Exclusão de Material?
              </h3>
              <p className="text-xs text-slate-500">
                Esta ação removerá este material da vitrine da loja imediatamente. Você pode restaurá-lo depois se desejar.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-50"
              >
                Não, manter
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold"
              >
                Sim, excluir da loja
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
