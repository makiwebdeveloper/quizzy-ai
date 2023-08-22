import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { deleteQuizValidator } from "@/lib/validators/quiz";
import { findQuizById } from "@/services/quiz.service";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function DELETE(
  req: Request,
  { params }: { params: { quizId: string } }
) {
  try {
    const session = await getAuthSession();

    const quiz = await findQuizById(params.quizId);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } else if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    } else if (quiz.creatorId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.quiz.delete({
      where: {
        id: params.quizId,
      },
    });

    return NextResponse.json({ message: "OK" }, { status: 200 });
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
        { status: 500 }
      );
    }
  }
}
