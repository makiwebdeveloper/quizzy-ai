import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { finishQuizValidator } from "@/lib/validators/quiz";
import { findQuizById } from "@/services/quiz.service";
import { findTakeByIds } from "@/services/take.service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { quizId } = finishQuizValidator.parse(body);

    const take = await findTakeByIds({
      quizId,
      playerId: session.user.id,
    });

    if (!take) {
      return NextResponse.json({ message: "Take not found" }, { status: 404 });
    }

    await prisma.take.update({
      where: {
        quizId_playerId: {
          quizId,
          playerId: session.user.id,
        },
      },
      data: {
        endsAt: new Date(),
      },
    });
    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
