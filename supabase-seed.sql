-- Run this in your Supabase SQL Editor to set up the courses table

-- Create courses table
create table if not exists public.courses (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  progress integer not null default 0 check (progress >= 0 and progress <= 100),
  icon_name text not null default 'BookOpen',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.courses enable row level security;

-- Allow public read access (for the anon key)
create policy "Allow public read access"
  on public.courses
  for select
  using (true);

-- Seed data
insert into public.courses (title, progress, icon_name) values
  ('Advanced React Patterns', 75, 'Layers'),
  ('System Design Mastery', 42, 'Network'),
  ('TypeScript Deep Dive', 88, 'Code2'),
  ('Next.js App Router', 31, 'Globe');
