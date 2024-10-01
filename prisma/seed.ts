import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  const sqlQueries = fs.readFileSync('./prisma/data/seed.sql', 'utf8');
  const queries = sqlQueries
    .split(';')
    .map((query) => query.trim())
    .filter(Boolean);

  for (const query of queries) {
    try {
      await prisma.$executeRawUnsafe(query);
    } catch (e) {
      console.error('Failed to execute query:', e);
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Failed to seed database:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
