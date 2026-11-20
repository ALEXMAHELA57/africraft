-- Africraft database schema for Supabase (Postgres).
-- Run this whole file once in: Supabase dashboard -> SQL Editor -> New query -> Run.
-- Then run supabase/seed.sql the same way.
-- Safe to re-run: uses "if not exists" / "create or replace".

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------- catalogue
-- Prices live here so the server (not the browser) decides what an order costs.

create table if not exists public.products (
  slug        text primary key,
  name        text not null,
  category    text not null,
  sale_type   text not null check (sale_type in ('buy','auction','quote')),
  price       numeric(10,2) not null check (price >= 0),
  seller      text not null,
  location    text not null,
  community   boolean not null default false,
  active      boolean not null default true
);

create table if not exists public.experiences (
  slug        text primary key,
  title       text not null,
  destination text not null,
  price       numeric(10,2) not null check (price >= 0),
  provider    text not null,
  active      boolean not null default true
);

create table if not exists public.auctions (
  slug         text primary key references public.products(slug) on delete cascade,
  current_bid  numeric(10,2) not null,
  bid_count    int not null default 0,
  ends_at      timestamptz not null,
  high_bidder  uuid references auth.users(id)
);

-- ---------------------------------------------------------------- people
create table if not exists public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  full_name  text,
  interest   text,                       -- what they said they want to join as (NOT a permission)
  is_admin   boolean not null default false,
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, interest)
  values (new.id,
          left(new.raw_user_meta_data->>'full_name', 120),
          left(new.raw_user_meta_data->>'interest', 80))
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------- orders & bookings
create table if not exists public.orders (
  id             uuid primary key default gen_random_uuid(),
  reference      text not null unique,
  user_id        uuid references auth.users(id),
  customer_name  text not null,
  customer_email text not null,
  customer_phone text,
  country        text not null,
  city           text not null,
  address        text not null,
  payment_method text not null,
  total          numeric(10,2) not null default 0,
  status         text not null default 'new' check (status in ('new','confirmed','shipped','delivered','cancelled')),
  created_at     timestamptz not null default now()
);

create table if not exists public.order_items (
  id           bigint generated always as identity primary key,
  order_id     uuid not null references public.orders(id) on delete cascade,
  product_slug text not null references public.products(slug),
  name         text not null,
  unit_price   numeric(10,2) not null,
  qty          int not null check (qty between 1 and 20)
);

create table if not exists public.bookings (
  id              uuid primary key default gen_random_uuid(),
  reference       text not null unique,
  user_id         uuid references auth.users(id),
  experience_slug text not null references public.experiences(slug),
  visit_date      date not null,
  guests          int not null check (guests between 1 and 20),
  customer_name   text not null,
  customer_email  text not null,
  notes           text,
  total           numeric(10,2) not null,
  status          text not null default 'requested' check (status in ('requested','confirmed','declined','cancelled')),
  created_at      timestamptz not null default now()
);

create table if not exists public.bids (
  id         bigint generated always as identity primary key,
  slug       text not null references public.auctions(slug) on delete cascade,
  user_id    uuid not null references auth.users(id),
  amount     numeric(10,2) not null,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------- forms
create table if not exists public.quote_requests (
  id           bigint generated always as identity primary key,
  product_slug text not null references public.products(slug),
  quantity     text not null,
  email        text not null,
  notes        text,
  created_at   timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id         bigint generated always as identity primary key,
  name       text not null,
  email      text not null,
  topic      text,
  message    text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.partner_applications (
  id            bigint generated always as identity primary key,
  business      text not null,
  contact_name  text not null,
  phone         text not null,
  email         text,
  business_type text not null,
  location      text not null,
  about         text,
  status        text not null default 'new' check (status in ('new','contacted','approved','rejected')),
  created_at    timestamptz not null default now()
);

create table if not exists public.newsletter_subscribers (
  email      text primary key,
  created_at timestamptz not null default now()
);

create table if not exists public.threads (
  id         bigint generated always as identity primary key,
  title      text not null,
  body       text,
  author     text not null default 'Visitor',
  category   text not null default 'qa',
  approved   boolean not null default false,   -- you approve posts in the dashboard
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------- row level security
alter table public.products              enable row level security;
alter table public.experiences           enable row level security;
alter table public.auctions              enable row level security;
alter table public.profiles              enable row level security;
alter table public.orders                enable row level security;
alter table public.order_items           enable row level security;
alter table public.bookings              enable row level security;
alter table public.bids                  enable row level security;
alter table public.quote_requests        enable row level security;
alter table public.contact_messages      enable row level security;
alter table public.partner_applications  enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.threads               enable row level security;

-- helper: is the current user an admin?
create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce((select is_admin from public.profiles where id = auth.uid()), false)
$$;

-- public read-only catalogue
drop policy if exists "read products"    on public.products;
drop policy if exists "read experiences" on public.experiences;
drop policy if exists "read auctions"    on public.auctions;
create policy "read products"    on public.products    for select using (active);
create policy "read experiences" on public.experiences for select using (active);
create policy "read auctions"    on public.auctions    for select using (true);

-- profiles: see and edit only your own name (never is_admin)
drop policy if exists "own profile read"   on public.profiles;
drop policy if exists "own profile update" on public.profiles;
create policy "own profile read"   on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy "own profile update" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());

-- orders / bookings: created ONLY through the functions below; users read their own; admins read all
drop policy if exists "own orders"      on public.orders;
drop policy if exists "own order items" on public.order_items;
drop policy if exists "own bookings"    on public.bookings;
drop policy if exists "own bids"        on public.bids;
create policy "own orders"      on public.orders      for select using (user_id = auth.uid() or public.is_admin());
create policy "own order items" on public.order_items for select using (
  exists (select 1 from public.orders o where o.id = order_id and (o.user_id = auth.uid() or public.is_admin())));
create policy "own bookings"    on public.bookings    for select using (user_id = auth.uid() or public.is_admin());
create policy "own bids"        on public.bids        for select using (user_id = auth.uid() or public.is_admin());

-- forms: anyone may submit (with sane limits); only admins can read them
drop policy if exists "submit quote"   on public.quote_requests;
drop policy if exists "submit contact" on public.contact_messages;
drop policy if exists "submit partner" on public.partner_applications;
drop policy if exists "subscribe"      on public.newsletter_subscribers;
drop policy if exists "submit thread"  on public.threads;
drop policy if exists "read threads"   on public.threads;
drop policy if exists "admin read quote"   on public.quote_requests;
drop policy if exists "admin read contact" on public.contact_messages;
drop policy if exists "admin read partner" on public.partner_applications;
drop policy if exists "admin read news"    on public.newsletter_subscribers;

create policy "submit quote" on public.quote_requests for insert with check (
  length(quantity) between 1 and 100 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and length(coalesce(notes,'')) <= 2000);
create policy "submit contact" on public.contact_messages for insert with check (
  length(name) between 1 and 120 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and length(message) between 1 and 5000);
create policy "submit partner" on public.partner_applications for insert with check (
  length(business) between 1 and 200 and length(contact_name) between 1 and 120 and length(phone) between 5 and 40
  and length(location) between 1 and 200 and length(coalesce(about,'')) <= 3000 and status = 'new');
create policy "subscribe" on public.newsletter_subscribers for insert with check (
  email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and length(email) <= 200);
create policy "submit thread" on public.threads for insert with check (
  approved = false and length(title) between 5 and 200 and length(coalesce(body,'')) <= 3000 and length(author) <= 80);
create policy "read threads" on public.threads for select using (approved or public.is_admin());

create policy "admin read quote"   on public.quote_requests       for select using (public.is_admin());
create policy "admin read contact" on public.contact_messages     for select using (public.is_admin());
create policy "admin read partner" on public.partner_applications for select using (public.is_admin());
create policy "admin read news"    on public.newsletter_subscribers for select using (public.is_admin());

-- ---------------------------------------------------------------- table privileges
-- Explicit grants (Supabase may not add them automatically). Row level security above then
-- narrows what each role can actually see or insert.
revoke all on all tables in schema public from anon, authenticated;

grant select on public.products, public.experiences, public.auctions, public.threads to anon, authenticated;
grant select on public.profiles, public.orders, public.order_items, public.bookings, public.bids to authenticated;
-- admins read the form tables through their own policies; ordinary users see 0 rows
grant select on public.quote_requests, public.contact_messages, public.partner_applications,
                public.newsletter_subscribers to authenticated;
grant insert on public.quote_requests, public.contact_messages, public.partner_applications,
                public.newsletter_subscribers, public.threads to anon, authenticated;
-- users may edit only their display name / interest, never is_admin
grant update (full_name, interest) on public.profiles to authenticated;

-- ---------------------------------------------------------------- functions (server decides prices)
create or replace function public.place_order(p_customer jsonb, p_items jsonb) returns text
language plpgsql security definer set search_path = public as $$
declare
  v_id uuid; v_ref text; v_total numeric := 0; it jsonb; prod public.products; q int;
begin
  if p_items is null or jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) not between 1 and 50 then
    raise exception 'Your cart is empty.';
  end if;
  if length(coalesce(p_customer->>'name','')) < 1 or (p_customer->>'email') !~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
     or length(coalesce(p_customer->>'country','')) < 1 or length(coalesce(p_customer->>'city','')) < 1
     or length(coalesce(p_customer->>'address','')) < 1 then
    raise exception 'Please fill in your name, email and delivery address.';
  end if;

  v_ref := 'AFR-' || upper(substr(md5(random()::text || clock_timestamp()::text), 1, 8));
  insert into public.orders (reference, user_id, customer_name, customer_email, customer_phone, country, city, address, payment_method)
  values (v_ref, auth.uid(), left(p_customer->>'name',120), left(p_customer->>'email',200), left(p_customer->>'phone',40),
          left(p_customer->>'country',80), left(p_customer->>'city',80), left(p_customer->>'address',300),
          left(coalesce(p_customer->>'payment','Mobile money'),60))
  returning id into v_id;

  for it in select * from jsonb_array_elements(p_items) loop
    q := (it->>'qty')::int;
    if q is null or q < 1 or q > 20 then raise exception 'Invalid quantity.'; end if;
    select * into prod from public.products where slug = it->>'slug' and sale_type = 'buy' and active;
    if not found then raise exception 'One of the items is no longer available.'; end if;
    insert into public.order_items (order_id, product_slug, name, unit_price, qty) values (v_id, prod.slug, prod.name, prod.price, q);
    v_total := v_total + prod.price * q;
  end loop;

  update public.orders set total = v_total where id = v_id;
  return v_ref;
end $$;

create or replace function public.create_booking(
  p_slug text, p_date date, p_guests int, p_name text, p_email text, p_notes text) returns text
language plpgsql security definer set search_path = public as $$
declare v_ref text; e public.experiences;
begin
  if p_guests is null or p_guests not between 1 and 20 then raise exception 'Guests must be between 1 and 20.'; end if;
  if p_date is null or p_date < current_date then raise exception 'Please choose a date in the future.'; end if;
  if length(coalesce(p_name,'')) < 1 or p_email !~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' then raise exception 'Please give your name and a valid email.'; end if;
  select * into e from public.experiences where slug = p_slug and active;
  if not found then raise exception 'That experience is not available.'; end if;

  v_ref := 'BK-' || upper(substr(md5(random()::text || clock_timestamp()::text), 1, 8));
  insert into public.bookings (reference, user_id, experience_slug, visit_date, guests, customer_name, customer_email, notes, total)
  values (v_ref, auth.uid(), e.slug, p_date, p_guests, left(p_name,120), left(p_email,200), left(p_notes,2000), e.price * p_guests);
  return v_ref;
end $$;

create or replace function public.place_bid(p_slug text, p_amount numeric) returns numeric
language plpgsql security definer set search_path = public as $$
declare a public.auctions;
begin
  if auth.uid() is null then raise exception 'Please log in to place a bid.'; end if;
  select * into a from public.auctions where slug = p_slug for update;
  if not found then raise exception 'Auction not found.'; end if;
  if a.ends_at <= now() then raise exception 'This auction has ended.'; end if;
  if p_amount is null or p_amount < a.current_bid + 5 then
    raise exception 'Your bid must be at least $%.', (a.current_bid + 5)::int;
  end if;
  update public.auctions set current_bid = p_amount, bid_count = bid_count + 1, high_bidder = auth.uid() where slug = p_slug;
  insert into public.bids (slug, user_id, amount) values (p_slug, auth.uid(), p_amount);
  return p_amount;
end $$;

revoke all on function public.place_order(jsonb, jsonb) from public;
revoke all on function public.create_booking(text, date, int, text, text, text) from public;
revoke all on function public.place_bid(text, numeric) from public;
grant execute on function public.place_order(jsonb, jsonb) to anon, authenticated;
grant execute on function public.create_booking(text, date, int, text, text, text) to anon, authenticated;
grant execute on function public.place_bid(text, numeric) to authenticated;

-- To make yourself an admin (after you sign up on the site), run:
--   update public.profiles set is_admin = true where id = (select id from auth.users where email = 'YOUR_EMAIL');
