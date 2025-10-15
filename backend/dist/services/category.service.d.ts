import { Category } from "@prisma/client";
export declare class CategoryService {
    static createCategory(name: string): Promise<Category>;
    static getCategories(): Promise<Category[]>;
    static getCategoryById(id: number): Promise<Category | null>;
    static deleteCategory(id: number): Promise<Category>;
}
//# sourceMappingURL=category.service.d.ts.map