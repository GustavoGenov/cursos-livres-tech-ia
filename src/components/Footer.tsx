import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  CreditCard,
  QrCode,
  FileText,
  Mail,
  Phone,
  Clock,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-navy-800 text-sm mt-16">
      {/* Faixa de Segurança & Selos Oficiais */}
      <div className="border-b border-navy-900 bg-navy-900/60 py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-tealbrand-900/50 border border-tealbrand-700/50 flex items-center justify-center text-tealbrand-400 flex-shrink-0">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-white text-xs sm:text-sm">
                Pix com Liberação Instantânea
              </div>
              <p className="text-slate-400 text-xs mt-0.5">
                Download imediato no painel e no seu e-mail
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-tealbrand-900/50 border border-tealbrand-700/50 flex items-center justify-center text-tealbrand-400 flex-shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-white text-xs sm:text-sm">
                Parcele em até 12x
              </div>
              <p className="text-slate-400 text-xs mt-0.5">
                Checkout transparente via Mercado Pago
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-tealbrand-900/50 border border-tealbrand-700/50 flex items-center justify-center text-tealbrand-400 flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-white text-xs sm:text-sm">
                Garantia Incondicional 7 Dias
              </div>
              <p className="text-slate-400 text-xs mt-0.5">
                Devolução 100% integral conforme Art. 49 CDC
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-tealbrand-900/50 border border-tealbrand-700/50 flex items-center justify-center text-tealbrand-400 flex-shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-white text-xs sm:text-sm">
                Segurança SSL Criptografada
              </div>
              <p className="text-slate-400 text-xs mt-0.5">
                Seus dados protegidos sob as normas da LGPD
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal do Rodapé */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Coluna 1 e 2: Sobre a Marca e Propósito */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-xl overflow-hidden border-2 border-amberbrand-400 shadow-md bg-navy-950 flex-shrink-0">
                <img
                  src="/images/logo-texugo.jpg"
                  alt="Símbolo Texugo - Cursos Livres Tech & I.A"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg text-white tracking-tight flex items-center gap-1.5">
                  CURSOS LIVRES
                  <span className="text-[11px] font-black uppercase tracking-wider bg-amberbrand-500 text-navy-950 px-1.5 py-0.5 rounded shadow-xs">
                    TECH & I.A
                  </span>
                </span>
                <span className="text-[11px] uppercase font-bold text-tealbrand-400">
                  Capacitação Prática & Direta
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
              Materiais de alta densidade técnica com foco em resultados práticos sem enrolação. Inspirados na fibra e resiliência do <strong>texugo</strong>: avançamos com firmeza contra o ruído do mercado para entregar conhecimento aplicável que realmente funciona.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <p className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Apostilas, livros e treinamentos atualizados com rigor técnico.
              </p>
              <p className="text-[11px] text-slate-500">
                Conforme a Lei de Diretrizes e Bases da Educação Nacional nº 9.394/1996 (Cursos Livres).
              </p>
            </div>
          </div>

          {/* Coluna 3: Catálogo Rápido */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Catálogo de Materiais
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/?categoria=Inteligência Artificial" className="hover:text-tealbrand-300 transition-colors">
                  Inteligência Artificial
                </Link>
              </li>
              <li>
                <Link href="/?categoria=Apostilas" className="hover:text-tealbrand-300 transition-colors">
                  Apostilas Técnicas
                </Link>
              </li>
              <li>
                <Link href="/?categoria=Livros" className="hover:text-tealbrand-300 transition-colors">
                  Livros & E-books
                </Link>
              </li>
              <li>
                <Link href="/?categoria=Vídeos" className="hover:text-tealbrand-300 transition-colors">
                  Cursos em Vídeo
                </Link>
              </li>
              <li>
                <Link href="/?categoria=Diversos" className="hover:text-tealbrand-300 transition-colors">
                  Kits de Prompts & Diversos
                </Link>
              </li>
              <li>
                <Link href="/area-do-aluno" className="text-amberbrand-400 font-semibold hover:underline flex items-center gap-1 pt-1">
                  🎓 Acessar Área do Aluno
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Legal & Confiança (Mandatórias) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Transparência & Legalidade
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/sobre-nos" className="hover:text-tealbrand-300 transition-colors flex items-center gap-1">
                  Sobre a Empresa & Missão
                </Link>
              </li>
              <li>
                <Link href="/termos-de-uso" className="hover:text-tealbrand-300 transition-colors">
                  Termos de Uso e Serviço (LDB)
                </Link>
              </li>
              <li>
                <Link href="/politica-de-privacidade" className="hover:text-tealbrand-300 transition-colors">
                  Privacidade & Dados (LGPD)
                </Link>
              </li>
              <li>
                <Link href="/reembolso-e-garantia" className="hover:text-tealbrand-300 transition-colors">
                  Política de Reembolso (CDC 49)
                </Link>
              </li>
              <li>
                <Link href="/fale-conosco" className="hover:text-tealbrand-300 transition-colors">
                  Canais de Atendimento
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 5: Contato & Suporte Humanizado */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Suporte & Atendimento
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-tealbrand-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] text-slate-500 block">E-mail oficial:</span>
                  <a href="mailto:gustavocastroinfo@gmail.com" className="text-slate-200 hover:text-tealbrand-300">
                    gustavocastroinfo@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] text-slate-500 block">WhatsApp de Suporte:</span>
                  <a href="https://wa.me/5537999184509" target="_blank" rel="noopener noreferrer" className="text-slate-200 hover:text-emerald-400">
                    +55 (37) 99918-4509
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] text-slate-500 block">Horário de Atendimento:</span>
                  <span>Segunda a Sexta, 09h às 18h</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Métodos de Pagamento e Logotipos de Confiança */}
        <div className="mt-10 pt-8 border-t border-navy-900 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Pagamento 100% Processado por:</span>
            <span className="px-2.5 py-1 bg-white rounded text-blue-600 font-black text-xs tracking-tight">
              mercado pago
            </span>
            <span className="px-2 py-0.5 bg-slate-800 rounded text-[10px] text-tealbrand-300 border border-slate-700">
              Pix Instantâneo
            </span>
            <span className="px-2 py-0.5 bg-slate-800 rounded text-[10px] text-slate-300 border border-slate-700">
              Cartão até 12x
            </span>
            <span className="px-2 py-0.5 bg-slate-800 rounded text-[10px] text-slate-300 border border-slate-700">
              Boleto
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Certificado SSL 256-Bit • Emissão de Nota Fiscal • Supabase Cloud</span>
          </div>
        </div>

        {/* Informações Obrigatórias de CNPJ & Razão Social */}
        <div className="mt-8 pt-6 border-t border-navy-900/60 text-center text-slate-500 text-[11px] leading-relaxed">
          <p className="font-bold text-slate-300">
            GUSTAVO DE CASTRO BERNARDES ROSA • CNPJ: 26.807.315/0001-39 • MINAS GERAIS - BRASIL
          </p>
          <p className="mt-0.5">
            Cursos Livres Tech & I.A • Todos os direitos reservados.
          </p>
          <p className="mt-2 text-slate-600 text-[10px]">
            Conforme a Lei nº 9.394/1996 (LDB - art. 39 a 42) e Decreto nº 5.154/2004, nossos materiais enquadram-se na categoria de Cursos Livres de Educação Profissional e Capacitação Continuada. Direito de arrependimento e devolução integral garantidos pelo Art. 49 do Código de Defesa do Consumidor (Lei Federal nº 8.078/1990).
          </p>
        </div>
      </div>
    </footer>
  );
}
