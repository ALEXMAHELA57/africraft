"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { supabase } from "@/lib/supabase";

/** Right side of the top bar: Login / Sign Up, or Account / Log out once signed in. */
export default function AuthStatus() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setEmail(data.session?.user.email ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => setEmail(session?.user.email ?? null));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (email)
    return (
      <div className="flex items-center gap-4">
        <Link href="/account" className="flex items-center gap-1 hover:text-sun">
          <User size={14} aria-hidden /> <span className="max-w-32 truncate">{email}</span>
        </Link>
        <button
          onClick={() => supabase?.auth.signOut()}
          className="rounded-full bg-sun px-3 py-1 font-semibold text-ink hover:bg-brand"
        >
          Log out
        </button>
      </div>
    );

  return (
    <div className="flex items-center gap-4">
      <Link href="/login" className="flex items-center gap-1 hover:text-sun">
        <User size={14} aria-hidden /> Login
      </Link>
      <Link href="/signup" className="rounded-full bg-sun px-3 py-1 font-semibold text-ink hover:bg-brand">
        Sign Up
      </Link>
    </div>
  );
}
