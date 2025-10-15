import { Request, Response } from "express";
import { ChatService } from "../services/chat.service.js";

interface AuthenticatedRequest extends Request {
  user?: { id: number; email: string; role: string };
}

export class ChatController {
  static async sendMessage(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { receiverId, productId, message } = req.body;
    const senderId = req.user?.id;

    if (isNaN(receiverId) || isNaN(productId) || !message || !senderId) {
      res.status(400).json({ message: "Missing or invalid receiverId, productId, message, or senderId" });
      return;
    }

    try {
      const chat = await ChatService.sendMessage(senderId, receiverId, productId, message);
      res.status(201).json(chat);
    } catch (error: any) {
      console.error("Error sending message:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  static async getMessagesBetweenUsersForProduct(req: AuthenticatedRequest, res: Response): Promise<void> {
    const user2Id = Number(req.params.user2Id);
    const productId = Number(req.params.productId);
    const user1Id = req.user?.id;

    if (isNaN(user2Id) || isNaN(productId) || !user1Id) {
      res.status(400).json({ message: "Missing or invalid user2Id, productId, or user1Id" });
      return;
    }

    try {
      const messages = await ChatService.getMessagesBetweenUsersForProduct(user1Id, user2Id, productId);
      res.status(200).json(messages);
    } catch (error: any) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  static async getUserConversations(req: AuthenticatedRequest, res: Response): Promise<void> {
    const userId = req.user?.id;

    if (!userId) {
      res.status(400).json({ message: "Missing userId" });
      return;
    }

    try {
      const conversations = await ChatService.getUserConversations(userId);
      res.status(200).json(conversations);
    } catch (error: any) {
      console.error("Error fetching user conversations:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}
