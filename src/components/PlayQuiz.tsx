"use client";

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { IQuiz } from "@/types/quiz.interface";
import { CheckAnswerValidatorType } from "@/lib/validators/answers";
import { FinishQuizValidatorType } from "@/lib/validators/quiz";
import { useToast } from "@/hooks/useToast";
import QuestionItem from "./QuestionItem";

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
    <>
      <QuestionItem
        currentQuestion={currentQuestion}
        currentQuestionIndex={currentQuestionIndex + 1}
        questionsLength={quiz.questions.length}
        topic={quiz.topic}
        now={now}
        startsAt={startsAt}
        selectedOptionId={selectedOptionId}
        setSelectedOptionId={setSelectedOptionId}
        nextButtonDisabled={isAnswerLoading || isFinish || isFinishLoading}
        isLastQuestion={isLastQuestion}
        nextHandler={nextHandler}
      />
    </>
  );
}
