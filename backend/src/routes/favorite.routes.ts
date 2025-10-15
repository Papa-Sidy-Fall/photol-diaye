import { Router } from "express";
import { FavoriteController } from "../controllers/favorite.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = Router();

// Add product to favorites (authenticated user only)
router.post("/", authenticateToken, FavoriteController.addFavorite);

// Remove product from favorites (authenticated user only)
router.delete("/:productId", authenticateToken, FavoriteController.removeFavorite);

// Get all favorites for a user (authenticated user only)
router.get("/", authenticateToken, FavoriteController.getFavoritesByUserId);

// Check if a product is favorited by a user (authenticated user only)
router.get("/:productId/is-favorite", authenticateToken, FavoriteController.isProductFavorite);

export default router;
