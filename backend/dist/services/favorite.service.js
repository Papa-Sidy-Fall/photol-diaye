import { PrismaClient } from "@prisma/client";
import { FavoriteRepository } from "../repositories/favorite.repository.js";
const prisma = new PrismaClient();
export class FavoriteService {
    static async addFavorite(userId, productId) {
        const existingFavorite = await FavoriteRepository.findByUserAndProduct(userId, productId);
        if (existingFavorite) {
            throw new Error("Product already in favorites");
        }
        return FavoriteRepository.create(userId, productId);
    }
    static async removeFavorite(userId, productId) {
        const existingFavorite = await FavoriteRepository.findByUserAndProduct(userId, productId);
        if (!existingFavorite) {
            throw new Error("Product not in favorites");
        }
        return FavoriteRepository.delete(userId, productId);
    }
    static async getFavoritesByUserId(userId) {
        return FavoriteRepository.findByUserId(userId);
    }
    static async isProductFavorite(userId, productId) {
        const favorite = await FavoriteRepository.findByUserAndProduct(userId, productId);
        return !!favorite;
    }
}
//# sourceMappingURL=favorite.service.js.map