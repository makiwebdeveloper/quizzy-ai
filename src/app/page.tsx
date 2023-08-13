import { buttonVariants } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="container">
      <div className="flex justify-between items-center gap-5">
        <h1 className="title">Top Quizzes</h1>
        <Link
          href="/dashboard"
          className={buttonVariants({ className: "flex gap-1" })}
        >
          <span className="hidden md:block">Go to</span> Dashboard{" "}
          <Image
            src="/nerd-face.png"
            alt="Emoji with glasses"
            width={20}
            height={20}
          />
        </Link>
      </div>
    </main>
  );
}
