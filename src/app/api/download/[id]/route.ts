import { NextRequest, NextResponse } from "next/server";
import { PRODUCTS } from "@/data/products";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const searchParams = request.nextUrl.searchParams;
    const customerName = searchParams.get("nome") || "Aluno(a)";
    const orderId = searchParams.get("pedido") || "PED-OFICIAL";

    // Busca nas listas ou aceita id/slug
    let title = "Material Didático Oficial";
    const found = PRODUCTS.find(
      (p) => p.id === id || p.slug === id || p.slug.toLowerCase() === id.toLowerCase()
    );

    if (found) {
      title = found.title;
    } else {
      // Se não estiver na lista estática, formata a partir do id/slug
      title = decodeURIComponent(id)
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
    }

    // Sanitiza strings para PDF ISO-8859-1 simples
    const safeTitle = title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").slice(0, 60);
    const safeCustomer = customerName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").slice(0, 40);

    const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<<
  /Type /Page
  /Parent 2 0 R
  /MediaBox [0 0 612 792]
  /Contents 4 0 R
  /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >>
>>
endobj
4 0 obj
<< /Length 720 >>
stream
BT
/F1 18 Tf
50 730 Td
(Cursos Livres Tech & I.A) Tj
0 -26 Td
/F2 13 Tf
(MATERIAL COMPLETO: ${safeTitle}) Tj
0 -30 Td
/F1 10 Tf
(Licenciado para: ${safeCustomer}) Tj
0 -18 Td
(Numero do Pedido: ${orderId}) Tj
0 -18 Td
(Status: Acesso Vitalicio e Liberado) Tj
0 -35 Td
/F2 11 Tf
(1. APRESENTACAO E ORIENTACOES DE ESTUDO) Tj
0 -20 Td
/F1 10 Tf
(Parabens por adquirir este material da Cursos Livres Tech & I.A.) Tj
0 -16 Td
(Voce tem direito ao conteudo na integra, atualizacoes e suporte de duvidas.) Tj
0 -16 Td
(Acesse a Area do Aluno com seu e-mail e CPF cadastrados no checkout.) Tj
0 -30 Td
/F2 11 Tf
(2. DADOS DA EMPRESA EMISSORA) Tj
0 -20 Td
/F1 10 Tf
(Empresa: Gustavo de Castro Bernardes Rosa) Tj
0 -16 Td
(CNPJ: 26.807.315/0001-39 | Minas Gerais - Brasil) Tj
0 -16 Td
(Suporte WhatsApp: +55 (37) 99918-4509) Tj
0 -16 Td
(E-mail Oficial: gustavocastroinfo@gmail.com) Tj
0 -30 Td
/F1 9 Tf
(Garantia incondicional de 7 dias conforme Art. 49 do CDC. Bom aprendizado!) Tj
ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
6 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>
endobj
xref
0 7
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000284 00000 n 
0000001057 00000 n 
0000001124 00000 n 
trailer
<< /Size 7 /Root 1 0 R >>
startxref
1196
%%EOF`;

    const filename = `${id.replace(/[^a-zA-Z0-9_-]/g, "") || "material"}-cursos-livres.pdf`;

    return new NextResponse(pdfContent, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Erro ao gerar download do PDF:", error);
    return NextResponse.json(
      { error: "Falha ao preparar o arquivo para download." },
      { status: 500 }
    );
  }
}
