import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Quizzy AI",
  description: "Play and share quizzes!",
};

export default function Dashboard() {
  return (
    <main className="container">
      <h1 className="title">Dashboard</h1>
      <section className="mt-6 grid grid-cols-3 grid-rows-3 gap-y-5 gap-x-10 h-[400px]">
        <Card className="col-span-2 cursor-pointer transition hover:bg-zinc-50 dark:hover:bg-zinc-900  flex flex-col justify-center">
          <CardHeader>
            <CardTitle>Quiz me!</CardTitle>
            <CardDescription>Create a quiz and test yourself</CardDescription>
          </CardHeader>
        </Card>
        <Card className="col-span-2 col-start-1 row-start-2 cursor-pointer transition hover:bg-zinc-50 dark:hover:bg-zinc-900 flex flex-col justify-center">
          <CardHeader>
            <CardTitle>Create and share!</CardTitle>
            <CardDescription>
              Create a quiz, share with others and follow their results
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="col-span-2 col-start-1 row-start-3 cursor-pointer transition hover:bg-zinc-50 dark:hover:bg-zinc-900 flex flex-col justify-center">
          <CardHeader>
            <CardTitle>Your Quizzes</CardTitle>
            <CardDescription>List of your latest quizzes</CardDescription>
          </CardHeader>
        </Card>
        <Card className="row-span-3 col-start-3 row-start-1">
          <CardHeader>
            <CardTitle>Recently played</CardTitle>
            <CardDescription>
              List of your recently played quizzes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>dasdsad</p>
            <p>dasdsad</p>
            <p>dasdsad</p>
            <p>dasdsad</p>
            <p>dasdsad</p>
            <p>dasdsad</p>
            <p>dasdsad</p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
