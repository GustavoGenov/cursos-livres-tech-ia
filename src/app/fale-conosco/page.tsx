"use client";
import React, { useState } from "react";
import { Mail, Phone, Clock, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function FaleConoscoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-navy-950">
          Fale Conosco
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          Atendimento humanizado sem robôs repetitivos. Nossa equipe de suporte e redação responde diretamente.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cartões de Informações de Contato (5 colunas) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h2 className="font-bold text-navy-950 text-sm border-b border-slate-100 pb-2">
              Canais Oficiais
            </h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-tealbrand-100 text-tealbrand-800 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-navy-950 block">E-mail de Suporte</strong>
                  <a href="mailto:gustavocastroinfo@gmail.com" className="text-slate-600 hover:text-navy-900">
                    gustavocastroinfo@gmail.com
                  </a>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    Resposta em até 4 horas úteis
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-navy-950 block">WhatsApp de Atendimento</strong>
                  <a
                    href="https://wa.me/5537999184509"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 font-bold hover:underline"
                  >
                    +55 (37) 99918-4509
                  </a>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    Atendimento ágil de segunda a sexta
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-navy-950 block">Horário de Atendimento</strong>
                  <span className="text-slate-600 block">
                    Segunda a Sexta: 09h às 18h
                  </span>
                  <span className="text-slate-600 block">
                    Sábados: 09h às 13h
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-navy-100 text-navy-900 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-navy-950 block">Sede da Empresa</strong>
                  <span className="text-slate-600 block">
                    Gustavo de Castro Bernardes Rosa
                  </span>
                  <span className="text-slate-600 block">
                    CNPJ: 26.807.315/0001-39 • Minas Gerais - Brasil
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Formulário de Mensagem Direta (7 colunas) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="font-bold text-navy-950 text-base">
            Envie uma Mensagem
          </h2>

          {sent ? (
            <div className="p-6 bg-tealbrand-50 border border-tealbrand-200 rounded-xl text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-tealbrand-600 mx-auto" />
              <h3 className="font-bold text-navy-950 text-sm">
                Mensagem enviada com sucesso!
              </h3>
              <p className="text-xs text-slate-600">
                Obrigado pelo contato, {formData.name}. Nossa equipe responderá no e-mail {formData.email} em breve.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-navy-900">Seu Nome *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nome Completo"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, name: e.target.value }))
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-100"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-navy-900">Seu E-mail *</label>
                  <input
                    type="email"
                    required
                    placeholder="seuemail@exemplo.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, email: e.target.value }))
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-100"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-navy-900">Assunto</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Dúvida sobre apostila ou pedido"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, subject: e.target.value }))
                  }
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-100"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-navy-900">Mensagem *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Como podemos ajudar você hoje?"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, message: e.target.value }))
                  }
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-100"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Mensagem para o Suporte</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
