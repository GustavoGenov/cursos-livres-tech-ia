import React from "react";
import { Scale, ShieldAlert, BookOpen, AlertTriangle, FileCheck, Lock } from "lucide-react";

export default function TermosDeUsoPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 text-navy-900 text-xs font-bold border border-slate-300">
          <Scale className="w-3.5 h-3.5 text-navy-700" />
          <span>Segurança Jurídica, Transparência & Defesa Legal</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-navy-950">
          Termos de Uso e Serviço
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
          Instrumento contratual de prestação de serviços educacionais e fornecimento de conteúdo digital de <strong>Gustavo de Castro Bernardes Rosa</strong> (CNPJ: 26.807.315/0001-39 - Minas Gerais).
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        {/* Aviso de Enquadramento em Cursos Livres */}
        <div className="p-4 rounded-xl bg-tealbrand-50 border border-tealbrand-200 text-tealbrand-950 space-y-1">
          <div className="font-bold text-xs sm:text-sm flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-tealbrand-700 flex-shrink-0" />
            Natureza Jurídica: Cursos Livres de Educação Profissional (Lei nº 9.394/1996 - LDB)
          </div>
          <p className="text-xs text-tealbrand-900 leading-relaxed">
            Os treinamentos, apostilas, e-books e materiais digitais disponibilizados pela <strong>Cursos Livres Tech & I.A</strong> enquadram-se legalmente como <strong>Cursos Livres de Educação Profissional e Capacitação Continuada</strong>, nos termos da <strong>Lei nº 9.394/1996 (Lei de Diretrizes e Bases da Educação Nacional - arts. 39 a 42)</strong> e do <strong>Decreto Presidencial nº 5.154/2004</strong>. Por sua natureza jurídica livre, não estão sujeitos a autorização prévia, credenciamento ou reconhecimento formal pelo Ministério da Educação (MEC), nem conferem diploma de graduação ou título acadêmico regulamentado.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-navy-950 flex items-center gap-2">
            <span>1. Qualificação das Partes e Aceitação Plena</span>
          </h2>
          <p>
            De um lado, <strong>GUSTAVO DE CASTRO BERNARDES ROSA</strong>, pessoa jurídica de direito privado inscrita no CNPJ/MF sob o nº <strong>26.807.315/0001-39</strong>, sediada no Estado de <strong>Minas Gerais</strong>, doravante denominada &ldquo;CONTRATADA&rdquo;; e, de outro lado, a pessoa física ou jurídica qualificada no momento do preenchimento do cadastro obrigatório de checkout, doravante denominada &ldquo;CONTRATANTE&rdquo; ou &ldquo;USUÁRIO&rdquo;.
          </p>
          <p>
            A realização de qualquer compra ou acesso ao acervo digital implica na aceitação plena, irrevogável e sem reservas de todas as cláusulas deste Termo, que possui eficácia executiva contratual perante a legislação brasileira.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-navy-950">
            2. Propriedade Intelectual e Licença de Uso Estritamente Pessoal
          </h2>
          <p>
            Todo o acervo intelectual disponibilizado — incluindo apostilas em formato PDF, e-books, scripts, fluxos de automação n8n, códigos-fonte, gravações em vídeo, textos, métodos pedagógicos e o logotipo do Texugo — é de titularidade exclusiva de Gustavo de Castro Bernardes Rosa, sendo protegido pela <strong>Lei Federal nº 9.610/1998 (Lei de Direitos Autorais)</strong> e pelo <strong>Artigo 184 do Código Penal Brasileiro</strong>.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
            <li>A compra concede unicamente uma <strong>licença individual, não exclusiva, intransferível e revogável</strong> para aprendizado pessoal do adquirente.</li>
            <li>É expressamente vedado compartilhar credenciais de acesso, ratear custos em fóruns ou redes sociais, revender, republicar, traduzir ou ceder os materiais sob qualquer pretexto.</li>
            <li>Para proteção contra pirataria e vazamentos indevidos, os arquivos digitais poderão conter <strong>marca d&apos;água antifraude rastreável</strong> com o CPF e dados do comprador original.</li>
          </ul>
        </section>

        {/* Cláusula Blindada Antifraude e Proteção contra Golpes */}
        <section className="p-4 sm:p-5 rounded-xl bg-amberbrand-50/60 border border-amberbrand-300 space-y-3">
          <div className="flex items-center gap-2 text-amberbrand-900 font-bold text-sm">
            <ShieldAlert className="w-5 h-5 text-amberbrand-700 flex-shrink-0" />
            3. Registro de Auditoria Técnica e Proteção Contra Falsa Alegação de Não Recebimento (Antifraude)
          </div>
          <p className="text-xs text-amberbrand-950 leading-relaxed">
            A entrega dos materiais em PDF e a liberação da Área de Membros ocorrem de maneira automatizada e auditável. O sistema da plataforma armazena logs técnicos comprobatórios contendo: <strong>Endereço IP de origem, data/hora da emissão, confirmação de download de arquivo e eventos de reprodução de vídeo</strong> vinculados ao CPF e e-mail do comprador.
          </p>
          <div className="space-y-2 text-xs text-amberbrand-900">
            <p>
              <strong>Chargeback Fraudulento / Contestação Indevida:</strong> A contestação infundada de compras perante administradoras de cartão de crédito após a liberação do acesso ou realização do download configura tentativa de estelionato eletrônico (Art. 171 do Código Penal, com as alterações da Lei nº 14.155/2021).
            </p>
            <p>
              Em caso de chargeback fraudulento, a CONTRATADA emitirá notificação extrajudicial, promoverá a competente cobrança judicial acrescida de perdas, danos e custas advocatícias, e registrará Boletim de Ocorrência policial instruído com os logs digitais comprobatórios da transação.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-navy-950">
            4. Política de Pagamentos e Emissão Obrigatória de Notas Fiscais
          </h2>
          <p>
            Em total respeito à legislação tributária federal e estadual de Minas Gerais, todas as transações financeiras geram a correspondente <strong>Nota Fiscal Eletrônica</strong>, razão pela qual a veracidade das informações cadastrais (Nome completo, CPF válido e endereço) prestadas pelo adquirente no checkout é de sua exclusiva responsabilidade civil e criminal.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-navy-950">
            5. Exercício do Direito de Arrependimento e Revogação Imediata da Licença
          </h2>
          <p>
            Em estrito cumprimento ao <strong>Artigo 49 do Código de Defesa do Consumidor (Lei Federal nº 8.078/1990)</strong>, o comprador poderá requerer a desistência do contrato e a devolução integral dos valores pagos no prazo improrrogável de <strong>7 (sete) dias corridos</strong> contados da data de confirmação do pagamento.
          </p>
          <p>
            <strong>Efeito da Devolução:</strong> O processamento do estorno acarreta o <strong>cancelamento imediato da licença de uso</strong> e o bloqueio de acesso à Área do Aluno. A permanência de cópias dos materiais após a restituição dos valores ou seu aproveitamento posterior caracterizará apropriação indevida e violação de direitos autorais.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-navy-950">
            6. Limitação de Responsabilidade Técnica
          </h2>
          <p>
            A CONTRATADA fornece materiais com as melhores práticas de mercado na data de sua publicação. Contudo, em virtude da constante mutabilidade das ferramentas de tecnologia e inteligência artificial operadas por empresas terceiras (como Google, OpenAI, Anthropic, n8n), a CONTRATADA não responde por descontinuidade, encarecimento de tarifas de API ou alterações estruturais de softwares de terceiros alheios ao seu controle.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-navy-950">
            7. Foro de Eleição
          </h2>
          <p>
            Para dirimir quaisquer controvérsias oriundas do presente Contrato, as partes elegem expressamente o Foro da Comarca da sede da CONTRATADA no Estado de <strong>Minas Gerais</strong>, com renúncia expressa a qualquer outro, por mais privilegiado que se afigure.
          </p>
        </section>

        <div className="pt-4 border-t border-slate-200 text-slate-500 text-[11px]">
          Instrumento registrado eletronicamente • GUSTAVO DE CASTRO BERNARDES ROSA • CNPJ: 26.807.315/0001-39 • MINAS GERAIS
        </div>
      </div>
    </div>
  );
}
