import { prisma } from "@/lib/db";
import { SelectFullQuizObject } from "@/services/quiz.service";
import { redirect } from "next/navigation";
import QuestionInfo from "./components/QuestionInfo";
import QuizInfoHeader from "./components/QuizInfoHeader";

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
      <QuizInfoHeader topic={quiz.topic} />
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
