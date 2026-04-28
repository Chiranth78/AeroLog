import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import { attendanceRouter } from "./routes/attendance.js";
import { authRouter } from "./routes/auth.js";
import { dashboardRouter } from "./routes/dashboard.js";
import { learningRouter } from "./routes/learning.js";
import { logsRouter } from "./routes/logs.js";
import { membersRouter } from "./routes/members.js";
import { notificationsRouter } from "./routes/notifications.js";
import { reportsRouter } from "./routes/reports.js";
import { searchRouter } from "./routes/search.js";

dotenv.config();

const upload = multer({ dest: "uploads/" });

export const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL ?? "http://localhost:3000"
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.get("/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.post("/api/uploads", upload.array("files"), (request, response) => {
  const files = (request.files as Express.Multer.File[] | undefined)?.map((file) => ({
    name: file.originalname,
    url: `/uploads/${file.filename}`,
    mimetype: file.mimetype
  }));

  response.status(201).json({ files: files ?? [] });
});

app.use("/api/auth", authRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/members", membersRouter);
app.use("/api/logs", logsRouter);
app.use("/api/attendance", attendanceRouter);
app.use("/api/learning", learningRouter);
app.use("/api/notifications", notificationsRouter);
app.use("/api/reports", reportsRouter);
app.use("/api/search", searchRouter);
