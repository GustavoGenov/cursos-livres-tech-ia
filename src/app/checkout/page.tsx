"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatCurrency, calculateInstallment, formatPhone, formatCEP } from "@/lib/utils";
import { isValidCPF, formatCPF } from "@/lib/cpfValidator";
import { GuaranteeBadge } from "@/components/GuaranteeBadge";
import {
  ShieldCheck,
  Lock,
  QrCode,
  CreditCard,
  FileText,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  User,
  Mail,
  Phone,
  MapPin,
  Building,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, totalItems, clearCart } = useCart();

  // Dados Cadastrais Obrigatórios (Antifraude, NF e Acesso)
  const [formData, setFormData] = useState({
    fullName: "",
    cpf: "",
    email: "",
    phone: "",
    cep: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  });

  // Método de Pagamento
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "credit_card" | "boleto">("pix");
  const [installments, setInstallments] = useState(1);

  // Cartão (se selecionado)
  const [cardData, setCardData] = useState({
    number: "",
    holder: "",
    expiry: "",
    cvv: "",
  });

  // Estados de Validação e Envio
  const [loadingCep, setLoadingCep] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [cpfError, setCpfError] = useState("");

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    setFormData((prev) => ({ ...prev, cpf: formatted }));

    const clean = formatted.replace(/\D/g, "");
    if (clean.length === 11) {
      if (!isValidCPF(formatted)) {
        setCpfError("CPF inválido. Verifique os dígitos digitados.");
      } else {
        setCpfError("");
      }
    } else {
      setCpfError("");
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, phone: formatPhone(e.target.value) }));
  };

  const handleCepBlur = async () => {
    const cleanCep = formData.cep.replace(/\D/g, "");
    if (cleanCep.length === 8) {
      setLoadingCep(true);
      try {
        const res = await fetch(`/api/cep/${cleanCep}`);
        if (res.ok) {
          const data = await res.json();
          setFormData((prev) => ({
            ...prev,
            street: data.street || "",
            neighborhood: data.neighborhood || "",
            city: data.city || "",
            state: data.state || "",
          }));
        }
      } catch (e) {
        console.error("Erro ao buscar CEP:", e);
      } finally {
        setLoadingCep(false);
      }
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // 1. Validações pré-envio
    if (!formData.fullName.trim()) {
      setErrorMessage("Por favor, informe seu Nome Completo.");
      return;
    }

    if (!isValidCPF(formData.cpf)) {
      setErrorMessage("Por favor, informe um CPF válido para emissão da nota fiscal.");
      return;
    }

    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setErrorMessage("Por favor, informe um e-mail válido para envio dos acessos.");
      return;
    }

    if (formData.phone.replace(/\D/g, "").length < 10) {
      setErrorMessage("Por favor, informe um número de telefone com DDD válido.");
      return;
    }

    if (!formData.street.trim() || !formData.number.trim() || !formData.city.trim()) {
      setErrorMessage("Por favor, preencha o endereço completo para faturamento.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: formData,
          items: items.map((i) => ({
            id: i.product.id,
            title: i.product.title,
            price: i.product.price,
            quantity: i.quantity,
            format: i.product.format,
            slug: i.product.slug,
          })),
          paymentMethod,
          installments: paymentMethod === "credit_card" ? installments : 1,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || "Ocorreu um erro ao processar seu pedido.");
        setSubmitting(false);
        return;
      }

      // Salva o pedido no localStorage para ser recuperado na página de sucesso e na Área do Aluno
      try {
        const existingOrders = JSON.parse(
          localStorage.getItem("@cursos-livres-tech-ia/orders") || "[]"
        );
        existingOrders.unshift(data.order);
        localStorage.setItem(
          "@cursos-livres-tech-ia/orders",
          JSON.stringify(existingOrders)
        );
        // Salva dados do cliente logado para login automático
        localStorage.setItem(
          "@cursos-livres-tech-ia/user",
          JSON.stringify({
            email: formData.email,
            cpf: formData.cpf,
            name: formData.fullName,
          })
        );
      } catch (err) {
        console.error("Erro ao salvar histórico do pedido:", err);
      }

      // Limpa carrinho
      clearCart();

      // Redireciona para página de agradecimento / QR code
      router.push(`/obrigado?orderId=${data.order.orderId}`);
    } catch (err) {
      console.error(err);
      setErrorMessage("Falha de conexão com o servidor. Tente novamente.");
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-4">
        <h1 className="text-2xl font-black text-navy-950">Nenhum produto selecionado</h1>
        <p className="text-xs text-slate-500">
          Adicione um material ao carrinho antes de acessar o checkout.
        </p>
        <Link
          href="/"
          className="inline-block px-5 py-2.5 bg-navy-900 text-white rounded-lg text-xs font-bold hover:bg-navy-800"
        >
          Ir ao Catálogo
        </Link>
      </div>
    );
  }

  const installmentDetails = calculateInstallment(subtotal);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Cabeçalho do Checkout */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1 text-xs font-bold text-tealbrand-700 bg-tealbrand-50 px-3 py-1 rounded-full border border-tealbrand-200">
          <ShieldCheck className="w-4 h-4 text-tealbrand-600" />
          <span>Checkout Seguro & Blindado • Processamento Mercado Pago</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-navy-950">
          Finalizar Seu Pedido
        </h1>
        <p className="text-xs text-slate-500">
          Preencha seus dados para emissão da nota fiscal e liberação imediata dos seus materiais.
        </p>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Coluna de Dados Cadastrais + Pagamento (7 colunas) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Passo 1: Dados do Titular (Obrigatório e Antifraude) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <div className="w-6 h-6 rounded-full bg-navy-900 text-white text-xs font-bold flex items-center justify-center">
                1
              </div>
              <h2 className="font-bold text-navy-950 text-sm sm:text-base">
                Dados Cadastrais & Nota Fiscal
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-navy-800 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Carlos Eduardo Silva"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, fullName: e.target.value }))
                  }
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-100 focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-navy-800 flex items-center justify-between">
                  <span>CPF (Para Nota Fiscal) *</span>
                  {cpfError && <span className="text-[10px] text-red-600">{cpfError}</span>}
                </label>
                <input
                  type="text"
                  required
                  maxLength={14}
                  placeholder="000.000.000-00"
                  value={formData.cpf}
                  onChange={handleCpfChange}
                  className={`w-full text-xs p-2.5 bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-100 focus:bg-white ${
                    cpfError ? "border-red-500 bg-red-50/40" : "border-slate-300"
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-navy-800 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  WhatsApp / Celular com DDD *
                </label>
                <input
                  type="text"
                  required
                  maxLength={15}
                  placeholder="(11) 99999-9999"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-100 focus:bg-white"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-navy-800 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    E-mail (Onde você receberá os materiais e acesso) *
                  </span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="seuemail@exemplo.com.br"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-100 focus:bg-white"
                />
              </div>
            </div>

            {/* Endereço para Faturamento */}
            <div className="pt-2 border-t border-slate-100 space-y-3">
              <div className="text-xs font-bold text-navy-800 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                Endereço de Faturamento
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-600">
                    CEP {loadingCep && "(Buscando...)"}
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={9}
                    placeholder="00000-000"
                    value={formData.cep}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, cep: formatCEP(e.target.value) }))
                    }
                    onBlur={handleCepBlur}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[11px] font-semibold text-slate-600">Rua / Logradouro</label>
                  <input
                    type="text"
                    required
                    placeholder="Rua das Flores"
                    value={formData.street}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, street: e.target.value }))
                    }
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-600">Número</label>
                  <input
                    type="text"
                    required
                    placeholder="123"
                    value={formData.number}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, number: e.target.value }))
                    }
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-600">Bairro</label>
                  <input
                    type="text"
                    required
                    placeholder="Centro"
                    value={formData.neighborhood}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, neighborhood: e.target.value }))
                    }
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-600">Cidade / UF</label>
                  <input
                    type="text"
                    required
                    placeholder="São Paulo - SP"
                    value={
                      formData.city && formData.state
                        ? `${formData.city} - ${formData.state}`
                        : formData.city
                    }
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, city: e.target.value }))
                    }
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Passo 2: Pagamento Seguro (Mercado Pago) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-navy-900 text-white text-xs font-bold flex items-center justify-center">
                  2
                </div>
                <h2 className="font-bold text-navy-950 text-sm sm:text-base">
                  Forma de Pagamento (Mercado Pago)
                </h2>
              </div>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                Oficial Mercado Pago
              </span>
            </div>

            {/* Opções de Pagamento */}
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setPaymentMethod("pix")}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  paymentMethod === "pix"
                    ? "border-tealbrand-600 bg-tealbrand-50/60 ring-2 ring-tealbrand-200 font-bold text-tealbrand-950"
                    : "border-slate-200 hover:bg-slate-50 text-slate-700"
                }`}
              >
                <QrCode className="w-5 h-5 text-tealbrand-600" />
                <span className="text-xs">Pix</span>
                <span className="text-[10px] text-emerald-600 font-extrabold">
                  Imediato
                </span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("credit_card")}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  paymentMethod === "credit_card"
                    ? "border-navy-800 bg-navy-50/60 ring-2 ring-navy-200 font-bold text-navy-950"
                    : "border-slate-200 hover:bg-slate-50 text-slate-700"
                }`}
              >
                <CreditCard className="w-5 h-5 text-navy-800" />
                <span className="text-xs">Cartão</span>
                <span className="text-[10px] text-slate-500">Até 12x</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("boleto")}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  paymentMethod === "boleto"
                    ? "border-slate-700 bg-slate-100 ring-2 ring-slate-300 font-bold text-navy-950"
                    : "border-slate-200 hover:bg-slate-50 text-slate-700"
                }`}
              >
                <FileText className="w-5 h-5 text-slate-600" />
                <span className="text-xs">Boleto</span>
                <span className="text-[10px] text-slate-500">1 a 3 dias</span>
              </button>
            </div>

            {/* Conteúdo específico da opção selecionada */}
            {paymentMethod === "pix" && (
              <div className="p-4 rounded-xl bg-tealbrand-50/50 border border-tealbrand-200 space-y-2 text-xs text-tealbrand-900">
                <div className="font-bold flex items-center gap-1.5 text-tealbrand-800">
                  <CheckCircle2 className="w-4 h-4 text-tealbrand-600" />
                  Liberação Automática em Poucos Segundos
                </div>
                <p className="text-[11px] text-tealbrand-700 leading-relaxed">
                  Ao clicar em Finalizar, você receberá o QR Code e o código Pix Copia e Cola na tela. Assim que o pagamento for concluído no seu banco, seu download e acesso serão liberados instantaneamente.
                </p>
              </div>
            )}

            {paymentMethod === "credit_card" && (
              <div className="space-y-3 pt-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Parcelamento</label>
                  <select
                    value={installments}
                    onChange={(e) => setInstallments(Number(e.target.value))}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-300 rounded-lg text-navy-900"
                  >
                    <option value={1}>1x de {formatCurrency(subtotal)} à vista sem juros</option>
                    <option value={2}>2x de {formatCurrency(subtotal / 2)} sem juros</option>
                    <option value={3}>3x de {formatCurrency(subtotal / 3)} sem juros</option>
                    <option value={6}>6x de {formatCurrency(subtotal / 6)} sem juros</option>
                    <option value={12}>12x de {formatCurrency(subtotal / 12)} sem juros</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 space-y-1">
                    <label className="text-xs font-bold text-slate-700">Número do Cartão</label>
                    <input
                      type="text"
                      maxLength={19}
                      placeholder="0000 0000 0000 0000"
                      value={cardData.number}
                      onChange={(e) =>
                        setCardData((prev) => ({ ...prev, number: e.target.value }))
                      }
                      className="w-full text-xs p-2 bg-slate-50 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Validade</label>
                    <input
                      type="text"
                      maxLength={5}
                      placeholder="MM/AA"
                      value={cardData.expiry}
                      onChange={(e) =>
                        setCardData((prev) => ({ ...prev, expiry: e.target.value }))
                      }
                      className="w-full text-xs p-2 bg-slate-50 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">CVV</label>
                    <input
                      type="text"
                      maxLength={4}
                      placeholder="123"
                      value={cardData.cvv}
                      onChange={(e) =>
                        setCardData((prev) => ({ ...prev, cvv: e.target.value }))
                      }
                      className="w-full text-xs p-2 bg-slate-50 border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "boleto" && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                <div className="font-bold text-navy-950">Aviso sobre compensação bancária:</div>
                <p className="text-[11px] leading-relaxed">
                  Os boletos levam de 1 a 3 dias úteis para compensar após o pagamento no banco. Se você deseja ter acesso imediato hoje, recomendamos pagar via <strong>Pix</strong>.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Coluna Lateral: Resumo do Pedido e Confirmação (5 colunas) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5 sticky top-24">
            <h3 className="font-bold text-navy-950 text-base border-b border-slate-100 pb-3">
              Materiais no Pedido ({totalItems})
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {items.map(({ product }) => (
                <div key={product.id} className="flex gap-3 text-xs">
                  <div className="w-12 h-14 rounded-md overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                    <img
                      src={product.images.cover}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-navy-950 line-clamp-1">
                      {product.title}
                    </h4>
                    <span className="text-[10px] text-tealbrand-700 block mt-0.5">
                      {product.format}
                    </span>
                    <div className="font-extrabold text-navy-900 mt-1">
                      {formatCurrency(product.price)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-200 pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-semibold text-navy-950">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Entrega:</span>
                <span className="font-bold text-emerald-600">Imediata (Grátis)</span>
              </div>
              <div className="flex justify-between text-base font-black text-navy-950 pt-2 border-t border-slate-100">
                <span>Total a Pagar:</span>
                <span className="text-xl text-emerald-600">{formatCurrency(subtotal)}</span>
              </div>
              <p className="text-[11px] text-slate-400 text-right">
                ou {installmentDetails.formatted}
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 px-4 rounded-xl bg-amberbrand-500 hover:bg-amberbrand-600 active:bg-amberbrand-700 text-navy-950 font-black text-base flex items-center justify-center gap-2 shadow-cta hover:shadow-lg transition-all disabled:opacity-50"
            >
              {submitting ? (
                <span>Processando com Segurança...</span>
              ) : (
                <>
                  <span>
                    {paymentMethod === "pix"
                      ? "Gerar Pix e Concluir Pedido"
                      : "Confirmar Pagamento Seguro"}
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <GuaranteeBadge variant="compact" className="w-full justify-center" />

            {/* Selos de Confiança Mercado Pago */}
            <div className="pt-2 text-center text-[10px] text-slate-400 space-y-1">
              <p className="font-semibold text-slate-500">
                Plataforma 100% Protegida por Mercado Pago e SSL 256 bits
              </p>
              <p>
                Seus dados cadastrais são tratados com estrita confidencialidade segundo a Lei Geral de Proteção de Dados (LGPD).
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
