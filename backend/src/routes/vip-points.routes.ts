import { Router } from "express";
import { VIPPointsController } from "../controllers/vip-points.controller.js";
import { authenticateToken, authorizeRoles } from "../middleware/auth.middleware.js";
import { Role } from "@prisma/client";

const router = Router();

// Add VIP Points to a product (Seller or Admin)
router.post("/", authenticateToken, authorizeRoles([Role.SELLER, Role.ADMIN]), VIPPointsController.addVIPPoints);

// Get VIP Points for a product (public, but can be restricted later)
router.get("/:productId", VIPPointsController.getVIPPointsByProduct);

// Update VIP Points for a product (Seller or Admin)
router.put("/:productId", authenticateToken, authorizeRoles([Role.SELLER, Role.ADMIN]), VIPPointsController.updateVIPPoints);

// Delete VIP Points for a product (Admin only)
router.delete("/:productId", authenticateToken, authorizeRoles([Role.ADMIN]), VIPPointsController.deleteVIPPoints);

export default router;
