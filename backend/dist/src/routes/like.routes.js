import { Router } from "express";
import { LikeController } from "../controllers/like.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
const router = Router();
// Add like to a product (authenticated user only)
router.post("/", authenticateToken, LikeController.addLike);
// Remove like from a product (authenticated user only)
router.delete("/:productId", authenticateToken, LikeController.removeLike);
// Get like count for a product (public)
router.get("/:productId/count", LikeController.countLikesByProduct);
// Check if a product is liked by a user (authenticated user only)
router.get("/:productId/is-liked", authenticateToken, LikeController.isProductLiked);
export default router;
//# sourceMappingURL=like.routes.js.map