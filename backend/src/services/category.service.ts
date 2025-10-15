import { PrismaClient, Category } from "@prisma/client";
import { CategoryRepository } from "../repositories/category.repository.js";

const prisma = new PrismaClient();

export class CategoryService {
  static async createCategory(name: string): Promise<Category> {
    const existingCategory = await CategoryRepository.findByName(name);
    if (existingCategory) {
      throw new Error("Category with this name already exists");
    }
    return CategoryRepository.create(name);
  }

  static async getCategories(): Promise<Category[]> {
    return CategoryRepository.findAll();
  }

  static async getCategoryById(id: number): Promise<Category | null> {
    return CategoryRepository.findById(id);
  }

  static async deleteCategory(id: number): Promise<Category> {
    return CategoryRepository.delete(id);
  }
}
