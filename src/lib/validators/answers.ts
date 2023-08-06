import { z } from "zod";

export const checkAnswerValidator = z.object({
  optionId: z.string(),
  quizId: z.string(),
});

export type CheckAnswerValidatorType = z.infer<typeof checkAnswerValidator>;
