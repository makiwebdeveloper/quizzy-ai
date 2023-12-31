import { prisma } from "@/lib/db";
import { IFullTake, ITake } from "@/types/take.interface";
import { SelectQuizObject } from "./quiz.service";

export const SelectTakeObject = {
  startsAt: true,
  endsAt: true,
  quiz: {
    select: SelectQuizObject,
  },
  player: {
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
    },
  },
  answers: {
    select: {
      id: true,
      isCorrect: true,
      playerId: true,
      optionId: true,
    },
  },
};

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

export async function getTakesByQuiz(quizId: string): Promise<IFullTake[]> {
  return prisma.take.findMany({
    where: {
      quizId,
    },
    select: SelectTakeObject,
  });
}

export async function getTakesByPlayer(
  playerId: string,
  take?: number
): Promise<IFullTake[]> {
  return prisma.take.findMany({
    where: {
      playerId,
    },
    select: SelectTakeObject,
    orderBy: {
      startsAt: "desc",
    },
    take,
  });
}
