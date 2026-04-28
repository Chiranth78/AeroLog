import jwt from "jsonwebtoken";
import type { Role } from "@aerodesign/shared";

const JWT_SECRET = process.env.JWT_SECRET ?? "replace-me";

export interface SessionPayload {
  userId: string;
  role: Role;
  email: string;
}

export const signSession = (payload: SessionPayload) =>
  jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d"
  });

export const verifySession = (token: string) => jwt.verify(token, JWT_SECRET) as SessionPayload;
