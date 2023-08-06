import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/nextauth";
import { prisma } from "@/lib/db";
import { findAnswersByTake } from "@/services/answers.service";
import { findTakeByIds } from "@/services/take.service";

import StatisticsQuestion from "./components/StatisticsQuestion";
import StatisticsHeader from "./components/StatisticsHeader";

interface Props {
  params: {
    quizId: string;
  };
}

export default async function Statistics({ params: { quizId } }: Props) {
  const session = await getAuthSession();

  const take = await findTakeByIds({
    quizId,
    playerId: session?.user.id!,
  });

  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    select: {
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
    },
  });

  const answers = await findAnswersByTake({
    quizId,
    playerId: session?.user.id!,
  });

  if (!quiz || !take || answers.length === 0) {
    redirect("/dashboard");
  }

  return (
    <main className="container">
      <StatisticsHeader
        topic={quiz.topic}
        correctAnswersLength={
          answers.filter((answer) => answer.isCorrect).length
        }
        questionsLength={quiz.questions.length}
        startsAt={take.startsAt}
        endsAt={take.endsAt}
      />
      <section className="mx-auto max-w-4xl space-y-10 my-5 lg:mt-10">
        {quiz.questions.map((question, index) => (
          <StatisticsQuestion
            key={question.id}
            question={question}
            answers={answers}
            index={index + 1}
          />
        ))}
      </section>
    </main>
  );
}
