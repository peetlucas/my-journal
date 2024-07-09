import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      email: 'john.doe@example.com',
      username: 'johndoe',
      password: 'password123',
      entries: {
        create: [
          {
            title: 'My First Entry',
            content: 'This is the content of my first entry.',
            category: 'Personal',
          },
          {
            title: 'My Second Entry',
            content: 'This is the content of my second entry.',
            category: 'Work',
          },
        ],
      },
    },
  });

  console.log({ user });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
