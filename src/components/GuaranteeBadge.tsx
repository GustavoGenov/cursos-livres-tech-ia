import React from "react";
import { ShieldCheck, RefreshCw } from "lucide-react";

interface GuaranteeBadgeProps {
  variant?: "compact" | "full";
  className?: string;
}

export function GuaranteeBadge({ variant = "compact", className = "" }: GuaranteeBadgeProps) {
  if (variant === "compact") {
    return (
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-tealbrand-50 border border-tealbrand-200 text-tealbrand-800 text-xs font-medium ${className}`}
      >
        <ShieldCheck className="w-4 h-4 text-tealbrand-600 flex-shrink-0" />
        <span>
          <strong>Garantia de 7 Dias</strong> • Devolução integral incondicional (Art. 49 CDC)
        </span>
      </div>
    );
  }

  return (
    <div
      className={`p-4 rounded-xl bg-gradient-to-r from-tealbrand-50 via-white to-tealbrand-50 border border-tealbrand-200 flex items-start sm:items-center gap-3.5 ${className}`}
    >
      <div className="w-10 h-10 rounded-full bg-tealbrand-100 flex items-center justify-center flex-shrink-0 text-tealbrand-700">
        <ShieldCheck className="w-6 h-6" />
      </div>
      <div className="text-sm text-navy-800">
        <div className="font-semibold text-navy-950 flex items-center gap-1.5">
          Garantia Blindada de 7 Dias (Sem Perguntas)
          <span className="text-xs bg-tealbrand-200 text-tealbrand-900 px-2 py-0.5 rounded-full font-bold">
            100% SEGURO
          </span>
        </div>
        <p className="text-xs text-navy-600 mt-0.5 leading-relaxed">
          Conforme o Artigo 49 do Código de Defesa do Consumidor, se você achar que o material não atendeu suas expectativas, basta nos enviar um e-mail ou mensagem no WhatsApp que reembolsamos 100% do valor pago. Sem letras miúdas.
        </p>
      </div>
    </div>
  );
}
