import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export class FavoriteRepository {
    static async create(userId, productId) {
        return prisma.favorite.create({
            data: {
                userId,
                productId,
            },
        });
    }
    static async delete(userId, productId) {
        return prisma.favorite.delete({
            where: {
                userId_productId: {
                    userId,
                    productId,
                },
            },
        });
    }
    static async findByUserAndProduct(userId, productId) {
        return prisma.favorite.findUnique({
            where: {
                userId_productId: {
                    userId,
                    productId,
                },
            },
        });
    }
    static async findByUserId(userId) {
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
//# sourceMappingURL=favorite.repository.js.map