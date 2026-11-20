"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase, backendReady } from "@/lib/supabase";
import { EmptyState, usd } from "./ui";

type Order = { reference: string; total: number; status: string; created_at: string; order_items: { name: string; qty: number }[] };
type Booking = { reference: string; experience_slug: string; visit_date: string; guests: number; total: number; status: string };

export default function AccountView() {
  const [state, setState] = useState<"loading" | "out" | "in">("loading");
  const [name, setName] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (!supabase) return;
    (async () => {
      const { data } = await supabase!.auth.getSession();
      const user = data.session?.user;
      if (!user) return setState("out");
      const [p, o, b] = await Promise.all([
        supabase!.from("profiles").select("full_name").eq("id", user.id).maybeSingle(),
        supabase!.from("orders").select("reference,total,status,created_at,order_items(name,qty)").order("created_at", { ascending: false }),
        supabase!.from("bookings").select("reference,experience_slug,visit_date,guests,total,status").order("created_at", { ascending: false }),
      ]);
      setName(p.data?.full_name || user.email || "");
      setOrders((o.data as unknown as Order[]) ?? []);
      setBookings((b.data as Booking[]) ?? []);
      setState("in");
    })();
  }, []);

  if (!backendReady)
    return <EmptyState text="Accounts need the database to be connected. See the setup steps in the README." />;
  if (state === "loading") return <p className="py-10 text-center text-neutral-500">Loading…</p>;
  if (state === "out")
    return (
      <div className="space-y-4 text-center">
        <EmptyState text="You're not logged in." />
        <Link href="/login" className="inline-block rounded-full bg-sun px-6 py-2.5 font-semibold text-ink hover:bg-brand">
          Log in
        </Link>
      </div>
    );

  return (
    <div className="space-y-8">
      <p className="text-lg">
        Hello, <strong>{name}</strong>.
      </p>

      <section>
        <h2 className="mb-3 text-xl font-bold">Your orders</h2>
        {orders.length === 0 ? (
          <EmptyState text="No orders yet." />
        ) : (
          <ul className="divide-y divide-black/10 rounded-2xl bg-white ring-1 ring-black/5">
            {orders.map((o) => (
              <li key={o.reference} className="space-y-1 p-4 text-sm">
                <p className="flex justify-between font-bold">
                  <span>{o.reference}</span>
                  <span>{usd(Number(o.total))}</span>
                </p>
                <p className="text-neutral-600">{o.order_items.map((i) => `${i.name} × ${i.qty}`).join(", ")}</p>
                <p className="text-xs uppercase tracking-wide text-brand-dark">{o.status}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-xl font-bold">Your booking requests</h2>
        {bookings.length === 0 ? (
          <EmptyState text="No bookings yet." />
        ) : (
          <ul className="divide-y divide-black/10 rounded-2xl bg-white ring-1 ring-black/5">
            {bookings.map((b) => (
              <li key={b.reference} className="space-y-1 p-4 text-sm">
                <p className="flex justify-between font-bold">
                  <span>{b.reference}</span>
                  <span>{usd(Number(b.total))}</span>
                </p>
                <p className="text-neutral-600">
                  <Link href={`/tourism/experience/${b.experience_slug}`} className="underline">
                    {b.experience_slug}
                  </Link>{" "}
                  · {b.visit_date} · {b.guests} guests
                </p>
                <p className="text-xs uppercase tracking-wide text-brand-dark">{b.status}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
