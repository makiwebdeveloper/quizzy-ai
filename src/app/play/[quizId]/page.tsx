import PlayQuiz from "@/components/PlayQuiz";
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

  return (
    <main className="absolute top-0 left-0 h-screen w-screen center">
      <PlayQuiz quiz={quiz} take={take} user={session.user} />
    </main>
  );
}
