import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Quizzy AI",
  description: "Read more about Quizzy AI project.",
};

export default function About() {
  return (
    <main className="absolute top-0 left-0 h-screen w-screen center">
      <Card className="w-[300px] sm:w-[450px]">
        <CardHeader>
          <CardTitle>About project</CardTitle>
          <CardDescription className="space-y-1">
            <p>
              <strong>Quizzy Ai</strong> is a fullstack application for the
              purpose of creating, taking, and managing quizzes or tests with
              AI.
            </p>
            <p>
              Instead of using the usual Quiz App and creating quizzes manually,
              you can generate a quiz using AI, play it or share it with anyone
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <hr className="mb-5" />
          <h3 className="text-muted-foreground font-semibold">Built with</h3>
          <p className="text-muted-foreground text-sm">
            Next.js | React.js | TypeScript | TailwindCSS | React Query |
            PrismaORM | PostgreSQL | Zod | Next Auth | Shadcn | OpenAI
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
