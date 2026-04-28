import bcrypt from "bcryptjs";
import { Router } from "express";
import { summarizeMember } from "@aerodesign/shared";
import { createUser, db, getMemberProfile, makeId } from "../store.js";

export const membersRouter = Router();

membersRouter.get("/", (_request, response) => {
  response.json(db.users.map((user) => summarizeMember(user, db.logs, db.attendance, db.learningTopics)));
});

membersRouter.get("/:id", (request, response) => {
  const profile = getMemberProfile(request.params.id);
  if (!profile) {
    response.status(404).json({ message: "Member not found" });
    return;
  }

  response.json(profile);
});

membersRouter.post("/", (request, response) => {
  const newUser = createUser({
    id: makeId("user"),
    name: request.body.name,
    email: request.body.email,
    password: bcrypt.hashSync(request.body.password ?? "member123", 10),
    role: request.body.role ?? "member",
    domain: request.body.domain ?? "CAD",
    year: request.body.year ?? "Second Year",
    batch: request.body.batch ?? "2028",
    teamRole: request.body.teamRole ?? "Member",
    avatarUrl: request.body.avatarUrl ?? "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=300&q=80",
    bio: request.body.bio ?? "",
    joinedAt: new Date().toISOString(),
    phone: request.body.phone ?? "",
    status: request.body.status ?? "active"
  });

  response.status(201).json(newUser);
});

membersRouter.patch("/:id", (request, response) => {
  const user = db.users.find((candidate) => candidate.id === request.params.id);
  if (!user) {
    response.status(404).json({ message: "Member not found" });
    return;
  }

  Object.assign(user, request.body);
  response.json(user);
});

membersRouter.delete("/:id", (request, response) => {
  const index = db.users.findIndex((candidate) => candidate.id === request.params.id);
  if (index === -1) {
    response.status(404).json({ message: "Member not found" });
    return;
  }

  const [removed] = db.users.splice(index, 1);
  response.json({ removed });
});
