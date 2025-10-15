import { Like } from "@prisma/client";
export declare class LikeService {
    static addLike(userId: number, productId: number): Promise<Like>;
    static removeLike(userId: number, productId: number): Promise<Like>;
    static countLikesByProduct(productId: number): Promise<number>;
    static isProductLiked(userId: number, productId: number): Promise<boolean>;
}
//# sourceMappingURL=like.service.d.ts.map