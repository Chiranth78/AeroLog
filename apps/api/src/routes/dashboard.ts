import { Router } from "express";
import { buildDashboardOverview, generateWeeklySummary } from "@aerodesign/shared";
import { db } from "../store.js";

export const dashboardRouter = Router();

dashboardRouter.get("/", (_request, response) => {
  response.json(buildDashboardOverview(db));
});

dashboardRouter.get("/summary", (_request, response) => {
  response.json({
    summary: generateWeeklySummary(db)
  });
});
