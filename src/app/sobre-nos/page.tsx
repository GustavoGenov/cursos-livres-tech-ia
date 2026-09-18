import React from "react";
import Link from "next/link";
import { ShieldCheck, Zap, BookOpen, CheckCircle2, ArrowRight } from "lucide-react";

export default function SobreNosPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Topo Institucional */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amberbrand-100 text-amberbrand-900 text-xs font-bold border border-amberbrand-200">
          <ShieldCheck className="w-3.5 h-3.5 text-amberbrand-700" />
          <span>História, Missão & Transparência</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-navy-950">
          Sobre a Cursos Livres Tech & I.A
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          Capacitação prática em tecnologia e inteligência artificial de alta densidade técnica, sob a titularidade de <strong>Gustavo de Castro Bernardes Rosa</strong> (CNPJ: 26.807.315/0001-39 - Minas Gerais).
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8 text-sm text-navy-900 leading-relaxed">
        {/* Bloco de Apresentação do Símbolo do Texugo */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white flex flex-col md:flex-row items-center gap-6 shadow-md border border-navy-800">
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-2 border-amberbrand-400 shadow-xl flex-shrink-0 bg-black">
            <img
              src="/images/logo-texugo.jpg"
              alt="O Texugo da Tecnologia - Símbolo Oficial"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[11px] uppercase tracking-widest text-amberbrand-400 font-extrabold block">
              Nosso Símbolo • O Texugo (Honey Badger)
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Resiliência, Foco e Zero Medo de Conteúdo Difícil
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              O texugo é mundialmente reconhecido como o animal mais destemido da natureza: ele não recua diante de serpentes venenosas, não se intimida e segue em frente até alcançar seu objetivo.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              No mercado de infoprodutos — hoje infestado de &ldquo;fórmulas mágicas&rdquo;, contadores falsos de escassez e cursos rasos —, o texugo simboliza nossa determinação: devorar a complexidade técnica para entregar a você conhecimento prático, honesto e blindado de ilusões.
            </p>
          </div>
        </div>

        {/* Quem Somos e Origem */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-navy-950">
            Quem Somos e Qual o Nosso Propósito
          </h2>
          <p>
            A <strong>Cursos Livres Tech & I.A</strong> é uma iniciativa educacional e editorial gerida por <strong>Gustavo de Castro Bernardes Rosa</strong>, pessoa jurídica de direito privado devidamente inscrita no CNPJ sob o nº <strong>26.807.315/0001-39</strong>, sediada no Estado de <strong>Minas Gerais</strong>.
          </p>
          <p>
            Nascemos com uma premissa clara: quem busca qualificação em tecnologia e inteligência artificial precisa de <strong>velocidade, assertividade e transparência</strong>. Nossos materiais são elaborados em formato direto — apostilas ilustradas, livros digitais estruturados e treinamentos em vídeo objetivos —, permitindo ao profissional aplicar os conceitos no mesmo dia em seu trabalho ou negócio.
          </p>
        </section>

        {/* Pilares da Nossa Empresa */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-tealbrand-100 text-tealbrand-800 flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-navy-950 text-sm">Transparência Visual</h3>
            <p className="text-xs text-slate-600">
              Você pode inspecionar o sumário e amostras reais de conteúdo antes de comprar. Não vendemos promessas em embalagens opacas.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-navy-100 text-navy-900 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-navy-950 text-sm">Legalidade Estrita (LDB)</h3>
            <p className="text-xs text-slate-600">
              Cursos Livres de Capacitação Profissional legalmente enquadrados na Lei nº 9.394/1996 e Decreto Federal nº 5.154/2004.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amberbrand-100 text-amberbrand-900 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-navy-950 text-sm">Garantia Real do CDC</h3>
            <p className="text-xs text-slate-600">
              Direito de arrependimento em 7 dias com devolução 100% integral conforme o Artigo 49 do Código de Defesa do Consumidor.
            </p>
          </div>
        </div>

        {/* Informações Cadastrais e Fiscais Oficiais */}
        <section className="space-y-3 pt-6 border-t border-slate-100">
          <h2 className="text-base font-bold text-navy-950">
            Identificação do Prestador de Serviços
          </h2>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5 text-slate-700">
            <div>
              <strong>Titular / Razão Social:</strong> Gustavo de Castro Bernardes Rosa
            </div>
            <div>
              <strong>CNPJ:</strong> 26.807.315/0001-39
            </div>
            <div>
              <strong>Localização:</strong> Minas Gerais, Brasil
            </div>
            <div>
              <strong>Canais Oficiais de Atendimento:</strong> gustavocastroinfo@gmail.com • WhatsApp: +55 (37) 99918-4509
            </div>
            <div>
              <strong>Emissão Fiscal:</strong> Emissão de Nota Fiscal em conformidade com as regras tributárias para todos os pedidos processados.
            </div>
          </div>
        </section>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            Ficou com alguma dúvida antes de realizar seu pedido?
          </div>
          <Link
            href="/fale-conosco"
            className="px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <span>Falar com o Suporte</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
