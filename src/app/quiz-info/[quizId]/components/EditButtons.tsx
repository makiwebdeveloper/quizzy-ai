"use client";

import { Button } from "@/components/ui/Button";
import { useToast } from "@/hooks/useToast";
import { makePublicQuizValidator } from "@/lib/validators/quiz";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  quizId: string;
  isInitialPublic: boolean;
}

export default function EditButtons({ isInitialPublic, quizId }: Props) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  const [isShareLinkCopied, setIsShareLinkCopied] = useState(false);

  const { data: isPublic } = useQuery(
    ["isPublic"],
    async () => {
      const res = await axios.get<{ isPublic: boolean }>(
        `/api/quiz/isPublic/${quizId}`
      );
      return res.data.isPublic;
    },
    {
      initialData: isInitialPublic,
    }
  );

  const { mutate: makePublic, isLoading: isMakePublicLoading } = useMutation({
    mutationFn: async () => {
      const payload: makePublicQuizValidator = { quizId };
      await axios.post("/api/quiz/isPublic", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["isPublic"]);
      toast({
        title: "Success",
        description: "Successfully made public quiz",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Failed to make public quiz",
        description: "Something went wrong. Please try later",
        variant: "destructive",
      });
    },
  });

  const { mutate: deleteQuiz, isLoading: isDeleteLoading } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/quiz/${quizId}`);
    },
    onSuccess: () => {
      router.push("/dashboard");
    },
    onError: () => {
      toast({
        title: "Failed to delete quiz",
        description: "Something went wrong. Please try later",
        variant: "destructive",
      });
    },
  });

  const shareQuiz = () => {
    navigator.clipboard.writeText(`http://localhost:3000/play/${quizId}`);
    setIsShareLinkCopied(true);
  };

  return (
    <div className="flex gap-3">
      {isPublic ? (
        <Button onClick={shareQuiz}>
          {isShareLinkCopied ? "Copied" : "Share"}
        </Button>
      ) : (
        <Button onClick={() => makePublic()} disabled={isMakePublicLoading}>
          Make public
        </Button>
      )}
      <Button
        variant="destructive"
        onClick={() => deleteQuiz()}
        disabled={isDeleteLoading}
      >
        Delete Quiz
      </Button>
    </div>
  );
}
