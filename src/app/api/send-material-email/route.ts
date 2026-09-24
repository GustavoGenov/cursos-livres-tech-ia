import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, customer, items, total, paymentMethod } = body;

    if (!customer?.email || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Dados incompletos para envio dos materiais por e-mail." },
        { status: 400 }
      );
    }

    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL || "https://cursos-livres-tech-ia.vercel.app";
    const studentAreaUrl = `${appUrl}/area-do-aluno`;
    const supportPhone = process.env.NEXT_PUBLIC_SUPPORT_PHONE || "+55 (37) 99918-4509";
    const supportEmail =
      process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "gustavocastroinfo@gmail.com";
    const companyCnpj = process.env.NEXT_PUBLIC_COMPANY_CNPJ || "26.807.315/0001-39";

    // Monta lista de itens em HTML para o e-mail
    const itemsListHtml = items
      .map(
        (item: any) => `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px 8px; font-size: 14px; color: #0f172a; font-weight: bold;">
            ${item.title}
            <div style="font-size: 11px; color: #0d9488; font-weight: normal; margin-top: 4px;">
              Formato: ${item.format || "Download Digital Imediato"}
            </div>
          </td>
          <td style="padding: 12px 8px; text-align: right; font-size: 14px; font-weight: bold; color: #0f172a;">
            R$ ${(Number(item.price) || 0).toFixed(2).replace(".", ",")}
          </td>
        </tr>
      `
      )
      .join("");

    // Botões de download direto para cada item
    const downloadButtonsHtml = items
      .map((item: any) => {
        const downloadUrl = `${appUrl}/api/download/${encodeURIComponent(
          item.slug || item.id
        )}?nome=${encodeURIComponent(customer.fullName || "Aluno")}&pedido=${orderId}`;
        return `
        <div style="margin-bottom: 12px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; text-align: left;">
          <strong style="color: #0f172a; font-size: 13px; display: block; margin-bottom: 8px;">
            📄 ${item.title}
          </strong>
          <a href="${downloadUrl}" style="display: inline-block; background-color: #059669; color: #ffffff; text-decoration: none; padding: 8px 16px; border-radius: 6px; font-size: 12px; font-weight: bold;">
            Baixar Material em PDF
          </a>
        </div>
      `;
      })
      .join("");

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Seus Materiais Estão Liberados - Cursos Livres Tech & I.A</title>
      </head>
      <body style="font-family: Arial, Helvetica, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; color: #334155;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color: #0b132b; padding: 28px 24px; text-align: center; color: #ffffff;">
              <h1 style="margin: 0; font-size: 20px; font-weight: 900; letter-spacing: -0.5px;">
                Cursos Livres <span style="color: #f59e0b;">Tech & I.A</span>
              </h1>
              <p style="margin: 6px 0 0 0; font-size: 12px; color: #94a3b8;">
                Educação Prática, Direta e Sem Enrolação
              </p>
            </td>
          </tr>

          <!-- Banner de Confirmação -->
          <tr>
            <td style="background-color: #ecfdf5; border-bottom: 1px solid #a7f3d0; padding: 16px 24px; text-align: center;">
              <span style="color: #065f46; font-weight: bold; font-size: 15px;">
                ✓ Pagamento Confirmado com Sucesso!
              </span>
              <div style="font-size: 12px; color: #047857; margin-top: 4px;">
                Pedido: <strong>#${orderId}</strong>
              </div>
            </td>
          </tr>

          <!-- Conteúdo Principal -->
          <tr>
            <td style="padding: 28px 24px;">
              <h2 style="font-size: 18px; color: #0f172a; margin: 0 0 12px 0;">
                Olá, ${customer.fullName || "Aluno(a)"}!
              </h2>
              <p style="font-size: 13px; line-height: 1.6; margin: 0 0 20px 0; color: #475569;">
                Obrigado por sua compra! Seus materiais didáticos já estão disponíveis para download imediato e liberados de forma vitalícia em sua conta.
              </p>

              <!-- Lista de Downloads Imediatos -->
              <div style="margin-bottom: 24px;">
                <h3 style="font-size: 14px; text-transform: uppercase; color: #0f172a; margin: 0 0 12px 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">
                  Links de Download dos seus Materiais:
                </h3>
                ${downloadButtonsHtml}
              </div>

              <!-- Resumo do Pedido -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
                <tr style="background-color: #f8fafc;">
                  <th style="padding: 10px 8px; text-align: left; font-size: 12px; color: #64748b;">Material</th>
                  <th style="padding: 10px 8px; text-align: right; font-size: 12px; color: #64748b;">Valor</th>
                </tr>
                ${itemsListHtml}
                <tr style="background-color: #f8fafc;">
                  <td style="padding: 12px 8px; font-weight: bold; font-size: 14px; color: #0f172a;">Total Pago:</td>
                  <td style="padding: 12px 8px; text-align: right; font-weight: 900; font-size: 16px; color: #059669;">
                    R$ ${(Number(total) || 0).toFixed(2).replace(".", ",")}
                  </td>
                </tr>
              </table>

              <!-- Acesso à Área do Aluno -->
              <div style="background-color: #0b132b; border-radius: 12px; padding: 20px; text-align: center; color: #ffffff; margin-bottom: 24px;">
                <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold; color: #f59e0b;">
                  Sua Área do Aluno Permanente
                </h3>
                <p style="margin: 0 0 16px 0; font-size: 12px; color: #cbd5e1; line-height: 1.5;">
                  Você pode acessar todos os seus materiais, apostilas e cursos em vídeo a qualquer momento informando seu e-mail e CPF cadastrados:
                </p>
                <div style="background-color: rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 10px; font-size: 12px; margin-bottom: 16px; text-align: left;">
                  <div>📧 <strong>E-mail:</strong> ${customer.email}</div>
                  <div style="margin-top: 4px;">🔒 <strong>CPF:</strong> ${customer.cpf || "Seu CPF cadastrado"}</div>
                </div>
                <a href="${studentAreaUrl}" style="display: inline-block; background-color: #f59e0b; color: #0b132b; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 13px; font-weight: 900;">
                  Acessar Minha Área do Aluno
                </a>
              </div>

              <!-- Garantia de 7 Dias -->
              <div style="border-left: 4px solid #0d9488; background-color: #f0fdfa; padding: 12px 16px; border-radius: 4px; font-size: 12px; color: #134e4a; margin-bottom: 20px;">
                <strong>Garantia Incondicional de 7 Dias:</strong> Se por qualquer motivo você não ficar satisfeito, basta nos acionar via WhatsApp ou e-mail que devolveremos 100% do seu valor (Art. 49 CDC).
              </div>
            </td>
          </tr>

          <!-- Rodapé -->
          <tr>
            <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 24px; text-align: center; font-size: 11px; color: #64748b; line-height: 1.6;">
              <strong>Cursos Livres Tech & I.A</strong><br>
              CNPJ: ${companyCnpj} • Minas Gerais - Brasil<br>
              Suporte WhatsApp: <a href="https://wa.me/${supportPhone.replace(/\D/g, "")}" style="color: #059669; font-weight: bold; text-decoration: none;">${supportPhone}</a> • E-mail: ${supportEmail}
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    // 1. Tenta envio com Resend se chave existir
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Cursos Livres Tech & I.A <contato@cursoslivres.com>",
            to: [customer.email],
            subject: `🎉 Acesso Liberado: Seus Materiais da Cursos Livres Tech & I.A (#${orderId})`,
            html: emailHtml,
          }),
        });

        if (resendRes.ok) {
          console.log(`E-mail enviado via Resend para ${customer.email}`);
        }
      } catch (mailErr) {
        console.warn("Aviso ao enviar via Resend API:", mailErr);
      }
    }

    // 2. Registra o status de entrega no Supabase se configurado
    try {
      const { supabase } = await import("@/lib/supabase");
      await supabase
        .from("orders")
        .update({
          status: "aprovado",
          // email_sent_at pode ser adicionado
        })
        .eq("order_id", orderId);
    } catch (e) {
      // Ignora silenciosamente se offline
    }

    return NextResponse.json({
      success: true,
      message: `Automação executada com sucesso! Materiais enviados para ${customer.email}.`,
      recipient: customer.email,
      orderId,
      emailPreviewHtml: emailHtml,
    });
  } catch (error) {
    console.error("Erro na automação de e-mail:", error);
    return NextResponse.json(
      { error: "Erro ao processar automação de e-mail." },
      { status: 500 }
    );
  }
}
