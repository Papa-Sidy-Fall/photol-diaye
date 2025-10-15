import { Category } from "@prisma/client";
export declare class CategoryRepository {
    static create(name: string): Promise<Category>;
    static findAll(): Promise<Category[]>;
    static findById(id: number): Promise<Category | null>;
    static findByName(name: string): Promise<Category | null>;
    static delete(id: number): Promise<Category>;
}
//# sourceMappingURL=category.repository.d.ts.map