import { UserRepository } from "../repositories/user.repository.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "supersecretjwtkey"; // Should be in .env
export class AuthService {
    static async register(email, password, role) {
        const existingUser = await UserRepository.findByEmail(email);
        if (existingUser) {
            throw new Error("User with this email already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserRepository.create(email, hashedPassword, role);
        const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
            expiresIn: "1h",
        });
        return { token, user: { id: user.id, email: user.email, role: user.role } };
    }
    static async login(email, password) {
        const user = await UserRepository.findByEmail(email);
        if (!user) {
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }
        const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
            expiresIn: "1h",
        });
        return { token, user: { id: user.id, email: user.email, role: user.role } };
    }
}
//# sourceMappingURL=auth.service.js.map