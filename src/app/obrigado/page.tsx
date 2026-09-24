"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import {
  CheckCircle2,
  Copy,
  Check,
  QrCode,
  Download,
  Video,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
  Mail,
  RefreshCw,
  Eye,
  X,
} from "lucide-react";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");

  const [order, setOrder] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [simulatedPaid, setSimulatedPaid] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [emailStatus, setEmailStatus] = useState<string>("");
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [previewHtml, setPreviewHtml] = useState<string>("");

  useEffect(() => {
    try {
      const orders = JSON.parse(
        localStorage.getItem("@cursos-livres-tech-ia/orders") || "[]"
      );
      if (orderId) {
        const found = orders.find((o: any) => o.orderId === orderId);
        if (found) {
          setOrder(found);
          if (found.status === "aprovado") {
            setSimulatedPaid(true);
            triggerEmailAutomation(found);
          }
        } else if (orders.length > 0) {
          setOrder(orders[0]);
        }
      } else if (orders.length > 0) {
        setOrder(orders[0]);
      }
    } catch (e) {
      console.error("Erro ao carregar pedido:", e);
    }
  }, [orderId]);

  const triggerEmailAutomation = async (targetOrder: any) => {
    if (!targetOrder?.customer?.email) return;
    setEmailSending(true);
    try {
      const res = await fetch("/api/send-material-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: targetOrder.orderId,
          customer: targetOrder.customer,
          items: targetOrder.items,
          total: targetOrder.total,
          paymentMethod: targetOrder.paymentMethod,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setEmailStatus(`Materiais e comprovante enviados com sucesso para ${targetOrder.customer.email}!`);
        if (data.emailPreviewHtml) {
          setPreviewHtml(data.emailPreviewHtml);
        }
      }
    } catch (err) {
      console.error("Erro ao disparar automação de e-mail:", err);
      setEmailStatus("Automação registrada: materiais disponíveis também na Área do Aluno.");
    } finally {
      setEmailSending(false);
    }
  };

  const handleCopyPix = () => {
    if (order?.pixCopiaECola) {
      navigator.clipboard.writeText(order.pixCopiaECola);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleSimulatePaymentApproval = () => {
    if (!order) return;
    try {
      const orders = JSON.parse(
        localStorage.getItem("@cursos-livres-tech-ia/orders") || "[]"
      );
      const updated = orders.map((o: any) =>
        o.orderId === order.orderId ? { ...o, status: "aprovado" } : o
      );
      localStorage.setItem("@cursos-livres-tech-ia/orders", JSON.stringify(updated));
      setSimulatedPaid(true);
      const updatedOrder = { ...order, status: "aprovado" };
      setOrder(updatedOrder);

      // Dispara imediatamente a automação de e-mail ao pagar
      triggerEmailAutomation(updatedOrder);
    } catch (e) {
      console.error("Erro ao simular aprovação:", e);
    }
  };

  if (!order) {
    return (
      <div className="py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-navy-950">Buscando seu pedido...</h2>
        <p className="text-xs text-slate-500">
          Caso seu pedido não apareça, acesse a Área do Aluno com seu e-mail cadastrado.
        </p>
        <Link
          href="/area-do-aluno"
          className="inline-block px-4 py-2 bg-navy-900 text-white rounded-lg text-xs font-semibold"
        >
          Ir para Área do Aluno
        </Link>
      </div>
    );
  }

  const isPix = order.paymentMethod === "pix";
  const isApproved = simulatedPaid || order.status === "aprovado";

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Topo de Sucesso */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs text-center space-y-3">
        <div className="w-16 h-16 bg-tealbrand-100 text-tealbrand-700 rounded-full flex items-center justify-center mx-auto">
          {isApproved ? (
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          ) : (
            <QrCode className="w-9 h-9 text-tealbrand-700" />
          )}
        </div>

        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-tealbrand-700">
            Pedido #{order.orderId}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-navy-950">
            {isApproved
              ? "Pagamento Confirmado com Sucesso!"
              : "Pedido Criado! Pague com Pix para Liberar"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            {isApproved
              ? `Parabéns, ${order.customer?.fullName || "Aluno(a)"}! Seus materiais foram liberados imediatamente e enviados para o seu e-mail.`
              : `Olá, ${order.customer?.fullName || "Aluno(a)"}! Escaneie o QR Code abaixo ou utilize o código Copia e Cola. O acesso é liberado instantaneamente assim que confirmado.`}
          </p>
        </div>

        {/* Notificação da Automação de E-mail */}
        <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 max-w-xl mx-auto">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-tealbrand-600 flex-shrink-0" />
            <span>
              E-mail do Aluno: <strong>{order.customer?.email}</strong>
            </span>
          </div>
          {isApproved && (
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-slate-300">•</span>
              <button
                onClick={() => triggerEmailAutomation(order)}
                disabled={emailSending}
                className="text-[11px] font-bold text-tealbrand-700 hover:text-tealbrand-900 underline flex items-center gap-1"
              >
                <RefreshCw className={`w-3 h-3 ${emailSending ? "animate-spin" : ""}`} />
                <span>{emailSending ? "Enviando..." : "Reenviar e-mail"}</span>
              </button>
              {previewHtml && (
                <button
                  onClick={() => setPreviewModalOpen(true)}
                  className="text-[11px] font-bold text-navy-800 hover:text-navy-950 underline flex items-center gap-1 ml-2"
                >
                  <Eye className="w-3 h-3" />
                  <span>Ver e-mail</span>
                </button>
              )}
            </div>
          )}
        </div>

        {emailStatus && isApproved && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center justify-center gap-2 max-w-xl mx-auto">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{emailStatus}</span>
          </div>
        )}
      </div>

      {/* Caixa do Pix (se Pix e ainda aguardando) */}
      {isPix && !isApproved && (
        <div className="bg-white rounded-2xl border-2 border-tealbrand-400 p-6 sm:p-8 shadow-md space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-bold text-navy-950 text-sm sm:text-base">
                Aguardando Pagamento Pix
              </span>
            </div>
            <span className="text-base font-black text-emerald-600">
              {formatCurrency(order.total)}
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 justify-center">
            {/* QR Code */}
            {order.pixQrCodeUrl && (
              <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs text-center flex-shrink-0">
                <img
                  src={order.pixQrCodeUrl}
                  alt="QR Code Pix"
                  className="w-48 h-48 sm:w-56 sm:h-56 mx-auto"
                />
                <span className="text-[10px] text-slate-400 block mt-1">
                  Abra o aplicativo do seu banco e aponte a câmera
                </span>
              </div>
            )}

            {/* Chave Copia e Cola */}
            <div className="flex-1 space-y-4 w-full">
              <div className="space-y-1">
                <label className="text-xs font-bold text-navy-900 block">
                  Pix Copia e Cola (Chave do Mercado Pago):
                </label>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-[11px] font-mono text-slate-600 break-all select-all max-h-24 overflow-y-auto">
                  {order.pixCopiaECola}
                </div>
              </div>

              <button
                onClick={handleCopyPix}
                className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                  copied
                    ? "bg-emerald-600 text-white"
                    : "bg-navy-900 hover:bg-navy-800 text-white shadow-xs"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Código Pix Copiado com Sucesso!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copiar Código Pix Copia e Cola</span>
                  </>
                )}
              </button>

              {/* Botão de Simulação de Pagamento para Demonstração Instantânea */}
              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={handleSimulatePaymentApproval}
                  className="w-full py-2.5 px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Zap className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Simular Aprovação Imediata do Pix (Demonstração)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Caixa de Materiais Liberados (se aprovado) */}
      {isApproved && (
        <div className="bg-white rounded-2xl border border-emerald-300 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-base">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <span>Seus Materiais Estão Prontos para Download e Acesso!</span>
          </div>

          <div className="divide-y divide-slate-100">
            {order.items?.map((item: any) => {
              const isVideo =
                item.format?.includes("Vídeo") || item.format?.includes("Membros");
              const downloadUrl = `/api/download/${encodeURIComponent(
                item.slug || item.id
              )}?nome=${encodeURIComponent(
                order.customer?.fullName || "Aluno"
              )}&pedido=${order.orderId}`;

              return (
                <div
                  key={item.id}
                  className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div>
                    <span className="text-[10px] font-bold text-tealbrand-700 bg-tealbrand-50 px-2 py-0.5 rounded uppercase">
                      {item.format || "PDF"}
                    </span>
                    <h4 className="font-bold text-navy-950 text-sm sm:text-base mt-1">
                      {item.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {!isVideo ? (
                      <a
                        href={downloadUrl}
                        download
                        className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                      >
                        <Download className="w-4 h-4" />
                        <span>Baixar Arquivo PDF</span>
                      </a>
                    ) : (
                      <Link
                        href="/area-do-aluno"
                        className="w-full sm:w-auto px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                      >
                        <Video className="w-4 h-4" />
                        <span>Acessar Aulas</span>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Todos esses materiais ficam salvos permanentemente na sua Área do Aluno.
            </div>
            <Link
              href="/area-do-aluno"
              className="px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold flex items-center gap-2 transition-colors"
            >
              <span>Ir para a Área do Aluno Completa</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* Selo de Garantia 7 Dias */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center gap-3 text-xs text-slate-600">
        <ShieldCheck className="w-5 h-5 text-tealbrand-600 flex-shrink-0" />
        <div>
          <strong>Lembre-se da sua garantia incondicional de 7 dias:</strong> Caso deseje qualquer esclarecimento ou cancelamento com devolução 100% integral (Art. 49 CDC), contate nosso suporte pelo WhatsApp ou e-mail.
        </div>
      </div>

      {/* Modal de Prévia do E-mail Enviado */}
      {previewModalOpen && previewHtml && (
        <div className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-tealbrand-600" />
                <h3 className="text-base font-bold text-navy-950">
                  Prévia do E-mail Enviado ao Aluno
                </h3>
              </div>
              <button
                onClick={() => setPreviewModalOpen(false)}
                className="p-1 text-slate-400 hover:text-navy-950 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto border border-slate-200 rounded-xl p-2 bg-slate-50">
              <iframe
                title="Prévia do E-mail"
                srcDoc={previewHtml}
                className="w-full h-96 rounded-lg bg-white"
              />
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setPreviewModalOpen(false)}
                className="px-4 py-2 bg-navy-900 text-white rounded-xl text-xs font-bold"
              >
                Fechar Prévia
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="py-16 text-center text-slate-400 text-sm">
          Carregando informações do pedido...
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
