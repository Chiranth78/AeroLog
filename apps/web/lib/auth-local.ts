import { summarizeMember, type User } from "@aerodesign/shared";
import { createUser, db, findUser, makeId } from "../../api/src/store";
import { signSession, verifySession } from "../../api/src/utils/auth";
import type { AuthUser } from "./auth-types";

interface SignupInput {
  name: string;
  email: string;
  password: string;
  role?: User["role"];
  domain?: User["domain"];
  year?: string;
  batch?: string;
  teamRole?: string;
}

function toAuthUser(user: User): AuthUser {
  return summarizeMember(user, db.logs, db.attendance, db.learningTopics) as AuthUser;
}

export function loginWithCredentials(email: string, password: string) {
  const user = db.users.find((candidate) => candidate.email.toLowerCase() === email.toLowerCase());

  if (!user || user.password !== password) {
    return null;
  }

  return {
    token: signSession({
      userId: user.id,
      role: user.role,
      email: user.email
    }),
    user: toAuthUser(user)
  };
}

export function signupUser({
  name,
  email,
  password,
  role = "member",
  domain = "CAD",
  year = "Second Year",
  batch = "2028",
  teamRole = "Member"
}: SignupInput) {
  if (db.users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
    return { error: "User already exists" as const };
  }

  const user = createUser({
    id: makeId("user"),
    name,
    email,
    password,
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

  return {
    token: signSession({
      userId: user.id,
      role: user.role,
      email: user.email
    }),
    user: toAuthUser(user)
  };
}

export function createPasswordReset(email: string) {
  const user = db.users.find((candidate) => candidate.email.toLowerCase() === email.toLowerCase());

  return {
    message: user ? "Reset token generated" : "If the email exists, a reset link would be sent.",
    resetToken: user
      ? signSession({
          userId: user.id,
          role: user.role,
          email: user.email
        })
      : null
  };
}

export function resetPasswordWithToken(token: string, password: string) {
  const payload = verifySession(token);
  const user = findUser(payload.userId);

  if (!user) {
    return { error: "User not found" as const };
  }

  user.password = password;
  return { success: true as const };
}

export function getUserFromSessionToken(token: string) {
  const payload = verifySession(token);
  const user = findUser(payload.userId);

  if (!user) {
    return null;
  }

  return toAuthUser(user);
}
