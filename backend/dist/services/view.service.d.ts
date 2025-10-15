import { View } from "@prisma/client";
export declare class ViewService {
    static createView(productId: number): Promise<View>;
    static countViewsByProduct(productId: number): Promise<number>;
}
//# sourceMappingURL=view.service.d.ts.map