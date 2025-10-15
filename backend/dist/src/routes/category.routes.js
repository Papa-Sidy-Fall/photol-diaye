import { Router } from "express";
import { CategoryController } from "../controllers/category.controller.js";
import { authenticateToken, authorizeRoles } from "../middleware/auth.middleware.js";
import { Role } from "@prisma/client";
const router = Router();
// Create Category (Admin only)
router.post("/", authenticateToken, authorizeRoles([Role.ADMIN]), CategoryController.createCategory);
// Get All Categories (public)
router.get("/", CategoryController.getCategories);
// Get Category by ID (public)
router.get("/:id", CategoryController.getCategoryById);
// Delete Category (Admin only)
router.delete("/:id", authenticateToken, authorizeRoles([Role.ADMIN]), CategoryController.deleteCategory);
export default router;
//# sourceMappingURL=category.routes.js.map