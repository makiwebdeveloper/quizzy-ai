import PlayQuiz from "@/components/PlayQuiz";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { SelectQuizObject, findQuizById } from "@/services/quiz.service";
import { findOrCreateTake } from "@/services/take.service";
import { redirect } from "next/navigation";

interface Props {
  params: {
    quizId: string;
  };
}

export default async function Play({ params: { quizId } }: Props) {
  const session = await getAuthSession();

  const quiz = await findQuizById(quizId);

  if (
    !quiz ||
    !session?.user ||
    (!quiz.isPublic && session?.user.id !== quiz.creatorId)
  ) {
    redirect("/dashboard");
  }

  const take = await findOrCreateTake({
    playerId: session?.user.id!,
    quizId,
  });

  if (take.endsAt) {
    redirect(`/statistics/${quiz.id}`);
  }

  const answers = await prisma.answer.findMany({
    where: {
      takePlayerId: session.user.id,
      takeQuizId: quizId,
    },
    select: {
      id: true,
      isCorrect: true,
      option: true,
      playerId: true,
    },
  });

  let initialQuestionIndex = 0;

  answers.forEach((answer) => {
    const questionId = answer.option.questionId;
    const questions = quiz.questions;

    if (questions.find((question) => question.id === questionId)) {
      initialQuestionIndex += 1;
    }
  });

  return (
    <main className="absolute top-0 left-0 h-screen w-screen center">
      <PlayQuiz
        quiz={quiz}
        startsAt={take.startsAt}
        initialQuestionIndex={initialQuestionIndex}
      />
    </main>
  );
}
