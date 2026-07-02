import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create sample courses
  const course1 = await prisma.course.create({
    data: {
      title: 'Money Basics',
      description: 'Learn the fundamentals of personal finance',
      slug: 'money-basics',
      category: 'basics',
      level: 'beginner',
      duration: 180,
      content: 'Course content here',
      isPublished: true,
      keyTakeaways: ['Understanding money', 'Financial goals'],
      learningPath: ['beginner_path', 'student_path'],
    },
  });

  // Create sample badges
  await prisma.badge.create({
    data: {
      title: 'First Steps',
      description: 'Complete your first lesson',
      icon: 'https://example.com/badge.png',
      criteria: 'Complete 1 lesson',
      rarity: 'common',
    },
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
