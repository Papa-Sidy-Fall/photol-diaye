import { UserService } from "../services/user.service.js";
import { Role } from "@prisma/client";
export class UserController {
    static async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();
            res.status(200).json(users);
        }
        catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).json({ message: "Something went wrong" });
        }
    }
    static async getUserById(req, res) {
        const userId = Number(req.params.id);
        if (isNaN(userId)) {
            res.status(400).json({ message: "Invalid user ID" });
            return;
        }
        try {
            const user = await UserService.getUserById(userId);
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.status(200).json(user);
        }
        catch (error) {
            console.error("Error fetching user by ID:", error);
            res.status(500).json({ message: "Something went wrong" });
        }
    }
    static async updateUserRole(req, res) {
        const userId = Number(req.params.id);
        const { role } = req.body;
        if (isNaN(userId) || !role || !Object.values(Role).includes(role)) {
            res.status(400).json({ message: "Invalid user ID or role" });
            return;
        }
        try {
            const updatedUser = await UserService.updateUserRole(userId, role);
            res.status(200).json(updatedUser);
        }
        catch (error) {
            console.error("Error updating user role:", error);
            res.status(500).json({ message: "Something went wrong" });
        }
    }
    static async deleteUser(req, res) {
        const userId = Number(req.params.id);
        if (isNaN(userId)) {
            res.status(400).json({ message: "Invalid user ID" });
            return;
        }
        try {
            const deletedUser = await UserService.deleteUser(userId);
            res.status(200).json(deletedUser);
        }
        catch (error) {
            console.error("Error deleting user:", error);
            res.status(500).json({ message: "Something went wrong" });
        }
    }
}
//# sourceMappingURL=user.controller.js.map