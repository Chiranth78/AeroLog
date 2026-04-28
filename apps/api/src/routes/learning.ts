import { Router } from "express";
import { db, upsertLearningTopic } from "../store.js";

export const learningRouter = Router();

learningRouter.get("/", (request, response) => {
  const { userId, domain, status } = request.query;
  const filtered = db.learningTopics.filter((topic) => {
    const matchesUser = !userId || topic.userId === userId;
    const matchesDomain = !domain || topic.domain === domain;
    const matchesStatus = !status || topic.status === status;
    return matchesUser && matchesDomain && matchesStatus;
  });

  response.json(filtered);
});

learningRouter.patch("/:id", (request, response) => {
  const topic = upsertLearningTopic(request.params.id, request.body);
  if (!topic) {
    response.status(404).json({ message: "Learning topic not found" });
    return;
  }

  response.json(topic);
});
