import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient, User } from "@prisma/client";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretjwtkey";
const prisma = new PrismaClient();

interface AuthenticatedRequest extends Request {
  user?: User;
}

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401); // No token
  }

  jwt.verify(token, JWT_SECRET, async (err: any, user: any) => {
    if (err) {
      return res.sendStatus(403); // Invalid token
    }

    const foundUser = await prisma.user.findUnique({ where: { id: user.userId } });
    if (!foundUser) {
      return res.sendStatus(403); // User not found
    }

    req.user = foundUser;
    next();
  });
};

export const authorizeRoles = (roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: Insufficient role" });
    }
    next();
  };
};
