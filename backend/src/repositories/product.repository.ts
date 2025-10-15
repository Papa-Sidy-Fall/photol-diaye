import { PrismaClient, Product, ProductStatus } from "@prisma/client";

const prisma = new PrismaClient();

export class ProductRepository {
  static async create(data: {
    title: string;
    description?: string | null;
    price: number;
    whatsappLink?: string | null;
    phoneNumber?: string | null;
    mainImage: string;
    images: { create: { url: string }[] };
    seller: { connect: { id: number } };
    categoryId?: number | undefined; // Explicitly allow undefined
    status: ProductStatus;
  }): Promise<Product> {
    console.log("ProductRepository: Creating product with data:", data);
    try {
      const { categoryId, ...rest } = data;
      const product = await prisma.product.create({
        data: {
          ...rest,
          ...(categoryId !== undefined && categoryId !== null && { category: { connect: { id: categoryId } } }), // Conditionally add category only if it's a valid number
        },
      });
      console.log("ProductRepository: Product created successfully:", product);
      return product;
    } catch (error) {
      console.error("ProductRepository: Error in create:", error);
      throw error;
    }
  }

  static async findAll(status?: ProductStatus, skip: number = 0, take: number = 10, categoryId?: number, minPrice?: number, maxPrice?: number, sortBy?: string, search?: string): Promise<Product[]> {
    const whereClause: any = {};
    if (status) whereClause.status = status;
    if (categoryId) whereClause.categoryId = categoryId;
    if (minPrice !== undefined || maxPrice !== undefined) {
      whereClause.price = {};
      if (minPrice !== undefined) whereClause.price.gte = minPrice;
      if (maxPrice !== undefined) whereClause.price.lte = maxPrice;
    }
    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { seller: { email: { contains: search, mode: 'insensitive' } } }
      ];
    }

    let orderBy: any = [
      {
        vipPoints: {
          points: 'desc', // Order by VIP points in descending order
        },
      },
      {
        createdAt: 'desc', // Then by creation date
      },
    ];

    if (sortBy) {
      switch (sortBy) {
        case 'price_asc':
          orderBy = [{ price: 'asc' }];
          break;
        case 'price_desc':
          orderBy = [{ price: 'desc' }];
          break;
        case 'date_desc':
          orderBy = [{ createdAt: 'desc' }];
          break;
        case 'date_asc':
          orderBy = [{ createdAt: 'asc' }];
          break;
        case 'popularity':
          orderBy = [{ views: { _count: 'desc' } }];
          break;
        default:
          break;
      }
    }

    return prisma.product.findMany({
      where: whereClause,
      skip,
      take,
      include: {
        seller: {
          select: {
            id: true,
            email: true,
          },
        },
        category: true,
        images: true,
        views: true,
        favorites: true,
        vipPoints: true,
      },
      orderBy,
    });
  }

  static async findById(id: number): Promise<Product | null> {
    return prisma.product.findUnique({
      where: { id },
      include: {
        seller: {
          select: {
            id: true,
            email: true,
          },
        },
        category: true,
        images: true,
        views: true,
        favorites: true,
        vipPoints: true,
      },
    });
  }

  static async updateStatus(productId: number, status: ProductStatus): Promise<Product> {
    return prisma.product.update({
      where: { id: productId },
      data: { status },
    });
  }

  static async update(
    productId: number,
    data: {
      title?: string;
      description?: string | null;
      price?: number;
      whatsappLink?: string | null;
      phoneNumber?: string | null;
      mainImage?: string;
      images?: { create: { url: string }[] };
      categoryId?: number | undefined;
    }
  ): Promise<Product | null> {
    const { categoryId, images, ...rest } = data;
    return prisma.product.update({
      where: { id: productId },
      data: {
        ...rest,
        ...(categoryId !== undefined && { category: { connect: { id: categoryId } } }),
        ...(images && { images: { deleteMany: {}, create: images.create } }), // Clear existing images and add new ones
      },
    });
  }

  static async delete(productId: number): Promise<Product> {
    return prisma.product.delete({ where: { id: productId } });
  }

  static async countAll(status?: ProductStatus, categoryId?: number, minPrice?: number, maxPrice?: number, search?: string): Promise<number> {
    const whereClause: any = {};
    if (status) whereClause.status = status;
    if (categoryId) whereClause.categoryId = categoryId;
    if (minPrice !== undefined || maxPrice !== undefined) {
      whereClause.price = {};
      if (minPrice !== undefined) whereClause.price.gte = minPrice;
      if (maxPrice !== undefined) whereClause.price.lte = maxPrice;
    }
    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { seller: { email: { contains: search, mode: 'insensitive' } } }
      ];
    }

    return prisma.product.count({
      where: whereClause,
    });
  }
}
