import type { Chat } from "@prisma/client"; // Import Chat as a type
import { ChatRepository } from "../repositories/chat.repository.js";

export class ChatService {
  static async sendMessage(senderId: number, receiverId: number, productId: number, message: string): Promise<Chat> {
    return ChatRepository.create(senderId, receiverId, productId, message);
  }

  static async getMessagesBetweenUsersForProduct(user1Id: number, user2Id: number, productId: number): Promise<Chat[]> {
    return ChatRepository.findMessagesBetweenUsersForProduct(user1Id, user2Id, productId);
  }

  static async getUserConversations(userId: number): Promise<any[]> {
    // TODO: Uncomment and fix typings for ChatRepository.findConversationsByUserId(userId);
    return []; // Temporary return empty array
  }
}
