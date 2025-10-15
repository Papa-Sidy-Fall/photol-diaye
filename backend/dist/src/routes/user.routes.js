import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { authenticateToken, authorizeRoles } from "../middleware/auth.middleware.js";
import { Role } from "@prisma/client";
const router = Router();
// Get all users (Admin only)
router.get("/", authenticateToken, authorizeRoles([Role.ADMIN]), UserController.getAllUsers);
// Get user by ID (Admin only)
router.get("/:id", authenticateToken, authorizeRoles([Role.ADMIN]), UserController.getUserById);
// Update user role (Admin only)
router.put("/:id/role", authenticateToken, authorizeRoles([Role.ADMIN]), UserController.updateUserRole);
// Delete user (Admin only)
router.delete("/:id", authenticateToken, authorizeRoles([Role.ADMIN]), UserController.deleteUser);
export default router;
//# sourceMappingURL=user.routes.js.map