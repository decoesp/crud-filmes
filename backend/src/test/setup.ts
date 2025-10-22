import { beforeAll, afterAll, afterEach } from 'vitest';
import { prisma } from '../config/database';

beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET = 'test-secret';
  process.env.AWS_REGION = 'us-east-1';
  process.env.AWS_BUCKET_NAME = 'test-bucket';
});

afterEach(async () => {
  const tablenames = await prisma.$queryRaw<Array<{ tablename: string }>>`
    SELECT tablename FROM pg_tables WHERE schemaname='public'
  `;

  for (const { tablename } of tablenames) {
    if (tablename !== '_prisma_migrations') {
      try {
        await prisma.$executeRawUnsafe(`TRUNCATE TABLE "public"."${tablename}" CASCADE;`);
      } catch (error) {
        console.log({ error });
      }
    }
  }
});

afterAll(async () => {
  await prisma.$disconnect();
});
