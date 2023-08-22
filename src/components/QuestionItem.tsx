"use client";

import { AlarmClock, Loader2 } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/Card";
import { Button } from "./ui/Button";
import { formatTime } from "@/utils/timeFormater";
import { differenceInSeconds } from "date-fns";
import { IQuestion } from "@/types/quiz.interface";
import { useEffect, useState } from "react";

interface Props {
  topic: string;
  now: Date;
  startsAt: Date;
  currentQuestionIndex: number;
  questionsLength: number;
  currentQuestion: IQuestion;
  nextHandler: () => void;
  isLastQuestion: boolean;
  selectedOptionId: string;
  setSelectedOptionId: (value: string) => void;
  nextButtonDisabled: boolean;
}

export default function QuestionItem({
  topic,
  now,
  startsAt,
  currentQuestionIndex,
  questionsLength,
  currentQuestion,
  nextHandler,
  isLastQuestion,
  selectedOptionId,
  setSelectedOptionId,
  nextButtonDisabled,
}: Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div>
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-4xl w-full px-8 lg:px-0 space-y-5">
      <div className="flex justify-between">
        <h3 className="text-zinc-500 dark:text-zinc-300 font-semibold">
          Topic{" "}
          <span className="ml-3 py-1 px-2 rounded-lg bg-primary text-primary-foreground">
            {topic}
          </span>
        </h3>
        <p className="font-semibold text-zinc-500 dark:text-zinc-300 flex gap-2 items-center">
          {formatTime(differenceInSeconds(now, startsAt))}
          <AlarmClock className="w-5 h-5" />
        </p>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center gap-5">
          <CardTitle className="flex flex-col justify-center divide-y-2 divide-zinc-900 dark:divide-zinc-50">
            <span>{currentQuestionIndex}</span>
            <span>{questionsLength}</span>
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
            className="h-fit"
          >
            {option.text}
          </Button>
        ))}
      </div>
      <div className="flex justify-end">
        <Button disabled={nextButtonDisabled} onClick={nextHandler}>
          {isLastQuestion ? "Finish" : "Next"}
        </Button>
      </div>
    </section>
  );
}
