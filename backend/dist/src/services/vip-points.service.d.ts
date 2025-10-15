import { VIPPoints } from "@prisma/client";
export declare class VIPPointsService {
    static addVIPPoints(userId: number, productId: number, points: number, expiresAt: Date): Promise<VIPPoints>;
    static getVIPPointsByProduct(productId: number): Promise<VIPPoints | null>;
    static updateVIPPoints(productId: number, points: number, expiresAt: Date): Promise<VIPPoints>;
    static deleteVIPPoints(productId: number): Promise<VIPPoints>;
}
//# sourceMappingURL=vip-points.service.d.ts.map