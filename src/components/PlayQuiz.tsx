"use client";

import { IQuiz } from "@/types/quiz.interface";
import { ITake } from "@/types/take.interface";
import { IUser } from "@/types/user.interface";
import { AlarmClock } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/Card";
import { Button } from "./ui/Button";

interface Props {
  quiz: IQuiz;
  take: ITake;
  user: IUser;
}

export default function PlayQuiz({ quiz, take, user }: Props) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState({
    correct: 0,
    wrong: 0,
  });

  const currentQuestion = useMemo(() => {
    return quiz.questions[currentQuestionIndex];
  }, [currentQuestionIndex, quiz.questions]);

  const [selectedOptionId, setSelectedOptionId] = useState(
    currentQuestion.options[0].id
  );

  const isLastQuestion = useMemo(() => {
    return currentQuestionIndex + 1 === quiz.questions.length;
  }, [currentQuestion]);

  useEffect(
    () => {
      const handleKeyDown = (event: KeyboardEvent) => {
        const key = event.key;

        if (key === "1") {
          setSelectedOptionId(currentQuestion.options[0].id);
        } else if (key === "2") {
          setSelectedOptionId(currentQuestion.options[1].id);
        } else if (key === "3") {
          setSelectedOptionId(currentQuestion.options[2].id);
        } else if (key === "4") {
          setSelectedOptionId(currentQuestion.options[3].id);
        } else if (key === "Enter") {
          // handleNext();
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    },
    [
      // handleNext
    ]
  );

  return (
    <section className="mx-auto max-w-4xl w-full px-8 space-y-5">
      <div className="flex justify-between">
        <h3 className="text-zinc-500 dark:text-zinc-300 font-semibold">
          Topic{" "}
          <span className="ml-2 bg-zinc-900 dark:bg-zinc-50 py-1 px-2 rounded-lg text-white dark:text-zinc-900">
            {quiz.topic}
          </span>
        </h3>
        <p className="font-semibold text-zinc-500 dark:text-zinc-300 flex gap-2 items-center">
          <AlarmClock className="w-5 h-5" /> 00:00
        </p>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center gap-5">
          <CardTitle className="flex flex-col justify-center divide-y-2 divide-zinc-900 dark:divide-zinc-50">
            <span>{currentQuestionIndex + 1}</span>
            <span>{quiz.questions.length}</span>
          </CardTitle>
          <CardDescription className="text-lg font-semibold">
            {currentQuestion.text}
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="flex flex-col gap-5">
        {currentQuestion.options.map((option) => (
          <Button
            key={option.id}
            variant={selectedOptionId === option.id ? "default" : "outline"}
            onClick={() => setSelectedOptionId(option.id)}
          >
            {option.text}
          </Button>
        ))}
      </div>
      <div className="flex justify-end">
        <Button>{isLastQuestion ? "Finish" : "Next"}</Button>
      </div>
    </section>
  );
}
