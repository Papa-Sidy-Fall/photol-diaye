import { Favorite } from "@prisma/client";
export declare class FavoriteRepository {
    static create(userId: number, productId: number): Promise<Favorite>;
    static delete(userId: number, productId: number): Promise<Favorite>;
    static findByUserAndProduct(userId: number, productId: number): Promise<Favorite | null>;
    static findByUserId(userId: number): Promise<Favorite[]>;
}
//# sourceMappingURL=favorite.repository.d.ts.map