import { PrismaClient, View } from "@prisma/client";
import { ViewRepository } from "../repositories/view.repository.js";

const prisma = new PrismaClient();

export class ViewService {
  static async createView(productId: number): Promise<View> {
    return ViewRepository.create(productId);
  }

  static async countViewsByProduct(productId: number): Promise<number> {
    return ViewRepository.countByProduct(productId);
  }
}
