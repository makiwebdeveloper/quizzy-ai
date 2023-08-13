import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { quizCreationValidator } from "@/lib/validators/quiz";
import { NextResponse } from "next/server";
import { z } from "zod";
import axios from "axios";
import { QuestionType, createQuiz } from "@/services/quiz.service";

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { topic, questionsAmount, type } = quizCreationValidator.parse(body);

    const { data } = await axios.post<{ questions: QuestionType[] }>(
      "http://localhost:3000/api/questions",
      {
        topic,
        questionsAmount,
      }
    );

    const newQuiz = await createQuiz({
      topic,
      creatorId: session.user.id,
      questions: data.questions,
      type: type || "quiz-me",
    });

    if (!newQuiz) {
      return NextResponse.json(
        { msg: "Failed to create a Quiz" },
        { status: 500 }
      );
    }

    data.questions.forEach(async (question) => {
      const questionId = newQuiz.questions.find(
        (item) => item.text === question.question
      )?.id;

      if (!questionId) return;

      const options = await prisma.option.createMany({
        data: [
          { text: question.option1, questionId },
          { text: question.answer, questionId, isCorrect: true },
          { text: question.option2, questionId },
          { text: question.option3, questionId },
        ].sort(() => Math.random() - 0.5),
      });
    });

    return NextResponse.json({ quizId: newQuiz.id }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues },
        {
          status: 400,
        }
      );
    } else {
      return NextResponse.json(
        { error: "An unexpected error occurred." },
        {
          status: 500,
        }
      );
    }
  }
}
