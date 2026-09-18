import React from "react";
import { ShieldCheck, Lock, EyeOff, Server, CheckCircle2, FileText } from "lucide-react";

export default function PoliticaPrivacidadePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tealbrand-100 text-tealbrand-900 text-xs font-bold border border-tealbrand-200">
          <ShieldCheck className="w-3.5 h-3.5 text-tealbrand-700" />
          <span>Conformidade com a Lei Geral de Proteção de Dados (LGPD)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-navy-950">
          Política de Privacidade & Proteção de Dados
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
          Como tratamos e protegemos seus dados sob as diretrizes da Lei Federal nº 13.709/2018 (LGPD) e do Marco Civil da Internet.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        {/* Destaque de Não Compartilhamento */}
        <div className="p-4 rounded-xl bg-tealbrand-50 border border-tealbrand-200 text-tealbrand-950 flex items-start gap-3">
          <EyeOff className="w-5 h-5 text-tealbrand-700 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="block text-xs sm:text-sm">
              Garantia de Sigilo: Seus dados NUNCA são vendidos a terceiros.
            </strong>
            <p className="text-xs text-tealbrand-900 leading-relaxed">
              O titular <strong>Gustavo de Castro Bernardes Rosa</strong> (CNPJ: 26.807.315/0001-39 - Minas Gerais) utiliza seus dados exclusivamente para cumprimento de obrigações fiscais (emissão de NFS-e), faturamento seguro perante o gateway parceiro e entrega instantânea dos materiais didáticos adquiridos.
            </p>
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-navy-950">
            1. Identificação do Controlador dos Dados
          </h2>
          <p>
            O Controlador responsável pelo tratamento dos dados pessoais coletados nesta plataforma é:
          </p>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
            <div><strong>Razão Social / Titular:</strong> Gustavo de Castro Bernardes Rosa</div>
            <div><strong>CNPJ:</strong> 26.807.315/0001-39</div>
            <div><strong>Sede:</strong> Minas Gerais, Brasil</div>
            <div><strong>Canal do Encarregado de Proteção de Dados (DPO):</strong> privacidade@cursoslivrestechia.com.br</div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-navy-950">
            2. Dados Coletados e Base Legal de Tratamento (Art. 7º da LGPD)
          </h2>
          <div className="space-y-3">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <strong className="text-navy-950 block text-xs font-bold">Nome Completo e CPF:</strong>
              <span className="text-xs text-slate-600">
                <strong>Base legal:</strong> Cumprimento de obrigação legal ou regulatória pelo controlador (Art. 7º, II da LGPD). Coletados obrigatoriamente para a emissão de nota fiscal junto às autoridades fazendárias e verificação antifraude.
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <strong className="text-navy-950 block text-xs font-bold">E-mail:</strong>
              <span className="text-xs text-slate-600">
                <strong>Base legal:</strong> Execução de contrato (Art. 7º, V da LGPD). Canal exclusivo onde o cliente recebe o comprovante de pagamento, os links de download direto e a chave de acesso à Área do Aluno.
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <strong className="text-navy-950 block text-xs font-bold">Telefone / WhatsApp com DDD:</strong>
              <span className="text-xs text-slate-600">
                <strong>Base legal:</strong> Execução de contrato e legítimo interesse (Art. 7º, V e IX da LGPD). Utilizado para notificações críticas de faturamento e suporte humanizado solicitado pelo cliente.
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <strong className="text-navy-950 block text-xs font-bold">Endereço de Faturamento:</strong>
              <span className="text-xs text-slate-600">
                <strong>Base legal:</strong> Obrigação tributária e validação junto ao gateway de pagamentos para blindagem contra clonagem de cartões de crédito.
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <strong className="text-navy-950 block text-xs font-bold">Registros de Acesso (IP, Data e Hora):</strong>
              <span className="text-xs text-slate-600">
                <strong>Base legal:</strong> Cumprimento obrigatório do Artigo 15 da Lei Federal nº 12.965/2014 (Marco Civil da Internet), mantidos em ambiente seguro para fins de auditoria técnica e prevenção a fraudes eletrônicas.
              </span>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-navy-950">
            3. Segurança de Dados Financeiros
          </h2>
          <p>
            O processamento dos pagamentos via Cartão de Crédito e Pix é realizado por meio de infraestrutura homologada pelo <strong>Mercado Pago</strong> com certificação PCI-DSS. A Cursos Livres Tech & I.A <strong>não armazena nem tem acesso</strong> aos números de cartões de crédito, códigos de segurança (CVV) ou senhas bancárias dos clientes.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-navy-950">
            4. Direitos do Consumidor e do Titular de Dados (Art. 18 da LGPD)
          </h2>
          <p>
            O usuário pode exercer seus direitos garantidos pela LGPD (confirmação da existência de tratamento, correção de dados, anonimização de dados desnecessários ou revogação de consentimento) enviando solicitação para <strong>privacidade@cursoslivrestechia.com.br</strong>, respeitado o prazo legal de guarda de dados para finalidade fiscal (mínimo de 5 anos pelo Código Tributário Nacional).
          </p>
        </section>

        <div className="pt-4 border-t border-slate-200 text-slate-500 text-[11px]">
          Em vigor a partir de Março de 2026 • GUSTAVO DE CASTRO BERNARDES ROSA • CNPJ: 26.807.315/0001-39 • MINAS GERAIS
        </div>
      </div>
    </div>
  );
}
