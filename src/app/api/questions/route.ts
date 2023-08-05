import { strict_output } from "@/lib/gpt";
import { quizCreationValidator } from "@/lib/validators/quiz";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { topic, questionsAmount } = quizCreationValidator.parse(body);

    const questions = await strict_output(
      `You are a helpful AI that is able to generate mcq questions and answers, the length of each answer should not be more than 15 words, store all answers and questions and options in a JSON array. "JSON (JavaScript Object Notation) is a data format used to exchange information between different systems. In JSON, strings are always enclosed in double quotes (" "). they need to include a backslash (\/) to escape this character and not create a formatting error.`,
      new Array(questionsAmount).fill(
        `You are to generate a random hard mcq question about ${topic}`
      ),
      {
        question: "question",
        answer:
          "answer with max length of 15 words and is not repeated with options",
        option1: "option1 with max length of 15 words",
        option2: "option2 with max length of 15 words",
        option3: "option3 with max length of 15 words",
      }
    );

    if (questions.length === 0 || questions.length !== questionsAmount) {
      return NextResponse.json(
        { error: "Try to regenerate prompt" },
        { status: 400 }
      );
    }

    return NextResponse.json({ questions }, { status: 200 });
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
        { message: "Something went wrong" },
        { status: 500 }
      );
    }
  }
}
