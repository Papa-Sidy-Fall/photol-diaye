import { PrismaClient, Like } from "@prisma/client";
import { LikeRepository } from "../repositories/like.repository.js";

const prisma = new PrismaClient();

export class LikeService {
  static async addLike(userId: number, productId: number): Promise<Like> {
    const existingLike = await LikeRepository.findByUserAndProduct(userId, productId);
    if (existingLike) {
      throw new Error("Product already liked");
    }
    return LikeRepository.create(userId, productId);
  }

  static async removeLike(userId: number, productId: number): Promise<Like> {
    const existingLike = await LikeRepository.findByUserAndProduct(userId, productId);
    if (!existingLike) {
      throw new Error("Product not liked");
    }
    return LikeRepository.delete(userId, productId);
  }

  static async countLikesByProduct(productId: number): Promise<number> {
    return LikeRepository.countByProduct(productId);
  }

  static async isProductLiked(userId: number, productId: number): Promise<boolean> {
    const like = await LikeRepository.findByUserAndProduct(userId, productId);
    return !!like;
  }
}
