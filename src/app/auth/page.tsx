import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Metadata } from "next";
import GoogleButton from "./components/GoogleButton";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Auth | Quizzy AI",
  description: "Sign in for play in quizzes!",
};

export default async function Auth() {
  const session = await getAuthSession();

  if (session) {
    redirect("/");
  }

  return (
    <main className="absolute top-0 left-0 h-screen w-screen center">
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>Welcome to Quizzy AI!</CardTitle>
          <CardDescription>
            It is a platform for creating quizzes using AI. Sign in for plaing!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GoogleButton />
        </CardContent>
      </Card>
    </main>
  );
}
