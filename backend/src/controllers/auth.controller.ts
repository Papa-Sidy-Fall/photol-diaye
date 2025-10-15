import { Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";
import { Role } from "@prisma/client";

export class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      res.status(400).json({ message: "Email, password, and role are required" });
      return;
    }

    if (!Object.values(Role).includes(role as Role)) {
      res.status(400).json({ message: "Invalid role specified" });
      return;
    }

    try {
      const userRole: Role = role as Role; // Allow ADMIN role
      const { token, user } = await AuthService.register(email, password, userRole);
      res.status(201).json({ token, user });
    } catch (error: any) {
      if (error.message === "User with this email already exists") {
        res.status(409).json({ message: error.message });
      } else {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Something went wrong" });
      }
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    try {
      const { token, user } = await AuthService.login(email, password);
      res.status(200).json({ token, user });
    } catch (error: any) {
      if (error.message === "Invalid credentials") {
        res.status(400).json({ message: error.message });
      } else {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Something went wrong" });
      }
    }
  }
}
