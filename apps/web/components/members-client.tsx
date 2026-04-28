"use client";

import type { MemberSummary } from "@aerodesign/shared";
import Link from "next/link";
import { useMemo, useState } from "react";

export function MembersClient({ members }: { members: MemberSummary[] }) {
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState("All");
  const [attendance, setAttendance] = useState("All");

  const filtered = useMemo(() => {
    return members.filter((member) => {
      const matchesQuery = member.name.toLowerCase().includes(query.toLowerCase());
      const matchesDomain = domain === "All" || member.domain === domain;
      const matchesAttendance =
        attendance === "All" ||
        (attendance === "High" && member.attendancePercentage >= 80) ||
        (attendance === "Mid" && member.attendancePercentage >= 60 && member.attendancePercentage < 80) ||
        (attendance === "Low" && member.attendancePercentage < 60);

      return matchesQuery && matchesDomain && matchesAttendance;
    });
  }, [attendance, domain, members, query]);

  return (
    <div className="space-y-6">
      <section className="panel p-6">
        <div className="flex flex-col gap-4 lg:flex-row">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by member name"
            className="h-12 flex-1 rounded-2xl border border-edge/70 bg-panel/80 px-4 outline-none transition focus:border-sky-400 dark:focus:border-amber-300"
          />
          <select
            value={domain}
            onChange={(event) => setDomain(event.target.value)}
            className="h-12 rounded-2xl border border-edge/70 bg-panel/80 px-4"
          >
            <option>All</option>
            <option>Aerodynamics</option>
            <option>Structures</option>
            <option>Electronics</option>
            <option>Propulsion</option>
            <option>CAD</option>
            <option>Simulation</option>
            <option>Manufacturing</option>
          </select>
          <select
            value={attendance}
            onChange={(event) => setAttendance(event.target.value)}
            className="h-12 rounded-2xl border border-edge/70 bg-panel/80 px-4"
          >
            <option>All</option>
            <option>High</option>
            <option>Mid</option>
            <option>Low</option>
          </select>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {filtered.map((member) => (
          <Link key={member.id} href={`/members/${member.id}`} className="metric-card block">
            <div className="flex items-start gap-4">
              <img src={member.avatarUrl} alt={member.name} className="h-16 w-16 rounded-3xl object-cover" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-950 dark:text-white">{member.name}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {member.teamRole} / {member.domain}
                    </p>
                  </div>
                  <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white dark:bg-amber-400 dark:text-slate-950">
                    {member.role}
                  </span>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Attendance</p>
                    <p className="mt-1 font-semibold text-slate-900 dark:text-white">{member.attendancePercentage}%</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Entries</p>
                    <p className="mt-1 font-semibold text-slate-900 dark:text-white">{member.totalDailyEntries}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Productivity</p>
                    <p className="mt-1 font-semibold text-slate-900 dark:text-white">{member.productivityScore}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Streak</p>
                    <p className="mt-1 font-semibold text-slate-900 dark:text-white">{member.streakCount} days</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
