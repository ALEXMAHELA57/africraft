# Africraft

Marketplace, tourism and culture platform. Next.js + Tailwind, with Supabase (Postgres + login) as the backend.

## Run it

```powershell
npm install
npm run dev
```

Open http://localhost:3000. With no database connected the site runs in **demo mode**: every form works on screen
and says "Demo mode", but nothing is saved.

## Connect the database (Supabase)

1. Create a free project at https://supabase.com.
2. In the dashboard open **SQL Editor -> New query**, paste all of `supabase/schema.sql`, click **Run**.
3. New query again, paste all of `supabase/seed.sql`, click **Run**. This loads the products, experiences and auctions.
4. **Project Settings -> API**: copy the Project URL and the `anon` public key.
5. Copy `.env.local.example` to `.env.local` and paste the two values in. Restart `npm run dev`.
6. In **Authentication -> Providers -> Email**, decide whether new users must confirm their email.
   For testing, turn "Confirm email" off.

On Vercel, add the same two values under **Project -> Settings -> Environment Variables**, then redeploy.

## Making yourself admin

Sign up on the site first, then run this once in the SQL Editor (use your email):

```sql
update public.profiles set is_admin = true where id = (select id from auth.users where email = 'YOUR_EMAIL');
```

Admins can read orders, bookings, contact messages, partner applications, quote requests and newsletter
subscribers, and see pending community posts. Approve a community post by setting `approved = true` on its row in
**Table Editor -> threads**. Change an order or booking `status` the same way.

## What is stored where

| Feature | Database |
|---|---|
| Checkout | `orders`, `order_items` (price is looked up on the server, never trusted from the browser) |
| Experience booking requests | `bookings` (total calculated on the server) |
| Auction bids | `auctions`, `bids` (minimum bid, end time and login enforced in the database) |
| Quote requests, contact, join-us form, newsletter, community questions | their own tables |
| Sign up / login | Supabase Auth + `profiles` |

## Changing products or prices

The product and experience lists live in `src/data/*.ts`. After editing them run `npm run db:seed-sql`, then run the
new `supabase/seed.sql` in the SQL Editor so the database prices match the website.

## Photos

Put a photo at `public/images/<name>.jpg` and it replaces the matching illustration automatically.
Names: `hero`, `marketplace`, `tourism`, `culture`, `entertainment`, `support-local`, `kilimanjaro`, `zanzibar`,
`arusha`, `serengeti`, `dar-es-salaam`. A product, experience or article can also have its own photo named after
its slug, for example `public/images/dhow-sunset-cruise.jpg`.

## Not built yet

- Online payments (Pesapal / card / mobile money). Orders are recorded, payment is confirmed by hand.
- Seller and provider dashboards. Sellers apply through the join form; you add their listings.
- Emails to customers and sellers when something happens.
- Admin pages inside the site (use the Supabase Table Editor for now).
- Spam protection (CAPTCHA) on the public forms.
