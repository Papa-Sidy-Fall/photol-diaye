import { Product, ProductStatus } from "@prisma/client";
export declare class ProductRepository {
    static create(data: {
        title: string;
        description?: string | null;
        price: number;
        whatsappLink?: string | null;
        phoneNumber?: string | null;
        mainImage: string;
        images: {
            create: {
                url: string;
            }[];
        };
        seller: {
            connect: {
                id: number;
            };
        };
        categoryId?: number | undefined;
        status: ProductStatus;
    }): Promise<Product>;
    static findAll(status?: ProductStatus, skip?: number, take?: number): Promise<Product[]>;
    static findById(id: number): Promise<Product | null>;
    static updateStatus(productId: number, status: ProductStatus): Promise<Product>;
    static update(productId: number, data: {
        title?: string;
        description?: string | null;
        price?: number;
        whatsappLink?: string | null;
        phoneNumber?: string | null;
        mainImage?: string;
        images?: {
            create: {
                url: string;
            }[];
        };
        categoryId?: number | undefined;
    }): Promise<Product | null>;
    static delete(productId: number): Promise<Product>;
}
//# sourceMappingURL=product.repository.d.ts.map