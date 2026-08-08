-- Autênticas Store — schema Postgres (Neon)
-- Rodar uma vez, via `psql "$DATABASE_URL" -f db/schema.sql` ou no SQL editor do Neon.

create extension if not exists "pgcrypto";

create table if not exists products (
  id text primary key,
  category text not null,
  name text not null,
  tagline text default '',
  price numeric(10,2) not null,
  old_price numeric(10,2),
  installment text default '',
  featured boolean not null default false,
  active boolean not null default true,
  collections text[] not null default '{}',
  sizes text[] not null default '{}',
  variants jsonb not null default '[]', -- [{ name, img, stock }]
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'pending', -- pending | approved | rejected | cancelled
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  shipping_address jsonb not null default '{}',
  items jsonb not null default '[]', -- [{ product_id, name, color, size, price, qty }]
  total numeric(10,2) not null,
  mp_preference_id text,
  mp_payment_id text,
  mp_status text,
  mp_status_detail text,
  notified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Configurações editáveis do site: banners, cores, textos institucionais.
-- Uma linha por chave (ex: 'hero_banner', 'promo_banner', 'accent_color').
create table if not exists site_settings (
  key text primary key,
  value jsonb not null default '{}',
  updated_at timestamptz not null default now()
);

create index if not exists idx_orders_mp_preference on orders (mp_preference_id);
create index if not exists idx_orders_status on orders (status);
create index if not exists idx_products_active on products (active);

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_products_updated_at on products;
create trigger trg_products_updated_at
  before update on products
  for each row execute function set_updated_at();

drop trigger if exists trg_orders_updated_at on orders;
create trigger trg_orders_updated_at
  before update on orders
  for each row execute function set_updated_at();

drop trigger if exists trg_settings_updated_at on site_settings;
create trigger trg_settings_updated_at
  before update on site_settings
  for each row execute function set_updated_at();
