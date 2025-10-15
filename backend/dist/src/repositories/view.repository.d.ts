import { View } from "@prisma/client";
export declare class ViewRepository {
    static create(productId: number): Promise<View>;
    static countByProduct(productId: number): Promise<number>;
}
//# sourceMappingURL=view.repository.d.ts.map