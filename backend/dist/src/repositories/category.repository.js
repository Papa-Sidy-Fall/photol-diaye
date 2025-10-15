import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export class CategoryRepository {
    static async create(name) {
        return prisma.category.create({
            data: {
                name,
            },
        });
    }
    static async findAll() {
        return prisma.category.findMany();
    }
    static async findById(id) {
        return prisma.category.findUnique({
            where: { id },
        });
    }
    static async findByName(name) {
        return prisma.category.findUnique({
            where: { name },
        });
    }
    static async delete(id) {
        return prisma.category.delete({
            where: { id },
        });
    }
}
//# sourceMappingURL=category.repository.js.map