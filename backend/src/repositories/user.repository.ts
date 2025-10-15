import { PrismaClient, User, Role } from "@prisma/client";

const prisma = new PrismaClient();

export class UserRepository {
  static async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  static async create(email: string, passwordHash: string, role: Role): Promise<User> {
    return prisma.user.create({
      data: {
        email,
        password: passwordHash,
        role,
      },
    });
  }

  static async findAll(): Promise<User[]> {
    return prisma.user.findMany();
  }

  static async findById(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  static async updateRole(id: number, role: Role): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: { role },
    });
  }

  static async delete(id: number): Promise<User> {
    return prisma.user.delete({ where: { id } });
  }
}
