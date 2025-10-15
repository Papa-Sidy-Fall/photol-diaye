import { Request, Response } from "express";
import { ViewService } from "../services/view.service.js";

export class ViewController {
  static async createView(req: Request, res: Response): Promise<void> {
    const productId = Number(req.body.productId);

    if (isNaN(productId)) {
      res.status(400).json({ message: "Missing or invalid productId" });
      return;
    }

    try {
      const view = await ViewService.createView(productId);
      res.status(201).json(view);
    } catch (error: any) {
      console.error("Error creating view:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  static async countViewsByProduct(req: Request, res: Response): Promise<void> {
    const productId = Number(req.params.productId);

    if (isNaN(productId)) {
      res.status(400).json({ message: "Missing or invalid productId" });
      return;
    }

    try {
      const count = await ViewService.countViewsByProduct(productId);
      res.status(200).json({ productId, count });
    } catch (error: any) {
      console.error("Error counting views by product:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}
