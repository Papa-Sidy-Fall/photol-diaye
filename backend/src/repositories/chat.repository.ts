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
  static async create(senderId: number, receiverId: number, productId: number, message: string): Promise<any> { // Changed to any
    return prisma.chat.create({
      data: {
        senderId,
        receiverId,
        productId,
        message,
      },
    });
  }

  static async findMessagesBetweenUsersForProduct(
    user1Id: number,
    user2Id: number,
    productId: number
  ): Promise<any[]> { // Changed to any[]
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

  // TODO: Fix Prisma typings for findConversationsByUserId
  /*
  static async findConversationsByUserId(userId: number): Promise<any[]> {
    const rawConversations: any[] = await prisma.chat.findMany({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
      include: {
        product: {
          select: {
            id: true,
            title: true,
            mainImage: true,
          },
        },
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
      orderBy: {
        createdAt: 'desc',
      },
    });

    const uniqueConversations = new Map<string, any>();

    for (const chat of rawConversations) {
      const otherParticipant = chat.senderId === userId ? chat.receiver : chat.sender;
      const conversationKey = `${chat.productId}-${otherParticipant.id}`;

      if (!uniqueConversations.has(conversationKey)) {
        uniqueConversations.set(conversationKey, {
          productId: chat.productId,
          productTitle: chat.product?.title,
          productImage: chat.product?.mainImage,
          otherParticipant: otherParticipant,
          lastMessage: chat,
        });
      }
    }

    return Array.from(uniqueConversations.values());
  }
  */
}
