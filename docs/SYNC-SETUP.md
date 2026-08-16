# Turning on cross-device sync

By default this site stores progress in the student's browser only. This guide
switches on optional sync, so a student can enter a nickname and PIN on their
laptop and phone and have their answers, saved questions and mistakes follow them.

It takes about 15 minutes and costs nothing on Supabase's free tier.

**You do not have to do this.** With no backend configured the sync panel does
not render at all, and the site behaves exactly as it does today.

---

## What the design actually guarantees

Before you set this up, it is worth being precise about what it does and does not
protect, so you can decide whether you are comfortable running it.

**The server cannot read a student's progress.** The nickname and PIN are put
through 310,000 rounds of PBKDF2 in the browser. That produces an AES-GCM key
which never leaves the device, and the progress is encrypted before it is sent.
The database stores an opaque blob. A full database dump would reveal nothing
about what any student answered.

**No personal information is collected.** No email, no real name, no analytics.
A nickname is whatever the student types. The stored row id is a hash, not the
nickname itself.

**A wrong PIN cannot overwrite someone's data.** The database rejects a write
whose verifier does not match the stored one. That rule lives in the SQL
function, not just in the browser, so it holds even against a hand-crafted request.

**The table cannot be listed or dumped.** The public key grants no table access
at all. Everything goes through two functions that only ever touch one row, and
only when the caller already knows its id.

Now the limits, stated plainly:

- **A weak PIN is still a weak PIN.** Anyone who knows a nickname can attempt
  PINs against it. 310k PBKDF2 rounds make that slow and Supabase rate-limits
  requests, but a student who picks `123456` is not protected by cryptography.
  The stakes are practice-quiz scores, not grades, but tell students to pick
  something they would not use elsewhere.
- **Nickname existence is discoverable.** Someone can find out whether a given
  nickname is in use. They learn nothing else.
- **There is no PIN reset.** There cannot be: nothing on the server can decrypt
  the data. A forgotten PIN means the synced copy is gone. The copy in that
  student's own browser is untouched.
- **Sync is a bridge, not the source of truth.** The working copy is always
  local. If the server is down, the site keeps working and syncs later.

---

## 1. Create the project

1. Sign up at [supabase.com](https://supabase.com) and create a new project.
2. Choose a region near your students.
3. Wait for it to finish provisioning.

## 2. Create the table and the two functions

Open **SQL Editor** in the Supabase dashboard, paste this in, and run it.

```sql
-- One row per account. `payload` is ciphertext produced in the browser;
-- the server has no way to read it.
create table if not exists public.progress (
  id         text primary key,
  verifier   text        not null,
  payload    text        not null,
  updated_at timestamptz not null default now()
);

-- Row level security with NO policies: the anon role gets no direct access to
-- this table at all. Everything must go through the functions below.
alter table public.progress enable row level security;

revoke all on public.progress from anon, authenticated;

-- Read one row by id. Returns nothing when the account does not exist yet.
create or replace function public.sync_pull(p_id text)
returns table (payload text, verifier text, updated_at timestamptz)
language sql
security definer
set search_path = public
as $$
  select p.payload, p.verifier, p.updated_at
  from public.progress p
  where p.id = p_id;
$$;

-- Create or replace one row.
-- A write is refused when the account exists under a different verifier, so a
-- wrong PIN can never destroy another student's progress.
create or replace function public.sync_push(
  p_id text,
  p_verifier text,
  p_payload text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  existing text;
begin
  if p_id is null or p_verifier is null or p_payload is null then
    raise exception 'missing argument';
  end if;

  -- Roughly 500 KB of ciphertext: far above a real student's progress,
  -- far below anything worth storing for free.
  if length(p_payload) > 512000 then
    raise exception 'payload too large';
  end if;

  select v.verifier into existing from public.progress v where v.id = p_id;

  if existing is not null and existing <> p_verifier then
    raise exception 'wrong verifier for this account';
  end if;

  insert into public.progress (id, verifier, payload, updated_at)
  values (p_id, p_verifier, p_payload, now())
  on conflict (id) do update
    set payload = excluded.payload,
        verifier = excluded.verifier,
        updated_at = now();
end;
$$;

-- The anon role may call the two functions, and nothing else.
grant execute on function public.sync_pull(text) to anon;
grant execute on function public.sync_push(text, text, text) to anon;
```

### Check it worked

Still in the SQL editor:

```sql
-- Should return 0 rows, not an error.
select * from public.sync_pull('nonexistent');
```

## 3. Find your two values

In the dashboard go to **Project Settings → API**:

- **Project URL** — looks like `https://abcdefgh.supabase.co`
- **anon public** key — a long string beginning `eyJ...`

The anon key is designed to ship inside client-side JavaScript. It is not a
secret, and it is safe in a public repository. Access is controlled by the
policies above. Do **not** use the `service_role` key here — that one is a real
secret and would bypass every protection on this page.

## 4. Give them to the site

### For the deployed site

In your GitHub repository go to **Settings → Secrets and variables → Actions →
Variables**, and add two repository variables:

| Name | Value |
|---|---|
| `VITE_SYNC_URL` | your Project URL |
| `VITE_SYNC_ANON_KEY` | your anon public key |

Then re-run the deploy workflow (**Actions → Deploy to GitHub Pages → Run
workflow**), or just push any commit. The sync panel appears on the Progress page.

### For local development

Create a `.env.local` file in the project root:

```
VITE_SYNC_URL=https://abcdefgh.supabase.co
VITE_SYNC_ANON_KEY=eyJ...
```

`.env.local` is gitignored.

## 5. Test it end to end

The repository ships a mock backend and a real two-device test, so you can
verify the client without touching your live project:

```bash
node scripts/mock-sync-server.mjs 4400 &
VITE_SYNC_URL=http://localhost:4400 VITE_SYNC_ANON_KEY=test-anon-key npm run build
npm run preview -- --port 4319 &
npm run test:sync
```

That drives two isolated browser profiles as two devices and checks that work
flows both ways, that the newer answer wins, that a wrong PIN is refused, that
the stored blob contains nothing readable, and that the site still works with the
server switched off.

To check your real project instead, build with your live values and open the site
in two different browsers.

---

## Housekeeping

**Cost.** The free tier is far more than this needs: each student's record is a
few kilobytes. A cohort of 200 students is well under a megabyte.

**Supabase pauses idle free projects** after a week without activity. If sync
stops working during a quiet period, open the dashboard and resume the project.
Students' local progress is unaffected while it is paused.

**Clearing out old data** after the exam:

```sql
delete from public.progress where updated_at < now() - interval '90 days';
```

**Turning sync off again.** Remove the two repository variables and redeploy. The
panel disappears and every student keeps the local copy they already have.
