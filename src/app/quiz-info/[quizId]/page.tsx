import { prisma } from "@/lib/db";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { getAuthSession } from "@/lib/nextauth";
import { SelectFullQuizObject } from "@/services/quiz.service";
import { getTakesByQuiz } from "@/services/take.service";
import { formatTime } from "@/utils/timeFormater";
import { Card, CardHeader } from "@/components/ui/Card";
import { differenceInSeconds } from "date-fns";
import { AlarmClock } from "lucide-react";
import QuestionInfo from "./components/QuestionInfo";
import QuizInfoHeader from "./components/QuizInfoHeader";

interface Props {
  params: {
    quizId: string;
  };
}

export default async function QuizInfo({ params: { quizId } }: Props) {
  const session = await getAuthSession();

  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    select: SelectFullQuizObject,
  });

  if (!quiz || session?.user.id !== quiz.creatorId) {
    redirect("/dashboard");
  }

  const takes = await getTakesByQuiz(quizId);

  if (!takes.find((take) => take.player.id === session?.user.id)?.endsAt) {
    redirect("/dashboard");
  }

  return (
    <main className="container">
      <QuizInfoHeader
        topic={quiz.topic}
        isPublic={quiz.isPublic}
        quizId={quizId}
      />
      <Tabs
        defaultValue="questions"
        className="mx-auto max-w-4xl flex flex-col items-center my-5"
      >
        <TabsList className="w-full md:w-2/3">
          <TabsTrigger value="questions" className="w-full">
            Questions
          </TabsTrigger>
          <TabsTrigger value="results" className="w-full">
            Results
          </TabsTrigger>
        </TabsList>
        <TabsContent value="questions" className="w-full">
          <section className="my-5 space-y-5">
            {quiz.questions.map((question, index) => (
              <QuestionInfo
                key={question.id}
                question={question}
                index={index + 1}
              />
            ))}
          </section>
        </TabsContent>
        <TabsContent value="results" className="w-full">
          <section className="my-4 space-y-5">
            {takes.map((takeItem, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-3 md:grid-rows-1">
                    <div className="flex items-center justify-center md:justify-normal gap-5">
                      <div className="relative w-10 h-10">
                        <Image
                          src={takeItem.player.image!}
                          alt={`${takeItem.player.name} profile image`}
                          fill
                          className="object-cover rounded-full"
                        />
                      </div>
                      <p className="font-semibold">{takeItem.player.name}</p>
                    </div>
                    <div className="flex gap-2 items-center justify-center">
                      <p className="font-semibold">Correct:</p>
                      <p className="flex gap-1 text-green-400 font-semibold">
                        {
                          takeItem.answers.filter((item) => item.isCorrect)
                            .length
                        }
                        <span>/</span>
                        {takeItem.answers.length}
                      </p>
                    </div>
                    <p className="flex items-center justify-center md:justify-end gap-2 font-semibold">
                      {takeItem.endsAt
                        ? formatTime(
                            differenceInSeconds(
                              takeItem.endsAt,
                              takeItem.startsAt
                            )
                          )
                        : "In progress"}
                      <AlarmClock className="w-5 h-5" />
                    </p>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </section>
        </TabsContent>
      </Tabs>
    </main>
  );
}
