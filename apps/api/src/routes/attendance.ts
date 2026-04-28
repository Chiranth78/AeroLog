import { Router } from "express";
import { createAttendance, db, makeId } from "../store.js";

export const attendanceRouter = Router();

attendanceRouter.get("/", (request, response) => {
  const { userId, status, date } = request.query;
  const filtered = db.attendance.filter((entry) => {
    const matchesUser = !userId || entry.userId === userId;
    const matchesStatus = !status || entry.status === status;
    const matchesDate = !date || entry.date === date;

    return matchesUser && matchesStatus && matchesDate;
  });

  response.json(filtered);
});

attendanceRouter.post("/", (request, response) => {
  const payload = request.body;
  const attendance = createAttendance({
    id: payload.id ?? makeId("attendance"),
    userId: payload.userId,
    date: payload.date ?? new Date().toISOString().slice(0, 10),
    status: payload.status ?? "Present",
    reason: payload.reason,
    markedAt: new Date().toISOString(),
    overrideBy: payload.overrideBy
  });

  response.status(201).json(attendance);
});

attendanceRouter.patch("/:id", (request, response) => {
  const entry = db.attendance.find((candidate) => candidate.id === request.params.id);
  if (!entry) {
    response.status(404).json({ message: "Attendance entry not found" });
    return;
  }

  Object.assign(entry, request.body);
  response.json(entry);
});
