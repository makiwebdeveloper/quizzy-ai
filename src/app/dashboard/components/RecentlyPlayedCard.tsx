import { buttonVariants } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { IFullTake } from "@/types/take.interface";
import Link from "next/link";

interface Props {
  takes: IFullTake[];
}

export default function RecentlyPlayedCard({ takes }: Props) {
  return (
    <Card className="md:row-span-3 h-fit md:h-auto row-start-4 col-start-1 md:col-start-3 col-span-3 md:col-span-1 md:row-start-1">
      <CardHeader>
        <CardTitle>Recently played</CardTitle>
        <CardDescription>List of your recently played quizzes</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[250px]">
          <div className="flex flex-col gap-5 py-1">
            {takes.map((take) => (
              <Link
                className={buttonVariants({
                  variant: "outline",
                  className: "flex flex-col h-fit",
                })}
                href={
                  take.endsAt
                    ? `/statistics/${take.quiz.id}`
                    : `/play/${take.quiz.id}`
                }
              >
                <span>{take.quiz.topic}</span>
                <span>{!take.endsAt ? "(In progress)" : ""}</span>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
