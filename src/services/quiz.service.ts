import { prisma } from "@/lib/db";
import { IQuiz } from "@/types/quiz.interface";
import { Prisma } from "@prisma/client";

export type QuestionType = {
  question: string;
  answer: string;
  option1: string;
  option2: string;
  option3: string;
};

export const SelectQuizObject: Prisma.QuizSelect = {
  id: true,
  topic: true,
  isPublic: true,
  creatorId: true,
  questions: {
    select: {
      id: true,
      text: true,
      options: {
        select: {
          id: true,
          text: true,
        },
      },
    },
  },
};

export async function findQuizById(quizId: string): Promise<IQuiz | null> {
  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    select: SelectQuizObject,
  });

  return quiz as IQuiz | null;
}

export async function createQuiz({
  topic,
  creatorId,
  questions,
}: {
  topic: string;
  creatorId: string;
  questions: QuestionType[];
}) {
  return prisma.quiz.create({
    data: {
      topic,
      creatorId,
      questions: {
        createMany: {
          data: questions.map((question) => ({
            text: question.question,
          })),
        },
      },
    },
    include: {
      questions: {
        select: {
          id: true,
          text: true,
          options: {
            select: {
              id: true,
              text: true,
            },
          },
        },
      },
    },
  });
}
