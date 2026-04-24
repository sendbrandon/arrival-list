-- The Arrival List — starter Supabase schema
-- Run this in Supabase SQL editor.

create extension if not exists pgcrypto;

create table if not exists public.guests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  rsvp_status text not null check (rsvp_status in ('yes', 'maybe', 'no', 'undecided')),
  party_size integer default 1 check (party_size >= 0 and party_size <= 10),
  dietary_notes text,
  email_consent boolean not null default true,
  sms_consent boolean not null default false,
  reminder_preferences text[] not null default '{}',
  gift_budget text,
  source text default 'arrival-list-site',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists guests_email_unique on public.guests (lower(email));

create table if not exists public.registry_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  retailer text,
  price numeric,
  sale_price numeric,
  image_url text,
  purchase_url text not null,
  priority integer default 3,
  is_featured boolean default false,
  is_on_sale boolean default false,
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.message_campaigns (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  channel text not null check (channel in ('email', 'sms')),
  audience_segment text,
  subject text,
  body text not null,
  scheduled_for timestamptz,
  sent_at timestamptz,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists guests_set_updated_at on public.guests;
create trigger guests_set_updated_at
before update on public.guests
for each row execute procedure public.set_updated_at();

drop trigger if exists registry_items_set_updated_at on public.registry_items;
create trigger registry_items_set_updated_at
before update on public.registry_items
for each row execute procedure public.set_updated_at();

-- Recommended: keep Row Level Security enabled for public tables.
-- Use service-role inserts from the server route for the MVP.
alter table public.guests enable row level security;
alter table public.registry_items enable row level security;
alter table public.message_campaigns enable row level security;
