"use client";
import React, { useState, useEffect, useRef } from "react";
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
  EyeOff,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  FileText,
  Video,
  LogOut,
  User,
  Search,
  ExternalLink,
  Save,
  X,
  Upload,
  Image as ImageIcon,
  Check,
} from "lucide-react";

// Chave da sessão administrativa
const ADMIN_AUTH_KEY = "@cursos-livres-tech-ia/admin25-logged-in";
const ADMIN_USER_KEY = "@cursos-livres-tech-ia/admin25-user";

// Função utilitária para comprimir imagens no cliente (Canvas)
// Evita estouro de cota do localStorage mantendo excelente qualidade visual
async function compressImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Gera JPEG otimizado a 85% de qualidade
        const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.85);
        resolve(compressedDataUrl);
      };
      img.onerror = (err) => reject(err);
      img.src = event.target?.result as string;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

// Contas de Administradores Autorizados
const ADMIN_ACCOUNTS = [
  {
    name: "Jalhematei",
    initials: "JL",
    role: "Administrador Master",
    matchesUser: (u: string) =>
      u === "jalhematei" ||
      u === "jalhematei@cursoslivres.com" ||
      u === "gustavocastroinfo@gmail.com",
    matchesPass: (p: string) =>
      p === "37999184509" || p.replace(/\D/g, "") === "37999184509",
  },
  {
    name: "Rui Wenceslau",
    initials: "RW",
    role: "Administrador",
    matchesUser: (u: string) =>
      u === "ruiwenceslau" ||
      u === "rui wenceslau" ||
      u === "rui" ||
      u === "ruiwenceslau@cursoslivres.com",
    matchesPass: (p: string) =>
      p === "3798437274" || p.replace(/\D/g, "") === "3798437274",
  },
  {
    name: "Beatriz Freire",
    initials: "BF",
    role: "Administradora",
    matchesUser: (u: string) =>
      u === "freireb11@gmail.com" ||
      u === "beatriz" ||
      u === "beatriz freire" ||
      u.replace(/\D/g, "") === "11949028721",
    matchesPass: (p: string) =>
      p.replace(/\D/g, "") === "11949028721" || p.includes("949028721"),
  },
];

export default function Admin25Page() {
  const router = useRouter();
  const { products, addProduct, updateProduct, deleteProduct, resetToDefault } = useProducts();

  // Estado de Autenticação
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [currentAdminName, setCurrentAdminName] = useState("Jalhematei");

  // Formulário de Login
  const [loginInput, setLoginInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

  // 3 Imagens Obrigatórias para Upload
  const [formCoverImage, setFormCoverImage] = useState("");
  const [formSummaryImage, setFormSummaryImage] = useState("");
  const [formSampleImage, setFormSampleImage] = useState("");

  // Alternar modo URL externa se desejado
  const [showUrlInputs, setShowUrlInputs] = useState(false);

  // Estados de upload de arquivos
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingSummary, setUploadingSummary] = useState(false);
  const [uploadingSample, setUploadingSample] = useState(false);

  const coverInputRef = useRef<HTMLInputElement>(null);
  const summaryInputRef = useRef<HTMLInputElement>(null);
  const sampleInputRef = useRef<HTMLInputElement>(null);

  const [formLearnTopics, setFormLearnTopics] = useState("");
  const [formIncludedItems, setFormIncludedItems] = useState("");
  const [formDownloadUrl, setFormDownloadUrl] = useState("");

  // Verifica login salvo
  useEffect(() => {
    try {
      const auth = localStorage.getItem(ADMIN_AUTH_KEY);
      const user = localStorage.getItem(ADMIN_USER_KEY);
      if (auth === "true") {
        setIsAuthenticated(true);
        if (user) setCurrentAdminName(user);
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

    const cleanLogin = loginInput.trim().toLowerCase();
    const cleanPass = passwordInput.trim().replace(/\s+/g, "");

    const foundAccount = ADMIN_ACCOUNTS.find(
      (acc) => acc.matchesUser(cleanLogin) && acc.matchesPass(cleanPass)
    );

    if (foundAccount) {
      localStorage.setItem(ADMIN_AUTH_KEY, "true");
      localStorage.setItem(ADMIN_USER_KEY, foundAccount.name);
      setCurrentAdminName(foundAccount.name);
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Credenciais inválidas. Verifique o usuário e a senha de acesso.");
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem(ADMIN_AUTH_KEY);
      localStorage.removeItem(ADMIN_USER_KEY);
    } catch (e) {
      console.error(e);
    }
    setIsAuthenticated(false);
  };

  // Manipuladores de Upload das 3 Imagens
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "cover" | "summary" | "sample"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Por favor, selecione um arquivo de imagem válido (JPG, PNG, WEBP).");
      return;
    }

    try {
      if (type === "cover") setUploadingCover(true);
      if (type === "summary") setUploadingSummary(true);
      if (type === "sample") setUploadingSample(true);

      const base64 = await compressImageFile(file);

      if (type === "cover") setFormCoverImage(base64);
      if (type === "summary") setFormSummaryImage(base64);
      if (type === "sample") setFormSampleImage(base64);
    } catch (err) {
      console.error("Erro ao processar imagem:", err);
      alert("Erro ao processar imagem. Tente uma imagem com menor resolução.");
    } finally {
      if (type === "cover") setUploadingCover(false);
      if (type === "summary") setUploadingSummary(false);
      if (type === "sample") setUploadingSample(false);
    }
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
    setFormCoverImage("");
    setFormSummaryImage("");
    setFormSampleImage("");
    setFormLearnTopics("Técnicas aplicadas no mercado\nProjetos reais do início ao fim\nComandos e estratégias validadas");
    setFormIncludedItems("Apostila digital completa em PDF\nMaterial de apoio e códigos\nAcesso vitalício e atualizações");
    setFormDownloadUrl("");
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
    setFormCoverImage(p.images?.cover || "");
    setFormSummaryImage(p.images?.summary || "");
    setFormSampleImage(p.images?.sample || "");
    setFormLearnTopics(p.whatYouWillLearn?.join("\n") || "");
    setFormIncludedItems(p.whatIsIncluded?.join("\n") || "");
    setFormDownloadUrl(p.samplePdfUrl || "");
    setModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação das 3 fotos
    const fallbackCover =
      formCoverImage ||
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80";
    const fallbackSummary =
      formSummaryImage ||
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80";
    const fallbackSample =
      formSampleImage ||
      "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80";

    const baseSlug = formTitle
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const slug = editingProduct
      ? editingProduct.slug
      : `${baseSlug || "material"}-${Date.now().toString().slice(-4)}`;

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
          cover: fallbackCover,
          summary: fallbackSummary,
          sample: fallbackSample,
        },
        whatYouWillLearn: learnTopicsArray,
        whatIsIncluded: includedItemsArray,
        samplePdfUrl: formDownloadUrl || `/api/download/${slug}`,
        updatedAt: new Date().toLocaleDateString("pt-BR", { month: "long", year: "numeric" }),
      });
      setSuccessMessage(`Material "${formTitle}" atualizado com sucesso na loja!`);
    } else {
      // Criar novo
      addProduct({
        slug,
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
          cover: fallbackCover,
          summary: fallbackSummary,
          sample: fallbackSample,
        },
        whatYouWillLearn: learnTopicsArray,
        whatIsIncluded: includedItemsArray,
        deliveryDetails: {
          formatDescription: formFormat,
          fileSizeOrAccess: formPagesOrDuration,
          immediateDelivery: true,
        },
        requirements: ["Aparelho com acesso à internet ou leitor de PDF"],
        samplePdfUrl: formDownloadUrl || `/api/download/${slug}`,
      });
      setSuccessMessage(`Novo material "${formTitle}" incluído e publicado com sucesso na loja!`);
    }

    setModalOpen(false);
    setTimeout(() => setSuccessMessage(""), 6000);
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
        Verificando credenciais de acesso seguro...
      </div>
    );
  }

  // TELA DE LOGIN ADMINISTRATIVO PROTEGIDA
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-12 px-4 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-navy-950 text-white shadow-md">
            <Lock className="w-7 h-7 text-amberbrand-400" />
          </div>
          <h1 className="text-2xl font-black text-navy-950">
            Painel de Administração
          </h1>
          <p className="text-xs text-slate-500">
            Acesso restrito para gestão e publicação de novos materiais
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
              Usuário ou E-mail Administrativo
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                required
                value={loginInput}
                onChange={(e) => setLoginInput(e.target.value)}
                placeholder="admin@exemplo.com ou seu_usuario"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:border-navy-900 focus:ring-1 focus:ring-navy-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-950 mb-1">
              Senha de Acesso Master
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-9 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:border-navy-900 focus:ring-1 focus:ring-navy-900 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-navy-900"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Informe suas credenciais autorizadas de gestão da plataforma.
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
          {(() => {
            const activeAcc =
              ADMIN_ACCOUNTS.find((a) => a.name === currentAdminName) ||
              ADMIN_ACCOUNTS[0];
            return (
              <>
                <div className="w-11 h-11 rounded-xl bg-navy-950 text-amberbrand-400 flex items-center justify-center font-bold text-sm shadow-xs border border-navy-800">
                  {activeAcc.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-lg font-black text-navy-950">
                      Painel Administrativo: {activeAcc.name}
                    </h1>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {activeAcc.role} Ativo(a)
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Controle Total de Catálogo, Upload de Fotos e Publicação em Tempo Real
                  </p>
                </div>
              </>
            );
          })()}
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
                      src={p.images?.cover || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"}
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
        <div className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-3xl w-full my-6 p-6 space-y-5 shadow-2xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-navy-950">
                  {editingProduct ? "Editar Material" : "Cadastrar Novo Material"}
                </h3>
                <p className="text-[11px] text-slate-500">
                  Preencha as informações e faça o upload das 3 fotos oficiais do material
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-navy-900 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-5 text-xs">
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

              {/* SEÇÃO PRINCIPAL: UPLOAD DAS 3 IMAGENS OBRIGATÓRIAS */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-navy-950 text-xs flex items-center gap-1.5">
                      <Upload className="w-4 h-4 text-tealbrand-600" />
                      <span>Upload das 3 Fotos Transparentes do Material</span>
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Envie as fotos direto do seu computador/celular. A plataforma redimensiona automaticamente.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowUrlInputs(!showUrlInputs)}
                    className="text-[11px] font-semibold text-tealbrand-700 hover:underline"
                  >
                    {showUrlInputs ? "Ocultar links manuais" : "Ou colar links de imagem"}
                  </button>
                </div>

                {/* Grid das 3 Caixas de Upload */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Foto 1: Capa Oficial */}
                  <div className="bg-white border-2 border-dashed border-slate-300 rounded-xl p-3 flex flex-col items-center justify-center text-center relative group hover:border-tealbrand-500 transition-colors">
                    <input
                      type="file"
                      ref={coverInputRef}
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "cover")}
                      className="hidden"
                    />

                    {formCoverImage ? (
                      <div className="w-full space-y-2">
                        <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                          <img
                            src={formCoverImage}
                            alt="Capa"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => setFormCoverImage("")}
                            className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                            title="Remover foto"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-[10px] font-bold text-emerald-700 flex items-center justify-center gap-1">
                          <Check className="w-3 h-3" />
                          1. Capa Carregada
                        </div>
                        <button
                          type="button"
                          onClick={() => coverInputRef.current?.click()}
                          className="w-full py-1 text-[11px] text-slate-600 hover:text-navy-950 font-semibold border border-slate-200 rounded-md"
                        >
                          Trocar Foto
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => coverInputRef.current?.click()}
                        className="py-6 px-2 cursor-pointer w-full flex flex-col items-center justify-center space-y-2"
                      >
                        <div className="w-10 h-10 rounded-full bg-tealbrand-50 text-tealbrand-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                        <div className="font-bold text-navy-950 text-xs">
                          1. Foto da Capa
                        </div>
                        <span className="text-[10px] text-slate-400">
                          {uploadingCover ? "Processando..." : "Clique para selecionar foto"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Foto 2: Sumário / Índice */}
                  <div className="bg-white border-2 border-dashed border-slate-300 rounded-xl p-3 flex flex-col items-center justify-center text-center relative group hover:border-tealbrand-500 transition-colors">
                    <input
                      type="file"
                      ref={summaryInputRef}
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "summary")}
                      className="hidden"
                    />

                    {formSummaryImage ? (
                      <div className="w-full space-y-2">
                        <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                          <img
                            src={formSummaryImage}
                            alt="Sumário"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => setFormSummaryImage("")}
                            className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                            title="Remover foto"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-[10px] font-bold text-emerald-700 flex items-center justify-center gap-1">
                          <Check className="w-3 h-3" />
                          2. Sumário Carregado
                        </div>
                        <button
                          type="button"
                          onClick={() => summaryInputRef.current?.click()}
                          className="w-full py-1 text-[11px] text-slate-600 hover:text-navy-950 font-semibold border border-slate-200 rounded-md"
                        >
                          Trocar Foto
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => summaryInputRef.current?.click()}
                        className="py-6 px-2 cursor-pointer w-full flex flex-col items-center justify-center space-y-2"
                      >
                        <div className="w-10 h-10 rounded-full bg-tealbrand-50 text-tealbrand-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="font-bold text-navy-950 text-xs">
                          2. Foto do Sumário
                        </div>
                        <span className="text-[10px] text-slate-400">
                          {uploadingSummary ? "Processando..." : "Clique para selecionar foto"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Foto 3: Amostra Interna */}
                  <div className="bg-white border-2 border-dashed border-slate-300 rounded-xl p-3 flex flex-col items-center justify-center text-center relative group hover:border-tealbrand-500 transition-colors">
                    <input
                      type="file"
                      ref={sampleInputRef}
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "sample")}
                      className="hidden"
                    />

                    {formSampleImage ? (
                      <div className="w-full space-y-2">
                        <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                          <img
                            src={formSampleImage}
                            alt="Amostra"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => setFormSampleImage("")}
                            className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                            title="Remover foto"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-[10px] font-bold text-emerald-700 flex items-center justify-center gap-1">
                          <Check className="w-3 h-3" />
                          3. Amostra Carregada
                        </div>
                        <button
                          type="button"
                          onClick={() => sampleInputRef.current?.click()}
                          className="w-full py-1 text-[11px] text-slate-600 hover:text-navy-950 font-semibold border border-slate-200 rounded-md"
                        >
                          Trocar Foto
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => sampleInputRef.current?.click()}
                        className="py-6 px-2 cursor-pointer w-full flex flex-col items-center justify-center space-y-2"
                      >
                        <div className="w-10 h-10 rounded-full bg-tealbrand-50 text-tealbrand-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <div className="font-bold text-navy-950 text-xs">
                          3. Foto da Amostra
                        </div>
                        <span className="text-[10px] text-slate-400">
                          {uploadingSample ? "Processando..." : "Clique para selecionar foto"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Inputs de URLs alternativas se o usuário preferir */}
                {showUrlInputs && (
                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    <label className="block text-[11px] font-bold text-slate-700">
                      Ou insira links de imagem diretamente:
                    </label>
                    <input
                      type="url"
                      value={formCoverImage.startsWith("data:") ? "" : formCoverImage}
                      onChange={(e) => setFormCoverImage(e.target.value)}
                      placeholder="URL da Imagem da Capa (ex: https://...)"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                    />
                    <input
                      type="url"
                      value={formSummaryImage.startsWith("data:") ? "" : formSummaryImage}
                      onChange={(e) => setFormSummaryImage(e.target.value)}
                      placeholder="URL da Imagem do Sumário"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                    />
                    <input
                      type="url"
                      value={formSampleImage.startsWith("data:") ? "" : formSampleImage}
                      onChange={(e) => setFormSampleImage(e.target.value)}
                      placeholder="URL da Imagem da Amostra Interna"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                )}
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
                  Link Direto do Arquivo PDF / Google Drive / Área do Aluno (Opcional)
                </label>
                <input
                  type="text"
                  value={formDownloadUrl}
                  onChange={(e) => setFormDownloadUrl(e.target.value)}
                  placeholder="Deixe em branco para download automático oficial ou insira URL externa"
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
                  className="px-5 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-sm"
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
