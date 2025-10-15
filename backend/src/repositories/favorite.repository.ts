import { PrismaClient, Favorite } from "@prisma/client";

const prisma = new PrismaClient();

export class FavoriteRepository {
  static async create(userId: number, productId: number): Promise<Favorite> {
    return prisma.favorite.create({
      data: {
        userId,
        productId,
      },
    });
  }

  static async delete(userId: number, productId: number): Promise<Favorite> {
    return prisma.favorite.delete({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });
  }

  static async findByUserAndProduct(userId: number, productId: number): Promise<Favorite | null> {
    return prisma.favorite.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });
  }

  static async findByUserId(userId: number): Promise<Favorite[]> {
    return prisma.favorite.findMany({
      where: { userId },
      include: {
        product: {
          include: {
            images: true,
            seller: {
              select: {
                id: true,
                email: true,
              },
            },
          },
        },
      },
    });
  }
}
