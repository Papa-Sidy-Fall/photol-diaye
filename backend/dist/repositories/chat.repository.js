import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// Manual definition of Chat type to bypass Prisma client type issues
// TODO: Fix Prisma typings for ChatWithRelations
/*
type Chat = {
  id: number;
  message: string;
  senderId: number;
  receiverId: number;
  productId: number;
  createdAt: Date;
};
*/
export class ChatRepository {
    static async create(senderId, receiverId, productId, message) {
        return prisma.chat.create({
            data: {
                senderId,
                receiverId,
                productId,
                message,
            },
        });
    }
    static async findMessagesBetweenUsersForProduct(user1Id, user2Id, productId) {
        return prisma.chat.findMany({
            where: {
                productId: productId,
                OR: [
                    { senderId: user1Id, receiverId: user2Id },
                    { senderId: user2Id, receiverId: user1Id },
                ],
            },
            orderBy: {
                createdAt: "asc",
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
                receiver: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
            },
        });
    }
}
//# sourceMappingURL=chat.repository.js.map