"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token, password })
      });

      const data = (await response.json()) as { message?: string };
      if (!response.ok) {
        setError(data.message ?? "Unable to reset password.");
        return;
      }

      setMessage(data.message ?? "Password updated.");
      setTimeout(() => {
        router.push("/login");
      }, 900);
    } catch {
      setError("The reset request could not reach the backend API.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="New password"
        className="h-12 w-full rounded-2xl border border-edge/70 bg-panel/70 px-4"
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        placeholder="Confirm password"
        className="h-12 w-full rounded-2xl border border-edge/70 bg-panel/70 px-4"
      />
      {message ? (
        <div className="rounded-2xl bg-emerald-500/10 p-4 text-sm leading-7 text-emerald-700 dark:text-emerald-200">
          {message}
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
        {loading ? "Resetting..." : "Reset password"}
      </button>
    </form>
  );
}
