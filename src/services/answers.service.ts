import { prisma } from "@/lib/db";
import { IAnswer } from "@/types/answer.interface";
import { Prisma } from "@prisma/client";

export const SelectAnswerObject: Prisma.AnswerSelect = {
  id: true,
  isCorrect: true,
  option: {
    select: {
      id: true,
    },
  },
};

export async function findAnswersByTake({
  quizId,
  playerId,
}: {
  quizId: string;
  playerId: string;
}): Promise<IAnswer[]> {
  const fetchedAnswers = await prisma.answer.findMany({
    where: {
      takePlayerId: playerId,
      takeQuizId: quizId,
    },
    select: SelectAnswerObject,
  });

  const answers: IAnswer[] = fetchedAnswers.map((answer) => ({
    id: answer.id!,
    isCorrect: answer.isCorrect!,
    optionId: answer.option?.id!,
  }));

  return answers;
}
