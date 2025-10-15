import { Router } from "express";
import { ViewController } from "../controllers/view.controller.js";
const router = Router();
// Create a new view for a product
router.post("/", ViewController.createView);
// Get view count for a product
router.get("/:productId/count", ViewController.countViewsByProduct);
export default router;
//# sourceMappingURL=view.routes.js.map