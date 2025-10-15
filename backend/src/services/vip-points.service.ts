import { PrismaClient, VIPPoints } from "@prisma/client";

const prisma = new PrismaClient();

export class VIPPointsService {
  static async addVIPPoints(userId: number, productId: number, points: number, expiresAt: Date): Promise<VIPPoints> {
    return prisma.vIPPoints.create({
      data: {
        userId,
        productId,
        points,
        expiresAt,
      },
    });
  }

  static async getVIPPointsByProduct(productId: number): Promise<VIPPoints | null> {
    return prisma.vIPPoints.findUnique({
      where: { productId },
    });
  }

  static async updateVIPPoints(productId: number, points: number, expiresAt: Date): Promise<VIPPoints> {
    return prisma.vIPPoints.update({
      where: { productId },
      data: { points, expiresAt },
    });
  }

  static async deleteVIPPoints(productId: number): Promise<VIPPoints> {
    return prisma.vIPPoints.delete({ where: { productId } });
  }
}
