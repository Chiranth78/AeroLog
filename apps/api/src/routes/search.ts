import { Router } from "express";
import { db } from "../store.js";

export const searchRouter = Router();

searchRouter.get("/", (request, response) => {
  const query = String(request.query.query ?? "").toLowerCase();
  const domain = String(request.query.domain ?? "");
  const date = String(request.query.date ?? "");

  const members = db.users.filter((user) => {
    const matchesQuery = !query || user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query);
    const matchesDomain = !domain || user.domain === domain;
    return matchesQuery && matchesDomain;
  });

  const logs = db.logs.filter((log) => {
    const matchesQuery =
      !query ||
      log.topicsStudied.some((item) => item.toLowerCase().includes(query)) ||
      log.learningSummary.toLowerCase().includes(query);
    const matchesDate = !date || log.date === date;
    return matchesQuery && matchesDate;
  });

  response.json({ members, logs });
});
