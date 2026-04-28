"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BellRing,
  BookOpenCheck,
  CalendarCheck2,
  ClipboardList,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: ClipboardList,
    title: "Daily engineering logs",
    body: "Capture topics studied, tools practiced, blockers, attachments and progress states in one fast update flow."
  },
  {
    icon: CalendarCheck2,
    title: "Attendance with context",
    body: "Track present, absent, leave and late status with heatmaps, manual override and monthly reporting."
  },
  {
    icon: BookOpenCheck,
    title: "Fundamentals reinforcement",
    body: "Assign revision tracks, close skill gaps, and make mentor feedback visible to every junior member."
  },
  {
    icon: BarChart3,
    title: "Actionable dashboards",
    body: "See domain-wise progress, consistency streaks, pending updates, and contribution trends at a glance."
  },
  {
    icon: BellRing,
    title: "Reminders and accountability",
    body: "Nudge members on missed logs, pending learning topics, and weekly review checkpoints."
  },
  {
    icon: ShieldCheck,
    title: "Role-based control",
    body: "Separate admin, lead, and member permissions so approvals, exports and member management stay organized."
  }
];

const statPreview = [
  { label: "Daily logs captured", value: "240+" },
  { label: "Attendance accuracy", value: "95%" },
  { label: "Revision topics closed", value: "84" },
  { label: "Weekly analytics panels", value: "12" }
];

export function LandingPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <section className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 pb-14 pt-8 lg:px-10">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/15 text-sky-600 dark:bg-amber-400/15 dark:text-amber-300">
              <span className="text-lg font-black">AD</span>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-sky-700 dark:text-amber-300">AeroDesign Team OS</p>
              <h1 className="font-semibold text-slate-900 dark:text-white">Command Center</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="rounded-full border border-edge/80 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-sky-400 hover:text-sky-600 dark:text-slate-100 dark:hover:border-amber-400 dark:hover:text-amber-200">
              Login
            </Link>
            <Link href="/signup" className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-sky-600 dark:bg-amber-400 dark:text-slate-950 dark:hover:bg-amber-300">
              Create account
            </Link>
          </div>
        </header>

        <div className="grid flex-1 items-center gap-14 py-16 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="inline-flex rounded-full border border-sky-300/70 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-sky-700 shadow-sm dark:border-amber-300/20 dark:bg-slate-900/70 dark:text-amber-200">
              Built for technical student teams
            </div>
            <div className="space-y-5">
              <h2 className="max-w-3xl font-sans text-5xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-6xl">
                Run your AeroDesign team like an engineering startup, not a scattered chat group.
              </h2>
              <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                Attendance, daily technical updates, revision discipline, mentor feedback, exports, and team-wide analytics in one professional workspace.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-6 py-3 font-medium text-white transition hover:bg-sky-500 dark:bg-amber-400 dark:text-slate-950 dark:hover:bg-amber-300">
                Explore dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="#features" className="inline-flex items-center rounded-full border border-edge/80 px-6 py-3 font-medium text-slate-700 transition hover:border-sky-400 hover:text-sky-700 dark:text-slate-200 dark:hover:border-amber-400 dark:hover:text-amber-200">
                See platform features
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-4">
              {statPreview.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 * index }}
                  className="panel p-4"
                >
                  <div className="text-2xl font-semibold text-slate-950 dark:text-white">{stat.value}</div>
                  <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="panel grid-pattern overflow-hidden p-6"
          >
            <div className="rounded-[28px] border border-edge/70 bg-slate-950 p-5 text-white shadow-2xl dark:bg-slate-900">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-sky-300">Live Preview</p>
                  <h3 className="mt-2 text-xl font-semibold">Mission dashboard</h3>
                </div>
                <div className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">Lead view</div>
              </div>
              <div className="grid gap-4 py-5 sm:grid-cols-2">
                <div className="rounded-3xl bg-white/5 p-4">
                  <p className="text-sm text-white/60">Average productivity</p>
                  <h4 className="mt-2 text-3xl font-semibold">78%</h4>
                  <div className="mt-3 h-2 rounded-full bg-white/10">
                    <div className="h-2 w-[78%] rounded-full bg-sky-400" />
                  </div>
                </div>
                <div className="rounded-3xl bg-white/5 p-4">
                  <p className="text-sm text-white/60">Pending approvals</p>
                  <h4 className="mt-2 text-3xl font-semibold">06</h4>
                  <p className="mt-3 text-sm text-emerald-300">Review before Saturday stand-up</p>
                </div>
                <div className="rounded-3xl bg-white/5 p-4 sm:col-span-2">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm text-white/70">Today’s focus map</p>
                    <p className="text-xs uppercase tracking-[0.24em] text-amber-300">Realtime</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-4">
                    {["Aerodynamics", "Structures", "CAD", "Propulsion"].map((item, index) => (
                      <div key={item} className="rounded-2xl bg-white/6 p-3">
                        <div className="text-sm text-white/60">{item}</div>
                        <div className="mt-2 text-lg font-semibold">{68 + index * 6}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-sky-700 dark:text-amber-300">Feature stack</p>
            <h3 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">Built for disciplined technical execution</h3>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-500 dark:text-slate-400">
            Every module is tuned for student engineering teams that need stronger tracking, clearer mentoring, and better visibility into real work.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.05 }}
              className="panel p-6"
            >
              <feature.icon className="h-10 w-10 rounded-2xl bg-sky-500/12 p-2.5 text-sky-600 dark:bg-amber-400/10 dark:text-amber-200" />
              <h4 className="mt-5 text-xl font-semibold text-slate-950 dark:text-white">{feature.title}</h4>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{feature.body}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
