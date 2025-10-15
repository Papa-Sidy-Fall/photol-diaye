export declare class ChatRepository {
    static create(senderId: number, receiverId: number, productId: number, message: string): Promise<any>;
    static findMessagesBetweenUsersForProduct(user1Id: number, user2Id: number, productId: number): Promise<any[]>;
}
//# sourceMappingURL=chat.repository.d.ts.map