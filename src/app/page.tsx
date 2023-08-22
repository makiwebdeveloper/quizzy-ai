import { buttonVariants } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { getTopQuizzes } from "@/services/quiz.service";
import TopQuizzesItem from "@/components/TopQuizzesItem";

export default async function Home() {
  const topQuizzes = await getTopQuizzes();

  return (
    <main className="container">
      <div className="flex justify-between items-center gap-3">
        <h1 className="title">Top Quizzes</h1>
        <Link
          href="/dashboard"
          className={buttonVariants({ className: "flex gap-1" })}
        >
          <span className="hidden md:block">Go to</span> Dashboard{" "}
          <div className="relative w-5 h-5">
            <Image src="/nerd-face.png" alt="Emoji with glasses" fill />
          </div>
        </Link>
      </div>
      <section className="my-6 space-y-5">
        {topQuizzes.map((quiz) => (
          <TopQuizzesItem quiz={quiz} />
        ))}
      </section>
    </main>
  );
}
