import { z } from "zod";

export type QuizCreationType = "quiz-me" | "create-and-share";

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
  type: z.enum(["quiz-me", "create-and-share"]).optional(),
});
export type QuizCreationValidatorType = z.infer<typeof quizCreationValidator>;

export const finishQuizValidator = z.object({
  quizId: z.string(),
});
export type FinishQuizValidatorType = z.infer<typeof finishQuizValidator>;

export const deleteQuizValidator = z.object({
  quizId: z.string(),
});
export type DeleteQuizValidator = z.infer<typeof deleteQuizValidator>;

export const makePublicQuizValidator = z.object({
  quizId: z.string(),
});
export type makePublicQuizValidator = z.infer<typeof makePublicQuizValidator>;
