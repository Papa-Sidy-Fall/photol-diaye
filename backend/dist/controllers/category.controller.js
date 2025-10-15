import { CategoryService } from "../services/category.service.js";
export class CategoryController {
    static async createCategory(req, res) {
        const { name } = req.body;
        if (!name) {
            res.status(400).json({ message: "Category name is required" });
            return;
        }
        try {
            const category = await CategoryService.createCategory(name);
            res.status(201).json(category);
        }
        catch (error) {
            if (error.message === "Category with this name already exists") {
                res.status(409).json({ message: error.message });
            }
            else {
                console.error("Error creating category:", error);
                res.status(500).json({ message: "Something went wrong" });
            }
        }
    }
    static async getCategories(req, res) {
        try {
            const categories = await CategoryService.getCategories();
            res.status(200).json(categories);
        }
        catch (error) {
            console.error("Error fetching categories:", error);
            res.status(500).json({ message: "Something went wrong" });
        }
    }
    static async getCategoryById(req, res) {
        const categoryId = Number(req.params.id);
        if (isNaN(categoryId)) {
            res.status(400).json({ message: "Invalid category ID" });
            return;
        }
        try {
            const category = await CategoryService.getCategoryById(categoryId);
            if (!category) {
                res.status(404).json({ message: "Category not found" });
                return;
            }
            res.status(200).json(category);
        }
        catch (error) {
            console.error("Error fetching category by ID:", error);
            res.status(500).json({ message: "Something went wrong" });
        }
    }
    static async deleteCategory(req, res) {
        const categoryId = Number(req.params.id);
        if (isNaN(categoryId)) {
            res.status(400).json({ message: "Invalid category ID" });
            return;
        }
        try {
            const deletedCategory = await CategoryService.deleteCategory(categoryId);
            res.status(200).json(deletedCategory);
        }
        catch (error) {
            console.error("Error deleting category:", error);
            res.status(500).json({ message: "Something went wrong" });
        }
    }
}
//# sourceMappingURL=category.controller.js.map