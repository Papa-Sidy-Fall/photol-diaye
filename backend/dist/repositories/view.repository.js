import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export class ViewRepository {
    static async create(productId) {
        return prisma.view.create({
            data: {
                productId,
            },
        });
    }
    static async countByProduct(productId) {
        return prisma.view.count({
            where: { productId },
        });
    }
}
//# sourceMappingURL=view.repository.js.map