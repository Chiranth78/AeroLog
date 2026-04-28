"use client";

import type { DailyLog } from "@aerodesign/shared";
import { Bold, Italic, List } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";

const blankForm = {
  topicsStudied: "",
  conceptsRevised: "",
  tasksCompleted: "",
  toolsPracticed: "",
  researchWork: "",
  problemsFaced: "",
  hoursWorked: "3",
  learningSummary: "",
  status: "Completed"
};

function RichTextInput({
  value,
  onChange,
  placeholder
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value;
    }
  }, [value]);

  const applyFormat = (command: "bold" | "italic" | "insertUnorderedList") => {
    document.execCommand(command);
    onChange(ref.current?.innerHTML ?? "");
  };

  return (
    <div className="rounded-2xl border border-edge/70 bg-panel/70">
      <div className="flex items-center gap-2 border-b border-edge/60 p-3">
        <button type="button" onClick={() => applyFormat("bold")} className="rounded-xl border border-edge/60 p-2">
          <Bold className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => applyFormat("italic")} className="rounded-xl border border-edge/60 p-2">
          <Italic className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => applyFormat("insertUnorderedList")} className="rounded-xl border border-edge/60 p-2">
          <List className="h-4 w-4" />
        </button>
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        data-placeholder={placeholder}
        onInput={(event) => onChange(event.currentTarget.innerHTML)}
        className="min-h-[120px] px-4 py-3 text-sm outline-none empty:before:text-slate-400 empty:before:content-[attr(data-placeholder)]"
      />
    </div>
  );
}

export function LogsClient({ logs }: { logs: DailyLog[] }) {
  const [form, setForm] = useState(blankForm);
  const [message, setMessage] = useState("Draft a complete technical update with learning notes, blockers, and deliverables.");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setMessage("Demo submission captured. Connect the Express API to persist this entry and route it for mentor approval.");
    setForm(blankForm);
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <form onSubmit={handleSubmit} className="panel space-y-5 p-6">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Daily work submission</p>
          <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">Log today’s technical progress</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <RichTextInput
            value={form.topicsStudied}
            onChange={(value) => setForm((current) => ({ ...current, topicsStudied: value }))}
            placeholder="Topics studied"
          />
          <RichTextInput
            value={form.conceptsRevised}
            onChange={(value) => setForm((current) => ({ ...current, conceptsRevised: value }))}
            placeholder="Concepts revised"
          />
          <RichTextInput
            value={form.tasksCompleted}
            onChange={(value) => setForm((current) => ({ ...current, tasksCompleted: value }))}
            placeholder="Tasks completed"
          />
          <RichTextInput
            value={form.toolsPracticed}
            onChange={(value) => setForm((current) => ({ ...current, toolsPracticed: value }))}
            placeholder="Software and tools practiced"
          />
          <RichTextInput
            value={form.researchWork}
            onChange={(value) => setForm((current) => ({ ...current, researchWork: value }))}
            placeholder="Research work done"
          />
          <RichTextInput
            value={form.problemsFaced}
            onChange={(value) => setForm((current) => ({ ...current, problemsFaced: value }))}
            placeholder="Problems faced"
          />
        </div>
        <RichTextInput
          value={form.learningSummary}
          onChange={(value) => setForm((current) => ({ ...current, learningSummary: value }))}
          placeholder="Learning summary"
        />
        <div className="grid gap-4 md:grid-cols-3">
          <input
            type="number"
            min="0"
            step="0.5"
            value={form.hoursWorked}
            onChange={(event) => setForm((current) => ({ ...current, hoursWorked: event.target.value }))}
            className="h-12 rounded-2xl border border-edge/70 bg-panel/70 px-4"
            placeholder="Hours worked"
          />
          <select
            value={form.status}
            onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}
            className="h-12 rounded-2xl border border-edge/70 bg-panel/70 px-4"
          >
            <option>Completed</option>
            <option>In Progress</option>
            <option>Pending</option>
          </select>
          <label className="flex h-12 cursor-pointer items-center rounded-2xl border border-dashed border-edge/70 px-4 text-sm text-slate-500 dark:text-slate-400">
            Upload file/image/PDF
            <input type="file" className="hidden" multiple />
          </label>
        </div>
        <input
          type="url"
          className="h-12 w-full rounded-2xl border border-edge/70 bg-panel/70 px-4"
          placeholder="Attach reference link"
        />
        <div className="rounded-3xl bg-sky-500/10 p-4 text-sm leading-7 text-slate-700 dark:bg-amber-400/10 dark:text-slate-200">
          {message}
        </div>
        <button type="submit" className="rounded-full bg-slate-950 px-6 py-3 font-medium text-white dark:bg-amber-400 dark:text-slate-950">
          Submit daily update
        </button>
      </form>

      <div className="panel p-6">
        <p className="text-sm text-slate-500 dark:text-slate-400">Submission history</p>
        <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">Recent logs</h2>
        <div className="mt-5 space-y-4">
          {logs.map((log) => (
            <div key={log.id} className="rounded-3xl border border-edge/70 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{new Date(log.date).toLocaleDateString()}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {log.hoursWorked} hours / {log.approvalStatus}
                  </p>
                </div>
                <span className="rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-700 dark:bg-amber-400/10 dark:text-amber-200">
                  {log.status}
                </span>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{log.learningSummary}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {log.topicsStudied.map((topic) => (
                  <span key={topic} className="rounded-full border border-edge/70 px-3 py-1 text-xs text-slate-500 dark:text-slate-400">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
