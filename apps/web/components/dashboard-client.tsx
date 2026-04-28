"use client";

import type { DashboardOverview } from "@aerodesign/shared";
import { BarChart3, Clock3, Flame, Layers3, TimerReset, UserCheck, UserX } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const statCards = (dashboard: DashboardOverview) => [
  { label: "Active members", value: dashboard.metrics.activeMembers, icon: UserCheck },
  { label: "Inactive members", value: dashboard.metrics.inactiveMembers, icon: UserX },
  { label: "Attendance rate", value: `${dashboard.metrics.attendanceRate}%`, icon: Clock3 },
  { label: "Pending approvals", value: dashboard.metrics.pendingApprovals, icon: TimerReset },
  { label: "Average productivity", value: `${dashboard.metrics.averageProductivity}%`, icon: BarChart3 },
  { label: "No submission today", value: dashboard.metrics.noSubmissionToday.length, icon: Flame }
];

export function DashboardClient({ dashboard }: { dashboard: DashboardOverview }) {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {statCards(dashboard).map((card) => (
          <div key={card.label} className="metric-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{card.label}</p>
                <h3 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">{card.value}</h3>
              </div>
              <card.icon className="h-10 w-10 rounded-2xl bg-sky-500/12 p-2.5 text-sky-600 dark:bg-amber-400/12 dark:text-amber-200" />
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="panel p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Weekly productivity trend</p>
              <h3 className="text-xl font-semibold text-slate-950 dark:text-white">Hours logged across the team</h3>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dashboard.productivityTrend}>
                <defs>
                  <linearGradient id="hoursFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
                <XAxis dataKey="label" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#0EA5E9" fill="url(#hoursFill)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel p-6">
          <div className="mb-5">
            <p className="text-sm text-slate-500 dark:text-slate-400">Domain-wise progress</p>
            <h3 className="text-xl font-semibold text-slate-950 dark:text-white">Learning completion by subgroup</h3>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dashboard.domainProgress}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
                <XAxis dataKey="domain" stroke="#94A3B8" tick={{ fontSize: 11 }} />
                <YAxis stroke="#94A3B8" />
                <Tooltip />
                <Bar dataKey="completion" radius={[12, 12, 0, 0]}>
                  {dashboard.domainProgress.map((entry) => (
                    <Cell
                      key={entry.domain}
                      fill={entry.completion > 60 ? "#0EA5E9" : entry.completion > 35 ? "#22C55E" : "#F59E0B"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <div className="panel p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Recent activity feed</p>
              <h3 className="text-xl font-semibold text-slate-950 dark:text-white">Latest technical submissions</h3>
            </div>
            <Layers3 className="h-5 w-5 text-slate-400" />
          </div>
          <div className="space-y-4">
            {dashboard.recentLogs.map((log) => (
              <div key={log.id} className="rounded-3xl border border-edge/70 bg-panel/70 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{log.memberName}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {log.domain} / {new Date(log.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-700 dark:bg-amber-400/10 dark:text-amber-200">
                    {log.status}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{log.learningSummary}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="panel p-6">
            <div className="mb-4">
              <p className="text-sm text-slate-500 dark:text-slate-400">Leaderboard</p>
              <h3 className="text-xl font-semibold text-slate-950 dark:text-white">Most active members</h3>
            </div>
            <div className="space-y-3">
              {dashboard.leaderboard.slice(0, 5).map((member, index) => (
                <div key={member.id} className="flex items-center gap-3 rounded-3xl border border-edge/70 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white dark:bg-amber-400 dark:text-slate-950">
                    #{index + 1}
                  </div>
                  <img src={member.avatarUrl} alt={member.name} className="h-11 w-11 rounded-2xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-slate-900 dark:text-white">{member.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {member.domain} / streak {member.streakCount} days
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900 dark:text-white">{member.productivityScore}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">score</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-6">
            <div className="mb-4">
              <p className="text-sm text-slate-500 dark:text-slate-400">Announcements</p>
              <h3 className="text-xl font-semibold text-slate-950 dark:text-white">Notification center</h3>
            </div>
            <div className="space-y-3">
              {dashboard.announcements.map((notification) => (
                <div key={notification.id} className="rounded-3xl border border-edge/70 p-4">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{notification.title}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{notification.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
