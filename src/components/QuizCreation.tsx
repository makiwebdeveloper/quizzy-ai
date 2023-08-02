"use client";

import { QuizCreationType, quizCreationValidator } from "@/lib/validators/quiz";
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

interface Props {
  type: "quiz-me" | "create-and-share";
}

export default function QuizCreation({ type }: Props) {
  const form = useForm<QuizCreationType>({
    resolver: zodResolver(quizCreationValidator),
    defaultValues: {
      topic: "",
      questionsAmount: 3,
    },
  });

  const { mutate: createQuiz, isLoading } = useMutation({
    mutationFn: async ({ topic, questionsAmount }: QuizCreationType) => {
      const response = await axios.post("/api/quiz", {
        topic,
        questionsAmount,
      });
      return response.data;
    },
  });

  async function onSubmit(data: QuizCreationType) {
    createQuiz(data, {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: ({ quizId }: any) => {
        console.log(quizId);
      },
    });
  }

  return (
    <Card className="w-[350px]">
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
