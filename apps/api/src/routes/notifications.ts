import { Router } from "express";
import { createNotification, db, makeId } from "../store.js";

export const notificationsRouter = Router();

notificationsRouter.get("/", (_request, response) => {
  response.json(db.notifications);
});

notificationsRouter.post("/", (request, response) => {
  const notification = createNotification({
    id: makeId("notification"),
    title: request.body.title,
    body: request.body.body,
    type: request.body.type ?? "announcement",
    createdAt: new Date().toISOString(),
    audience: request.body.audience ?? "all"
  });

  response.status(201).json(notification);
});
