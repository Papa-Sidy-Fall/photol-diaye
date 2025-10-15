import { Router } from "express";
import { ChatController } from "../controllers/chat.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
const router = Router();
// Send a message
router.post("/", authenticateToken, ChatController.sendMessage);
// Get messages between two users for a specific product
router.get("/:productId/:user2Id", authenticateToken, ChatController.getMessagesBetweenUsersForProduct);
// Get all conversations for a user
router.get("/conversations", authenticateToken, ChatController.getUserConversations);
export default router;
//# sourceMappingURL=chat.routes.js.map