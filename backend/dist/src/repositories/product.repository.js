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
    static async findAll(status, skip = 0, take = 10, categoryId, minPrice, maxPrice, sortBy, search) {
        const whereClause = {};
        if (status)
            whereClause.status = status;
        if (categoryId)
            whereClause.categoryId = categoryId;
        if (minPrice !== undefined || maxPrice !== undefined) {
            whereClause.price = {};
            if (minPrice !== undefined)
                whereClause.price.gte = minPrice;
            if (maxPrice !== undefined)
                whereClause.price.lte = maxPrice;
        }
        if (search) {
            whereClause.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
                { seller: { email: { contains: search, mode: 'insensitive' } } }
            ];
        }
        let orderBy = [
            {
                vipPoints: {
                    points: 'desc', // Order by VIP points in descending order
                },
            },
            {
                createdAt: 'desc', // Then by creation date
            },
        ];
        if (sortBy) {
            switch (sortBy) {
                case 'price_asc':
                    orderBy = [{ price: 'asc' }];
                    break;
                case 'price_desc':
                    orderBy = [{ price: 'desc' }];
                    break;
                case 'date_desc':
                    orderBy = [{ createdAt: 'desc' }];
                    break;
                case 'date_asc':
                    orderBy = [{ createdAt: 'asc' }];
                    break;
                case 'popularity':
                    orderBy = [{ views: { _count: 'desc' } }];
                    break;
                default:
                    break;
            }
        }
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
            orderBy,
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
    static async countAll(status, categoryId, minPrice, maxPrice, search) {
        const whereClause = {};
        if (status)
            whereClause.status = status;
        if (categoryId)
            whereClause.categoryId = categoryId;
        if (minPrice !== undefined || maxPrice !== undefined) {
            whereClause.price = {};
            if (minPrice !== undefined)
                whereClause.price.gte = minPrice;
            if (maxPrice !== undefined)
                whereClause.price.lte = maxPrice;
        }
        if (search) {
            whereClause.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
                { seller: { email: { contains: search, mode: 'insensitive' } } }
            ];
        }
        return prisma.product.count({
            where: whereClause,
        });
    }
}
//# sourceMappingURL=product.repository.js.map