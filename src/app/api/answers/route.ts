import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { checkAnswerValidator } from "@/lib/validators/answers";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { optionId, quizId } = checkAnswerValidator.parse(body);

    const option = await prisma.option.findUnique({
      where: { id: optionId },
    });

    if (!option) {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }

    const answer = await prisma.answer.create({
      data: {
        isCorrect: option.isCorrect,
        optionId,
        playerId: session.user.id,
        takeQuizId: quizId,
        takePlayerId: session.user.id,
      },
    });

    return NextResponse.json({ isCorrect: option.isCorrect }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    } else {
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 }
      );
    }
  }
}
