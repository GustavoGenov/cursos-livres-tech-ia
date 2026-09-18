import React from "react";
import Link from "next/link";
import { ShieldCheck, RefreshCw, CheckCircle2, Clock, Mail, Phone, AlertTriangle } from "lucide-react";

export default function ReembolsoGarantiaPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span>Garantia Legal Blindada • Artigo 49 do CDC</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-navy-950">
          Política de Reembolso & Garantia Incondicional
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
          Compre com total tranquilidade. Você tem <strong>7 dias completos</strong> para avaliar o material e requerer a devolução de 100% do seu dinheiro caso não atenda às suas expectativas.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        {/* Banner de Garantia Incondicional */}
        <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-50 via-tealbrand-50 to-emerald-50 border border-emerald-200 text-emerald-950 space-y-2">
          <div className="flex items-center gap-2 font-black text-base text-emerald-900">
            <ShieldCheck className="w-6 h-6 text-emerald-600 flex-shrink-0" />
            7 Dias de Garantia Incondicional: Respeito Total ao Consumidor de Boa-Fé
          </div>
          <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
            Em total consonância com o <strong>Artigo 49 da Lei Federal nº 8.078/1990 (Código de Defesa do Consumidor)</strong>, o adquirente pode exercer o direito de arrependimento da contratação no prazo de <strong>7 (sete) dias corridos</strong> contados a partir da aprovação do pagamento, recebendo a restituição de 100% (cem por cento) do valor despendido, sem burocracia ou constrangimentos.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-navy-950">
            Como Solicitar Seu Reembolso (Passo a Passo Descomplicado)
          </h2>
          <p>
            Nosso compromisso com a honestidade é absoluto. Se o conteúdo não atender suas necessidades práticas de capacitação técnica, siga os passos abaixo:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-1">
              <div className="w-8 h-8 rounded-full bg-navy-900 text-white font-black text-sm flex items-center justify-center mx-auto">
                1
              </div>
              <strong className="text-navy-950 block text-xs">Envie uma Mensagem</strong>
              <p className="text-[11px] text-slate-500">
                Encaminhe seu número de pedido e CPF para o e-mail ou WhatsApp oficial.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-1">
              <div className="w-8 h-8 rounded-full bg-navy-900 text-white font-black text-sm flex items-center justify-center mx-auto">
                2
              </div>
              <strong className="text-navy-950 block text-xs">Sem Atritos</strong>
              <p className="text-[11px] text-slate-500">
                Não exigimos justificativas longas nem criamos obstáculos para clientes de boa-fé.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-1">
              <div className="w-8 h-8 rounded-full bg-navy-900 text-white font-black text-sm flex items-center justify-center mx-auto">
                3
              </div>
              <strong className="text-navy-950 block text-xs">Estorno Integral</strong>
              <p className="text-[11px] text-slate-500">
                O valor é estornado pela mesma via de pagamento processada pelo Mercado Pago.
              </p>
            </div>
          </div>
        </section>

        {/* Cláusula de Proteção Legal Contra Golpistas e Práticas Ilícitas */}
        <section className="p-4 sm:p-5 rounded-xl bg-amberbrand-50/70 border border-amberbrand-300 space-y-3">
          <div className="flex items-center gap-2 text-amberbrand-950 font-bold text-sm">
            <AlertTriangle className="w-5 h-5 text-amberbrand-700 flex-shrink-0" />
            Blindagem Jurídica: Boa-Fé Contratual & Efeitos da Rescisão
          </div>
          <div className="space-y-2 text-xs text-amberbrand-950 leading-relaxed">
            <p>
              <strong>1. Revogação Imediata da Licença de Uso:</strong> O estorno do valor pago opera a resolução imediata do contrato. Fica terminantemente proibido reter cópias digitais, utilizar os fluxos e apostilas ou reproduzir o conteúdo previamente baixado, sob pena de incorrer em <strong>violação dolosa de direitos autorais (Lei nº 9.610/98)</strong> e apropriação indevida.
            </p>
            <p>
              <strong>2. Defesa Contra Golpes de Chargeback / Fraude Amigável:</strong> Consumidores que contestam compras de má-fé diretamente no cartão de crédito após a realização do download completo dos materiais digitais, com o objetivo de obter o conteúdo sem pagar, serão identificados por meio do <strong>relatório técnico de auditoria e logs de IP</strong>. Nesses casos, a empresa reserva-se o direito de:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li>Instruir contestação formal e definitiva perante a credenciadora bancária;</li>
              <li>Promover a inscrição dos dados cadastrais do infrator nos órgãos de proteção ao crédito (SPC/Serasa) pelo débito existente;</li>
              <li>Adotar as providências policiais e judiciais cabíveis na Comarca de Minas Gerais pela prática de fraude eletrônica (Lei 14.155/2021).</li>
            </ul>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-navy-950">
            Prazos de Efetivação do Reembolso
          </h2>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Pagamentos via Pix:</strong> O estorno é realizado via chave Pix de titularidade vinculada ao CPF cadastrado no pedido, em até 24 a 48 horas úteis após a conferência cadastral.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Pagamentos via Cartão de Crédito:</strong> A ordem de cancelamento é enviada imediatamente ao Mercado Pago. O crédito na sua fatura seguirá os prazos da emissora do seu cartão (usualmente na fatura atual ou na subsequente).
              </div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Pagamentos via Boleto Bancário:</strong> O valor fica disponível para resgate na conta do Mercado Pago ou transferência para a conta bancária do titular do pedido.
              </div>
            </li>
          </ul>
        </section>

        {/* Canais Oficiais de Suporte */}
        <section className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
          <h3 className="font-bold text-navy-950 text-sm">
            Canais de Atendimento Oficial de Reembolso
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-tealbrand-600 flex-shrink-0" />
              <div>
                <span className="text-slate-400 block text-[11px]">E-mail de Suporte:</span>
                <a href="mailto:gustavocastroinfo@gmail.com" className="font-bold text-navy-900 hover:underline">
                  gustavocastroinfo@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <div>
                <span className="text-slate-400 block text-[11px]">WhatsApp de Atendimento:</span>
                <a href="https://wa.me/5537999184509" target="_blank" rel="noopener noreferrer" className="font-bold text-navy-900 hover:underline">
                  +55 (37) 99918-4509
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="pt-4 border-t border-slate-200 text-slate-500 text-[11px]">
          Compromisso com o Código de Defesa do Consumidor • GUSTAVO DE CASTRO BERNARDES ROSA • CNPJ: 26.807.315/0001-39 • MINAS GERAIS
        </div>
      </div>
    </div>
  );
}
