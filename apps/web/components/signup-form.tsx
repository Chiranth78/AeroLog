"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

const domains = ["Aerodynamics", "Structures", "Electronics", "Propulsion", "CAD", "Simulation", "Manufacturing"];

export function SignupForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
    domain: "CAD",
    year: "Second Year",
    batch: "2028",
    teamRole: "Junior Member"
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = (await response.json()) as { message?: string };
      if (!response.ok) {
        setError(data.message ?? "Unable to create account.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("The signup request could not reach the backend API.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        type="text"
        value={form.name}
        onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
        placeholder="Full name"
        className="h-12 w-full rounded-2xl border border-edge/70 bg-panel/70 px-4"
      />
      <input
        type="email"
        value={form.email}
        onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
        placeholder="Email"
        className="h-12 w-full rounded-2xl border border-edge/70 bg-panel/70 px-4"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <select
          value={form.role}
          onChange={(event) => setForm((current) => ({ ...current, role: event.target.value }))}
          className="h-12 rounded-2xl border border-edge/70 bg-panel/70 px-4"
        >
          <option value="member">Member</option>
          <option value="lead">Team Lead</option>
          <option value="admin">Admin</option>
        </select>
        <select
          value={form.domain}
          onChange={(event) => setForm((current) => ({ ...current, domain: event.target.value }))}
          className="h-12 rounded-2xl border border-edge/70 bg-panel/70 px-4"
        >
          {domains.map((domain) => (
            <option key={domain} value={domain}>
              {domain}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <input
          type="text"
          value={form.year}
          onChange={(event) => setForm((current) => ({ ...current, year: event.target.value }))}
          placeholder="Year"
          className="h-12 rounded-2xl border border-edge/70 bg-panel/70 px-4"
        />
        <input
          type="text"
          value={form.batch}
          onChange={(event) => setForm((current) => ({ ...current, batch: event.target.value }))}
          placeholder="Batch"
          className="h-12 rounded-2xl border border-edge/70 bg-panel/70 px-4"
        />
        <input
          type="text"
          value={form.teamRole}
          onChange={(event) => setForm((current) => ({ ...current, teamRole: event.target.value }))}
          placeholder="Team role"
          className="h-12 rounded-2xl border border-edge/70 bg-panel/70 px-4"
        />
      </div>
      <input
        type="password"
        value={form.password}
        onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
        placeholder="Password"
        className="h-12 w-full rounded-2xl border border-edge/70 bg-panel/70 px-4"
      />
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
        {loading ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}
