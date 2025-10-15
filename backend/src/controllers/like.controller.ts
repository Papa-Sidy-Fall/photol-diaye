import { Request, Response } from "express";
import { LikeService } from "../services/like.service.js";

interface AuthenticatedRequest extends Request {
  user?: { id: number; email: string; role: string };
}

export class LikeController {
  static async addLike(req: AuthenticatedRequest, res: Response): Promise<void> {
    const productId = Number(req.body.productId);
    const userId = req.user?.id;

    if (isNaN(productId) || !userId) {
      res.status(400).json({ message: "Missing or invalid productId or userId" });
      return;
    }

    try {
      const like = await LikeService.addLike(userId, productId);
      res.status(201).json(like);
    } catch (error: any) {
      if (error.message === "Product already liked") {
        res.status(409).json({ message: error.message });
      } else {
        console.error("Error adding like:", error);
        res.status(500).json({ message: "Something went wrong" });
      }
    }
  }

  static async removeLike(req: AuthenticatedRequest, res: Response): Promise<void> {
    const productId = Number(req.params.productId);
    const userId = req.user?.id;

    if (isNaN(productId) || !userId) {
      res.status(400).json({ message: "Missing or invalid productId or userId" });
      return;
    }

    try {
      const deletedLike = await LikeService.removeLike(userId, productId);
      res.status(200).json(deletedLike);
    } catch (error: any) {
      if (error.message === "Product not liked") {
        res.status(404).json({ message: error.message });
      } else {
        console.error("Error removing like:", error);
        res.status(500).json({ message: "Something went wrong" });
      }
    }
  }

  static async countLikesByProduct(req: Request, res: Response): Promise<void> {
    const productId = Number(req.params.productId);

    if (isNaN(productId)) {
      res.status(400).json({ message: "Missing or invalid productId" });
      return;
    }

    try {
      const count = await LikeService.countLikesByProduct(productId);
      res.status(200).json({ productId, count });
    } catch (error: any) {
      console.error("Error counting likes by product:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  static async isProductLiked(req: AuthenticatedRequest, res: Response): Promise<void> {
    const productId = Number(req.params.productId);
    const userId = req.user?.id;

    if (isNaN(productId) || !userId) {
      res.status(400).json({ message: "Missing or invalid productId or userId" });
      return;
    }

    try {
      const isLiked = await LikeService.isProductLiked(userId, productId);
      res.status(200).json({ isLiked });
    } catch (error: any) {
      console.error("Error checking if product is liked:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}
