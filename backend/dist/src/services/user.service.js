import { UserRepository } from "../repositories/user.repository.js";
export class UserService {
    static async getAllUsers() {
        return UserRepository.findAll();
    }
    static async getUserById(id) {
        return UserRepository.findById(id);
    }
    static async updateUserRole(id, role) {
        return UserRepository.updateRole(id, role);
    }
    static async deleteUser(id) {
        return UserRepository.delete(id);
    }
}
//# sourceMappingURL=user.service.js.map