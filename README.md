# 🚀 Cursos Livres Tech & I.A

Plataforma de comércio eletrônico de infoprodutos inspirada no **Mercado Livre enxuto, direto e honesto**. Desenvolvida com **Next.js 15**, **React 19**, **TypeScript**, **Tailwind CSS** e **Supabase**.

- **Razão Social / Titular:** Gustavo de Castro Bernardes Rosa
- **CNPJ:** 26.807.315/0001-39 • Minas Gerais - Brasil
- **Símbolo Oficial:** O **Texugo (Honey Badger)** — representação da coragem, resiliência e combate incansável contra o hype, promessas falsas e contadores falsos de escassez.

---

## 💎 Pilares da Plataforma

1. **Transparência & Velocidade Absoluta**:
   - Zero pop-ups invasivos.
   - Zero contadores falsos de escassez regressiva.
   - Páginas leves com imagens e tipografia otimizadas para carregamento imediato.

2. **Paleta de Cores Estratégica**:
   - **Azul Escuro / Navy (`#0F172A`)**: Base, autoridade e seriedade tecnológica sem cansar a vista.
   - **Verde-Petróleo / Menta Suave (`#0D9488` / `#F0FDFA`)**: Equilíbrio, tranquilidade e badges de categoria/garantia.
   - **Laranja Acolhedor / Âmbar (`#F59E0B` / `#EA580C`)**: Conversão calorosa e amigável nos botões de compra.
   - **Branco Gelo (`#F8FAFC`)**: Fundo limpo para o produto respirar.

3. **Filtros Estritos & Busca Limpa**:
   - Categorias: *Inteligência Artificial*, *Apostilas*, *Livros*, *Vídeos*, *Diversos*.
   - Formato de Entrega: *Download Imediato (PDF)* vs *Acesso à Área de Membros (Vídeo)*.
   - Faixa de Preço real.

4. **Página de Produto Direta (Sem Poluição)**:
   - **3 Amostras Reais em Galeria**: 1. Capa oficial, 2. Sumário/Índice detalhado, 3. Amostra de página/tela real.
   - Título claro, preço com destaque e parcelamento sem juros.
   - Descrição em tópicos objetivos: *O que você vai aprender*, *O que está incluso*, *Requisitos*, *Formato de entrega*.
   - Selo de 7 dias de garantia incondicional (Artigo 49 do CDC).

5. **Cadastro Obrigatório & Checkout Blindado**:
   - Nome Completo, **CPF validado matematicamente** (Módulo 11) para emissão de Nota Fiscal e antifraude.
   - E-mail e WhatsApp com DDD para entrega e suporte.
   - Endereço com auto-preenchimento via CEP (ViaCEP).
   - Gateway com **Pix Instantâneo** (QR Code + Copia e Cola), **Cartão de Crédito** em até 12x e **Boleto Bancário**.

6. **Área do Aluno Híbrida & Meus Pedidos**:
   - Acesso simplificado com E-mail + CPF.
   - Download imediato dos arquivos PDF.
   - **Player de Vídeo Integrado Privado**: player focado e sem anúncios para os cursos em vídeo.

7. **Blindagem Jurídica & Transparência**:
   - **CNPJ e Razão Social no Rodapé**: Gustavo de Castro Bernardes Rosa • CNPJ 26.807.315/0001-39 • Minas Gerais.
   - `/sobre-nos`: O propósito do Texugo e capacitação real.
   - `/termos-de-uso`: Enquadramento em **Cursos Livres de Capacitação (Lei nº 9.394/1996 - LDB)**, proteção de direitos autorais e cláusulas antifraude contra chargebacks indevidos.
   - `/politica-de-privacidade`: Conformidade com a **LGPD (Lei nº 13.709/2018)**.
   - `/reembolso-e-garantia`: Respeito integral ao **Art. 49 do Código de Defesa do Consumidor (CDC)**.
   - `/fale-conosco`: E-mail, WhatsApp de suporte e endereço.

---

## ⚡ Conexão com Supabase

Projeto configurado em `.env.local`:
- **URL:** `https://vlntwbvrudtlpvculezi.supabase.co`
- **Chave Pública / Anon:** `sb_publishable_kwWcx8RdaqTTjDWZAtne3g_kDdd4Zl0`
- **Project Ref:** `vlntwbvrudtlpvculezi`
- **Migration SQL:** `supabase/migrations/20260918_init_orders.sql`

Para vincular o projeto ao Supabase CLI:
```bash
npx supabase login
npx supabase link --project-ref vlntwbvrudtlpvculezi
npx supabase db push
```

---

## 🛠️ Como Executar

```bash
npm run dev
```
Acesse no navegador: **`http://localhost:3000`**
