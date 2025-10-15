import { Request, Response } from "express";
interface AuthenticatedRequest extends Request {
    user?: {
        id: number;
        email: string;
        role: string;
    };
}
export declare class UserController {
    static getAllUsers(req: AuthenticatedRequest, res: Response): Promise<void>;
    static getUserById(req: AuthenticatedRequest, res: Response): Promise<void>;
    static updateUserRole(req: AuthenticatedRequest, res: Response): Promise<void>;
    static deleteUser(req: AuthenticatedRequest, res: Response): Promise<void>;
}
export {};
//# sourceMappingURL=user.controller.d.ts.map