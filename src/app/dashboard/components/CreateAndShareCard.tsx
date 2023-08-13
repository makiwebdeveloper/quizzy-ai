"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { useRouter } from "next/navigation";

export default function CreateAndShareCard() {
  const router = useRouter();

  return (
    <Card
      className="col-span-3 md:col-span-2 col-start-1 row-start-2 cursor-pointer transition hover:bg-card-hover flex flex-col justify-center"
      onClick={() => {
        router.push("/create-and-share");
      }}
    >
      <CardHeader>
        <CardTitle>Create and share!</CardTitle>
        <CardDescription>
          Create a quiz, share with others and follow their results
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
