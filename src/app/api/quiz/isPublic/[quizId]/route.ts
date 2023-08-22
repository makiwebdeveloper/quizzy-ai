import { findQuizById } from "@/services/quiz.service";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { quizId: string } }
) {
  const quiz = await findQuizById(params.quizId);

  if (!quiz) {
    return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
  }

  return NextResponse.json({ isPublic: quiz?.isPublic }, { status: 200 });
}
