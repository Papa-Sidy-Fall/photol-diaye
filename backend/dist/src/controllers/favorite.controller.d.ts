import { Request, Response } from "express";
interface AuthenticatedRequest extends Request {
    user?: {
        id: number;
        email: string;
        role: string;
    };
}
export declare class FavoriteController {
    static addFavorite(req: AuthenticatedRequest, res: Response): Promise<void>;
    static removeFavorite(req: AuthenticatedRequest, res: Response): Promise<void>;
    static getFavoritesByUserId(req: AuthenticatedRequest, res: Response): Promise<void>;
    static isProductFavorite(req: AuthenticatedRequest, res: Response): Promise<void>;
}
export {};
//# sourceMappingURL=favorite.controller.d.ts.map