import { ChatRepository } from "../repositories/chat.repository.js";
export class ChatService {
    static async sendMessage(senderId, receiverId, productId, message) {
        return ChatRepository.create(senderId, receiverId, productId, message);
    }
    static async getMessagesBetweenUsersForProduct(user1Id, user2Id, productId) {
        return ChatRepository.findMessagesBetweenUsersForProduct(user1Id, user2Id, productId);
    }
    static async getUserConversations(userId) {
        // TODO: Uncomment and fix typings for ChatRepository.findConversationsByUserId(userId);
        return []; // Temporary return empty array
    }
}
//# sourceMappingURL=chat.service.js.map