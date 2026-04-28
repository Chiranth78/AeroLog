"use client";

import { motion } from "framer-motion";
import {
  Bell,
  BookMarked,
  CalendarDays,
  FileBarChart2,
  LayoutDashboard,
  Menu,
  Users2,
  Wrench
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import clsx from "clsx";
import type { AuthUser } from "../lib/auth-types";
import { LogoutButton } from "./logout-button";
import { ThemeToggle } from "./theme-toggle";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/members", label: "Members", icon: Users2 },
  { href: "/logs", label: "Work Logs", icon: Wrench },
  { href: "/attendance", label: "Attendance", icon: CalendarDays },
  { href: "/learning", label: "Learning", icon: BookMarked },
  { href: "/reports", label: "Reports", icon: FileBarChart2 }
];

export function AppShell({ children, currentUser }: { children: ReactNode; currentUser: AuthUser }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen px-4 py-4 sm:px-6">
      <div className="mx-auto flex max-w-7xl gap-4">
        <aside
          className={clsx(
            "panel fixed inset-y-4 left-4 z-40 w-[290px] flex-col overflow-hidden p-5 lg:sticky lg:top-4 lg:flex lg:h-[calc(100vh-2rem)]",
            open ? "flex" : "hidden lg:flex"
          )}
        >
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-amber-400 dark:text-slate-950">
                <span className="text-sm font-black tracking-widest">AD</span>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-sky-700 dark:text-amber-300">Team OS</p>
                <p className="font-semibold text-slate-950 dark:text-white">Command Center</p>
              </div>
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-2xl border border-edge/70 px-3 py-2 text-sm lg:hidden"
            >
              Close
            </button>
          </div>

          <div className="mt-8 rounded-[28px] bg-slate-950 p-5 text-white dark:bg-slate-900">
            <p className="text-xs uppercase tracking-[0.25em] text-white/55">Mission status</p>
            <h2 className="mt-3 text-2xl font-semibold">Build discipline into every update.</h2>
            <p className="mt-3 text-sm leading-7 text-white/70">
              Give leads visibility, juniors structure, and the full team a shared engineering rhythm.
            </p>
          </div>

          <nav className="mt-8 space-y-2">
            {navItems.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                    active
                      ? "bg-sky-500/14 text-sky-700 dark:bg-amber-400/12 dark:text-amber-200"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/70"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto rounded-3xl border border-edge/70 bg-panel/80 p-4">
            <div className="flex items-center gap-3">
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.name}
                className="h-12 w-12 rounded-2xl object-cover"
              />
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">{currentUser.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {currentUser.role} / {currentUser.teamRole}
                </p>
              </div>
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-4 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-edge/80 bg-panel/80 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="panel flex flex-1 items-center justify-between px-4 py-3">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-sky-700 dark:text-amber-300">Engineering operations</p>
                <h1 className="text-lg font-semibold text-slate-950 dark:text-white">
                  Welcome back, {currentUser.name.split(" ")[0]}
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <LogoutButton />
                <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-edge/80 bg-panel/80">
                  <Bell className="h-5 w-5" />
                </button>
                <ThemeToggle />
              </div>
            </div>
          </div>

          <motion.main
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            {children}
          </motion.main>
        </div>
      </div>
    </div>
  );
}
