"use client";

import Image from "next/image";
import { Progress } from "./ui/Progress";
import { useEffect, useState } from "react";

const loadingTexts = [
  "Generating questions...",
  "Unleashing the power of curiosity...",
  "Diving deep into the ocean of questions..",
  "Harnessing the collective knowledge of the cosmos...",
  "Igniting the flame of wonder and exploration...",
];

interface Props {
  finished: boolean;
}

export default function QuestionsLoader({ finished }: Props) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState(loadingTexts[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * loadingTexts.length);
      setLoadingText(loadingTexts[randomIndex]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (finished) return 100;
        if (prev > 90) {
          return prev;
        }
        if (Math.random() < 0.1) {
          return prev + 2;
        }
        return prev + 0.5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [finished]);

  return (
    <div className="absolute h-screen w-screen flex items-center justify-center">
      <div className="w-[300px] md:w-[600px] flex flex-col items-center">
        <Image
          src="/loader.gif"
          width={400}
          height={400}
          alt="Loader animation"
        />
        <Progress value={progress} className="w-full mt-4" />
        <p className="mt-2 text-center">{loadingText}</p>
      </div>
    </div>
  );
}
