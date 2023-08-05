"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { AlarmClock } from "lucide-react";
import { IQuiz } from "@/types/quiz.interface";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/Card";
import { Button } from "./ui/Button";
import { CheckAnswerValidatorType } from "@/lib/validators/answers";
import { FinishQuizValidatorType } from "@/lib/validators/quiz";
import axios from "axios";
import { useToast } from "@/hooks/useToast";
import { formatTime } from "@/utils/timeFormater";
import { differenceInSeconds } from "date-fns";

interface Props {
  quiz: IQuiz;
  startsAt: Date;
  initialQuestionIndex: number;
}

export default function PlayQuiz({
  quiz,
  startsAt,
  initialQuestionIndex,
}: Props) {
  const { toast } = useToast();
  const router = useRouter();

  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useState(initialQuestionIndex);
  const [isFinish, setIsFinish] = useState(false);
  const [now, setNow] = useState(new Date());

  const currentQuestion = useMemo(() => {
    return quiz.questions[currentQuestionIndex];
  }, [currentQuestionIndex, quiz.questions]);

  const [selectedOptionId, setSelectedOptionId] = useState(
    currentQuestion.options[0].id
  );

  const isLastQuestion = useMemo(() => {
    return currentQuestionIndex + 1 === quiz.questions.length;
  }, [currentQuestion]);

  const { mutate: checkAnswer, isLoading: isAnswerLoading } = useMutation({
    mutationFn: async () => {
      const payload: CheckAnswerValidatorType = {
        optionId: selectedOptionId,
        quizId: quiz.id,
      };
      const response = await axios.post("/api/answers", payload);
      return response.data;
    },
  });

  const { mutate: finishQuiz, isLoading: isFinishLoading } = useMutation({
    mutationFn: async () => {
      const payload: FinishQuizValidatorType = {
        quizId: quiz.id,
      };
      const response = await axios.post("/api/quiz/finish", payload);
      return response.data;
    },
  });

  const nextHandler = useCallback(() => {
    checkAnswer(undefined, {
      onSuccess: ({ isCorrect }) => {
        if (isCorrect) {
          toast({
            title: "Correct",
            description: "You got it right!",
            variant: "success",
          });
        } else {
          toast({
            title: "Incorrect",
            description: "You got it wrong!",
            variant: "destructive",
          });
        }
        if (isLastQuestion) {
          finishQuiz(undefined, {
            onSuccess: () => {
              setIsFinish(true);
              setTimeout(() => {
                router.push(`/statistics/${quiz.id}`);
              }, 1000);
            },
          });
        } else {
          setCurrentQuestionIndex((prev) => prev + 1);
        }
      },
    });
  }, [checkAnswer, currentQuestionIndex, quiz.questions]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isFinish) {
        setNow(new Date());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
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
        nextHandler();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [nextHandler]);

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
          <AlarmClock className="w-5 h-5" />{" "}
          {formatTime(differenceInSeconds(now, startsAt))}
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
        <Button disabled={isAnswerLoading || isFinish} onClick={nextHandler}>
          {isLastQuestion ? "Finish" : "Next"}
        </Button>
      </div>
    </section>
  );
}
