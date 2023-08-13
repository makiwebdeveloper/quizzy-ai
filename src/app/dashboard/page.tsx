import { Metadata } from "next";
import QuizMeCard from "./components/QuizMeCard";
import CreateAndShareCard from "./components/CreateAndShareCard";
import YourQuizzesCard from "./components/YourQuizzesCard";
import RecentlyPlayedCard from "./components/RecentlyPlayedCard";

export const metadata: Metadata = {
  title: "Dashboard | Quizzy AI",
  description: "Play and share quizzes!",
};

export default function Dashboard() {
  return (
    <main className="container">
      <h1 className="title">Dashboard</h1>
      <section className="mt-6 grid grid-cols-3 grid-rows-4 md:grid-rows-3 gap-y-5 gap-x-5 h-[400px]">
        <QuizMeCard />
        <CreateAndShareCard />
        <YourQuizzesCard />
        <RecentlyPlayedCard />
      </section>
    </main>
  );
}
