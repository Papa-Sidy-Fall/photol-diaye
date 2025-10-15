import { Product, ProductStatus } from "@prisma/client";
export declare class ProductService {
    static createProduct(title: string, description: string | undefined, price: number, whatsappLink: string | undefined, phoneNumber: string | undefined, mainImage: string, images: string[], sellerId: number, categoryId: number | undefined): Promise<Product>;
    static getProducts(status?: ProductStatus, page?: number, pageSize?: number, categoryId?: number, minPrice?: number, maxPrice?: number, sortBy?: string, search?: string): Promise<{
        products: Product[];
        total: number;
    }>;
    static getProductById(id: number): Promise<Product | null>;
    static updateProductStatus(productId: number, status: ProductStatus): Promise<Product>;
    static updateProduct(productId: number, title: string, description: string | undefined, price: number, whatsappLink: string | undefined, phoneNumber: string | undefined, mainImage: string, images: string[], categoryId: number | undefined): Promise<Product | null>;
    static deleteProduct(productId: number): Promise<Product>;
}
//# sourceMappingURL=product.service.d.ts.map