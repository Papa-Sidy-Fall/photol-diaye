import { Like } from "@prisma/client";
export declare class LikeRepository {
    static create(userId: number, productId: number): Promise<Like>;
    static delete(userId: number, productId: number): Promise<Like>;
    static findByUserAndProduct(userId: number, productId: number): Promise<Like | null>;
    static countByProduct(productId: number): Promise<number>;
}
//# sourceMappingURL=like.repository.d.ts.map