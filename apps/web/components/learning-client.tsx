"use client";

import type { LearningTopic } from "@aerodesign/shared";

export function LearningClient({ topics }: { topics: LearningTopic[] }) {
  return (
    <div className="space-y-6">
      <section className="panel p-6">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Fundamentals tracker</p>
            <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">Assigned study topics and roadmap progress</h2>
          </div>
          <div className="rounded-3xl bg-slate-950 px-4 py-3 text-white dark:bg-amber-400 dark:text-slate-950">
            Optional quiz/test module can plug into this roadmap structure.
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {topics.map((topic) => (
          <div key={topic.id} className="metric-card">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold text-slate-950 dark:text-white">{topic.title}</h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  {topic.domain} / {topic.category} / {topic.roadmapStage}
                </p>
              </div>
              <span className="rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-700 dark:bg-amber-400/10 dark:text-amber-200">
                {topic.status}
              </span>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{topic.mentorFeedback}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {topic.skillTags.map((skill) => (
                <span key={skill} className="rounded-full border border-edge/70 px-3 py-1 text-xs text-slate-500 dark:text-slate-400">
                  {skill}
                </span>
              ))}
            </div>
            <div className="mt-5 h-2 rounded-full bg-slate-200 dark:bg-slate-800">
              <div
                className="h-2 rounded-full bg-sky-500 dark:bg-amber-300"
                style={{ width: topic.status === "completed" ? "100%" : topic.status === "in-progress" ? "58%" : "18%" }}
              />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
