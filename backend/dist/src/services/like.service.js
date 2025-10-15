import { PrismaClient } from "@prisma/client";
import { LikeRepository } from "../repositories/like.repository.js";
const prisma = new PrismaClient();
export class LikeService {
    static async addLike(userId, productId) {
        const existingLike = await LikeRepository.findByUserAndProduct(userId, productId);
        if (existingLike) {
            throw new Error("Product already liked");
        }
        return LikeRepository.create(userId, productId);
    }
    static async removeLike(userId, productId) {
        const existingLike = await LikeRepository.findByUserAndProduct(userId, productId);
        if (!existingLike) {
            throw new Error("Product not liked");
        }
        return LikeRepository.delete(userId, productId);
    }
    static async countLikesByProduct(productId) {
        return LikeRepository.countByProduct(productId);
    }
    static async isProductLiked(userId, productId) {
        const like = await LikeRepository.findByUserAndProduct(userId, productId);
        return !!like;
    }
}
//# sourceMappingURL=like.service.js.map