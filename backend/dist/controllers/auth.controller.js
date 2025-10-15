import { AuthService } from "../services/auth.service.js";
import { Role } from "@prisma/client";
export class AuthController {
    static async register(req, res) {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            res.status(400).json({ message: "Email, password, and role are required" });
            return;
        }
        if (!Object.values(Role).includes(role)) {
            res.status(400).json({ message: "Invalid role specified" });
            return;
        }
        try {
            const userRole = role === "SELLER" ? Role.SELLER : Role.CLIENT;
            const { token, user } = await AuthService.register(email, password, userRole);
            res.status(201).json({ token, user });
        }
        catch (error) {
            if (error.message === "User with this email already exists") {
                res.status(409).json({ message: error.message });
            }
            else {
                console.error("Error during registration:", error);
                res.status(500).json({ message: "Something went wrong" });
            }
        }
    }
    static async login(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required" });
            return;
        }
        try {
            const { token, user } = await AuthService.login(email, password);
            res.status(200).json({ token, user });
        }
        catch (error) {
            if (error.message === "Invalid credentials") {
                res.status(400).json({ message: error.message });
            }
            else {
                console.error("Error during login:", error);
                res.status(500).json({ message: "Something went wrong" });
            }
        }
    }
}
//# sourceMappingURL=auth.controller.js.map