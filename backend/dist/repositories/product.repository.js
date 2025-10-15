import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export class ProductRepository {
    static async create(data) {
        const { categoryId, ...rest } = data;
        return prisma.product.create({
            data: {
                ...rest,
                ...(categoryId !== undefined && { category: { connect: { id: categoryId } } }), // Conditionally add category
            },
        });
    }
    static async findAll(status, skip = 0, take = 10) {
        const whereClause = status ? { status } : {};
        return prisma.product.findMany({
            where: whereClause,
            skip,
            take,
            include: {
                seller: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
                category: true,
                images: true,
                views: true,
                favorites: true,
                vipPoints: true,
            },
            orderBy: [
                {
                    vipPoints: {
                        points: 'desc', // Order by VIP points in descending order
                    },
                },
                {
                    createdAt: 'desc', // Then by creation date
                },
            ],
        });
    }
    static async findById(id) {
        return prisma.product.findUnique({
            where: { id },
            include: {
                seller: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
                category: true,
                images: true,
                views: true,
                favorites: true,
                vipPoints: true,
            },
        });
    }
    static async updateStatus(productId, status) {
        return prisma.product.update({
            where: { id: productId },
            data: { status },
        });
    }
    static async update(productId, data) {
        const { categoryId, images, ...rest } = data;
        return prisma.product.update({
            where: { id: productId },
            data: {
                ...rest,
                ...(categoryId !== undefined && { category: { connect: { id: categoryId } } }),
                ...(images && { images: { deleteMany: {}, create: images.create } }), // Clear existing images and add new ones
            },
        });
    }
    static async delete(productId) {
        return prisma.product.delete({ where: { id: productId } });
    }
}
//# sourceMappingURL=product.repository.js.map