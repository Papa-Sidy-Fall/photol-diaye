import { PrismaClient, Like } from "@prisma/client";

const prisma = new PrismaClient();

export class LikeRepository {
  static async create(userId: number, productId: number): Promise<Like> {
    return prisma.like.create({
      data: {
        userId,
        productId,
      },
    });
  }

  static async delete(userId: number, productId: number): Promise<Like> {
    return prisma.like.delete({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });
  }

  static async findByUserAndProduct(userId: number, productId: number): Promise<Like | null> {
    return prisma.like.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });
  }

  static async countByProduct(productId: number): Promise<number> {
    return prisma.like.count({
      where: { productId },
    });
  }
}
