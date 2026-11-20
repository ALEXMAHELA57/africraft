import { supabase } from "./supabase";

export type Result = { ok: boolean; message: string; ref?: string };

const DEMO: Result = {
  ok: true,
  message: "Demo mode: the database is not connected yet, so nothing was saved.",
};

const fail = (e: unknown, fallback = "Something went wrong. Please try again."): Result => {
  const msg = e && typeof e === "object" && "message" in e ? String((e as { message: unknown }).message) : "";
  return { ok: false, message: msg || fallback };
};

/* ---------- orders ---------- */
export async function placeOrder(
  customer: { name: string; email: string; phone: string; country: string; city: string; address: string; payment: string },
  items: { slug: string; qty: number }[],
): Promise<Result> {
  if (!supabase) return { ...DEMO, ref: `DEMO-${Date.now().toString(36).toUpperCase()}` };
  // Only slug + qty are sent. The server looks up the real price.
  const { data, error } = await supabase.rpc("place_order", {
    p_customer: customer,
    p_items: items.map(({ slug, qty }) => ({ slug, qty })),
  });
  if (error) return fail(error);
  return { ok: true, message: "Order received.", ref: String(data) };
}

/* ---------- bookings ---------- */
export async function createBooking(b: {
  slug: string;
  date: string;
  guests: number;
  name: string;
  email: string;
  notes: string;
}): Promise<Result> {
  if (!supabase) return { ...DEMO, ref: `DEMO-${Date.now().toString(36).toUpperCase()}` };
  const { data, error } = await supabase.rpc("create_booking", {
    p_slug: b.slug,
    p_date: b.date,
    p_guests: b.guests,
    p_name: b.name,
    p_email: b.email,
    p_notes: b.notes || null,
  });
  if (error) return fail(error);
  return { ok: true, message: "Booking request sent.", ref: String(data) };
}

/* ---------- auctions ---------- */
export async function getAuction(slug: string): Promise<{ currentBid: number; bids: number; endsAt: string } | null> {
  if (!supabase) return null;
  const { data } = await supabase.from("auctions").select("current_bid,bid_count,ends_at").eq("slug", slug).maybeSingle();
  if (!data) return null;
  return { currentBid: Number(data.current_bid), bids: data.bid_count, endsAt: data.ends_at };
}

export async function placeBid(slug: string, amount: number): Promise<Result> {
  if (!supabase) return DEMO;
  const { error } = await supabase.rpc("place_bid", { p_slug: slug, p_amount: amount });
  if (error) return fail(error);
  return { ok: true, message: "Your bid was placed." };
}

/* ---------- simple forms ---------- */
export async function requestQuote(q: { slug: string; quantity: string; email: string; notes: string }): Promise<Result> {
  if (!supabase) return DEMO;
  const { error } = await supabase
    .from("quote_requests")
    .insert({ product_slug: q.slug, quantity: q.quantity, email: q.email, notes: q.notes || null });
  return error ? fail(error) : { ok: true, message: "Quote request sent. The seller will reply by email." };
}

export async function sendContact(m: { name: string; email: string; topic: string; message: string }): Promise<Result> {
  if (!supabase) return DEMO;
  const { error } = await supabase
    .from("contact_messages")
    .insert({ name: m.name, email: m.email, topic: m.topic || null, message: m.message });
  return error ? fail(error) : { ok: true, message: "Message sent. We'll reply by email." };
}

export async function applyPartner(a: {
  business: string;
  contact: string;
  phone: string;
  email: string;
  type: string;
  location: string;
  about: string;
}): Promise<Result> {
  if (!supabase) return DEMO;
  const { error } = await supabase.from("partner_applications").insert({
    business: a.business,
    contact_name: a.contact,
    phone: a.phone,
    email: a.email || null,
    business_type: a.type,
    location: a.location,
    about: a.about || null,
  });
  return error ? fail(error) : { ok: true, message: "Application received. We'll contact you on the phone number you gave." };
}

export async function subscribe(email: string): Promise<Result> {
  if (!supabase) return DEMO;
  const { error } = await supabase.from("newsletter_subscribers").insert({ email });
  // 23505 = already subscribed; treat as success, no need to tell anyone
  if (error && error.code !== "23505") return fail(error);
  return { ok: true, message: "You're subscribed. Thank you!" };
}

export async function postThread(t: { title: string; body: string; author: string }): Promise<Result> {
  if (!supabase) return DEMO;
  const { error } = await supabase
    .from("threads")
    .insert({ title: t.title, body: t.body || null, author: t.author || "Visitor", category: "qa" });
  return error ? fail(error) : { ok: true, message: "Thanks! Your question will appear once it has been reviewed." };
}
