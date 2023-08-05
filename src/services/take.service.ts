import { prisma } from "@/lib/db";
import { ITake } from "@/types/take.interface";

export async function findOrCreateTake({
  playerId,
  quizId,
}: {
  playerId: string;
  quizId: string;
}): Promise<ITake> {
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

export async function findTakeByIds({
  quizId,
  playerId,
}: {
  quizId: string;
  playerId: string;
}): Promise<ITake | null> {
  return prisma.take.findUnique({
    where: {
      quizId_playerId: {
        quizId,
        playerId,
      },
    },
  });
}
