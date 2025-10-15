import { Request, Response } from "express";
import { ProductService } from "../services/product.service.js";
import { ViewService } from "../services/view.service.js"; // Import ViewService
import { ProductStatus } from "@prisma/client";

export class ProductController {
  static async createProduct(req: Request, res: Response): Promise<void> {
    const {
      title,
      description,
      price,
      whatsappLink,
      phoneNumber,
      mainImage,
      images,
      sellerId,
      categoryId,
    } = req.body;

    if (!title || !price || !sellerId || !mainImage) {
      res.status(400).json({ message: "Missing required product fields" });
      return;
    }

    try {
      const product = await ProductService.createProduct(
        title,
        description || undefined, // Allow undefined
        price,
        whatsappLink || undefined, // Allow undefined
        phoneNumber || undefined, // Allow undefined
        mainImage,
        images,
        sellerId,
        categoryId || undefined // Allow undefined
      );
      res.status(201).json(product);
    } catch (error: any) {
      console.error("Error creating product:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  static async getProducts(req: Request, res: Response): Promise<void> {
    const status = req.query.status as string | undefined;
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const categoryId = req.query.categoryId ? Number(req.query.categoryId) : undefined;
    const minPrice = req.query.minPrice ? Number(req.query.minPrice) : undefined;
    const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : undefined;
    const sortBy = req.query.sortBy as string | undefined;
    const search = req.query.search as string | undefined;

    // Validate status enum
    let validStatus: ProductStatus | undefined;
    if (status && Object.values(ProductStatus).includes(status as ProductStatus)) {
      validStatus = status as ProductStatus;
    }

    try {
      const { products, total } = await ProductService.getProducts(validStatus, page, pageSize, categoryId, minPrice, maxPrice, sortBy, search);
      res.status(200).json({ products, total });
    } catch (error: any) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  static async getProductById(req: Request, res: Response): Promise<void> {
    const productId = Number(req.params.id);
    try {
      const product = await ProductService.getProductById(productId);
      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }
      // Record a view for the product
      await ViewService.createView(productId);
      res.status(200).json(product);
    } catch (error: any) {
      console.error("Error fetching product by ID:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  static async updateProductStatus(req: Request, res: Response): Promise<void> {
    const productId = Number(req.params.id);
    const { status } = req.body;

    if (!status || !Object.values(ProductStatus).includes(status)) {
      res.status(400).json({ message: "Invalid product status" });
      return;
    }

    try {
      const updatedProduct = await ProductService.updateProductStatus(productId, status);
      res.status(200).json(updatedProduct);
    } catch (error: any) {
      console.error("Error updating product status:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  static async updateProduct(req: Request, res: Response): Promise<void> {
    const productId = Number(req.params.id);
    const {
      title,
      description,
      price,
      whatsappLink,
      phoneNumber,
      mainImage,
      images,
      categoryId,
    } = req.body;

    try {
      const updatedProduct = await ProductService.updateProduct(
        productId,
        title,
        description || undefined,
        price,
        whatsappLink || undefined,
        phoneNumber || undefined,
        mainImage,
        images,
        categoryId || undefined
      );

      if (!updatedProduct) {
        res.status(404).json({ message: "Product not found" });
        return;
      }
      res.status(200).json(updatedProduct);
    } catch (error: any) {
      console.error("Error updating product:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  static async deleteProduct(req: Request, res: Response): Promise<void> {
    const productId = Number(req.params.id);
    try {
      const deletedProduct = await ProductService.deleteProduct(productId);
      res.status(200).json(deletedProduct);
    } catch (error: any) {
      console.error("Error deleting product:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}
