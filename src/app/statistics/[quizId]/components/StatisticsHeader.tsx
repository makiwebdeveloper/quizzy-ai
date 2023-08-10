import { formatTime } from "@/utils/timeFormater";
import { differenceInSeconds } from "date-fns";

interface Props {
  topic: string;
  correctAnswersLength: number;
  questionsLength: number;
  startsAt: Date;
  endsAt: Date | null;
}

export default function StatisticsHeader({
  topic,
  correctAnswersLength,
  questionsLength,
  startsAt,
  endsAt,
}: Props) {
  return (
    <div className="flex flex-col lg:flex-row gap-5 lg:gap-0 lg:items-center justify-between">
      <h1 className="title flex flex-col lg:flex-row items-start gap-5 lg:gap-0 lg:items-center">
        Statistics of quiz{" "}
        <span className="flex items-center">
          <span className="text-base mr-2 lg:hidden">Topic:</span>
          <span className="lg:ml-5 text-base py-1 px-2 rounded-lg text-white bg-primary">
            {topic}
          </span>
        </span>
      </h1>
      <div className="lg:space-y-2 space-y-5">
        <p className="font-semibold">
          Total score:{" "}
          <span className="ml-2 py-1 px-2 rounded-lg text-white bg-primary">
            {correctAnswersLength}/{questionsLength}
          </span>
        </p>
        <p className="font-semibold">
          Time:{" "}
          <span className="ml-2 py-1 px-2 rounded-lg text-white bg-primary">
            {formatTime(differenceInSeconds(endsAt!, startsAt))}
          </span>
        </p>
      </div>
    </div>
  );
}
