import { PrismaClient } from "@prisma/client";
import { ViewRepository } from "../repositories/view.repository.js";
const prisma = new PrismaClient();
export class ViewService {
    static async createView(productId) {
        return ViewRepository.create(productId);
    }
    static async countViewsByProduct(productId) {
        return ViewRepository.countByProduct(productId);
    }
}
//# sourceMappingURL=view.service.js.map