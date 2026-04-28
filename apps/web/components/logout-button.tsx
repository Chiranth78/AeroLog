"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);

    try {
      await fetch("/api/auth/logout", {
        method: "POST"
      });
      router.push("/login");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-2xl border border-edge/80 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-sky-400 hover:text-sky-700 disabled:opacity-60 dark:text-slate-300 dark:hover:border-amber-300 dark:hover:text-amber-200"
    >
      <LogOut className="h-4 w-4" />
      {loading ? "Signing out..." : "Logout"}
    </button>
  );
}
