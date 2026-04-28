import Link from "next/link";
import type { ReactNode } from "react";

export function AuthCard({
  title,
  description,
  footer,
  children
}: {
  title: string;
  description: string;
  footer: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="grid min-h-screen place-items-center px-6 py-12">
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="panel relative w-full max-w-md p-8">
        <Link href="/" className="inline-flex rounded-full border border-edge/70 px-4 py-2 text-xs uppercase tracking-[0.25em] text-sky-700 dark:text-amber-300">
          Back to landing
        </Link>
        <div className="mt-6">
          <h1 className="text-3xl font-semibold text-slate-950 dark:text-white">{title}</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{description}</p>
        </div>
        <div className="mt-6 space-y-4">{children}</div>
        <div className="mt-6 text-sm text-slate-500 dark:text-slate-400">{footer}</div>
      </div>
    </div>
  );
}
