# Supabase Setup

1. Create a Supabase project.
2. Copy `.env.example` to `.env.local`.
3. Fill in:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
4. Open the Supabase SQL editor and run `supabase/schema.sql`.
5. In Supabase Auth email templates, set the confirm signup URL to:

```text
{{ .RedirectTo }}?token_hash={{ .TokenHash }}&type=email
```

The site uses Supabase for account creation, login, logout, profile info,
preorder history, and admin order export.

Products are still file based in `src/content/mock-products.ts`. The cart is
saved in the browser until checkout, then the app stores an order and item
snapshot in Supabase.

## Admin access

Admins use the same login flow as customers. To make a signed-up user an admin,
run this in the Supabase SQL editor:

```sql
update public.profiles
set is_admin = true
where id = (
  select id
  from auth.users
  where email = 'admin@example.com'
);
```

Then visit `/admin/orders` to view preorders and download the CSV.
