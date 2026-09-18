"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PRODUCTS, Product, VideoLesson } from "@/data/products";
import { formatCurrency } from "@/lib/utils";
import { formatCPF } from "@/lib/cpfValidator";
import {
  UserCheck,
  Download,
  Video,
  Play,
  FileText,
  Clock,
  BookOpen,
  LogOut,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
  X,
  ExternalLink,
} from "lucide-react";

export default function StudentAreaPage() {
  const [currentUser, setCurrentUser] = useState<{
    email: string;
    cpf: string;
    name?: string;
  } | null>(null);

  // Formulário de Login Simples por E-mail + CPF
  const [loginEmail, setLoginEmail] = useState("");
  const [loginCpf, setLoginCpf] = useState("");
  const [loginError, setLoginError] = useState("");

  // Pedidos e Materiais do Usuário
  const [userOrders, setUserOrders] = useState<any[]>([]);

  // Estado do Player de Vídeo Integrado
  const [activeVideoCourse, setActiveVideoCourse] = useState<Product | null>(null);
  const [activeLesson, setActiveLesson] = useState<VideoLesson | null>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("@cursos-livres-tech-ia/user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
        loadUserOrders(user.email);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const loadUserOrders = async (email: string) => {
    let combinedOrders: any[] = [];

    // 1. Tenta carregar do Supabase Cloud
    try {
      const { supabase } = await import("@/lib/supabase");
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("customer_email", email.trim().toLowerCase());

      if (data && data.length > 0 && !error) {
        combinedOrders = data.map((d) => ({
          orderId: d.order_id,
          createdAt: d.created_at,
          status: d.status,
          items: typeof d.items === "string" ? JSON.parse(d.items) : d.items,
        }));
      }
    } catch (sbErr) {
      console.warn("Supabase lookup offline/indisponível:", sbErr);
    }

    // 2. Carrega e une com o armazenamento local
    try {
      const localOrders = JSON.parse(
        localStorage.getItem("@cursos-livres-tech-ia/orders") || "[]"
      );
      const matchingLocal = localOrders.filter(
        (o: any) =>
          o.customer?.email?.toLowerCase() === email.toLowerCase()
      );
      if (matchingLocal.length > 0) {
        // Evita duplicatas por orderId
        const ids = new Set(combinedOrders.map((o) => o.orderId));
        for (const loc of matchingLocal) {
          if (!ids.has(loc.orderId)) {
            combinedOrders.push(loc);
          }
        }
      } else if (combinedOrders.length === 0 && localOrders.length > 0) {
        combinedOrders = localOrders;
      }
    } catch (e) {
      console.error(e);
    }

    if (combinedOrders.length > 0) {
      setUserOrders(combinedOrders);
    } else {
      // Demonstração inicial amigável
      setUserOrders([
        {
          orderId: "PED-DEMO-01",
          createdAt: new Date().toISOString(),
          status: "aprovado",
          items: [
            {
              id: PRODUCTS[0].id,
              title: PRODUCTS[0].title,
              format: PRODUCTS[0].format,
              price: PRODUCTS[0].price,
              slug: PRODUCTS[0].slug,
            },
            {
              id: PRODUCTS[2].id,
              title: PRODUCTS[2].title,
              format: PRODUCTS[2].format,
              price: PRODUCTS[2].price,
              slug: PRODUCTS[2].slug,
            },
          ],
        },
      ]);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (!loginEmail.includes("@")) {
      setLoginError("Informe um e-mail válido.");
      return;
    }

    const cleanCpf = loginCpf.replace(/\D/g, "");
    if (cleanCpf.length !== 11) {
      setLoginError("Informe um CPF válido com 11 dígitos.");
      return;
    }

    const userObj = { email: loginEmail, cpf: formatCPF(loginCpf) };
    setCurrentUser(userObj);
    localStorage.setItem("@cursos-livres-tech-ia/user", JSON.stringify(userObj));
    loadUserOrders(loginEmail);
  };

  const handleLogout = () => {
    localStorage.removeItem("@cursos-livres-tech-ia/user");
    setCurrentUser(null);
    setUserOrders([]);
  };

  const openCoursePlayer = (productSlug: string) => {
    const found = PRODUCTS.find((p) => p.slug === productSlug);
    if (found && found.videoModules && found.videoModules.length > 0) {
      setActiveVideoCourse(found);
      setActiveLesson(found.videoModules[0].lessons[0]);
    } else {
      alert("Aulas disponíveis diretamente na sua conta.");
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Topo da Área do Aluno */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-tealbrand-100 text-tealbrand-800 flex items-center justify-center font-bold">
              <UserCheck className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black text-navy-950">
              Área do Aluno & Meus Pedidos
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            Acesso permanente a todos os materiais, apostilas em PDF e aulas em vídeo comprados na Cursos Livres Tech & I.A.
          </p>
        </div>

        {currentUser && (
          <div className="flex items-center gap-3">
            <div className="text-right text-xs">
              <div className="font-bold text-navy-900">
                {currentUser.name || currentUser.email}
              </div>
              <div className="text-slate-400 text-[11px]">CPF: {currentUser.cpf}</div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-red-600 hover:bg-slate-100 rounded-lg transition-colors"
              title="Sair da conta"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Caso NÃO esteja logado: Tela de Login Simples */}
      {!currentUser ? (
        <div className="max-w-md mx-auto bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
          <div className="text-center space-y-1">
            <div className="w-12 h-12 rounded-full bg-navy-900 text-tealbrand-400 flex items-center justify-center mx-auto mb-2">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-navy-950">
              Acesse seus Materiais
            </h2>
            <p className="text-xs text-slate-500">
              Basta informar o mesmo e-mail e CPF preenchidos no momento da sua compra.
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-navy-900">
                Seu E-mail Cadastrado
              </label>
              <input
                type="email"
                required
                placeholder="seuemail@exemplo.com.br"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-100"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-navy-900">
                CPF do Comprador
              </label>
              <input
                type="text"
                required
                maxLength={14}
                placeholder="000.000.000-00"
                value={loginCpf}
                onChange={(e) => setLoginCpf(formatCPF(e.target.value))}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-100"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs sm:text-sm transition-colors shadow-xs"
            >
              Entrar na Área do Aluno
            </button>
          </form>

          <div className="pt-3 border-t border-slate-100 text-center text-[11px] text-slate-400">
            Acesso descomplicado: sem necessidade de senhas difíceis ou links que expiram.
          </div>
        </div>
      ) : (
        /* Caso ESTEJA logado: Painel de Downloads e Aulas */
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-base font-bold text-navy-950 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-tealbrand-600" />
                <span>Seus Infoprodutos Liberados</span>
              </h2>
              <span className="text-xs font-medium text-slate-500">
                Acesso Vitalício Garantido
              </span>
            </div>

            {userOrders.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs">
                Nenhum pedido encontrado para este e-mail.
              </div>
            ) : (
              <div className="space-y-6">
                {userOrders.map((ord: any) => (
                  <div
                    key={ord.orderId}
                    className="border border-slate-200 rounded-xl p-4 sm:p-5 bg-slate-50/50 space-y-4"
                  >
                    <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-200/60 pb-2">
                      <div>
                        <strong>Pedido #{ord.orderId}</strong> •{" "}
                        {new Date(ord.createdAt).toLocaleDateString("pt-BR")}
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase">
                        {ord.status === "aprovado" ? "Acesso Liberado" : "Pendente"}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {ord.items.map((item: any, idx: number) => {
                        const isVideo =
                          item.format?.includes("Vídeo") ||
                          item.format?.includes("Membros");
                        return (
                          <div
                            key={idx}
                            className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                          >
                            <div className="space-y-0.5">
                              <span className="text-[10px] font-bold uppercase text-tealbrand-700">
                                {item.format || "Download Digital"}
                              </span>
                              <h3 className="text-xs sm:text-sm font-bold text-navy-950">
                                {item.title}
                              </h3>
                              <p className="text-[11px] text-slate-400">
                                Edição revisada • Download sem expiração
                              </p>
                            </div>

                            <div className="flex items-center gap-2 w-full sm:w-auto">
                              {isVideo ? (
                                <button
                                  onClick={() => openCoursePlayer(item.slug)}
                                  className="w-full sm:w-auto px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                                >
                                  <Play className="w-3.5 h-3.5 fill-current" />
                                  <span>Assistir Aulas no Player</span>
                                </button>
                              ) : (
                                <button
                                  onClick={() =>
                                    alert(
                                      `Iniciando download seguro de: "${item.title}". Arquivo PDF oficial emitido pela Cursos Livres Tech & I.A.`
                                    )
                                  }
                                  className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                  <span>Baixar PDF Completo</span>
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal / Área Restrita do Player de Vídeo para Cursos em Vídeo */}
      {activeVideoCourse && activeLesson && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            {/* Header do Player */}
            <div className="p-4 bg-navy-950 text-white flex items-center justify-between border-b border-navy-800">
              <div className="flex items-center gap-2 truncate mr-4">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 flex-shrink-0"></span>
                <span className="text-xs sm:text-sm font-bold truncate">
                  {activeVideoCourse.title}
                </span>
              </div>
              <button
                onClick={() => {
                  setActiveVideoCourse(null);
                  setActiveLesson(null);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
                aria-label="Fechar player"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conteúdo: Player à Esquerda, Lista de Aulas à Direita */}
            <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden">
              {/* Vídeo e Descrição (8 colunas) */}
              <div className="lg:col-span-8 p-4 sm:p-6 bg-slate-950 flex flex-col justify-between overflow-y-auto">
                <div className="space-y-4">
                  {/* Container de Vídeo Limpo (sem anúncios, player focado) */}
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-black shadow-lg">
                    <video
                      controls
                      src={activeLesson.videoUrl}
                      className="w-full h-full object-contain"
                      poster={activeVideoCourse.images.cover}
                    />
                  </div>

                  <div className="space-y-1 text-white">
                    <div className="flex items-center gap-2 text-xs text-tealbrand-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{activeLesson.duration}</span>
                    </div>
                    <h2 className="text-base sm:text-lg font-bold">
                      {activeLesson.title}
                    </h2>
                    <p className="text-xs text-slate-300 leading-relaxed pt-1">
                      {activeLesson.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>Player privado e focado Cursos Livres Tech & I.A</span>
                  <span className="text-emerald-400 font-semibold">
                    ✓ Resolução Full HD
                  </span>
                </div>
              </div>

              {/* Trilha de Aulas do Curso (4 colunas) */}
              <div className="lg:col-span-4 bg-slate-50 border-t lg:border-t-0 lg:border-l border-slate-200 p-4 overflow-y-auto max-h-96 lg:max-h-full space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-navy-900">
                  Conteúdo do Curso
                </h3>

                <div className="space-y-4">
                  {activeVideoCourse.videoModules?.map((mod, mIdx) => (
                    <div key={mIdx} className="space-y-1.5">
                      <div className="text-xs font-bold text-slate-700 px-1">
                        {mod.title}
                      </div>
                      <div className="space-y-1">
                        {mod.lessons.map((lesson) => {
                          const isCurrent = activeLesson.id === lesson.id;
                          return (
                            <button
                              key={lesson.id}
                              onClick={() => setActiveLesson(lesson)}
                              className={`w-full text-left p-2.5 rounded-lg text-xs transition-all flex items-start gap-2 ${
                                isCurrent
                                  ? "bg-navy-900 text-white font-bold shadow-xs"
                                  : "hover:bg-slate-200/70 text-navy-900 bg-white border border-slate-200"
                              }`}
                            >
                              <Play
                                className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${
                                  isCurrent
                                    ? "text-amberbrand-400 fill-amberbrand-400"
                                    : "text-slate-400"
                                }`}
                              />
                              <div className="flex-1 min-w-0">
                                <div className="truncate">{lesson.title}</div>
                                <div
                                  className={`text-[10px] mt-0.5 ${
                                    isCurrent ? "text-slate-300" : "text-slate-400"
                                  }`}
                                >
                                  {lesson.duration}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
