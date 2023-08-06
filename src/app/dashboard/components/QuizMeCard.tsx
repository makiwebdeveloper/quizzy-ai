"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { useRouter } from "next/navigation";

export default function QuizMeCard() {
  const router = useRouter();

  return (
    <Card
      className="col-span-2 cursor-pointer transition hover:bg-zinc-50 dark:hover:bg-zinc-900  flex flex-col justify-center"
      onClick={() => {
        router.push("/quiz-me");
      }}
    >
      <CardHeader>
        <CardTitle>Quiz me!</CardTitle>
        <CardDescription>Create a quiz and test yourself</CardDescription>
      </CardHeader>
    </Card>
  );
}
