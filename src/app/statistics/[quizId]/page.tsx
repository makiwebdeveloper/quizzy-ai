import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { findAnswersByTake } from "@/services/answers.service";
import { findQuizById } from "@/services/quiz.service";
import { findTakeByIds } from "@/services/take.service";
import { redirect } from "next/navigation";

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

  const quiz = await findQuizById(quizId);

  const answers = await findAnswersByTake({
    quizId,
    playerId: session?.user.id!,
  });

  if (!quiz || !take || answers.length === 0) {
    redirect("/dashboard");
  }

  return (
    <main className="container">
      <div className="flex items-center justify-between">
        <h1 className="title flex items-center">
          Statistics of quiz{" "}
          <span className="ml-5 text-base bg-zinc-900 dark:bg-zinc-50 py-1 px-2 rounded-lg text-white dark:text-zinc-900">
            {quiz.topic}
          </span>
        </h1>
        <p className="font-semibold">
          Total score:{" "}
          <span className="ml-2 bg-zinc-900 dark:bg-zinc-50 py-1 px-2 rounded-lg text-white dark:text-zinc-900">
            {answers.filter((answer) => answer.isCorrect).length}/
            {quiz.questions.length}
          </span>
        </p>
      </div>
      {/* <pre className="bg-green-100">{JSON.stringify(take, null, 2)}</pre>
      <pre className="bg-red-100">{JSON.stringify(answers, null, 2)}</pre>
      <pre className="bg-blue-100">{JSON.stringify(quiz, null, 2)}</pre> */}
    </main>
  );
}
