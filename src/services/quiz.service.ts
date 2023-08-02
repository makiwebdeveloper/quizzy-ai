import { prisma } from "@/lib/db";
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

export async function getQuizById(quizId: string) {
  return prisma.quiz.findUnique({
    where: { id: quizId },
    select: SelectQuizObject,
  });
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
