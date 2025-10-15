import { ChatService } from "../services/chat.service.js";
export class ChatController {
    static async sendMessage(req, res) {
        const { receiverId, productId, message } = req.body;
        const senderId = req.user?.id;
        if (isNaN(receiverId) || isNaN(productId) || !message || !senderId) {
            res.status(400).json({ message: "Missing or invalid receiverId, productId, message, or senderId" });
            return;
        }
        try {
            const chat = await ChatService.sendMessage(senderId, receiverId, productId, message);
            res.status(201).json(chat);
        }
        catch (error) {
            console.error("Error sending message:", error);
            res.status(500).json({ message: "Something went wrong" });
        }
    }
    static async getMessagesBetweenUsersForProduct(req, res) {
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
        }
        catch (error) {
            console.error("Error fetching messages:", error);
            res.status(500).json({ message: "Something went wrong" });
        }
    }
    static async getUserConversations(req, res) {
        const userId = req.user?.id;
        if (!userId) {
            res.status(400).json({ message: "Missing userId" });
            return;
        }
        try {
            const conversations = await ChatService.getUserConversations(userId);
            res.status(200).json(conversations);
        }
        catch (error) {
            console.error("Error fetching user conversations:", error);
            res.status(500).json({ message: "Something went wrong" });
        }
    }
}
//# sourceMappingURL=chat.controller.js.map