import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export class LikeRepository {
    static async create(userId, productId) {
        return prisma.like.create({
            data: {
                userId,
                productId,
            },
        });
    }
    static async delete(userId, productId) {
        return prisma.like.delete({
            where: {
                userId_productId: {
                    userId,
                    productId,
                },
            },
        });
    }
    static async findByUserAndProduct(userId, productId) {
        return prisma.like.findUnique({
            where: {
                userId_productId: {
                    userId,
                    productId,
                },
            },
        });
    }
    static async countByProduct(productId) {
        return prisma.like.count({
            where: { productId },
        });
    }
}
//# sourceMappingURL=like.repository.js.map