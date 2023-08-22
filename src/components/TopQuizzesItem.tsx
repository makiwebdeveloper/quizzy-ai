"use client";

import { IQuiz } from "@/types/quiz.interface";
import { Card, CardHeader, CardTitle } from "./ui/Card";
import { useRouter } from "next/navigation";

interface Props {
  quiz: IQuiz;
}

export default function TopQuizzesItem({ quiz }: Props) {
  const router = useRouter();

  return (
    <Card
      key={quiz.id}
      className="flex cursor-pointer hover:bg-accent flex-col md:flex-row md:items-center justify-between"
      onClick={() => {
        router.push(`/play/${quiz.id}`);
      }}
    >
      <CardHeader>
        <CardTitle className="flex items-center">
          Topic:
          <span className="text-base ml-2 py-1 px-2 rounded-lg bg-primary text-primary-foreground">
            {quiz.topic}
          </span>
        </CardTitle>
      </CardHeader>
      <p className="font-semibold px-6 pb-6 md:pb-0">
        Questions length:
        <span className="ml-2 py-1 p-2 rounded-lg bg-primary text-primary-foreground">
          {quiz.questions.length}
        </span>
      </p>
    </Card>
  );
}
