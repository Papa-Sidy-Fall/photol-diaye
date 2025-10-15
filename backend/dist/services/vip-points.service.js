import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export class VIPPointsService {
    static async addVIPPoints(userId, productId, points, expiresAt) {
        return prisma.vIPPoints.create({
            data: {
                userId,
                productId,
                points,
                expiresAt,
            },
        });
    }
    static async getVIPPointsByProduct(productId) {
        return prisma.vIPPoints.findUnique({
            where: { productId },
        });
    }
    static async updateVIPPoints(productId, points, expiresAt) {
        return prisma.vIPPoints.update({
            where: { productId },
            data: { points, expiresAt },
        });
    }
    static async deleteVIPPoints(productId) {
        return prisma.vIPPoints.delete({ where: { productId } });
    }
}
//# sourceMappingURL=vip-points.service.js.map