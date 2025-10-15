import { LikeService } from "../services/like.service.js";
export class LikeController {
    static async addLike(req, res) {
        const productId = Number(req.body.productId);
        const userId = req.user?.id;
        if (isNaN(productId) || !userId) {
            res.status(400).json({ message: "Missing or invalid productId or userId" });
            return;
        }
        try {
            const like = await LikeService.addLike(userId, productId);
            res.status(201).json(like);
        }
        catch (error) {
            if (error.message === "Product already liked") {
                res.status(409).json({ message: error.message });
            }
            else {
                console.error("Error adding like:", error);
                res.status(500).json({ message: "Something went wrong" });
            }
        }
    }
    static async removeLike(req, res) {
        const productId = Number(req.params.productId);
        const userId = req.user?.id;
        if (isNaN(productId) || !userId) {
            res.status(400).json({ message: "Missing or invalid productId or userId" });
            return;
        }
        try {
            const deletedLike = await LikeService.removeLike(userId, productId);
            res.status(200).json(deletedLike);
        }
        catch (error) {
            if (error.message === "Product not liked") {
                res.status(404).json({ message: error.message });
            }
            else {
                console.error("Error removing like:", error);
                res.status(500).json({ message: "Something went wrong" });
            }
        }
    }
    static async countLikesByProduct(req, res) {
        const productId = Number(req.params.productId);
        if (isNaN(productId)) {
            res.status(400).json({ message: "Missing or invalid productId" });
            return;
        }
        try {
            const count = await LikeService.countLikesByProduct(productId);
            res.status(200).json({ productId, count });
        }
        catch (error) {
            console.error("Error counting likes by product:", error);
            res.status(500).json({ message: "Something went wrong" });
        }
    }
    static async isProductLiked(req, res) {
        const productId = Number(req.params.productId);
        const userId = req.user?.id;
        if (isNaN(productId) || !userId) {
            res.status(400).json({ message: "Missing or invalid productId or userId" });
            return;
        }
        try {
            const isLiked = await LikeService.isProductLiked(userId, productId);
            res.status(200).json({ isLiked });
        }
        catch (error) {
            console.error("Error checking if product is liked:", error);
            res.status(500).json({ message: "Something went wrong" });
        }
    }
}
//# sourceMappingURL=like.controller.js.map