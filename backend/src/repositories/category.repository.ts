import { PrismaClient, Category } from "@prisma/client";

const prisma = new PrismaClient();

export class CategoryRepository {
  static async create(name: string): Promise<Category> {
    return prisma.category.create({
      data: {
        name,
      },
    });
  }

  static async findAll(): Promise<Category[]> {
    return prisma.category.findMany();
  }

  static async findById(id: number): Promise<Category | null> {
    return prisma.category.findUnique({
      where: { id },
    });
  }

  static async findByName(name: string): Promise<Category | null> {
    return prisma.category.findUnique({
      where: { name },
    });
  }

  static async delete(id: number): Promise<Category> {
    return prisma.category.delete({
      where: { id },
    });
  }
}
