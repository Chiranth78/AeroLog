"use client";

export function ReportsClient() {
  const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";
  const formats = [
    { label: "Export individual report", target: `${apiBase}/reports/members/u-member-cad?format=xlsx` },
    { label: "Export full team report", target: `${apiBase}/reports/team?format=csv` },
    { label: "Export attendance report", target: `${apiBase}/reports/attendance?format=json` },
    { label: "Export daily work logs", target: `${apiBase}/reports/logs?format=csv` }
  ];

  return (
    <div className="space-y-6">
      <section className="panel p-6">
        <p className="text-sm text-slate-500 dark:text-slate-400">Structured exports</p>
        <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">Excel, CSV and JSON reporting</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
          Use these endpoints for member-level comparison, domain review, date-wise analysis, attendance audits, and archival backup.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {formats.map((item) => (
          <a
            key={item.label}
            href={item.target}
            className="metric-card block"
            target="_blank"
            rel="noreferrer"
          >
            <h3 className="text-xl font-semibold text-slate-950 dark:text-white">{item.label}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.target}</p>
          </a>
        ))}
      </section>

      <section className="panel p-6">
        <h3 className="text-xl font-semibold text-slate-950 dark:text-white">Backup and restore</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
          The API also exposes JSON backup routes so admins can snapshot seed data or restore a validated dataset into the system.
        </p>
      </section>
    </div>
  );
}
