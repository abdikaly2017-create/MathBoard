# MathBoard: қауіпсіз аккаунт және профиль жүйесі

## Қазіргі мәртебе
Бұл құжат қауіпсіз енгізу жоспарын бекітеді. GitHub Pages-тағы HTML/JavaScript-ке ғана сүйенген «кіру жүйесі» шынайы аутентификация болмайды. Сервер жағындағы провайдер бапталмайынша сайтта аккаунт бар деп көрсетуге болмайды.

## Ұсынылатын шешім: Supabase Auth
1. Supabase жобасын иесі өзі ашады және email/password немесе email OTP аутентификациясын қосады.
2. Клиентке тек project URL және publishable/anon key беріледі. **service_role кілті, құпия API кілттері немесе парольдер репозиторийге салынбайды.**
3. Профиль кестесі profiles пайдаланушының auth.users.id мәніне сәйкестендірілген UUID пайдаланады.
4. Row Level Security қосылады. Пайдаланушы тек өзінің профилін оқи/өзгерте алады.
5. Қолданба профиліндегі ұпайлар мен прогресті клиент жіберген мәнге соқыр сеніп сақтамайды; маңызды нәтижелер сервер жағында тексеріледі.
6. Пароль қалпына келтіру, email растау, сессиядан шығу, қате күйлері және қолжетімділік тексеріледі.

## Минималды SQL үлгісі
```sql
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "read own profile"
on public.profiles for select
using (auth.uid() = id);

create policy "insert own profile"
on public.profiles for insert
with check (auth.uid() = id);

create policy "update own profile"
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);
```

## Қосуға дейінгі тексеру
- [ ] Иесі Supabase жобасын жасап, email провайдерін баптады.
- [ ] Allowed redirect URLs GitHub Pages доменіне сәйкестендірілді.
- [ ] Кестелерде RLS қосылып, басқа пайдаланушы ID-сімен оқу/жазу сынағы өтті.
- [ ] Құпиялар GitHub-қа commit жасалмайды.
- [ ] Қате логин, қайталанған тіркелу, сессия мерзімі және logout тексерілді.
- [ ] Профиль деректері үшін артық жеке ақпарат жиналмайды.

**Келесі қажет әрекет:** репозиторий иесі Supabase жобасын баптап, project URL мен publishable key-ді қауіпсіз конфигурация тәсілімен береді. Құпия service-role key ешқашан сұралмайды.
