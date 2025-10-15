import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export class UserRepository {
    static async findByEmail(email) {
        return prisma.user.findUnique({ where: { email } });
    }
    static async create(email, passwordHash, role) {
        return prisma.user.create({
            data: {
                email,
                password: passwordHash,
                role,
            },
        });
    }
    static async findAll() {
        return prisma.user.findMany();
    }
    static async findById(id) {
        return prisma.user.findUnique({ where: { id } });
    }
    static async updateRole(id, role) {
        return prisma.user.update({
            where: { id },
            data: { role },
        });
    }
    static async delete(id) {
        return prisma.user.delete({ where: { id } });
    }
}
//# sourceMappingURL=user.repository.js.map