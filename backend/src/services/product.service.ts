import { PrismaClient, Product, ProductStatus, Role } from "@prisma/client";
import { ProductRepository } from "../repositories/product.repository.js";

const prisma = new PrismaClient();

export class ProductService {
  static async createProduct(
    title: string,
    description: string | undefined,
    price: number,
    whatsappLink: string | undefined,
    phoneNumber: string | undefined,
    mainImage: string,
    images: string[],
    sellerId: number,
    categoryId: number | undefined
  ): Promise<Product> {
    console.log("ProductService: Creating product with data:", {
      title,
      description,
      price,
      whatsappLink,
      phoneNumber,
      mainImage,
      images: images.length, // Log image count instead of full array
      sellerId,
      categoryId,
      status: ProductStatus.PENDING,
    });
    try {
      const product = await ProductRepository.create({
        title,
        description: description || null,
        price,
        whatsappLink: whatsappLink || null,
        phoneNumber: phoneNumber || null,
        mainImage,
        images: {
          create: images.map(url => ({ url }))
        },
        seller: {
          connect: { id: sellerId }
        },
        categoryId,
        status: ProductStatus.PENDING,
      });
      console.log("ProductService: Product created successfully:", product);
      return product;
    } catch (error) {
      console.error("ProductService: Error in createProduct:", error);
      throw error;
    }
  }

  static async getProducts(status?: ProductStatus, page: number = 1, pageSize: number = 10, categoryId?: number, minPrice?: number, maxPrice?: number, sortBy?: string, search?: string): Promise<{ products: Product[], total: number }> {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const products = await ProductRepository.findAll(status, skip, take, categoryId, minPrice, maxPrice, sortBy, search);
    const total = await ProductRepository.countAll(status, categoryId, minPrice, maxPrice, search);
    return { products, total };
  }

  static async getProductById(id: number): Promise<Product | null> {
    return ProductRepository.findById(id);
  }

  static async updateProductStatus(productId: number, status: ProductStatus): Promise<Product> {
    return ProductRepository.updateStatus(productId, status);
  }

  static async updateProduct(
    productId: number,
    title: string,
    description: string | undefined,
    price: number,
    whatsappLink: string | undefined,
    phoneNumber: string | undefined,
    mainImage: string,
    images: string[],
    categoryId: number | undefined
  ): Promise<Product | null> {
    return ProductRepository.update(productId, {
      title,
      description: description || null,
      price,
      whatsappLink: whatsappLink || null,
      phoneNumber: phoneNumber || null,
      mainImage,
      images: {
        create: images.map(url => ({ url }))
      },
      categoryId,
    });
  }

  static async deleteProduct(productId: number): Promise<Product> {
    return ProductRepository.delete(productId);
  }
}
