"use client";

import type { AttendanceEntry } from "@aerodesign/shared";
import { useState } from "react";

const palette: Record<string, string> = {
  Present: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-200",
  Absent: "bg-rose-500/15 text-rose-700 dark:text-rose-200",
  "On Leave": "bg-amber-500/15 text-amber-700 dark:text-amber-200",
  Late: "bg-sky-500/15 text-sky-700 dark:text-sky-200"
};

export function AttendanceClient({ entries }: { entries: Array<AttendanceEntry & { memberName?: string }> }) {
  const [status, setStatus] = useState("Present");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("Mark attendance quickly and let leads override when needed.");

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <section className="panel p-6">
        <p className="text-sm text-slate-500 dark:text-slate-400">Attendance tracking</p>
        <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">Mark today’s status</h2>
        <div className="mt-5 grid gap-4">
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="h-12 rounded-2xl border border-edge/70 bg-panel/70 px-4">
            <option>Present</option>
            <option>Absent</option>
            <option>On Leave</option>
            <option>Late</option>
          </select>
          <textarea
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            placeholder="Optional reason if absent or on leave"
            className="min-h-[120px] rounded-2xl border border-edge/70 bg-panel/70 px-4 py-3"
          />
          <div className="rounded-3xl bg-sky-500/10 p-4 text-sm leading-7 text-slate-700 dark:bg-amber-400/10 dark:text-slate-200">
            {message}
          </div>
          <button
            type="button"
            onClick={() => setMessage(`Demo attendance saved as ${status}. Connect the API route to make this persistent.`)}
            className="rounded-full bg-slate-950 px-6 py-3 font-medium text-white dark:bg-amber-400 dark:text-slate-950"
          >
            Mark attendance
          </button>
        </div>
      </section>

      <section className="panel p-6">
        <p className="text-sm text-slate-500 dark:text-slate-400">Attendance analytics</p>
        <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">Monthly report feed</h2>
        <div className="mt-5 space-y-4">
          {entries.map((entry) => (
            <div key={entry.id} className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-edge/70 p-4">
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">{entry.memberName ?? entry.userId}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {new Date(entry.date).toLocaleDateString()} / {entry.reason ?? "No reason logged"}
                </p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${palette[entry.status]}`}>{entry.status}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
