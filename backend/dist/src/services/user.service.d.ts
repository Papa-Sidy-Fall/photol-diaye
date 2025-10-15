import { User, Role } from "@prisma/client";
export declare class UserService {
    static getAllUsers(): Promise<User[]>;
    static getUserById(id: number): Promise<User | null>;
    static updateUserRole(id: number, role: Role): Promise<User>;
    static deleteUser(id: number): Promise<User>;
}
//# sourceMappingURL=user.service.d.ts.map