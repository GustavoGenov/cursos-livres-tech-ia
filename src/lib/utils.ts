import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formata um número como Real brasileiro (R$ 0,00)
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

/**
 * Calcula parcelas sem juros (até 6x ou 12x)
 */
export function calculateInstallment(total: number, installments = 6): {
  count: number;
  value: number;
  formatted: string;
} {
  const installmentValue = total / installments;
  return {
    count: installments,
    value: installmentValue,
    formatted: `${installments}x de ${formatCurrency(installmentValue)} sem juros`,
  };
}

/**
 * Formata telefone brasileiro (11) 99999-9999 ou (11) 9999-9999
 */
export function formatPhone(value: string): string {
  const clean = value.replace(/\D/g, "").slice(0, 11);
  if (clean.length <= 2) return clean ? `(${clean}` : "";
  if (clean.length <= 7) return `(${clean.slice(0, 2)}) ${clean.slice(2)}`;
  return `(${clean.slice(0, 2)}) ${clean.slice(2, 7)}-${clean.slice(7)}`;
}

/**
 * Formata CEP (00000-000)
 */
export function formatCEP(value: string): string {
  const clean = value.replace(/\D/g, "").slice(0, 8);
  if (clean.length <= 5) return clean;
  return `${clean.slice(0, 5)}-${clean.slice(5)}`;
}
