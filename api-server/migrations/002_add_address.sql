-- Добавить колонку address в таблицу leads
-- Запусти в Supabase Dashboard → SQL Editor

alter table leads
  add column if not exists address text not null default '';
