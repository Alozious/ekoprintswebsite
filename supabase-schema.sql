create extension if not exists pgcrypto;

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  description text not null,
  price text not null,
  image text not null,
  storage_path text,
  created_at timestamptz not null default now()
);

alter table public.categories enable row level security;
alter table public.products enable row level security;

create policy "Public can read categories" on public.categories for select using (true);
create policy "Authenticated users manage categories" on public.categories for all to authenticated using (true) with check (true);
create policy "Public can read products" on public.products for select using (true);
create policy "Authenticated users manage products" on public.products for all to authenticated using (true) with check (true);

insert into storage.buckets (id, name, public) values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

create policy "Public can view product images" on storage.objects for select using (bucket_id = 'product-images');
create policy "Authenticated users upload product images" on storage.objects for insert to authenticated with check (bucket_id = 'product-images');
create policy "Authenticated users update product images" on storage.objects for update to authenticated using (bucket_id = 'product-images') with check (bucket_id = 'product-images');
create policy "Authenticated users delete product images" on storage.objects for delete to authenticated using (bucket_id = 'product-images');
