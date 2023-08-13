"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { useRouter } from "next/navigation";

export default function YourQuizzesCard() {
  const router = useRouter();

  return (
    <Card
      className="col-span-3 md:col-span-2 col-start-1 row-start-3 cursor-pointer transition hover:bg-card-hover flex flex-col justify-center"
      onClick={() => {
        router.push("/my-quizzes");
      }}
    >
      <CardHeader>
        <CardTitle>Your Quizzes</CardTitle>
        <CardDescription>List of your latest quizzes</CardDescription>
      </CardHeader>
    </Card>
  );
}
