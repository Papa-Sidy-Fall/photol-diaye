import express from "express";
import { PrismaClient } from "@prisma/client";
import authRoutes from "./routes/auth.js"; // Import auth routes
import productRoutes from "./routes/product.routes.js"; // Import product routes
import vipPointsRoutes from "./routes/vip-points.routes.js"; // Import VIP points routes
import viewRoutes from "./routes/view.routes.js"; // Import view routes
import categoryRoutes from "./routes/category.routes.js"; // Import category routes
import favoriteRoutes from "./routes/favorite.routes.js"; // Import favorite routes
import likeRoutes from "./routes/like.routes.js"; // Import like routes
import userRoutes from "./routes/user.routes.js"; // Import user routes
import chatRoutes from "./routes/chat.routes.js"; // Import chat routes
import cors from "cors"; // Import cors
import { setupCronJobs } from "./utils/cron-jobs.js"; // Import cron jobs setup
const app = express();
const prisma = new PrismaClient();
app.use(express.json({ limit: '50mb' })); // Increase limit for image uploads
app.use(express.urlencoded({ limit: '50mb', extended: true })); // For URL-encoded bodies
app.use(cors({
    origin: "http://localhost:4200", // Allow requests from your Angular frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.get("/", (req, res) => {
    res.send("🚀 Serveur Express + TypeScript prêt !");
});
// Use auth routes
app.use("/api/auth", authRoutes);
// Use product routes
app.use("/api/products", productRoutes);
// Use VIP points routes
app.use("/api/vip-points", vipPointsRoutes);
// Use view routes
app.use("/api/views", viewRoutes);
// Use category routes
app.use("/api/categories", categoryRoutes);
// Use favorite routes
app.use("/api/favorites", favoriteRoutes);
// Use like routes
app.use("/api/likes", likeRoutes);
// Use user routes
app.use("/api/users", userRoutes);
// Use chat routes
app.use("/api/chats", chatRoutes);
// Setup cron jobs
setupCronJobs();
// Test route for database connection
app.get("/test-db", async (req, res) => {
    try {
        await prisma.$connect();
        res.status(200).send("Connexion à la base de données réussie !");
    }
    catch (error) {
        console.error("Erreur de connexion à la base de données:", error);
        res.status(500).send("Erreur de connexion à la base de données.");
    }
    finally {
        await prisma.$disconnect();
    }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur lancé sur http://localhost:${PORT}`));
//# sourceMappingURL=index.js.map