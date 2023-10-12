"use client";

import {
  QuizCreationType,
  QuizCreationValidatorType,
  quizCreationValidator,
} from "@/lib/validators/quiz";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/Card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/Form";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import QuestionsLoader from "./QuestionsLoader";
import { useToast } from "@/hooks/useToast";

interface Props {
  type: QuizCreationType;
}

export default function QuizCreation({ type }: Props) {
  const router = useRouter();
  const [isLoadingFinished, setIsLoadingFinished] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const { toast } = useToast();

  const form = useForm<QuizCreationValidatorType>({
    resolver: zodResolver(quizCreationValidator),
    defaultValues: {
      topic: "",
      questionsAmount: 3,
    },
  });

  const { mutate: createQuiz, isLoading } = useMutation({
    mutationFn: async ({
      topic,
      questionsAmount,
      type,
    }: QuizCreationValidatorType) => {
      const response = await axios.post("/api/quiz", {
        topic,
        questionsAmount,
        type,
      });
      return response.data;
    },
  });

  async function onSubmit(formData: QuizCreationValidatorType) {
    const data = { ...formData, type };
    setIsLoadingFinished(false);
    setShowLoader(true);
    createQuiz(data, {
      onSuccess: ({ quizId }: any) => {
        setIsLoadingFinished(true);
        toast({
          title: "Successfully created Quiz",
          description: "Good luck!",
          variant: "success",
        });
        setTimeout(() => {
          setShowLoader(false);
          if (type === "quiz-me") {
            router.push(`/play/${quizId}`);
          } else {
            router.push(`/quiz-info/${quizId}`);
          }
        }, 2000);
      },
      onError: (error) => {
        setIsLoadingFinished(true);
        toast({
          title: "Something went wrong",
          description:
            "Try reloading the page and generating it again. This happens when the AI returns an incorrect data format.",
          variant: "destructive",
        });
        setShowLoader(false);
      },
    });
  }

  if (showLoader) {
    return <QuestionsLoader finished={isLoadingFinished} />;
  }

  return (
    <Card className="w-[300px] sm:w-[350px]">
      <CardHeader>
        <CardTitle>
          {type === "quiz-me" ? "Quiz Me" : "Create and share"}
        </CardTitle>
        <CardDescription>
          {type === "quiz-me"
            ? "Generate and play your quiz"
            : "Generate and share your quiz"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter a topic" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="questionsAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Questions</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="How many questions?"
                      type="number"
                      {...field}
                      onChange={(e) => {
                        form.setValue(
                          "questionsAmount",
                          parseInt(e.target.value)
                        );
                      }}
                      min={1}
                      max={12}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} type="submit" className="w-full">
              {type === "quiz-me" ? "Play" : "Create"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
