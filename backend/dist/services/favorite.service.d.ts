import { Favorite } from "@prisma/client";
export declare class FavoriteService {
    static addFavorite(userId: number, productId: number): Promise<Favorite>;
    static removeFavorite(userId: number, productId: number): Promise<Favorite>;
    static getFavoritesByUserId(userId: number): Promise<Favorite[]>;
    static isProductFavorite(userId: number, productId: number): Promise<boolean>;
}
//# sourceMappingURL=favorite.service.d.ts.map