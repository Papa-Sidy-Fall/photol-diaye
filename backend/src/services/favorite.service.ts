import { PrismaClient, Favorite } from "@prisma/client";
import { FavoriteRepository } from "../repositories/favorite.repository.js";

const prisma = new PrismaClient();

export class FavoriteService {
  static async addFavorite(userId: number, productId: number): Promise<Favorite> {
    const existingFavorite = await FavoriteRepository.findByUserAndProduct(userId, productId);
    if (existingFavorite) {
      throw new Error("Product already in favorites");
    }
    return FavoriteRepository.create(userId, productId);
  }

  static async removeFavorite(userId: number, productId: number): Promise<Favorite> {
    const existingFavorite = await FavoriteRepository.findByUserAndProduct(userId, productId);
    if (!existingFavorite) {
      throw new Error("Product not in favorites");
    }
    return FavoriteRepository.delete(userId, productId);
  }

  static async getFavoritesByUserId(userId: number): Promise<Favorite[]> {
    return FavoriteRepository.findByUserId(userId);
  }

  static async isProductFavorite(userId: number, productId: number): Promise<boolean> {
    const favorite = await FavoriteRepository.findByUserAndProduct(userId, productId);
    return !!favorite;
  }
}
