import { Request, Response } from "express";
interface AuthenticatedRequest extends Request {
    user?: {
        id: number;
        email: string;
        role: string;
    };
}
export declare class LikeController {
    static addLike(req: AuthenticatedRequest, res: Response): Promise<void>;
    static removeLike(req: AuthenticatedRequest, res: Response): Promise<void>;
    static countLikesByProduct(req: Request, res: Response): Promise<void>;
    static isProductLiked(req: AuthenticatedRequest, res: Response): Promise<void>;
}
export {};
//# sourceMappingURL=like.controller.d.ts.map