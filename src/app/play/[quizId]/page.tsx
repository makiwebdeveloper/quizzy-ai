import { getAuthSession } from "@/lib/nextauth";
import { getQuizById } from "@/services/quiz.service";
import { findOrCreateTake } from "@/services/take.service";
import { redirect } from "next/navigation";

interface Props {
  params: {
    quizId: string;
  };
}

export default async function Play({ params: { quizId } }: Props) {
  const session = await getAuthSession();

  const quiz = await getQuizById(quizId);

  if (!quiz) {
    redirect("/dashboard");
  }

  const take = await findOrCreateTake({
    playerId: session?.user.id!,
    quizId,
  });

  return (
    <>
      <pre>{JSON.stringify(take, null, 2)}</pre>
      <pre>{JSON.stringify(quiz, null, 2)}</pre>
    </>
  );
}
