import { type Response, Router } from "express";
import { db } from "../store.js";
import { toCsv, toWorkbookBuffer } from "../utils/exports.js";
import { mapAttendanceReport, mapLogsReport, mapMemberReport, mapTeamReport } from "../utils/report-mappers.js";

export const reportsRouter = Router();

function sendReport(
  response: Response,
  format: string,
  filename: string,
  rows: Record<string, unknown>[],
  extraSheets?: Array<{ name: string; rows: Record<string, unknown>[] }>
) {
  if (format === "json") {
    response.json(rows);
    return;
  }

  if (format === "csv") {
    response.setHeader("Content-Type", "text/csv");
    response.setHeader("Content-Disposition", `attachment; filename="${filename}.csv"`);
    response.send(toCsv(rows));
    return;
  }

  const workbook = toWorkbookBuffer([{ name: "report", rows }, ...(extraSheets ?? [])]);
  response.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  response.setHeader("Content-Disposition", `attachment; filename="${filename}.xlsx"`);
  response.send(workbook);
}

reportsRouter.get("/team", (request, response) => {
  const rows = mapTeamReport(db);
  sendReport(response, String(request.query.format ?? "xlsx"), "team-report", rows);
});

reportsRouter.get("/attendance", (request, response) => {
  const rows = mapAttendanceReport(db);
  sendReport(response, String(request.query.format ?? "xlsx"), "attendance-report", rows);
});

reportsRouter.get("/logs", (request, response) => {
  const rows = mapLogsReport(db);
  sendReport(response, String(request.query.format ?? "xlsx"), "daily-logs-report", rows);
});

reportsRouter.get("/members/:id", (request, response) => {
  const report = mapMemberReport(db, request.params.id);
  if (!report) {
    response.status(404).json({ message: "Member report not found" });
    return;
  }

  const { profile, logs, attendance, learning, benchmark } = report;
  sendReport(response, String(request.query.format ?? "xlsx"), `member-${request.params.id}-report`, profile, [
    { name: "logs", rows: logs },
    { name: "attendance", rows: attendance },
    { name: "learning", rows: learning },
    { name: "benchmark", rows: benchmark }
  ]);
});

reportsRouter.get("/backup", (_request, response) => {
  response.json(db);
});

reportsRouter.post("/restore", (request, response) => {
  const incoming = request.body;
  db.users.splice(0, db.users.length, ...(incoming.users ?? []));
  db.logs.splice(0, db.logs.length, ...(incoming.logs ?? []));
  db.attendance.splice(0, db.attendance.length, ...(incoming.attendance ?? []));
  db.learningTopics.splice(0, db.learningTopics.length, ...(incoming.learningTopics ?? []));
  db.notifications.splice(0, db.notifications.length, ...(incoming.notifications ?? []));
  response.json({ message: "Backup restored" });
});
