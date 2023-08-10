import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import { IFullQuestion } from "@/types/quiz.interface";

interface Props {
  question: IFullQuestion;
  index: number;
}

export default function StatisticsQuestion({ question, index }: Props) {
  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center gap-5 bg-zinc-100 hover:bg-zinc-100/80 dark:bg-zinc-800 dark:hover:bg-zinc-800/80 rounded-md">
          <CardTitle>{index}</CardTitle>
          <CardDescription className="text-lg font-semibold">
            {question.text}
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="mt-5 space-y-5">
        {question.options.map((option) => (
          <div
            key={option.id}
            className={cn(
              "text-center px-4 py-2 rounded-md border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950",

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
