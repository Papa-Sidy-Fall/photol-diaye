import { PrismaClient } from "@prisma/client";
import { CategoryRepository } from "../repositories/category.repository.js";
const prisma = new PrismaClient();
export class CategoryService {
    static async createCategory(name) {
        const existingCategory = await CategoryRepository.findByName(name);
        if (existingCategory) {
            throw new Error("Category with this name already exists");
        }
        return CategoryRepository.create(name);
    }
    static async getCategories() {
        return CategoryRepository.findAll();
    }
    static async getCategoryById(id) {
        return CategoryRepository.findById(id);
    }
    static async deleteCategory(id) {
        return CategoryRepository.delete(id);
    }
}
//# sourceMappingURL=category.service.js.map