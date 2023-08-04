import { z } from "zod";

export const quizCreationValidator = z.object({
  topic: z
    .string()
    .min(3, {
      message: "Topic must be at least 4 characters long",
    })
    .max(50, {
      message: "Topic must be at most 50 characters long",
    }),

  questionsAmount: z.number().min(1).max(12),
});

export type QuizCreationValidatorType = z.infer<typeof quizCreationValidator>;
