# Supabase Setup

1. Create a Supabase project.
2. Copy `.env.example` to `.env.local`.
3. Fill in:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
4. Open the Supabase SQL editor and run `supabase/schema.sql`.
5. In Supabase Auth email templates, set the confirm signup URL to:

```text
{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email
```

The site uses Supabase for account creation, login, logout, and profile info.
Products and the local cart are still file/browser based for now.
