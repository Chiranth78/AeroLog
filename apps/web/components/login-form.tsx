"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("nisha@aerodesign.team");
  const [password, setPassword] = useState("lead123");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = (await response.json()) as { message?: string };
      if (!response.ok) {
        setError(data.message ?? "Unable to login.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("The auth gateway could not reach the backend API.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email"
        className="h-12 w-full rounded-2xl border border-edge/70 bg-panel/70 px-4"
      />
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Password"
        className="h-12 w-full rounded-2xl border border-edge/70 bg-panel/70 px-4"
      />
      <div className="flex items-center justify-between">
        <label className="text-sm text-slate-500 dark:text-slate-400">
          <input type="checkbox" className="mr-2" defaultChecked />
          Keep session active
        </label>
        <Link href="/forgot-password" className="text-sm font-medium text-sky-700 dark:text-amber-300">
          Forgot password?
        </Link>
      </div>
      {error ? (
        <div className="rounded-2xl bg-rose-500/10 p-4 text-sm leading-7 text-rose-700 dark:text-rose-200">
          {error}
        </div>
      ) : null}
      <button
        type="submit"
        disabled={loading}
        className="h-12 w-full rounded-2xl bg-slate-950 font-medium text-white disabled:opacity-60 dark:bg-amber-400 dark:text-slate-950"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      <div className="rounded-2xl bg-sky-500/10 p-4 text-sm leading-7 text-slate-700 dark:bg-amber-400/10 dark:text-slate-200">
        Demo accounts: `aarav@aerodesign.team / admin123`, `nisha@aerodesign.team / lead123`, `meera@aerodesign.team / member123`
      </div>
    </form>
  );
}
