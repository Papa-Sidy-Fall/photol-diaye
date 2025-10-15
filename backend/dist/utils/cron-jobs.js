import cron from 'node-cron';
import { ProductService } from '../services/product.service.js';
import { ProductStatus } from '@prisma/client';
export const setupCronJobs = () => {
    // Schedule a task to run every day at 2 AM
    cron.schedule('0 2 * * *', async () => {
        console.log('Running daily cron job for inactive product deletion...');
        try {
            // Get all pending products
            const inactiveProducts = await ProductService.getProducts(ProductStatus.PENDING);
            for (const product of inactiveProducts) {
                // Define inactivity threshold (e.g., 30 days)
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                if (product.createdAt < thirtyDaysAgo) {
                    // If product is older than 30 days and still pending, delete it
                    await ProductService.deleteProduct(product.id);
                    console.log(`Deleted inactive product: ${product.title} (ID: ${product.id})`);
                }
            }
            console.log('Inactive product deletion cron job completed.');
        }
        catch (error) {
            console.error('Error during inactive product deletion cron job:', error);
        }
    });
};
//# sourceMappingURL=cron-jobs.js.map