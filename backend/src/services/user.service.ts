import { User, Role } from "@prisma/client";
import { UserRepository } from "../repositories/user.repository.js";

export class UserService {
  static async getAllUsers(): Promise<User[]> {
    return UserRepository.findAll();
  }

  static async getUserById(id: number): Promise<User | null> {
    return UserRepository.findById(id);
  }

  static async updateUserRole(id: number, role: Role): Promise<User> {
    return UserRepository.updateRole(id, role);
  }

  static async deleteUser(id: number): Promise<User> {
    return UserRepository.delete(id);
  }
}
