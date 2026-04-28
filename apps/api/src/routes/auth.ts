import bcrypt from "bcryptjs";
import { Router } from "express";
import { summarizeMember } from "@aerodesign/shared";
import { createUser, db, findUser, makeId } from "../store.js";
import { signSession, verifySession } from "../utils/auth.js";

export const authRouter = Router();

authRouter.post("/signup", async (request, response) => {
  const { name, email, password, role = "member", domain = "CAD", year = "Second Year", batch = "2028", teamRole = "Member" } =
    request.body;

  if (!name || !email || !password) {
    response.status(400).json({ message: "Name, email and password are required" });
    return;
  }

  if (db.users.some((user) => user.email.toLowerCase() === String(email).toLowerCase())) {
    response.status(409).json({ message: "User already exists" });
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = createUser({
    id: makeId("user"),
    name,
    email,
    password: passwordHash,
    role,
    domain,
    year,
    batch,
    teamRole,
    avatarUrl: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=300&q=80",
    bio: "Newly added team member profile.",
    joinedAt: new Date().toISOString(),
    phone: "",
    status: "active"
  });

  const token = signSession({
    userId: user.id,
    role: user.role,
    email: user.email
  });

  response.status(201).json({
    token,
    user: summarizeMember(user, db.logs, db.attendance, db.learningTopics)
  });
});

authRouter.post("/login", async (request, response) => {
  const { email, password } = request.body;
  const user = db.users.find((candidate) => candidate.email.toLowerCase() === String(email).toLowerCase());

  if (!user) {
    response.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const isSeedUser = user.password.startsWith("$2");
  const valid = isSeedUser ? await bcrypt.compare(password, user.password) : password === user.password;

  if (!valid) {
    response.status(401).json({ message: "Invalid credentials" });
    return;
  }

  if (!isSeedUser) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  const token = signSession({
    userId: user.id,
    role: user.role,
    email: user.email
  });

  response.json({
    token,
    user: summarizeMember(user, db.logs, db.attendance, db.learningTopics)
  });
});

authRouter.post("/forgot-password", (request, response) => {
  const { email } = request.body;
  const user = db.users.find((candidate) => candidate.email.toLowerCase() === String(email).toLowerCase());

  response.json({
    message: user ? "Reset token generated" : "If the email exists, a reset link would be sent.",
    resetToken: user ? signSession({ userId: user.id, role: user.role, email: user.email }) : null
  });
});

authRouter.post("/reset-password", async (request, response) => {
  const { token, password } = request.body;

  if (!token || !password) {
    response.status(400).json({ message: "Token and password are required" });
    return;
  }

  try {
    const payload = verifySession(token);
    const user = findUser(payload.userId);
    if (!user) {
      response.status(404).json({ message: "User not found" });
      return;
    }

    user.password = await bcrypt.hash(password, 10);
    response.json({ message: "Password reset successful" });
  } catch {
    response.status(400).json({ message: "Invalid reset token" });
  }
});

authRouter.get("/session/:token", (request, response) => {
  try {
    const payload = verifySession(request.params.token);
    const user = findUser(payload.userId);

    if (!user) {
      response.status(404).json({ message: "User not found" });
      return;
    }

    response.json({
      user: summarizeMember(user, db.logs, db.attendance, db.learningTopics)
    });
  } catch {
    response.status(401).json({ message: "Session invalid" });
  }
});
