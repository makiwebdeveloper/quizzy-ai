import { getAuthSession } from "@/lib/nextauth";
import { getQuizzesByCreator } from "@/services/quiz.service";

import MyQuizzesHeader from "./components/MyQuizzesHeader";
import MyQuizzesItems from "./components/MyQuizzesItems";
import { prisma } from "@/lib/db";

export default async function MyQuizzes() {
  const session = await getAuthSession();

  const quizzes = await getQuizzesByCreator(session?.user.id!);
  const takes = await prisma.take.findMany({
    where: {
      playerId: session?.user.id,
    },
  });

  return (
    <main className="container">
      <MyQuizzesHeader />
      <MyQuizzesItems quizzes={quizzes} takes={takes} />
    </main>
  );
}
