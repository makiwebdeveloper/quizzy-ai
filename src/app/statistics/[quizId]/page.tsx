import { getAuthSession } from "@/lib/nextauth";
import { findAnswersByTake } from "@/services/answers.service";
import { SelectQuizObject, findQuizById } from "@/services/quiz.service";
import { findTakeByIds } from "@/services/take.service";
import { redirect } from "next/navigation";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { prisma } from "@/lib/db";
import { formatTime } from "@/utils/timeFormater";
import { differenceInSeconds } from "date-fns";

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
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-0 lg:items-center justify-between">
        <h1 className="title flex flex-col lg:flex-row items-start gap-5 lg:gap-0 lg:items-center">
          Statistics of quiz{" "}
          <span className="flex items-center">
            <span className="text-base mr-2 lg:hidden">Topic:</span>
            <span className="lg:ml-5 text-base bg-zinc-900 dark:bg-zinc-50 py-1 px-2 rounded-lg text-white dark:text-zinc-900">
              {quiz.topic}
            </span>
          </span>
        </h1>
        <div className="lg:space-y-2 space-y-5">
          <p className="font-semibold">
            Total score:{" "}
            <span className="ml-2 bg-zinc-900 dark:bg-zinc-50 py-1 px-2 rounded-lg text-white dark:text-zinc-900">
              {answers.filter((answer) => answer.isCorrect).length}/
              {quiz.questions.length}
            </span>
          </p>
          <p className="font-semibold">
            Time:{" "}
            <span className="ml-2 bg-zinc-900 dark:bg-zinc-50 py-1 px-2 rounded-lg text-white dark:text-zinc-900">
              {formatTime(differenceInSeconds(take.endsAt!, take.startsAt))}
            </span>
          </p>
        </div>
      </div>
      <section className="mx-auto max-w-4xl space-y-10 my-5 lg:mt-10">
        {quiz.questions.map((question, index) => (
          <div key={question.id}>
            <Card>
              <CardHeader className="flex flex-row items-center gap-5 bg-zinc-100 hover:bg-zinc-100/80 dark:bg-zinc-800 dark:hover:bg-zinc-800/80 rounded-md">
                <CardTitle>{index + 1}</CardTitle>
                <CardDescription className="text-lg font-semibold">
                  {question.text}
                </CardDescription>
              </CardHeader>
            </Card>
            <div className="mt-5 space-y-5">
              {question.options.map((option) => (
                <div
                  key={option.id}
                  className={cn(
                    "text-center px-4 py-2 rounded-md border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950",
                    answers.find((answer) => answer.optionId === option.id) &&
                      "bg-red-200 dark:bg-red-500",
                    option.isCorrect && "bg-green-200 dark:bg-green-500"
                  )}
                >
                  {option.text}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
