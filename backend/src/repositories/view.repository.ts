import { PrismaClient, View } from "@prisma/client";

const prisma = new PrismaClient();

export class ViewRepository {
  static async create(productId: number): Promise<View> {
    return prisma.view.create({
      data: {
        productId,
      },
    });
  }

  static async countByProduct(productId: number): Promise<number> {
    return prisma.view.count({
      where: { productId },
    });
  }
}
