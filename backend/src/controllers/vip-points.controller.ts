import { Request, Response } from "express";
import { VIPPointsService } from "../services/vip-points.service.js";

export class VIPPointsController {
  static async addVIPPoints(req: Request, res: Response): Promise<void> {
    const userId = Number(req.body.userId);
    const productId = Number(req.body.productId);
    const points = Number(req.body.points);
    const expiresAt = req.body.expiresAt;

    if (isNaN(userId) || isNaN(productId) || isNaN(points) || !expiresAt) {
      res.status(400).json({ message: "Missing or invalid VIP points fields" });
      return;
    }

    try {
      const vipPoints = await VIPPointsService.addVIPPoints(
        userId,
        productId,
        points,
        new Date(expiresAt)
      );
      res.status(201).json(vipPoints);
    } catch (error: any) {
      console.error("Error adding VIP points:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  static async getVIPPointsByProduct(req: Request, res: Response): Promise<void> {
    const productId = Number(req.params.productId);
    try {
      const vipPoints = await VIPPointsService.getVIPPointsByProduct(productId);
      if (!vipPoints) {
        res.status(404).json({ message: "VIP points not found for this product" });
        return;
      }
      res.status(200).json(vipPoints);
    } catch (error: any) {
      console.error("Error fetching VIP points by product:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  static async updateVIPPoints(req: Request, res: Response): Promise<void> {
    const productId = Number(req.params.productId);
    const points = Number(req.body.points);
    const expiresAt = req.body.expiresAt;

    if (isNaN(points) || !expiresAt) {
      res.status(400).json({ message: "Missing or invalid VIP points update fields" });
      return;
    }

    try {
      const updatedVIPPoints = await VIPPointsService.updateVIPPoints(
        productId,
        points,
        new Date(expiresAt)
      );
      res.status(200).json(updatedVIPPoints);
    } catch (error: any) {
      console.error("Error updating VIP points:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  static async deleteVIPPoints(req: Request, res: Response): Promise<void> {
    const productId = Number(req.params.productId);
    try {
      const deletedVIPPoints = await VIPPointsService.deleteVIPPoints(productId);
      res.status(200).json(deletedVIPPoints);
    } catch (error: any) {
      console.error("Error deleting VIP points:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}
