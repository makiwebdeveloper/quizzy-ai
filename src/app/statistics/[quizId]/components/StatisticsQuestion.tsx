import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import { IAnswer } from "@/types/answer.interface";
import { IFullQuestion } from "@/types/quiz.interface";

interface Props {
  question: IFullQuestion;
  index: number;
  answers: IAnswer[];
}

export default function StatisticsQuestion({
  question,
  index,
  answers,
}: Props) {
  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center gap-2 md:gap-5">
          <CardTitle className="mt-1">{index}</CardTitle>
          <span className="font-bold">|</span>
          <CardDescription className="text-lg text-foreground font-semibold">
            {question.text}
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="mt-5 space-y-5">
        {question.options.map((option) => (
          <div
            key={option.id}
            className={cn(
              "text-center px-4 py-2 rounded-lg border bg-card text-foreground",
              answers.find((answer) => answer.optionId === option.id) &&
                "bg-red-200 dark:bg-red-500",
              option.isCorrect && "bg-green-200 dark:bg-green-500"
            )}
          >
            {option.text}
          </div>
        ))}
      </div>
    </div>
  );
}
