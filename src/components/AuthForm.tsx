"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const field = "w-full rounded-lg px-3 py-2.5 ring-1 ring-black/15";

const ROLES = [
  "Visitor / buyer",
  "Seller (products)",
  "Tour operator",
  "Hotel / accommodation",
  "Local guide",
  "Transport provider",
  "Content creator",
  "Event organiser",
];

export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const signup = mode === "signup";
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if (!supabase) {
      setNotice("Demo mode: the database is not connected yet, so no account was created.");
      return;
    }
    setBusy(true);
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email")).trim();
    const password = String(f.get("password"));

    if (signup) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: String(f.get("name")).trim(), interest: String(f.get("role")) } },
      });
      setBusy(false);
      if (error) return setError(error.message);
      if (data.session) router.push("/account");
      else setNotice("Account created. Check your email and click the confirmation link, then log in.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) return setError(error.message);
      router.push("/account");
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <h1 className="font-display text-2xl font-extrabold">{signup ? "Create your account" : "Welcome back"}</h1>

      {notice ? (
        <p role="status" className="rounded-xl bg-leaf/10 p-4 text-sm text-leaf">
          {notice}
        </p>
      ) : (
        <form className="space-y-3" onSubmit={onSubmit}>
          {signup && <input required name="name" placeholder="Full name" autoComplete="name" className={field} />}
          <input required type="email" name="email" placeholder="Email" autoComplete="email" className={field} />
          <input
            required
            type="password"
            name="password"
            minLength={8}
            placeholder="Password (8+ characters)"
            autoComplete={signup ? "new-password" : "current-password"}
            className={field}
          />
          {signup && (
            <div>
              <label htmlFor="role" className="mb-1 block text-xs font-semibold">
                I want to join as
              </label>
              <select id="role" name="role" className={field}>
                {ROLES.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
              <p className="mt-1 text-xs text-neutral-500">
                Seller and provider accounts are reviewed by our team before you can list anything.
              </p>
            </div>
          )}
          {error && (
            <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}
          <button disabled={busy} className="w-full rounded-full bg-sun py-3 font-bold text-ink hover:bg-brand disabled:opacity-60">
            {busy ? "Please wait…" : signup ? "Sign up" : "Log in"}
          </button>
        </form>
      )}

      <p className="text-center text-sm text-neutral-600">
        {signup ? (
          <>
            Already have an account?{" "}
            <Link href="/login" className="font-semibold underline">
              Log in
            </Link>
          </>
        ) : (
          <>
            New to Africraft?{" "}
            <Link href="/signup" className="font-semibold underline">
              Sign up
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
