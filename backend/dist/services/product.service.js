import { PrismaClient, ProductStatus } from "@prisma/client";
import { ProductRepository } from "../repositories/product.repository.js";
const prisma = new PrismaClient();
export class ProductService {
    static async createProduct(title, description, price, whatsappLink, phoneNumber, mainImage, images, sellerId, categoryId) {
        return ProductRepository.create({
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
    }
    static async getProducts(status, page = 1, pageSize = 10) {
        const skip = (page - 1) * pageSize;
        const take = pageSize;
        return ProductRepository.findAll(status, skip, take);
    }
    static async getProductById(id) {
        return ProductRepository.findById(id);
    }
    static async updateProductStatus(productId, status) {
        return ProductRepository.updateStatus(productId, status);
    }
    static async updateProduct(productId, title, description, price, whatsappLink, phoneNumber, mainImage, images, categoryId) {
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
    static async deleteProduct(productId) {
        return ProductRepository.delete(productId);
    }
}
//# sourceMappingURL=product.service.js.map