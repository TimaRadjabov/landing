-- Создать таблицу заявок
-- Запусти в Supabase Dashboard → SQL Editor

create table if not exists leads (
  id bigint generated always as identity primary key,
  name text not null default '',
  phone text not null,
  message text not null default '',
  source text not null default 'cta',
  calc_data jsonb,
  created_at timestamptz not null default now()
);

-- Разрешить анонимную вставку (через publishable key с клиента)
create policy "anon_insert_leads" on leads
  for insert to anon
  with check (true);

-- Запретить анонимное чтение
create policy "anon_select_leads" on leads
  for select to anon
  using (false);

