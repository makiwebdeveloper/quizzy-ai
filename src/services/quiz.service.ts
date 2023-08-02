import { prisma } from "@/lib/db";

export async function createQuiz() {
  const userId = "userid";

  const quiz = await prisma.quiz.create({
    data: {
      topic: "TypeScript",
      creatorId: userId,
    },
  });

  const question = await prisma.question.create({
    data: {
      text: "What 2+2?",
      quizId: quiz.id,
    },
  });

  const option1 = await prisma.option.create({
    data: {
      text: "1",
      questionId: question.id,
    },
  });

  const option2 = await prisma.option.create({
    data: {
      text: "4",
      isCorrect: true,
      questionId: question.id,
    },
  });

  const option3 = await prisma.option.create({
    data: {
      text: "6",
      questionId: question.id,
    },
  });

  return quiz.id;
}

export async function createTake(quizId: string) {
  const userId = "userid";

  const take = await prisma.take.create({
    data: {
      quizId,
      playerId: userId,
    },
  });
}

export async function createAnswer(takeId: string, optionId: string) {
  const userId = "userid";

  const answer = await prisma.answer.create({
    data: {
      playerId: userId,
      takeId,
      optionId,
    },
  });
}
