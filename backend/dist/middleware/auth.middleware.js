import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const JWT_SECRET = process.env.JWT_SECRET || "supersecretjwtkey";
const prisma = new PrismaClient();
export const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        return res.sendStatus(401); // No token
    }
    jwt.verify(token, JWT_SECRET, async (err, user) => {
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
export const authorizeRoles = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden: Insufficient role" });
        }
        next();
    };
};
//# sourceMappingURL=auth.middleware.js.map