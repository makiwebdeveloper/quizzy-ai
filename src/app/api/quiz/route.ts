import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { quizCreationValidator } from "@/lib/validators/quiz";
import { NextResponse } from "next/server";
import { z } from "zod";
import axios from "axios";

type QuestionType = {
  question: string;
  answer: string;
  option1: string;
  option2: string;
  option3: string;
};

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { topic, questionsAmount } = quizCreationValidator.parse(body);

    const { data } = await axios.post<{ questions: QuestionType[] }>(
      "http://localhost:3000/api/questions",
      {
        topic,
        questionsAmount,
      }
    );

    const newQuiz = await prisma.quiz.create({
      data: {
        topic,
        creatorId: "clksg7j3400007kpoi4o10c11",
        questions: {
          createMany: {
            data: data.questions.map((question) => ({
              text: question.question,
            })),
          },
        },
      },
      select: {
        id: true,
        topic: true,
        creatorId: true,
        questions: true,
      },
    });

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
