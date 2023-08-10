import { prisma } from "@/lib/db";
import { SelectFullQuizObject } from "@/services/quiz.service";
import { redirect } from "next/navigation";
import QuestionInfo from "./components/QuestionInfo";

interface Props {
  params: {
    quizId: string;
  };
}

export default async function QuizInfo({ params: { quizId } }: Props) {
  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    select: SelectFullQuizObject,
  });

  if (!quiz) {
    redirect("/dashboard");
  }

  return (
    <main className="container">
      <header className="flex flex-col sm:flex-row sm:items-center gap-5">
        <h1 className="title">Quiz info</h1>
        <p className="font-semibold">
          <span className="text-base sm:hidden">Topic:</span>
          <span className="ml-2 text-base bg-zinc-900 dark:bg-zinc-50 py-1 px-2 rounded-lg text-white dark:text-zinc-900">
            {quiz.topic}
          </span>
        </p>
      </header>
      <section className="mx-auto max-w-4xl my-5 space-y-5">
        {quiz.questions.map((question, index) => (
          <QuestionInfo
            key={question.id}
            question={question}
            index={index + 1}
          />
        ))}
      </section>
    </main>
  );
}
