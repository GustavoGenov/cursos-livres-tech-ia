import { NextRequest, NextResponse } from "next/server";
import { isValidCPF } from "@/lib/cpfValidator";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customer, items, paymentMethod, installments } = body;

    // 1. Validação de dados cadastrais obrigatórios
    if (!customer?.fullName?.trim()) {
      return NextResponse.json(
        { error: "O Nome Completo é obrigatório para emissão de nota fiscal." },
        { status: 400 }
      );
    }

    if (!customer?.cpf || !isValidCPF(customer.cpf)) {
      return NextResponse.json(
        { error: "CPF inválido. Por favor, digite um CPF válido para antifraude e nota fiscal." },
        { status: 400 }
      );
    }

    if (!customer?.email?.includes("@")) {
      return NextResponse.json(
        { error: "E-mail inválido. O acesso e os arquivos serão enviados para este endereço." },
        { status: 400 }
      );
    }

    if (!customer?.phone?.trim() || customer.phone.replace(/\D/g, "").length < 10) {
      return NextResponse.json(
        { error: "Telefone/WhatsApp com DDD válido é obrigatório para suporte." },
        { status: 400 }
      );
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Nenhum item informado para checkout." },
        { status: 400 }
      );
    }

    // 2. Cálculo do Total
    const total = items.reduce(
      (acc: number, item: { price: number; quantity: number }) =>
        acc + item.price * (item.quantity || 1),
      0
    );

    // 3. Geração de Identificador do Pedido
    const orderId = `PED-${Date.now().toString().slice(-6)}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    // 4. Criação do Pagamento com Mercado Pago
    const nameParts = customer.fullName.trim().split(" ");
    const firstName = nameParts[0] || "Cliente";
    const lastName = nameParts.slice(1).join(" ") || "Consumidor";

    const { createPixPayment } = await import("@/lib/mercadopago");
    const pixResult = await createPixPayment({
      amount: total,
      description: `Pedido ${orderId} - Cursos Livres Tech & I.A`,
      payer: {
        email: customer.email,
        firstName,
        lastName,
        cpf: customer.cpf,
      },
    });

    const pixCopiaECola = pixResult.pixCopiaECola;
    const pixQrCodeUrl =
      pixResult.qrCodeBase64
        ? `data:image/png;base64,${pixResult.qrCodeBase64}`
        : pixResult.pixQrCodeUrl;

    const orderData = {
      orderId,
      createdAt: new Date().toISOString(),
      customer: {
        fullName: customer.fullName,
        cpf: customer.cpf,
        email: customer.email,
        phone: customer.phone,
        address: customer.address || {
          street: customer.street || "",
          number: customer.number || "",
          complement: customer.complement || "",
          neighborhood: customer.neighborhood || "",
          city: customer.city || "",
          state: customer.state || "",
          cep: customer.cep || "",
        },
      },
      items,
      total,
      paymentMethod,
      installments: installments || 1,
      status: paymentMethod === "pix" ? "aguardando_pix" : "aprovado",
      pixCopiaECola: paymentMethod === "pix" ? pixCopiaECola : null,
      pixQrCodeUrl: paymentMethod === "pix" ? pixQrCodeUrl : null,
      mercadoPagoPaymentId: pixResult.paymentId || null,
    };

    // Gravação segura no Supabase (se a tabela 'orders' estiver criada)
    try {
      const { supabase } = await import("@/lib/supabase");
      await supabase.from("orders").insert([
        {
          order_id: orderId,
          customer_email: customer.email,
          customer_cpf: customer.cpf,
          customer_name: customer.fullName,
          customer_phone: customer.phone,
          items: JSON.stringify(items),
          total: total,
          payment_method: paymentMethod,
          status: orderData.status,
          created_at: orderData.createdAt,
        },
      ]);
    } catch (supabaseErr) {
      console.warn("Aviso Supabase (persistência local preservada):", supabaseErr);
    }

    return NextResponse.json({
      success: true,
      order: orderData,
    });
  } catch (error) {
    console.error("Erro no checkout:", error);
    return NextResponse.json(
      { error: "Falha interna ao processar o checkout." },
      { status: 500 }
    );
  }
}
