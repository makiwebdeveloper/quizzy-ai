import { prisma } from "@/lib/db";
import { IAnswer } from "@/types/answer.interface";
import { Prisma } from "@prisma/client";

export const SelectAnswerObject: Prisma.AnswerSelect = {
  id: true,
  isCorrect: true,
};

export async function findAnswersByTake({
  quizId,
  playerId,
}: {
  quizId: string;
  playerId: string;
}): Promise<IAnswer[]> {
  const answers = (await prisma.answer.findMany({
    where: {
      takePlayerId: playerId,
      takeQuizId: quizId,
    },
    select: SelectAnswerObject,
  })) as IAnswer[];

  return answers;
}
