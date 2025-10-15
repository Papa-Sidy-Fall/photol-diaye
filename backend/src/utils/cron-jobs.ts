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
        // Define inactivity threshold (7 days as per requirements)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        if (product.createdAt < sevenDaysAgo) {
          // If product is older than 7 days and still pending, deactivate it
          await ProductService.updateProductStatus(product.id, ProductStatus.DEACTIVATED);
          console.log(`Deactivated inactive product: ${product.title} (ID: ${product.id})`);
        }
      }
      console.log('Inactive product deactivation cron job completed.');
    } catch (error) {
      console.error('Error during inactive product deactivation cron job:', error);
    }
  });
};
