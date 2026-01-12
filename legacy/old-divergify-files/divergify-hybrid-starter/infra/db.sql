create extension if not exists pgcrypto;

create table if not exists beta_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text,
  created_at timestamptz default now()
);

create table if not exists task_events (
  id bigserial primary key,
  user_id uuid not null,
  kind text not null,          -- "start","complete","reward"
  meta jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);
