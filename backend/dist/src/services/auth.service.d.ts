import { Role } from "@prisma/client";
export declare class AuthService {
    static register(email: string, password: string, role: Role): Promise<{
        token: string;
        user: {
            id: number;
            email: string;
            role: import("@prisma/client").$Enums.Role;
        };
    }>;
    static login(email: string, password: string): Promise<{
        token: string;
        user: {
            id: number;
            email: string;
            role: import("@prisma/client").$Enums.Role;
        };
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map