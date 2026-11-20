import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Supabase calls this key "anon" in older projects and "publishable" in newer ones. Either name works.
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

/**
 * Browser client. `null` when the two env vars are not set, in which case the site
 * runs in demo mode (forms show a message and nothing is saved).
 * The anon key is meant to be public; the database rules in supabase/schema.sql protect the data.
 */
export const supabase: SupabaseClient | null = url && key ? createClient(url, key) : null;

export const backendReady = supabase !== null;
