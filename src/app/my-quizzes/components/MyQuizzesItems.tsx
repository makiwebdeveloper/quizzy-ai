import Image from "next/image";
import Link from "next/link";
import { IQuiz } from "@/types/quiz.interface";
import { buttonVariants } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

interface Props {
  quizzes: IQuiz[];
}

export default function MyQuizzesItems({ quizzes }: Props) {
  if (quizzes.length === 0) {
    return (
      <div className="mt-6">
        <div className="flex items-center gap-3 justify-center">
          <p className="font-semibold text-xl md:text-3xl ">No quizzes yet</p>
          <div className="relative w-5 h-5 md:w-10 md:h-10">
            <Image src="/magic-wand.png" alt="Emoji with glasses" fill />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-5">
      {quizzes.map((quiz) => (
        <Card key={quiz.id}>
          <CardContent className="pt-6 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="space-y-3">
              <p className="font-semibold">
                Topic:
                <span className="ml-2 py-1 px-2 rounded-lg bg-primary text-primary-foreground">
                  {quiz.topic}
                </span>
              </p>
              <p className="font-semibold">
                Questions length:
                <span className="ml-2 py-1 p-2 rounded-lg bg-primary text-primary-foreground">
                  {quiz.questions.length}
                </span>
              </p>
            </div>
            <Link
              href={`/quiz-info/${quiz.id}`}
              className={buttonVariants({
                variant: "outline",
                className: "flex gap-1",
              })}
            >
              More{" "}
              <div className="relative w-5 h-5">
                <Image
                  src="/man-with-laptop.png"
                  alt="Emoji with glasses"
                  fill
                />
              </div>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
