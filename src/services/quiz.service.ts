import { prisma } from "@/lib/db";
import { QuizCreationType } from "@/lib/validators/quiz";
import { IQuiz } from "@/types/quiz.interface";

export type QuestionType = {
  question: string;
  answer: string;
  option1: string;
  option2: string;
  option3: string;
};

export const SelectQuizObject = {
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

export const SelectFullQuizObject = {
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
          isCorrect: true,
        },
      },
    },
  },
};

export async function findQuizById(quizId: string): Promise<IQuiz | null> {
  return prisma.quiz.findUnique({
    where: { id: quizId },
    select: SelectQuizObject,
  });
}

export async function createQuiz({
  topic,
  creatorId,
  questions,
  type,
}: {
  topic: string;
  creatorId: string;
  questions: QuestionType[];
  type: QuizCreationType;
}) {
  return prisma.quiz.create({
    data: {
      topic,
      creatorId,
      isPublic: type === "create-and-share",
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

export async function getQuizzesByCreator(creatorId: string): Promise<IQuiz[]> {
  return prisma.quiz.findMany({
    where: { creatorId },
    select: SelectQuizObject,
  });
}

export async function getTopQuizzes(): Promise<IQuiz[]> {
  const quizzes = await prisma.quiz.findMany({
    where: {
      isPublic: true,
    },
    select: SelectQuizObject,
    take: 10,
    orderBy: {
      takes: {
        _count: "desc",
      },
    },
  });

  return quizzes;
}
