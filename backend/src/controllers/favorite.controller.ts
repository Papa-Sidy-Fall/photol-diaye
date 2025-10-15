import { Request, Response } from "express";
import { FavoriteService } from "../services/favorite.service.js";

interface AuthenticatedRequest extends Request {
  user?: { id: number; email: string; role: string };
}

export class FavoriteController {
  static async addFavorite(req: AuthenticatedRequest, res: Response): Promise<void> {
    const productId = Number(req.body.productId);
    const userId = req.user?.id;

    if (isNaN(productId) || !userId) {
      res.status(400).json({ message: "Missing or invalid productId or userId" });
      return;
    }

    try {
      const favorite = await FavoriteService.addFavorite(userId, productId);
      res.status(201).json(favorite);
    } catch (error: any) {
      if (error.message === "Product already in favorites") {
        res.status(409).json({ message: error.message });
      } else {
        console.error("Error adding favorite:", error);
        res.status(500).json({ message: "Something went wrong" });
      }
    }
  }

  static async removeFavorite(req: AuthenticatedRequest, res: Response): Promise<void> {
    const productId = Number(req.params.productId);
    const userId = req.user?.id;

    if (isNaN(productId) || !userId) {
      res.status(400).json({ message: "Missing or invalid productId or userId" });
      return;
    }

    try {
      const deletedFavorite = await FavoriteService.removeFavorite(userId, productId);
      res.status(200).json(deletedFavorite);
    } catch (error: any) {
      if (error.message === "Product not in favorites") {
        res.status(404).json({ message: error.message });
      } else {
        console.error("Error removing favorite:", error);
        res.status(500).json({ message: "Something went wrong" });
      }
    }
  }

  static async getFavoritesByUserId(req: AuthenticatedRequest, res: Response): Promise<void> {
    const userId = req.user?.id;

    if (!userId) {
      res.status(400).json({ message: "Missing userId" });
      return;
    }

    try {
      const favorites = await FavoriteService.getFavoritesByUserId(userId);
      res.status(200).json(favorites);
    } catch (error: any) {
      console.error("Error fetching favorites:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  static async isProductFavorite(req: AuthenticatedRequest, res: Response): Promise<void> {
    const productId = Number(req.params.productId);
    const userId = req.user?.id;

    if (isNaN(productId) || !userId) {
      res.status(400).json({ message: "Missing or invalid productId or userId" });
      return;
    }

    try {
      const isFavorite = await FavoriteService.isProductFavorite(userId, productId);
      res.status(200).json({ isFavorite });
    } catch (error: any) {
      console.error("Error checking if product is favorite:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}
