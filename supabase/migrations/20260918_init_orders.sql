-- Tabela de Pedidos da Cursos Livres Tech & I.A
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_id text not null unique,
  customer_name text not null,
  customer_cpf text not null,
  customer_email text not null,
  customer_phone text not null,
  items jsonb not null default '[]'::jsonb,
  total numeric(10, 2) not null,
  payment_method text not null,
  status text not null default 'aguardando_pix',
  ip_address text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Índices para busca ágil na Área do Aluno
create index if not exists idx_orders_customer_email on public.orders(customer_email);
create index if not exists idx_orders_customer_cpf on public.orders(customer_cpf);
create index if not exists idx_orders_order_id on public.orders(order_id);

-- RLS (Row Level Security)
alter table public.orders enable row level security;

-- Política de Leitura Pública por E-mail ou Service Role
create policy "Permitir inserção de pedidos no checkout" on public.orders
  for insert with check (true);

create policy "Permitir leitura de pedidos pelo cliente" on public.orders
  for select using (true);
