import { Router } from "express";
import { createLog, db, makeId } from "../store.js";

export const logsRouter = Router();

logsRouter.get("/", (request, response) => {
  const { userId, status, domain, topic } = request.query;

  const filtered = db.logs.filter((log) => {
    const user = db.users.find((candidate) => candidate.id === log.userId);
    const matchesUser = !userId || log.userId === userId;
    const matchesStatus = !status || log.status === status;
    const matchesDomain = !domain || user?.domain === domain;
    const matchesTopic = !topic || log.topicsStudied.some((item) => item.toLowerCase().includes(String(topic).toLowerCase()));

    return matchesUser && matchesStatus && matchesDomain && matchesTopic;
  });

  response.json(filtered);
});

logsRouter.post("/", (request, response) => {
  const payload = request.body;
  const log = createLog({
    id: makeId("log"),
    userId: payload.userId,
    date: payload.date ?? new Date().toISOString().slice(0, 10),
    topicsStudied: payload.topicsStudied ?? [],
    conceptsRevised: payload.conceptsRevised ?? [],
    tasksCompleted: payload.tasksCompleted ?? [],
    toolsPracticed: payload.toolsPracticed ?? [],
    researchWork: payload.researchWork ?? [],
    problemsFaced: payload.problemsFaced ?? [],
    hoursWorked: Number(payload.hoursWorked ?? 0),
    learningSummary: payload.learningSummary ?? "",
    status: payload.status ?? "Pending",
    attachments: payload.attachments ?? [],
    links: payload.links ?? [],
    approvalStatus: payload.approvalStatus ?? "pending-review",
    mentorComment: payload.mentorComment
  });

  response.status(201).json(log);
});

logsRouter.patch("/:id", (request, response) => {
  const log = db.logs.find((entry) => entry.id === request.params.id);
  if (!log) {
    response.status(404).json({ message: "Log not found" });
    return;
  }

  Object.assign(log, request.body);
  response.json(log);
});
