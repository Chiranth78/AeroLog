"use client";

import type { ActivityDay, ChartPoint, DailyLog, LearningTopic, MemberSummary, User } from "@aerodesign/shared";
import { CalendarDays, Flame, GraduationCap, Sparkles } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function ActivityCalendar({ days }: { days: ActivityDay[] }) {
  return (
    <div className="grid grid-cols-6 gap-2 sm:grid-cols-10">
      {days.map((day) => (
        <div key={day.date} className="space-y-1">
          <div
            className="h-8 rounded-xl border border-edge/60"
            style={{
              background:
                day.intensity === 0
                  ? "rgba(148,163,184,0.10)"
                  : `rgba(14,165,233,${0.18 + day.intensity * 0.16})`
            }}
            title={`${day.date} / ${day.attended ?? "No attendance"} / ${day.submitted ? "Submitted" : "No log"}`}
          />
          <p className="text-[10px] text-slate-400">{day.date.slice(8)}</p>
        </div>
      ))}
    </div>
  );
}

export function MemberProfileClient({
  user,
  summary,
  weeklyProductivity,
  activityCalendar,
  logs,
  learningTopics,
  weeklySummary
}: {
  user: User;
  summary: MemberSummary;
  weeklyProductivity: ChartPoint[];
  activityCalendar: ActivityDay[];
  logs: DailyLog[];
  learningTopics: LearningTopic[];
  weeklySummary: string;
}) {
  return (
    <div className="space-y-6">
      <section className="panel p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center">
          <img src={user.avatarUrl} alt={user.name} className="h-28 w-28 rounded-[32px] object-cover" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-3xl font-semibold text-slate-950 dark:text-white">{user.name}</h2>
                <p className="mt-2 text-slate-500 dark:text-slate-400">
                  {user.teamRole} / {user.domain} / {user.year}
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">{user.bio}</p>
              </div>
              <div className="rounded-3xl bg-slate-950 px-4 py-3 text-white dark:bg-amber-400 dark:text-slate-950">
                <p className="text-xs uppercase tracking-[0.25em]">Productivity score</p>
                <p className="mt-2 text-3xl font-semibold">{summary.productivityScore}</p>
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
              <div className="rounded-3xl border border-edge/70 p-4">
                <p className="text-sm text-slate-500 dark:text-slate-400">Attendance</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{summary.attendancePercentage}%</p>
              </div>
              <div className="rounded-3xl border border-edge/70 p-4">
                <p className="text-sm text-slate-500 dark:text-slate-400">Daily entries</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{summary.totalDailyEntries}</p>
              </div>
              <div className="rounded-3xl border border-edge/70 p-4">
                <p className="text-sm text-slate-500 dark:text-slate-400">Topics completed</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{summary.topicsCompleted}</p>
              </div>
              <div className="rounded-3xl border border-edge/70 p-4">
                <p className="text-sm text-slate-500 dark:text-slate-400">Streak count</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{summary.streakCount} days</p>
              </div>
              <div className="rounded-3xl border border-edge/70 p-4">
                <p className="text-sm text-slate-500 dark:text-slate-400">Fundamentals</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{summary.fundamentalsScore}%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <div className="panel p-6">
          <div className="mb-5 flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-sky-600 dark:text-amber-200" />
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Weekly productivity graph</p>
              <h3 className="text-xl font-semibold text-slate-950 dark:text-white">Focused hours across the past 7 days</h3>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyProductivity}>
                <defs>
                  <linearGradient id="memberHours" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
                <XAxis dataKey="label" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#0EA5E9" strokeWidth={3} fill="url(#memberHours)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel p-6">
          <div className="mb-5 flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-sky-600 dark:text-amber-200" />
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">AI-style weekly summary</p>
              <h3 className="text-xl font-semibold text-slate-950 dark:text-white">Momentum snapshot</h3>
            </div>
          </div>
          <p className="rounded-3xl bg-sky-500/10 p-5 text-sm leading-8 text-slate-700 dark:bg-amber-400/10 dark:text-slate-200">
            {weeklySummary}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {summary.skillsLearned.map((skill) => (
              <span key={skill} className="rounded-full border border-edge/70 px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-300">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="panel p-6">
        <div className="mb-5 flex items-center gap-3">
          <Flame className="h-5 w-5 text-sky-600 dark:text-amber-200" />
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Activity calendar</p>
            <h3 className="text-xl font-semibold text-slate-950 dark:text-white">Attendance and submission consistency</h3>
          </div>
        </div>
        <ActivityCalendar days={activityCalendar} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="panel p-6">
          <h3 className="text-xl font-semibold text-slate-950 dark:text-white">Recent submission history</h3>
          <div className="mt-5 space-y-4">
            {logs.map((log) => (
              <div key={log.id} className="rounded-3xl border border-edge/70 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-semibold text-slate-900 dark:text-white">{new Date(log.date).toLocaleDateString()}</p>
                  <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white dark:bg-amber-400 dark:text-slate-950">
                    {log.status}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{log.learningSummary}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="panel p-6">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-5 w-5 text-sky-600 dark:text-amber-200" />
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Learning roadmap</p>
              <h3 className="text-xl font-semibold text-slate-950 dark:text-white">Assigned study topics</h3>
            </div>
          </div>
          <div className="mt-5 space-y-4">
            {learningTopics.map((topic) => (
              <div key={topic.id} className="rounded-3xl border border-edge/70 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-semibold text-slate-900 dark:text-white">{topic.title}</p>
                  <span className="rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-700 dark:bg-amber-400/10 dark:text-amber-200">
                    {topic.status}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{topic.category} / {topic.roadmapStage}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{topic.mentorFeedback}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
