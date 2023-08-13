import { getAuthSession } from "@/lib/nextauth";
import { getQuizzesByCreator } from "@/services/quiz.service";

import MyQuizzesHeader from "./components/MyQuizzesHeader";
import MyQuizzesItems from "./components/MyQuizzesItems";

export default async function MyQuizzes() {
  const session = await getAuthSession();

  const quizzes = await getQuizzesByCreator(session?.user.id!);

  return (
    <main className="container">
      <MyQuizzesHeader />
      <MyQuizzesItems quizzes={quizzes} />
    </main>
  );
}
