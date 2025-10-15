import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create an admin user
  const adminEmail = 'admin@example.com';
  const adminPassword = 'adminpassword'; // You should use a strong password in production
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
      role: 'ADMIN',
    },
    create: {
      email: adminEmail,
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log(`Admin user created/updated: ${adminUser.email}`);

  // Create some default categories
  const categoriesData = [
    { name: 'Électronique' },
    { name: 'Vêtements' },
    { name: 'Maison et Jardin' },
    { name: 'Véhicules' },
    { name: 'Services' },
  ];

  for (const categoryData of categoriesData) {
    await prisma.category.upsert({
      where: { name: categoryData.name },
      update: {},
      create: categoryData,
    });
    console.log(`Category created/updated: ${categoryData.name}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
