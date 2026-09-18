import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ cep: string }> }
) {
  try {
    const { cep } = await params;
    const cleanCep = cep.replace(/\D/g, "");

    if (cleanCep.length !== 8) {
      return NextResponse.json(
        { error: "CEP deve conter exatamente 8 dígitos" },
        { status: 400 }
      );
    }

    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`, {
      next: { revalidate: 86400 }, // Cache de 24h
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Erro ao consultar o serviço de CEP" },
        { status: 502 }
      );
    }

    const data = await response.json();

    if (data.erro) {
      return NextResponse.json(
        { error: "CEP não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      cep: data.cep,
      street: data.logradouro,
      neighborhood: data.bairro,
      city: data.localidade,
      state: data.uf,
    });
  } catch (error) {
    console.error("Erro na rota de CEP:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor ao consultar CEP" },
      { status: 500 }
    );
  }
}
