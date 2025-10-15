import type { Chat } from "@prisma/client";
export declare class ChatService {
    static sendMessage(senderId: number, receiverId: number, productId: number, message: string): Promise<Chat>;
    static getMessagesBetweenUsersForProduct(user1Id: number, user2Id: number, productId: number): Promise<Chat[]>;
    static getUserConversations(userId: number): Promise<any[]>;
}
//# sourceMappingURL=chat.service.d.ts.map