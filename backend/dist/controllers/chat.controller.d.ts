import { Request, Response } from "express";
interface AuthenticatedRequest extends Request {
    user?: {
        id: number;
        email: string;
        role: string;
    };
}
export declare class ChatController {
    static sendMessage(req: AuthenticatedRequest, res: Response): Promise<void>;
    static getMessagesBetweenUsersForProduct(req: AuthenticatedRequest, res: Response): Promise<void>;
    static getUserConversations(req: AuthenticatedRequest, res: Response): Promise<void>;
}
export {};
//# sourceMappingURL=chat.controller.d.ts.map