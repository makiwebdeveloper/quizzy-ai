"use client";

import { IQuiz } from "@/types/quiz.interface";
import { Take } from "@prisma/client";
import { useSession } from "next-auth/react";

interface Props {
  quiz: IQuiz;
  take: Take;
}

export default function PlayQuiz({ quiz, take }: Props) {
  const { data: session } = useSession();

  return (
    <>
      <pre className="bg-green-100">
        {JSON.stringify(session?.user, null, 2)}
      </pre>
      <pre className="bg-purple-100">{JSON.stringify(take, null, 2)}</pre>
      <pre className="bg-red-100">{JSON.stringify(quiz, null, 2)}</pre>
    </>
  );
}
