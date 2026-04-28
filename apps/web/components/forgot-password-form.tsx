"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("meera@aerodesign.team");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    setToken("");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = (await response.json()) as { message?: string; resetToken?: string | null };
      if (!response.ok) {
        setError(data.message ?? "Unable to process reset request.");
        return;
      }

      setMessage(data.message ?? "Reset request accepted.");
      setToken(data.resetToken ?? "");
    } catch {
      setError("The password reset request could not reach the backend API.");
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
        placeholder="Registered email"
        className="h-12 w-full rounded-2xl border border-edge/70 bg-panel/70 px-4"
      />
      {message ? (
        <div className="rounded-2xl bg-emerald-500/10 p-4 text-sm leading-7 text-emerald-700 dark:text-emerald-200">
          {message}
          {token ? (
            <div className="mt-2">
              Continue at{" "}
              <Link href={`/reset-password?token=${encodeURIComponent(token)}`} className="font-semibold underline">
                reset password
              </Link>
            </div>
          ) : null}
        </div>
      ) : null}
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
        {loading ? "Sending..." : "Send reset link"}
      </button>
    </form>
  );
}
