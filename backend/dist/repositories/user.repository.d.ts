import { User, Role } from "@prisma/client";
export declare class UserRepository {
    static findByEmail(email: string): Promise<User | null>;
    static create(email: string, passwordHash: string, role: Role): Promise<User>;
    static findAll(): Promise<User[]>;
    static findById(id: number): Promise<User | null>;
    static updateRole(id: number, role: Role): Promise<User>;
    static delete(id: number): Promise<User>;
}
//# sourceMappingURL=user.repository.d.ts.map