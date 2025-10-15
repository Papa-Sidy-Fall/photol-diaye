import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js";
import { authenticateToken, authorizeRoles } from "../middleware/auth.middleware.js";
import { Role } from "@prisma/client";

const router = Router();

// Create Product (Seller only)
router.post("/", authenticateToken, authorizeRoles([Role.SELLER]), ProductController.createProduct);

// Get All Products (public, with pagination and optional status filter)
router.get("/", ProductController.getProducts);

// Get Product by ID (public)
router.get("/:id", ProductController.getProductById);

// Update Product (Seller only)
router.put("/:id", authenticateToken, authorizeRoles([Role.SELLER]), ProductController.updateProduct);

// Update Product Status (Admin only)
router.put("/:id/status", authenticateToken, authorizeRoles([Role.ADMIN]), ProductController.updateProductStatus);

// Delete Product (Admin or Seller who owns the product)
router.delete("/:id", authenticateToken, authorizeRoles([Role.ADMIN, Role.SELLER]), ProductController.deleteProduct);

export default router;
