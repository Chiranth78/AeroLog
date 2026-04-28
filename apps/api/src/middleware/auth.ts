import type { NextFunction, Request, Response } from "express";
import type { Role } from "@aerodesign/shared";
import { verifySession } from "../utils/auth.js";

export interface AuthedRequest extends Request {
  session?: {
    userId: string;
    role: Role;
    email: string;
  };
}

export const requireAuth = (request: AuthedRequest, response: Response, next: NextFunction) => {
  const header = request.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    response.status(401).json({ message: "Missing session token" });
    return;
  }

  try {
    request.session = verifySession(token);
    next();
  } catch {
    response.status(401).json({ message: "Invalid or expired session token" });
  }
};

export const allowRoles =
  (...roles: Role[]) =>
  (request: AuthedRequest, response: Response, next: NextFunction) => {
    if (!request.session || !roles.includes(request.session.role)) {
      response.status(403).json({ message: "Insufficient permissions" });
      return;
    }

    next();
  };
