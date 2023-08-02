import { prisma } from "@/lib/db";

export async function findOrCreateTake({
  playerId,
  quizId,
}: {
  playerId: string;
  quizId: string;
}) {
  return prisma.take.upsert({
    where: {
      quizId_playerId: {
        playerId,
        quizId,
      },
    },
    update: {},
    create: {
      quizId,
      playerId,
    },
  });
}
