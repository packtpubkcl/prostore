import 'dotenv/config';
import { prisma } from '../lib/db/prisma';
import sampleData from './sample-data';

async function main() {
  try {
    // Limpiar datos existentes
    await prisma.product.deleteMany();

    // Insertar datos de muestra
    await prisma.product.createMany({
      data: sampleData.products,
    });

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
