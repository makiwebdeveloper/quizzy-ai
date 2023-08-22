import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { makePublicQuizValidator } from "@/lib/validators/quiz";
import { findQuizById } from "@/services/quiz.service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    const body = await req.json();
    const { quizId } = makePublicQuizValidator.parse(body);

    const existQuiz = await findQuizById(quizId);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } else if (!existQuiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    } else if (existQuiz.creatorId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.quiz.update({
      where: {
        id: quizId,
      },
      data: {
        isPublic: true,
      },
    });

    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
